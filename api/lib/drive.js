import { google } from 'googleapis'
import { Readable } from 'stream'

import { normalizeFolderId } from './validation.js'

let driveClient = null

function getRootFolderId() {
  const raw = process.env.GOOGLE_DRIVE_FOLDER_ID
  const folderId = normalizeFolderId(raw || '')
  if (!folderId) {
    throw Object.assign(new Error('Missing Google Drive folder configuration.'), {
      code: 'CONFIG_ERROR',
      status: 503,
    })
  }
  return folderId
}

function getDriveClient() {
  if (driveClient) return driveClient

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim()
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim()

  if (!clientId || !clientSecret) {
    throw Object.assign(new Error('Missing Google client credentials.'), {
      code: 'MISSING_CLIENT_CREDENTIALS',
      status: 503,
    })
  }

  if (!refreshToken) {
    throw Object.assign(new Error('Missing Google refresh token.'), {
      code: 'MISSING_REFRESH_TOKEN',
      status: 503,
    })
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret)
  oauth2Client.setCredentials({ refresh_token: refreshToken })
  driveClient = google.drive({ version: 'v3', auth: oauth2Client })
  return driveClient
}

function formatFile(file) {
  const isFolder = file.mimeType === 'application/vnd.google-apps.folder'
  return {
    id: file.id,
    name: file.name,
    mimeType: file.mimeType,
    type: isFolder ? 'folder' : getFileCategory(file),
    size: file.size ? Number(file.size) : null,
    modifiedTime: file.modifiedTime || null,
    webViewLink: file.webViewLink || null,
  }
}

function getFileCategory(file) {
  const mime = file.mimeType || ''
  const name = (file.name || '').toLowerCase()

  if (mime === 'application/vnd.google-apps.folder') return 'folder'
  if (mime === 'application/pdf' || name.endsWith('.pdf')) return 'pdf'
  if (
    mime.includes('word') ||
    name.endsWith('.doc') ||
    name.endsWith('.docx')
  ) return 'word'
  if (
    mime.includes('spreadsheet') ||
    mime.includes('excel') ||
    name.endsWith('.xls') ||
    name.endsWith('.xlsx')
  ) return 'excel'
  if (
    mime.includes('presentation') ||
    mime.includes('powerpoint') ||
    name.endsWith('.ppt') ||
    name.endsWith('.pptx')
  ) return 'powerpoint'
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (
    mime.includes('zip') ||
    mime.includes('compressed') ||
    name.endsWith('.zip') ||
    name.endsWith('.rar') ||
    name.endsWith('.7z')
  ) return 'zip'
  if (mime.startsWith('text/') || name.endsWith('.txt') || name.endsWith('.md')) return 'text'
  return 'file'
}

async function getFileMetadata(fileId) {
  const drive = getDriveClient()
  const { data } = await drive.files.get({
    fileId,
    fields: 'id,name,mimeType,parents,trashed',
    supportsAllDrives: true,
  })
  return data
}

async function isDescendantOfRoot(folderId) {
  const rootId = getRootFolderId()
  if (folderId === rootId) return true

  let currentId = folderId
  const visited = new Set()

  while (currentId && !visited.has(currentId)) {
    visited.add(currentId)
    const meta = await getFileMetadata(currentId)

    if (meta.trashed) return false
    if (meta.mimeType !== 'application/vnd.google-apps.folder') return false

    const parents = meta.parents || []
    if (parents.includes(rootId)) return true
    if (parents.length === 0) return false

    currentId = parents[0]
  }

  return false
}

export async function assertFolderAccess(folderId) {
  const rootId = getRootFolderId()
  if (folderId === rootId) return rootId

  const allowed = await isDescendantOfRoot(folderId)
  if (!allowed) {
    throw Object.assign(new Error('Access denied to folder.'), {
      code: 'ACCESS_DENIED',
      status: 403,
    })
  }
  return folderId
}

export async function assertFileAccess(fileId) {
  const meta = await getFileMetadata(fileId)
  if (meta.trashed) {
    throw Object.assign(new Error('File not found.'), { code: 'NOT_FOUND', status: 404 })
  }

  const rootId = getRootFolderId()
  if (meta.id === rootId) return meta

  const parents = meta.parents || []
  for (const parentId of parents) {
    try {
      await assertFolderAccess(parentId)
      return meta
    } catch {
      // try next parent
    }
  }

  if (meta.mimeType === 'application/vnd.google-apps.folder') {
    const allowed = await isDescendantOfRoot(meta.id)
    if (allowed) return meta
  }

  throw Object.assign(new Error('Access denied to file.'), {
    code: 'ACCESS_DENIED',
    status: 403,
  })
}

