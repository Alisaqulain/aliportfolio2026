const API_BASE = '/api/mca'
export const MCA_MAX_UPLOAD_BYTES = 100 * 1024 * 1024 // keep in sync with api/_handlers/drive/upload.js

export class McaApiError extends Error {
  constructor(message, code = 'UNKNOWN') {
    super(message)
    this.name = 'McaApiError'
    this.code = code
  }
}

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
      ...options,
    })
  } catch {
    throw new McaApiError(
      'Unable to connect to the server. Start the API with: npm run dev:api',
      'NETWORK'
    )
  }

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')

  if (!response.ok) {
    const data = isJson ? await response.json().catch(() => ({})) : {}
    const isOffline = response.status >= 500 && !data.error
    if (isOffline) {
      throw new McaApiError(
        'Unable to reach the MCA API. Check Vercel env vars and redeploy.',
        'OFFLINE'
      )
    }
    const code = response.status === 401 ? 'AUTH' : 'API'
    throw new McaApiError(data.error || `Request failed (${response.status})`, code)
  }

  if (isJson) {
    return response.json()
  }

  return response
}

export const mcaApi = {
  checkSession: () => request('/auth/session'),

  login: (password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),

  logout: () =>
    request('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({}),
    }),

  listFiles: (folderId) => {
    const query = folderId ? `?folderId=${encodeURIComponent(folderId)}` : ''
    return request(`/drive/files${query}`)
  },

  searchFiles: (q) =>
    request(`/drive/search?q=${encodeURIComponent(q)}`),

  createFolder: (parentId, name) =>
    request('/drive/folder', {
      method: 'POST',
      body: JSON.stringify({ parentId, name }),
    }),

  renameItem: (fileId, name) =>
    request('/drive/rename', {
      method: 'PATCH',
      body: JSON.stringify({ fileId, name }),
    }),

  deleteItem: (fileId) =>
    request('/drive/delete', {
      method: 'DELETE',
      body: JSON.stringify({ fileId }),
    }),

  uploadFiles: (parentId, files, onProgress) => {
    return new Promise((resolve, reject) => {
      const fileList = Array.from(files || [])
      const maxMb = Math.floor(MCA_MAX_UPLOAD_BYTES / (1024 * 1024))
      const tooLarge = fileList.find((file) => file.size > MCA_MAX_UPLOAD_BYTES)
      if (tooLarge) {
        reject(
          new Error(
            `"${tooLarge.name}" is too large (${formatFileSize(tooLarge.size)}). Max size is ${maxMb} MB.`
          )
        )
        return
      }

      const formData = new FormData()
      formData.append('parentId', parentId)
      fileList.forEach((file) => formData.append('files', file))

      const xhr = new XMLHttpRequest()
      xhr.open('POST', `${API_BASE}/drive/upload`)
      xhr.withCredentials = true
      xhr.timeout = 10 * 60 * 1000

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          onProgress(Math.round((event.loaded / event.total) * 100))
        }
      }

      xhr.onload = () => {
        let data = {}
        try {
          data = JSON.parse(xhr.responseText || '{}')
        } catch {
          data = {}
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data)
          return
        }

        if (xhr.status === 413) {
          reject(
            new Error(data.error || `File is too large to upload. Max size is ${maxMb} MB.`)
          )
          return
        }

        reject(new Error(data.error || `Upload failed (${xhr.status}).`))
      }

      xhr.onerror = () => reject(new Error('Network error during upload.'))
      xhr.onabort = () => reject(new Error('Upload cancelled.'))
      xhr.ontimeout = () => reject(new Error('Upload timed out. Try a smaller file or check your connection.'))
      xhr.send(formData)

      return xhr
    })
  },

  downloadFile: async (fileId, fileName) => {
    const response = await fetch(
      `${API_BASE}/drive/download?fileId=${encodeURIComponent(fileId)}`,
      { credentials: 'include' }
    )
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || 'Download failed.')
    }
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },
}

export function formatFileSize(bytes) {
  if (bytes == null || bytes === 0) return '—'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unit = 0
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024
    unit += 1
  }
  return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
