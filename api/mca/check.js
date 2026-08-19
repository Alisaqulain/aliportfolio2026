import { onlyGet } from '../lib/auth.js'
import { sendJson, sendError } from '../lib/errors.js'
import { isEnvCheckAllowed, runEnvCheck, renderEnvCheckHtml } from '../lib/envCheck.js'

export default async function handler(req, res) {
  if (!onlyGet(req, res)) return

  if (!isEnvCheckAllowed(req)) {
    return sendError(res, 403, 'Environment check is disabled in production.')
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const wantsHtml =
      url.searchParams.get('format') === 'html' ||
      (req.headers.accept || '').includes('text/html')

    const report = await runEnvCheck(req)

    if (wantsHtml) {
      res.statusCode = report.ok ? 200 : 503
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(renderEnvCheckHtml(report))
      return
    }

    sendJson(res, report.ok ? 200 : 503, report)
  } catch (error) {
    sendError(res, 500, 'Unable to run environment check.')
  }
}
