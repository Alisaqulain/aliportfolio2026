const SESSION_COOKIE = 'mca_session'

export function getSessionToken(req) {
  const cookieHeader = req.headers.cookie || ''
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function setSessionCookie(res, token, maxAgeSeconds) {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    `Max-Age=${maxAgeSeconds}`,
    'SameSite=Lax',
  ]
  if (isProduction) {
    parts.push('Secure')
  }
  res.setHeader('Set-Cookie', parts.join('; '))
}

export function clearSessionCookie(res) {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  const parts = [
    `${SESSION_COOKIE}=`,
    'Path=/',
    'HttpOnly',
    'Max-Age=0',
    'SameSite=Lax',
  ]
  if (isProduction) {
    parts.push('Secure')
  }
  res.setHeader('Set-Cookie', parts.join('; '))
}
