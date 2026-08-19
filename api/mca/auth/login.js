import { verifyPassword, createSession, onlyPost } from '../../lib/auth.js'
import { parseJsonBody, sendJson, sendError, getClientIp, handleApiError } from '../../lib/errors.js'
import { checkLoginRateLimit, recordFailedLogin, clearLoginAttempts } from '../../lib/rateLimit.js'

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return

  try {
    const ip = getClientIp(req)
    const rateCheck = checkLoginRateLimit(ip)

    if (!rateCheck.allowed) {
      res.setHeader('Retry-After', String(rateCheck.retryAfter))
      return sendError(res, 429, 'Too many login attempts. Please try again later.')
    }

    const body = await parseJsonBody(req)
    const password = body?.password

    if (!password || typeof password !== 'string') {
      return sendError(res, 400, 'Invalid password.')
    }

    const valid = verifyPassword(password)
    if (!valid) {
      recordFailedLogin(ip)
      return sendError(res, 401, 'Invalid password.')
    }

    clearLoginAttempts(ip)
    createSession(res)
    sendJson(res, 200, { success: true })
  } catch (error) {
    handleApiError(res, error, 'Unable to sign in.')
  }
}
