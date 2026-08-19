import crypto from 'crypto'
import { google } from 'googleapis'

export const DRIVE_SCOPES = ['https://www.googleapis.com/auth/drive']

const STATE_COOKIE = 'mca_google_oauth_state'
const STATE_MAX_AGE = 600 // 10 minutes

export function isOAuthSetupAllowed() {
  if (process.env.MCA_OAUTH_SETUP_ENABLED === 'true') return true
  if (process.env.VERCEL_ENV === 'production') return false
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL === '1') return false
  return true
}

export function getGoogleClientCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim()
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()

  if (!clientId || !clientSecret) {
    throw Object.assign(new Error('Google client credentials are not configured.'), {
      code: 'MISSING_CLIENT_CREDENTIALS',
      status: 503,
    })
  }

  return { clientId, clientSecret }
}

export function getRedirectUri(req) {
  if (process.env.GOOGLE_OAUTH_REDIRECT_URI?.trim()) {
    return process.env.GOOGLE_OAUTH_REDIRECT_URI.trim()
  }

  // Local dev: always use the API port so redirect URI matches Google Cloud config
  if (!process.env.VERCEL && !process.env.VERCEL_ENV) {
    return 'http://localhost:3001/api/mca/google/callback'
  }

  const host = req.headers.host || 'localhost'
  const protocol = host.startsWith('localhost') ? 'http' : 'https'
  return `${protocol}://${host}/api/mca/google/callback`
}

export function createOAuth2Client(req) {
  const { clientId, clientSecret } = getGoogleClientCredentials()
  return new google.auth.OAuth2(clientId, clientSecret, getRedirectUri(req))
}

export function createStateToken() {
  return crypto.randomBytes(32).toString('hex')
}

export function setOAuthStateCookie(res, state) {
  const parts = [
    `${STATE_COOKIE}=${encodeURIComponent(state)}`,
    'Path=/api/mca/google',
    'HttpOnly',
    `Max-Age=${STATE_MAX_AGE}`,
    'SameSite=Lax',
  ]
  res.setHeader('Set-Cookie', parts.join('; '))
}

export function getOAuthStateFromCookie(req) {
  const cookieHeader = req.headers.cookie || ''
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${STATE_COOKIE}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function clearOAuthStateCookie(res) {
  res.setHeader('Set-Cookie', `${STATE_COOKIE}=; Path=/api/mca/google; HttpOnly; Max-Age=0; SameSite=Lax`)
}

export function classifyGoogleError(error) {
  const oauthError = error?.response?.data?.error
  const status = error?.response?.status
  const reason = error?.response?.data?.error_description || error?.message

  if (oauthError === 'invalid_grant') {
    return {
      status: 503,
      code: 'INVALID_REFRESH_TOKEN',
      message:
        'Google refresh token is invalid or revoked. Run the OAuth setup flow again and update GOOGLE_REFRESH_TOKEN in .env.local.',
    }
  }

  if (oauthError === 'invalid_client' || oauthError === 'unauthorized_client') {
    return {
      status: 503,
      code: 'INVALID_CLIENT_CREDENTIALS',
      message:
        'Google client ID or client secret is invalid. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local.',
    }
  }

  if (oauthError === 'access_denied') {
    return {
      status: 403,
      code: 'INSUFFICIENT_PERMISSIONS',
      message: 'Google Drive access was denied. Authorize the full Drive scope when prompted.',
    }
  }

  if (status === 404 || error?.code === 404) {
    return {
      status: 404,
      code: 'INVALID_FOLDER_ID',
      message: 'Google Drive folder ID was not found. Check GOOGLE_DRIVE_FOLDER_ID in .env.local.',
    }
  }

  if (status === 403 && error?.code === 'ACCESS_DENIED') {
    return {
      status: 403,
      code: 'INSUFFICIENT_PERMISSIONS',
      message: 'Insufficient Google Drive permissions for the configured folder.',
    }
  }

  return {
    status: error?.status || 500,
    code: error?.code || 'GOOGLE_API_ERROR',
    message: reason || 'Unable to connect to Google Drive.',
  }
}

export function mapCredentialError(code) {
  switch (code) {
    case 'MISSING_REFRESH_TOKEN':
      return 'Google refresh token is missing. Open the OAuth setup URL to generate GOOGLE_REFRESH_TOKEN.'
    case 'MISSING_CLIENT_CREDENTIALS':
      return 'Google client ID or client secret is missing. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local.'
    case 'INVALID_REFRESH_TOKEN':
      return 'Google refresh token is invalid or revoked. Run the OAuth setup flow again.'
    case 'INVALID_CLIENT_CREDENTIALS':
      return 'Google client ID or client secret is invalid.'
    case 'INSUFFICIENT_PERMISSIONS':
      return 'Insufficient Google Drive permissions for this dashboard.'
    case 'INVALID_FOLDER_ID':
      return 'Google Drive folder ID is invalid or inaccessible.'
    default:
      return null
  }
}

export async function testDriveConnection(oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client })
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim()

  const about = await drive.about.get({ fields: 'user(displayName,emailAddress)' })

  let folderName = null
  if (folderId) {
    const rawId = folderId.match(/\/folders\/([a-zA-Z0-9_-]+)/)?.[1] || folderId
    const { data } = await drive.files.get({
      fileId: rawId,
      fields: 'id,name,mimeType,trashed',
      supportsAllDrives: true,
    })

    if (data.trashed) {
      throw Object.assign(new Error('Configured Drive folder is in trash.'), {
        code: 'INVALID_FOLDER_ID',
        status: 404,
      })
    }

    if (data.mimeType !== 'application/vnd.google-apps.folder') {
      throw Object.assign(new Error('Configured Drive ID is not a folder.'), {
        code: 'INVALID_FOLDER_ID',
        status: 404,
      })
    }

    folderName = data.name
  }

  return {
    user: about.data.user,
    folder: folderId
      ? {
          id: folderId.match(/\/folders\/([a-zA-Z0-9_-]+)/)?.[1] || folderId,
          name: folderName,
        }
      : null,
  }
}

