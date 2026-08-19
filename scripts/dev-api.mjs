import http from 'http'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return
  const content = readFileSync(filePath, 'utf8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvFile(join(root, '.env.local'))
loadEnvFile(join(root, '.env'))

const routes = {
  'POST /api/mca/auth/login': '../api/_handlers/auth/login.js',
  'POST /api/mca/auth/logout': '../api/_handlers/auth/logout.js',
  'GET /api/mca/auth/session': '../api/_handlers/auth/session.js',
  'GET /api/mca/drive/files': '../api/_handlers/drive/files.js',
  'GET /api/mca/drive/search': '../api/_handlers/drive/search.js',
  'POST /api/mca/drive/folder': '../api/_handlers/drive/folder.js',
  'PATCH /api/mca/drive/rename': '../api/_handlers/drive/rename.js',
  'DELETE /api/mca/drive/delete': '../api/_handlers/drive/delete.js',
  'POST /api/mca/drive/upload': '../api/_handlers/drive/upload.js',
  'GET /api/mca/drive/download': '../api/_handlers/drive/download.js',
  'GET /api/mca/google/auth': '../api/_handlers/google/auth.js',
  'GET /api/mca/google/callback': '../api/_handlers/google/callback.js',
  'GET /api/mca/check': '../api/_handlers/check.js',
}

const handlerCache = new Map()

async function getHandler(relativePath) {
  if (!handlerCache.has(relativePath)) {
    const modulePath = pathToFileURL(join(__dirname, relativePath)).href
    handlerCache.set(relativePath, import(modulePath))
  }
  return (await handlerCache.get(relativePath)).default
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  const routeKey = `${req.method} ${req.url.split('?')[0]}`
  const relativePath = routes[routeKey]

  if (!relativePath) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Not found.' }))
    return
  }

  try {
    const handler = await getHandler(relativePath)
    await handler(req, res)
  } catch (error) {
    console.error('[dev-api]', error)
    if (!res.headersSent) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Internal server error.' }))
    }
  }
})

const PORT = 3001
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`MCA API already running on http://localhost:${PORT} — using existing server.`)
    process.exit(0)
  }
  console.error('Failed to start MCA API server:', error)
  process.exit(1)
})

server.listen(PORT, () => {
  console.log(`MCA API dev server running at http://localhost:${PORT}`)
  console.log('Loaded env from .env.local (if present)')
  if (!process.env.MCA_DASHBOARD_PASSWORD) {
    console.warn('WARNING: MCA_DASHBOARD_PASSWORD is not set')
  }
  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    console.warn('WARNING: GOOGLE_REFRESH_TOKEN is missing')
    console.warn('Open http://localhost:3001/api/mca/google/auth to generate it')
  }
})
