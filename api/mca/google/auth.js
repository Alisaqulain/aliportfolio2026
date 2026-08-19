import { onlyGet } from '../../lib/auth.js'
import { sendError } from '../../lib/errors.js'
import {
  isOAuthSetupAllowed,
  createOAuth2Client,
  createStateToken,
  setOAuthStateCookie,
  getRedirectUri,
  DRIVE_SCOPES,
} from '../../lib/googleOAuth.js'

export default async function handler(req, res) {
  if (!onlyGet(req, res)) return

  if (!isOAuthSetupAllowed()) {
    return sendError(res, 403, 'Google OAuth setup is disabled in production.')
  }

  try {
    const oauth2Client = createOAuth2Client(req)
    const state = createStateToken()
    const redirectUri = getRedirectUri(req)

    setOAuthStateCookie(res, state)

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: DRIVE_SCOPES,
      state,
      redirect_uri: redirectUri,
    })

    res.statusCode = 302
    res.setHeader('Location', authUrl)
    res.end()
  } catch (error) {
    if (error.code === 'MISSING_CLIENT_CREDENTIALS') {
      return sendError(res, 503, 'Google client ID or client secret is missing.')
    }
    sendError(res, 500, 'Unable to start Google OAuth flow.')
  }
}