export function renderSetupResultHtml({ success, title, message, refreshToken, testResult, redirectUri }) {
  const tokenBlock = refreshToken
    ? `
      <label for="refresh-token">Copy this into .env.local as GOOGLE_REFRESH_TOKEN</label>
      <div class="token-row">
        <input id="refresh-token" type="text" readonly value="${escapeHtml(refreshToken)}" />
        <button type="button" onclick="copyToken()">Copy</button>
      </div>
      <p class="warn">This refresh token is shown once here. It is not stored by the app and is not exposed to the dashboard UI.</p>
    `
    : ''

  const testBlock = testResult
    ? `
      <div class="test ${success ? 'ok' : 'fail'}">
        <strong>Drive connection test</strong>
        <p>Signed in as: ${escapeHtml(testResult.user?.emailAddress || 'Unknown')}</p>
        ${
          testResult.folder
            ? `<p>Folder access OK: ${escapeHtml(testResult.folder.name)} (${escapeHtml(testResult.folder.id)})</p>`
            : '<p>Folder ID not configured yet — set GOOGLE_DRIVE_FOLDER_ID after adding the refresh token.</p>'
        }
      </div>
    `
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MCA Google OAuth Setup</title>
  <style>
    body { font-family: Inter, system-ui, sans-serif; background: #0a0a0f; color: #fff; margin: 0; padding: 2rem; }
    .card { max-width: 760px; margin: 0 auto; background: #151520; border: 1px solid rgba(255,255,255,.1); border-radius: 16px; padding: 1.5rem; }
    h1 { margin-top: 0; font-size: 1.5rem; }
    .ok { color: #10b981; }
    .fail { color: #ef4444; }
    .token-row { display: flex; gap: .75rem; margin: .75rem 0 1rem; }
    input { flex: 1; padding: .75rem; border-radius: 10px; border: 1px solid rgba(255,255,255,.15); background: #0a0a0f; color: #fff; }
    button { padding: .75rem 1rem; border: 0; border-radius: 10px; background: linear-gradient(135deg, #00d4ff, #7b2cbf); color: #fff; cursor: pointer; }
    .steps, .test, .meta { background: rgba(255,255,255,.04); border-radius: 12px; padding: 1rem; margin-top: 1rem; }
    .warn { color: #fbbf24; font-size: .9rem; }
    code { background: rgba(255,255,255,.08); padding: .1rem .35rem; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="card">
    <h1 class="${success ? 'ok' : 'fail'}">${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    ${tokenBlock}
    ${testBlock}
    <div class="steps">
      <strong>Next steps</strong>
      <ol>
        <li>Paste the refresh token into <code>.env.local</code></li>
        <li>Restart the API server: <code>npm run dev:api</code></li>
        <li>Reload <code>/mca-amu</code> and sign in</li>
      </ol>
    </div>
    <div class="meta">
      <p>Redirect URI used: <code>${escapeHtml(redirectUri)}</code></p>
      <p>This setup route is development-only.</p>
    </div>
  </div>
  <script>
    function copyToken() {
      const input = document.getElementById('refresh-token');
      input.select();
      input.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(input.value);
    }
  </script>
</body>
</html>`
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
