'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'

type EnvItem = {
  key: string
  set: boolean
  status: 'ok' | 'missing' | 'placeholder'
}

type CheckReport = {
  ok: boolean
  status: 'ok' | 'warning' | 'error'
  environment: string
  vercelEnv: string | null
  timestamp: string
  env: EnvItem[]
  auth: {
    passwordConfigured: boolean
    sessionSecretConfigured: boolean
    mcaRoute: string
    loginEndpoint: string
  }
  config: {
    redirectUri: string
    folderId: string | null
    oauthSetupUrl: string
    checkUrl: string
    dashboardUrl: string
  }
  drive: {
    status: string
    message: string | null
    user: { email: string | null; name: string | null } | null
    folder: { id: string; name: string } | null
  }
  issues: string[]
  warnings: string[]
}

const STATUS_STYLES = {
  ok: 'bg-emerald-500/15 text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-400',
  error: 'bg-red-500/15 text-red-400',
}

function StatusBadge({ status }: { status: CheckReport['status'] }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  )
}

function BoolStatus({ value }: { value: boolean }) {
  return (
    <span className={value ? 'text-emerald-400' : 'text-red-400'}>
      {value ? 'yes' : 'no'}
    </span>
  )
}

export function EnvCheckPanel() {
  const [report, setReport] = useState<CheckReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const runCheck = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const secret = new URLSearchParams(window.location.search).get('secret')
      const url = secret ? `/api/mca/check?secret=${encodeURIComponent(secret)}` : '/api/mca/check'
      const res = await fetch(url, { cache: 'no-store' })

      if (res.status === 403) {
        setError(
          'Check is disabled in production. Set MCA_ENV_CHECK_ENABLED=true in Vercel, or open with ?secret=YOUR_MCA_ENV_CHECK_SECRET.'
        )
        setReport(null)
        return
      }

      const data = (await res.json()) as CheckReport
      setReport(data)
    } catch {
      setError('Could not reach /api/mca/check. Run npm run dev:all locally, or verify Vercel env vars.')
      setReport(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    runCheck()
  }, [runCheck])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          API: <code className="rounded bg-white/5 px-1.5 py-0.5">/api/mca/check</code>
        </p>
        <button
          type="button"
          onClick={runCheck}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading && !report && !error && (
        <div className="rounded-2xl border border-white/10 bg-surface-elevated p-6 text-muted">
          Running environment check…
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">
          {error}
        </div>
      )}

      {report && (
        <>
          <section className="rounded-2xl border border-white/10 bg-surface-elevated p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-medium">Overall</h2>
              <StatusBadge status={report.status} />
            </div>
            <p className="mt-2 text-sm text-muted">
              Checked at {new Date(report.timestamp).toLocaleString()} · {report.environment}
              {report.vercelEnv ? ` · ${report.vercelEnv}` : ''}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-surface-elevated p-6">
            <h2 className="text-lg font-medium">MCA Dashboard</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                Password configured: <BoolStatus value={report.auth.passwordConfigured} />
              </li>
              <li>
                Session secret configured: <BoolStatus value={report.auth.sessionSecretConfigured} />
              </li>
              <li>
                Route:{' '}
                <Link href={report.auth.mcaRoute} className="text-sky-400 hover:underline">
                  {report.auth.mcaRoute}
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted">
              Set <code className="rounded bg-white/5 px-1">MCA_DASHBOARD_PASSWORD</code> in{' '}
              <code className="rounded bg-white/5 px-1">.env.local</code> and Vercel — the password is never shown here.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-surface-elevated p-6">
            <h2 className="text-lg font-medium">Environment variables</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-muted">
                    <th className="pb-2 pr-4 font-medium">Variable</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.env.map((item) => (
                    <tr key={item.key} className="border-b border-white/5">
                      <td className="py-2 pr-4">
                        <code>{item.key}</code>
                      </td>
                      <td
                        className={
                          item.status === 'ok'
                            ? 'py-2 capitalize text-emerald-400'
                            : 'py-2 capitalize text-red-400'
                        }
                      >
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-surface-elevated p-6">
            <h2 className="text-lg font-medium">Google Drive</h2>
            <p className="mt-2 text-sm">
              Status:{' '}
              <span className={report.drive.status === 'ok' ? 'text-emerald-400' : 'text-red-400'}>
                {report.drive.status}
              </span>
            </p>
            {report.drive.message && <p className="mt-2 text-sm text-muted">{report.drive.message}</p>}
            {report.drive.user?.email && (
              <p className="mt-2 text-sm text-muted">Signed in as: {report.drive.user.email}</p>
            )}
            {report.drive.folder && (
              <p className="mt-2 text-sm text-muted">
                Folder: {report.drive.folder.name} ({report.drive.folder.id})
              </p>
            )}
          </section>

          {(report.issues.length > 0 || report.warnings.length > 0) && (
            <section className="rounded-2xl border border-white/10 bg-surface-elevated p-6">
              <h2 className="text-lg font-medium">Issues</h2>
              {report.issues.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-red-300">
                  {report.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              )}
              {report.warnings.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-300">
                  {report.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section className="rounded-2xl border border-white/10 bg-surface-elevated p-6">
            <h2 className="text-lg font-medium">Next steps</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
              <li>
                Open{' '}
                <Link href={report.config.dashboardUrl} className="text-sky-400 hover:underline">
                  {report.auth.mcaRoute}
                </Link>{' '}
                and sign in with your dashboard password
              </li>
              <li>
                Complete Google OAuth:{' '}
                <a href={report.config.oauthSetupUrl} className="text-sky-400 hover:underline">
                  OAuth setup
                </a>
              </li>
              <li>
                Redirect URI: <code className="rounded bg-white/5 px-1">{report.config.redirectUri}</code>
              </li>
            </ol>
          </section>
        </>
      )}
    </div>
  )
}
