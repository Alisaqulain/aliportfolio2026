import Busboy from 'busboy'
import { requireAuth, onlyPost } from '../../lib/auth.js'
import { sendJson, sendError, handleApiError } from '../../lib/errors.js'
import { validateFolderId } from '../../lib/validation.js'
import { uploadFile } from '../../lib/drive.js'

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || ''
    if (!contentType.includes('multipart/form-data')) {
      reject(new Error('Expected multipart form data'))
      return
    }

    const busboy = Busboy({ headers: req.headers })
    let parentId = ''
    const files = []

    busboy.on('field', (name, value) => {
      if (name === 'parentId') parentId = value
    })

    busboy.on('file', (name, file, info) => {
      const chunks = []
      file.on('data', (chunk) => chunks.push(chunk))
      file.on('end', () => {
        files.push({
          fieldName: name,
          filename: info.filename,
          mimeType: info.mimeType,
          buffer: Buffer.concat(chunks),
        })
      })
    })

    busboy.on('finish', () => resolve({ parentId, files }))
    busboy.on('error', reject)
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
      if (!file.filename) continue
      const result = await uploadFile(
        parentCheck.value,
        file.filename,
        file.mimeType,
        file.buffer
      )
      uploaded.push(result)
    }

    if (!uploaded.length) return sendError(res, 400, 'No valid files to upload.')

    sendJson(res, 201, { files: uploaded })
  } catch (error) {
    handleApiError(res, error, 'Upload failed.')
  }
}
