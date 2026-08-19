import { google } from 'googleapis'
import { getRedirectUri, testDriveConnection, classifyGoogleError } from './googleOAuth.js'

const ENV_KEYS = [
  'MCA_DASHBOARD_PASSWORD',
  'MCA_SESSION_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REFRESH_TOKEN',
  'GOOGLE_DRIVE_FOLDER_ID',
  'GOOGLE_OAUTH_REDIRECT_URI',
]

export function isEnvCheckAllowed(req) {
  if (process.env.MCA_ENV_CHECK_ENABLED === 'true') return true

  const secret = process.env.MCA_ENV_CHECK_SECRET?.trim()
  if (secret && req?.url) {
    const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`)
    if (url.searchParams.get('secret') === secret) return true
  }

  if (process.env.VERCEL_ENV === 'production') return false
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL === '1') return false
  return true
}

function envStatus(key) {
  const value = process.env[key]
  const trimmed = value ? String(value).trim() : ''
  const placeholder = isPlaceholderValue(trimmed)
  const set = Boolean(trimmed) && !placeholder
  return {
    key,
    set,
    status: !trimmed ? 'missing' : placeholder ? 'placeholder' : 'ok',
  }
}

function isPlaceholderValue(value) {
  if (!value) return false
  const normalized = value.toLowerCase()
  const placeholders = [
    'your_new_refresh_token',
    'change_me',
    'paste_token_here',
    'your_refresh_token',
    'xxx',
    'todo',
    'replace_me',
  ]
  return placeholders.some((item) => normalized.includes(item))
}

function parseFolderId(raw) {
  if (!raw?.trim()) return null
  const match = raw.trim().match(/\/folders\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : raw.trim()
}

export async function runEnvCheck(req) {
  const env = ENV_KEYS.map(envStatus)
  const issues = []
  const warnings = []

  const requiredForAuth = ['MCA_DASHBOARD_PASSWORD']
  const requiredForGoogle = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN', 'GOOGLE_DRIVE_FOLDER_ID']

  for (const key of requiredForAuth) {
    if (!process.env[key]?.trim()) issues.push(`${key} is not set`)
  }

  for (const key of requiredForGoogle) {
    if (!process.env[key]?.trim()) {
      issues.push(`${key} is not set`)
    } else if (key === 'GOOGLE_REFRESH_TOKEN' && isPlaceholderValue(process.env[key])) {
      issues.push('GOOGLE_REFRESH_TOKEN is still a placeholder — run the OAuth setup flow to get a real token')
    }
  }

  if (!process.env.MCA_SESSION_SECRET?.trim()) {
    warnings.push('MCA_SESSION_SECRET is not set (falls back to dashboard password)')
  }

  const redirectUri = getRedirectUri(req)
  const folderId = parseFolderId(process.env.GOOGLE_DRIVE_FOLDER_ID)
  const host = req?.headers?.host || 'localhost:3001'
  const protocol = host.startsWith('localhost') ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  let drive = {
    status: 'not_tested',
    message: null,
    user: null,
    folder: null,
  }

  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim()
  const hasGoogleCreds =
    process.env.GOOGLE_CLIENT_ID?.trim() &&
    process.env.GOOGLE_CLIENT_SECRET?.trim() &&
    refreshToken &&
    !isPlaceholderValue(refreshToken)

  if (!hasGoogleCreds) {
    drive.status = 'skipped'
    drive.message = refreshToken && isPlaceholderValue(refreshToken)
      ? 'GOOGLE_REFRESH_TOKEN is a placeholder. Open the OAuth setup URL to generate a real token.'
      : 'Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN to test Drive.'
  } else {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID.trim(),
        process.env.GOOGLE_CLIENT_SECRET.trim(),
        redirectUri
      )
      oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN.trim() })

      const testResult = await testDriveConnection(oauth2Client)
      drive.status = 'ok'
      drive.message = 'Google Drive connection successful.'
      drive.user = {
        email: testResult.user?.emailAddress || null,
        name: testResult.user?.displayName || null,
      }
      drive.folder = testResult.folder
    } catch (error) {
      const classified = classifyGoogleError(error)
      drive.status = 'error'
      drive.message = classified.message
      issues.push(classified.message)
    }
  }

  const passwordConfigured = Boolean(process.env.MCA_DASHBOARD_PASSWORD?.trim())
  const sessionSecretConfigured = Boolean(process.env.MCA_SESSION_SECRET?.trim())

  if (!passwordConfigured) {
    issues.push('MCA_DASHBOARD_PASSWORD is not set — /mca login will fail')
  }

  const auth = {
    passwordConfigured,
    sessionSecretConfigured,
    mcaRoute: '/mca',
    loginEndpoint: `${baseUrl}/api/mca/auth/login`,
  }

  const overall =
    issues.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'ok'

  return {
    ok: overall === 'ok',
    status: overall,
    environment: process.env.NODE_ENV || 'development',
    vercelEnv: process.env.VERCEL_ENV || null,
    timestamp: new Date().toISOString(),
    env,
    auth,
    config: {
      redirectUri,
      folderId,
      oauthSetupUrl: `${baseUrl}/api/mca/google/auth`,
      checkUrl: `${baseUrl}/api/mca/check`,
      dashboardUrl: `${baseUrl}/mca`,
    },
    drive,
    issues,
    warnings,
  }
}

export function renderEnvCheckHtml(report) {
  const envRows = report.env
    .map(
      (item) => `
      <tr>
        <td><code>${item.key}</code></td>
        <td class="status-${item.status}">${item.status}</td>
      </tr>`
    )
    .join('')

  const issueList = report.issues.length
    ? `<ul class="issues">${report.issues.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`
    : '<p class="ok">No blocking issues.</p>'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MCA Environment Check</title>
  <style>
    body { font-family: Inter, system-ui, sans-serif; background: #0a0a0f; color: #fff; margin: 0; padding: 2rem; }
    .card { max-width: 860px; margin: 0 auto; background: #151520; border: 1px solid rgba(255,255,255,.1); border-radius: 16px; padding: 1.5rem; }
    h1 { margin-top: 0; }
    .badge { display: inline-block; padding: .35rem .75rem; border-radius: 999px; font-size: .85rem; font-weight: 600; }
    .badge-ok { background: rgba(16,185,129,.15); color: #10b981; }
    .badge-error { background: rgba(239,68,68,.15); color: #ef4444; }
    .badge-warning { background: rgba(251,191,36,.15); color: #fbbf24; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { text-align: left; padding: .65rem .5rem; border-bottom: 1px solid rgba(255,255,255,.08); }
    .status-ok { color: #10b981; text-transform: capitalize; }
    .status-missing, .status-placeholder { color: #ef4444; text-transform: capitalize; }
    .panel { background: rgba(255,255,255,.04); border-radius: 12px; padding: 1rem; margin-top: 1rem; }
    a { color: #00d4ff; }
    code { background: rgba(255,255,255,.08); padding: .1rem .35rem; border-radius: 6px; }
    .issues { color: #fca5a5; }
    .ok { color: #10b981; }
  </style>
</head>
<body>
  <div class="card">
    <h1>MCA Environment Check</h1>
    <span class="badge badge-${report.status}">${report.status.toUpperCase()}</span>
    <p>Checked at ${escapeHtml(report.timestamp)}</p>

    <div class="panel">
      <strong>Environment variables</strong>
      <table>
        <thead><tr><th>Variable</th><th>Status</th></tr></thead>
        <tbody>${envRows}</tbody>
      </table>
    </div>

    <div class="panel">
      <strong>Google Drive</strong>
      <p>Status: <span class="status-${report.drive.status === 'ok' ? 'ok' : 'missing'}">${escapeHtml(report.drive.status)}</span></p>
      <p>${escapeHtml(report.drive.message || 'No message')}</p>
      ${
        report.drive.user
          ? `<p>Signed in as: ${escapeHtml(report.drive.user.email || report.drive.user.name || 'Unknown')}</p>`
          : ''
      }
      ${
        report.drive.folder
          ? `<p>Folder: ${escapeHtml(report.drive.folder.name)} (${escapeHtml(report.drive.folder.id)})</p>`
          : ''
      }
    </div>

    <div class="panel">
      <strong>MCA Dashboard</strong>
      <p>Password configured: <span class="status-${report.auth.passwordConfigured ? 'ok' : 'missing'}">${report.auth.passwordConfigured ? 'yes' : 'no'}</span></p>
      <p>Session secret configured: <span class="status-${report.auth.sessionSecretConfigured ? 'ok' : 'missing'}">${report.auth.sessionSecretConfigured ? 'yes' : 'no'}</span></p>
      <p>Dashboard: <a href="${escapeHtml(report.config.dashboardUrl)}">${escapeHtml(report.auth.mcaRoute)}</a></p>
    </div>

    <div class="panel">
      <strong>Issues</strong>
      ${issueList}
    </div>

    <div class="panel">
      <strong>Next steps</strong>
      <ol>
        <li>Set <code>MCA_DASHBOARD_PASSWORD</code> in <code>.env.local</code> and Vercel</li>
        <li>If refresh token is missing/placeholder, open <a href="${escapeHtml(report.config.oauthSetupUrl)}">OAuth setup</a></li>
        <li>Copy token into <code>.env.local</code> as <code>GOOGLE_REFRESH_TOKEN</code></li>
        <li>Restart dev servers: <code>npm run dev:all</code></li>
        <li>Open dashboard: <a href="${escapeHtml(report.config.dashboardUrl)}">${escapeHtml(report.auth.mcaRoute)}</a></li>
      </ol>
      <p>Redirect URI: <code>${escapeHtml(report.config.redirectUri)}</code></p>
    </div>
  </div>
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
