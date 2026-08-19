export function sendError(res, status, message) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ error: message }))
}

export function sendJson(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}

export function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1e6) {
        reject(new Error('Payload too large'))
        req.destroy()
      }
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

import { classifyGoogleError, mapCredentialError } from './googleOAuth.js'

export function handleApiError(res, error, fallback = 'Something went wrong.') {
  console.error('[MCA API]', error?.code || error?.response?.data?.error || error?.message || error)

  const credentialMessage = mapCredentialError(error?.code)
  if (credentialMessage) {
    return sendError(res, error?.status || 503, credentialMessage)
  }

  if (error?.response?.data?.error) {
    const classified = classifyGoogleError(error)
    return sendError(res, classified.status, classified.message)
  }

  const message =
    error?.code === 'ACCESS_DENIED'
      ? 'Access denied.'
      : error?.code === 'NOT_FOUND'
        ? 'Resource not found.'
        : error?.code === 'CONFIG_ERROR'
          ? 'Service is not configured.'
          : fallback
  sendError(res, error?.status || 500, message)
}
