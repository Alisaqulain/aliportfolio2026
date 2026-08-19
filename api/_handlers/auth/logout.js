import { destroySession, onlyPost } from '../../lib/auth.js'
import { sendJson, handleApiError } from '../../lib/errors.js'

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return

  try {
    destroySession(res)
    sendJson(res, 200, { success: true })
  } catch (error) {
    handleApiError(res, error, 'Unable to sign out.')
  }
}
