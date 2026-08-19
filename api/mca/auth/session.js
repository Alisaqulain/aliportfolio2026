import { getSession, onlyGet } from '../../lib/auth.js'
import { sendJson } from '../../lib/errors.js'
import { getRootId } from '../../lib/drive.js'

export default async function handler(req, res) {
  if (!onlyGet(req, res)) return

  const session = getSession(req)
  if (!session) {
    return sendJson(res, 401, { authenticated: false })
  }

  try {
    const rootFolderId = getRootId()
    sendJson(res, 200, { authenticated: true, rootFolderId })
  } catch {
    sendJson(res, 200, { authenticated: true })
  }
}
