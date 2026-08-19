import { requireAuth, onlyDelete } from '../../lib/auth.js'
import { parseJsonBody, sendJson, sendError, handleApiError } from '../../lib/errors.js'
import { validateFileId } from '../../lib/validation.js'
import { deleteItem } from '../../lib/drive.js'

export default async function handler(req, res) {
  if (!onlyDelete(req, res)) return
  if (!requireAuth(req, res)) return

  try {
    const body = await parseJsonBody(req)
    const idCheck = validateFileId(body?.fileId || '')

    if (!idCheck.valid) return sendError(res, 400, idCheck.error)

    await deleteItem(idCheck.value)
    sendJson(res, 200, { success: true })
  } catch (error) {
    handleApiError(res, error, 'Unable to delete item.')
  }
}
