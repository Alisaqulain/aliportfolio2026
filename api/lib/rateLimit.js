const loginAttempts = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

function cleanup() {
  const now = Date.now()
  for (const [key, entry] of loginAttempts.entries()) {
    if (now - entry.firstAttempt > WINDOW_MS) {
      loginAttempts.delete(key)
    }
  }
}

export function checkLoginRateLimit(ip) {
  cleanup()
  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (!entry) {
    return { allowed: true, retryAfter: 0 }
  }

  if (now - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(ip)
    return { allowed: true, retryAfter: 0 }
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.firstAttempt)) / 1000)
    return { allowed: false, retryAfter }
  }

  return { allowed: true, retryAfter: 0 }
}

export function recordFailedLogin(ip) {
  cleanup()
  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now })
    return
  }

  entry.count += 1
  loginAttempts.set(ip, entry)
}

export function clearLoginAttempts(ip) {
  loginAttempts.delete(ip)
}
