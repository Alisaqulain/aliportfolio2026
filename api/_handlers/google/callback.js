import { onlyGet } from '../../lib/auth.js'
import {
  isOAuthSetupAllowed,
  createOAuth2Client,
  getOAuthStateFromCookie,
  clearOAuthStateCookie,
  getRedirectUri,
  testDriveConnection,
  classifyGoogleError,
  renderSetupResultHtml,
} from '../../lib/googleOAuth.js'

function sendHtml(res, status, html) {
  res.statusCode = status
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(html)
}

export default async function handler(req, res) {
  if (!onlyGet(req, res)) return

  const redirectUri = getRedirectUri(req)

  if (!isOAuthSetupAllowed()) {
    return sendHtml(
      res,
      403,
      renderSetupResultHtml({
        success: false,
        title: 'Setup disabled',
        message: 'Google OAuth setup is disabled in production.',
        redirectUri,
      })
    )
  }

  const url = new URL(req.url, `http://${req.headers.host}`)
  const errorParam = url.searchParams.get('error')
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const savedState = getOAuthStateFromCookie(req)

  clearOAuthStateCookie(res)

  if (errorParam) {
    return sendHtml(
      res,
      400,
      renderSetupResultHtml({
        success: false,
        title: 'Authorization cancelled',
        message: 'Google authorization was not completed.',
        redirectUri,
      })
    )
  }

  if (!code || !state || !savedState || state !== savedState) {
    return sendHtml(
      res,
      400,
      renderSetupResultHtml({
        success: false,
        title: 'Invalid OAuth callback',
        message: 'The authorization callback was invalid or expired. Start again from /api/mca/google/auth.',
        redirectUri,
      })
    )
  }

  try {
    const oauth2Client = createOAuth2Client(req)
    const { tokens } = await oauth2Client.getToken({ code, redirect_uri: redirectUri })
    oauth2Client.setCredentials(tokens)

    if (!tokens.refresh_token) {
      return sendHtml(
        res,
        400,
        renderSetupResultHtml({
          success: false,
          title: 'No refresh token returned',
          message:
            'Google did not return a refresh token. Revoke prior access at https://myaccount.google.com/permissions, then run setup again.',
          redirectUri,
        })
      )
    }

    let testResult = null
    try {
      testResult = await testDriveConnection(oauth2Client)
    } catch (testError) {
      const classified = classifyGoogleError(testError)
      return sendHtml(
        res,
        200,
        renderSetupResultHtml({
          success: true,
          title: 'Refresh token generated, but Drive test failed',
          message: `${classified.message} You can still copy the refresh token below, fix the folder ID if needed, and restart the API server.`,
          refreshToken: tokens.refresh_token,
          redirectUri,
        })
      )
    }

    return sendHtml(
      res,
      200,
      renderSetupResultHtml({
        success: true,
        title: 'Google Drive connected successfully',
        message: 'Copy the refresh token below into .env.local, restart the API server, then reload /mca-amu.',
        refreshToken: tokens.refresh_token,
        testResult,
        redirectUri,
      })
    )
  } catch (error) {
    const classified = classifyGoogleError(error)
    return sendHtml(
      res,
      classified.status,
      renderSetupResultHtml({
        success: false,
        title: 'OAuth setup failed',
        message: classified.message,
        redirectUri,
      })
    )
  }
}
