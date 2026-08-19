import login from '../_handlers/auth/login.js'
import logout from '../_handlers/auth/logout.js'
import session from '../_handlers/auth/session.js'
import check from '../_handlers/check.js'
import files from '../_handlers/drive/files.js'
import search from '../_handlers/drive/search.js'
import folder from '../_handlers/drive/folder.js'
import rename from '../_handlers/drive/rename.js'
import deleteItem from '../_handlers/drive/delete.js'
import upload from '../_handlers/drive/upload.js'
import download from '../_handlers/drive/download.js'
import googleAuth from '../_handlers/google/auth.js'
import googleCallback from '../_handlers/google/callback.js'
import { sendError } from '../lib/errors.js'

const routes = {
  'POST auth/login': login,
  'POST auth/logout': logout,
  'GET auth/session': session,
  'GET check': check,
  'GET drive/files': files,
  'GET drive/search': search,
  'POST drive/folder': folder,
  'PATCH drive/rename': rename,
  'DELETE drive/delete': deleteItem,
  'POST drive/upload': upload,
  'GET drive/download': download,
  'GET google/auth': googleAuth,
  'GET google/callback': googleCallback,
}

function resolvePath(req) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  const prefix = '/api/mca/'
  if (!url.pathname.startsWith(prefix)) return ''
  return url.pathname.slice(prefix.length)
}

export default async function handler(req, res) {
  const path = resolvePath(req)
  const routeKey = `${req.method} ${path}`
  const routeHandler = routes[routeKey]

  if (!routeHandler) {
    return sendError(res, 404, 'Not found.')
  }

  return routeHandler(req, res)
}
