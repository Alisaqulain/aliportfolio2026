import { requireAuth, onlyGet } from '../../lib/auth.js'
import { sendError, handleApiError } from '../../lib/errors.js'
import { validateSearchQuery } from '../../lib/validation.js'
import { searchFiles } from '../../lib/drive.js'

export default async function handler(req, res) {
  if (!onlyGet(req, res)) return
  if (!requireAuth(req, res)) return

  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const query = url.searchParams.get('q') || ''

    const queryCheck = validateSearchQuery(query)
    if (!queryCheck.valid) {
      return sendError(res, 400, queryCheck.error)
    }

    const files = await searchFiles(queryCheck.value)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ files }))
  } catch (error) {
    handleApiError(res, error, 'Unable to search files.')
  }
}
