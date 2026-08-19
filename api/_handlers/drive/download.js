import { requireAuth, onlyGet } from '../../lib/auth.js'
import { sendError, handleApiError } from '../../lib/errors.js'
import { validateFileId } from '../../lib/validation.js'
import { downloadFile } from '../../lib/drive.js'

export default async function handler(req, res) {
  if (!onlyGet(req, res)) return
  if (!requireAuth(req, res)) return

  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const fileId = url.searchParams.get('fileId') || ''

    const idCheck = validateFileId(fileId)
    if (!idCheck.valid) return sendError(res, 400, idCheck.error)

    const { stream, name, mimeType } = await downloadFile(idCheck.value)

    res.statusCode = 200
    res.setHeader('Content-Type', mimeType)
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(name)}"`)

    stream.on('error', () => {
      if (!res.headersSent) {
        sendError(res, 500, 'Download failed.')
      } else {
        res.end()
      }
    })

    stream.pipe(res)
  } catch (error) {
    if (error?.code === 'NOT_SUPPORTED') {
      return sendError(res, 400, 'This file type cannot be downloaded.')
    }
    handleApiError(res, error, 'Download failed.')
  }
}
