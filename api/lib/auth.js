import crypto from 'crypto'
import { getSessionToken, setSessionCookie, clearSessionCookie } from './cookies.js'

const SESSION_MAX_AGE = 24 * 60 * 60 // 24 hours

function getSessionSecret() {
  const secret = process.env.MCA_SESSION_SECRET || process.env.MCA_DASHBOARD_PASSWORD
  if (!secret) {
    throw Object.assign(new Error('Missing session configuration.'), {
      code: 'CONFIG_ERROR',
      status: 503,
    })
  }
  return secret
}

function getDashboardPassword() {
  const password = process.env.MCA_DASHBOARD_PASSWORD
  if (!password) {
    throw Object.assign(new Error('Missing dashboard password configuration.'), {
      code: 'CONFIG_ERROR',
      status: 503,
    })
  }
  return password
}

export function verifyPassword(inputPassword) {
  const expected = getDashboardPassword()
  const inputBuffer = Buffer.from(String(inputPassword))
  const expectedBuffer = Buffer.from(expected)

  if (inputBuffer.length !== expectedBuffer.length) {
    crypto.timingSafeEqual(expectedBuffer, expectedBuffer)
    return false
  }

  return crypto.timingSafeEqual(inputBuffer, expectedBuffer)
}

function signPayload(payload) {
  const secret = getSessionSecret()
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  return `${data}.${signature}`
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null

  const [data, signature] = token.split('.')
  if (!data || !signature) return null

  const secret = getSessionSecret()
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url')

  const sigBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)

  if (sigBuffer.length !== expectedBuffer.length) return null
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'))
    if (!payload?.exp || Date.now() > payload.exp) return null
    if (payload.sub !== 'mca-dashboard') return null
    return payload
  } catch {
    return null
  }
}

export function createSession(res) {
  const exp = Date.now() + SESSION_MAX_AGE * 1000
  const token = signPayload({ sub: 'mca-dashboard', exp })
  setSessionCookie(res, token, SESSION_MAX_AGE)
  return token
}

export function destroySession(res) {
  clearSessionCookie(res)
}

export function getSession(req) {
  const token = getSessionToken(req)
  if (!token) return null
  return verifyToken(token)
}

export function requireAuth(req, res) {
  const session = getSession(req)
  if (!session) {
    res.statusCode = 401
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Unauthorized.' }))
    return null
  }
  return session
}

export function onlyPost(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed.' }))
    return false
  }
  return true
}

export function onlyGet(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed.' }))
    return false
  }
  return true
}

export function onlyDelete(req, res) {
  if (req.method !== 'DELETE') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed.' }))
    return false
  }
  return true
}

export function onlyPatch(req, res) {
  if (req.method !== 'PATCH') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed.' }))
    return false
  }
  return true
}