export async function listFiles(folderId) {
  await assertFolderAccess(folderId)
  const drive = getDriveClient()

  const files = []
  let pageToken = null

  do {
    const { data } = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id,name,mimeType,size,modifiedTime,webViewLink)',
      orderBy: 'folder,name',
      pageSize: 100,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    })

    files.push(...(data.files || []).map(formatFile))
    pageToken = data.nextPageToken
  } while (pageToken)

  files.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1
    if (a.type !== 'folder' && b.type === 'folder') return 1
    return a.name.localeCompare(b.name)
  })

  return files
}

export async function getBreadcrumb(folderId) {
  const rootId = getRootFolderId()
  await assertFolderAccess(folderId)

  const path = []
  let currentId = folderId

  while (currentId) {
    const meta = await getFileMetadata(currentId)
    path.unshift({ id: meta.id, name: meta.name })

    if (currentId === rootId) break

    const parents = meta.parents || []
    if (parents.length === 0) break

    currentId = parents[0]
    if (currentId === rootId) {
      const rootMeta = await getFileMetadata(rootId)
      path.unshift({ id: rootMeta.id, name: rootMeta.name || 'Home' })
      break
    }
  }

  if (path.length > 0 && path[0].id !== rootId) {
    const rootMeta = await getFileMetadata(rootId)
    path.unshift({ id: rootMeta.id, name: rootMeta.name || 'Home' })
  }

  return path
}

export async function searchFiles(query) {
  const escaped = query.replace(/'/g, "\\'")
  const drive = getDriveClient()

  const { data } = await drive.files.list({
    q: `trashed = false and name contains '${escaped}'`,
    fields: 'files(id,name,mimeType,size,modifiedTime,webViewLink,parents)',
    pageSize: 100,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  })

  const files = []
  for (const file of data.files || []) {
    try {
      await assertFileAccess(file.id)
      files.push(formatFile(file))
    } catch {
      // skip files outside allowed tree
    }
  }

  files.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1
    if (a.type !== 'folder' && b.type === 'folder') return 1
    return a.name.localeCompare(b.name)
  })

  return files.slice(0, 50)
}

export async function createFolder(parentId, name) {
  await assertFolderAccess(parentId)
  const drive = getDriveClient()

  const { data } = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    },
    fields: 'id,name,mimeType,size,modifiedTime,webViewLink',
    supportsAllDrives: true,
  })

  return formatFile(data)
}

export async function renameItem(fileId, newName) {
  await assertFileAccess(fileId)
  const drive = getDriveClient()

  const { data } = await drive.files.update({
    fileId,
    requestBody: { name: newName },
    fields: 'id,name,mimeType,size,modifiedTime,webViewLink',
    supportsAllDrives: true,
  })

  return formatFile(data)
}

export async function deleteItem(fileId) {
  await assertFileAccess(fileId)
  const rootId = getRootFolderId()
  if (fileId === rootId) {
    throw Object.assign(new Error('Cannot delete root folder.'), {
      code: 'ACCESS_DENIED',
      status: 403,
    })
  }

  const drive = getDriveClient()
  await drive.files.delete({ fileId, supportsAllDrives: true })
  return { success: true }
}

export async function uploadFile(parentId, fileName, mimeType, buffer) {
  await assertFolderAccess(parentId)
  const drive = getDriveClient()

  const { data } = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [parentId],
    },
    media: {
      mimeType: mimeType || 'application/octet-stream',
      body: bufferToStream(buffer),
    },
    fields: 'id,name,mimeType,size,modifiedTime,webViewLink',
    supportsAllDrives: true,
  })

  return formatFile(data)
}

function bufferToStream(buffer) {
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null)
  return stream
}

export async function downloadFile(fileId) {
  const meta = await assertFileAccess(fileId)
  const drive = getDriveClient()

  if (meta.mimeType?.startsWith('application/vnd.google-apps.')) {
    const exportMap = {
      'application/vnd.google-apps.document': 'application/pdf',
      'application/vnd.google-apps.spreadsheet': 'application/pdf',
      'application/vnd.google-apps.presentation': 'application/pdf',
    }
    const exportMime = exportMap[meta.mimeType]
    if (exportMime) {
      const response = await drive.files.export(
        { fileId, mimeType: exportMime },
        { responseType: 'stream' }
      )
      return {
        stream: response.data,
        name: `${meta.name}.pdf`,
        mimeType: exportMime,
      }
    }
    throw Object.assign(new Error('This file type cannot be downloaded.'), {
      code: 'NOT_SUPPORTED',
      status: 400,
    })
  }

  const response = await drive.files.get(
    { fileId, alt: 'media', supportsAllDrives: true },
    { responseType: 'stream' }
  )

  return {
    stream: response.data,
    name: meta.name,
    mimeType: meta.mimeType || 'application/octet-stream',
  }
}

export function getRootId() {
  return getRootFolderId()
}
