import Busboy from 'busboy'
import { requireAuth, onlyPost } from '../../lib/auth.js'
import { sendJson, sendError, handleApiError } from '../../lib/errors.js'
import { validateFolderId, validateFileName } from '../../lib/validation.js'
import { uploadFile } from '../../lib/drive.js'

const MAX_FILE_BYTES = 100 * 1024 * 1024 // 100 MB per file
const MAX_FILES = 20

const EXT_MIME = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.odp': 'application/vnd.oasis.opendocument.presentation',
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
  '.csv': 'text/csv',
  '.json': 'application/json',
  '.zip': 'application/zip',
  '.rar': 'application/vnd.rar',
  '.7z': 'application/x-7z-compressed',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
}

function basename(filename = '') {
  const normalized = String(filename).replace(/\\/g, '/')
  const parts = normalized.split('/')
  return parts[parts.length - 1] || filename
}

function extensionOf(filename = '') {
  const base = basename(filename)
  const idx = base.lastIndexOf('.')
  if (idx === -1) return ''
  return base.slice(idx).toLowerCase()
}

function resolveMimeType(filename, mimeType) {
  const provided = typeof mimeType === 'string' ? mimeType.trim() : ''
  if (
    provided &&
    provided !== 'application/octet-stream' &&
    provided !== 'binary/octet-stream'
  ) {
    return provided
  }
  return EXT_MIME[extensionOf(filename)] || provided || 'application/octet-stream'
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || ''
    if (!contentType.includes('multipart/form-data')) {
      reject(Object.assign(new Error('Expected multipart form data'), { status: 400 }))
      return
    }

    let settled = false
    const fail = (error) => {
      if (settled) return
      settled = true
      reject(error)
    }
    const succeed = (value) => {
      if (settled) return
      settled = true
      resolve(value)
    }

    let parentId = ''
    const files = []
    const fileJobs = []

    const busboy = Busboy({
      headers: req.headers,
      limits: {
        files: MAX_FILES,
        fileSize: MAX_FILE_BYTES,
        fields: 20,
      },
      defParamCharset: 'utf8',
    })

    busboy.on('field', (name, value) => {
      if (name === 'parentId') parentId = value
    })

    busboy.on('file', (name, file, info) => {
      const filename = basename(info.filename || '')
      const mimeType = info.mimeType || ''
      const chunks = []
      let truncated = false

      const job = new Promise((resolveFile, rejectFile) => {
        file.on('data', (chunk) => {
          chunks.push(chunk)
        })
        file.on('limit', () => {
          truncated = true
          file.resume()
        })
        file.on('error', rejectFile)
        file.on('end', () => {
          if (!filename) {
            resolveFile()
            return
          }
          if (truncated) {
            rejectFile(
              Object.assign(
                new Error(
                  `File "${filename}" is too large. Max size is ${Math.floor(MAX_FILE_BYTES / (1024 * 1024))} MB.`
                ),
                { status: 413 }
              )
            )
            return
          }
          files.push({
            fieldName: name,
            filename,
            mimeType: resolveMimeType(filename, mimeType),
            buffer: Buffer.concat(chunks),
          })
          resolveFile()
        })
      })

      fileJobs.push(job)
    })

    busboy.on('filesLimit', () => {
      fail(
        Object.assign(new Error(`Too many files. Upload up to ${MAX_FILES} at a time.`), {
          status: 400,
        })
      )
    })

    busboy.on('error', fail)

    busboy.on('finish', async () => {
      try {
        await Promise.all(fileJobs)
        succeed({ parentId, files })
      } catch (error) {
        fail(error)
      }
    })

    // Vercel/Node may already have buffered the body in some runtimes.
    if (Buffer.isBuffer(req.body)) {
      busboy.end(req.body)
      return
    }
    if (typeof req.body === 'string') {
      busboy.end(Buffer.from(req.body))
      return
    }

    req.on('error', fail)
    req.pipe(busboy)
  })
}

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return
  if (!requireAuth(req, res)) return

  try {
    const { parentId, files } = await parseMultipart(req)

    const parentCheck = validateFolderId(parentId)
    if (!parentCheck.valid) return sendError(res, 400, parentCheck.error)

    if (!files.length) return sendError(res, 400, 'No files provided.')

    const uploaded = []
    for (const file of files) {
      const nameCheck = validateFileName(file.filename)
      if (!nameCheck.valid) {
        return sendError(res, 400, `Invalid file name "${file.filename}": ${nameCheck.error}`)
      }

      const result = await uploadFile(
        parentCheck.value,
        nameCheck.value,
        file.mimeType,
        file.buffer
      )
      uploaded.push(result)
    }

    if (!uploaded.length) return sendError(res, 400, 'No valid files to upload.')

    sendJson(res, 201, { files: uploaded })
  } catch (error) {
    if (error?.status === 400 || error?.status === 413) {
      return sendError(res, error.status, error.message)
    }
    if (
      /request entity too large|payload too large|body exceeded/i.test(error?.message || '')
    ) {
      return sendError(
        res,
        413,
        `File is too large to upload. Max size is ${Math.floor(MAX_FILE_BYTES / (1024 * 1024))} MB.`
      )
    }
    handleApiError(res, error, 'Upload failed.')
  }
}
