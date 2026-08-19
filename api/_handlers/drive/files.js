import { requireAuth, onlyGet } from '../../lib/auth.js'
import { sendJson, handleApiError } from '../../lib/errors.js'
import { validateFolderId } from '../../lib/validation.js'
import { listFiles, getBreadcrumb, getRootId } from '../../lib/drive.js'

export default async function handler(req, res) {
  if (!onlyGet(req, res)) return
  if (!requireAuth(req, res)) return

  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const folderIdParam = url.searchParams.get('folderId')
    const folderId = folderIdParam || getRootId()

    const folderCheck = validateFolderId(folderId)
    if (!folderCheck.valid) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify({ error: folderCheck.error }))
    }

    const [files, breadcrumb] = await Promise.all([
      listFiles(folderCheck.value),
      getBreadcrumb(folderCheck.value),
    ])

    sendJson(res, 200, {
      files,
      breadcrumb,
      currentFolderId: folderCheck.value,
      rootFolderId: getRootId(),
    })
  } catch (error) {
    handleApiError(res, error, 'Unable to load files.')
  }
}
