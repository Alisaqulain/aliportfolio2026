import { requireAuth, onlyPost } from '../../lib/auth.js'
import { parseJsonBody, sendJson, sendError, handleApiError } from '../../lib/errors.js'
import { validateFolderId, validateFileName } from '../../lib/validation.js'
import { createFolder } from '../../lib/drive.js'

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return
  if (!requireAuth(req, res)) return

  try {
    const body = await parseJsonBody(req)
    const parentCheck = validateFolderId(body?.parentId || '')
    const nameCheck = validateFileName(body?.name || '')

    if (!parentCheck.valid) return sendError(res, 400, parentCheck.error)
    if (!nameCheck.valid) return sendError(res, 400, nameCheck.error)

    const folder = await createFolder(parentCheck.value, nameCheck.value)
    sendJson(res, 201, { folder })
  } catch (error) {
    handleApiError(res, error, 'Unable to create folder.')
  }
}
