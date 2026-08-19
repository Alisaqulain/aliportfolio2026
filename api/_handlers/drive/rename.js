import { requireAuth, onlyPatch } from '../../lib/auth.js'
import { parseJsonBody, sendJson, sendError, handleApiError } from '../../lib/errors.js'
import { validateFileId, validateFileName } from '../../lib/validation.js'
import { renameItem } from '../../lib/drive.js'

export default async function handler(req, res) {
  if (!onlyPatch(req, res)) return
  if (!requireAuth(req, res)) return

  try {
    const body = await parseJsonBody(req)
    const idCheck = validateFileId(body?.fileId || '')
    const nameCheck = validateFileName(body?.name || '')

    if (!idCheck.valid) return sendError(res, 400, idCheck.error)
    if (!nameCheck.valid) return sendError(res, 400, nameCheck.error)

    const file = await renameItem(idCheck.value, nameCheck.value)
    sendJson(res, 200, { file })
  } catch (error) {
    handleApiError(res, error, 'Unable to rename item.')
  }
}
