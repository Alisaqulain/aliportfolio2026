import type { Metadata } from 'next'
import { EnvCheckPanel } from '@/components/check/env-check-panel'

export const metadata: Metadata = {
  title: 'Environment Check',
  robots: { index: false, follow: false },
}

export default function CheckPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">MCA Setup</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Environment Check</h1>
        <p className="mt-3 text-muted">
          Verify MCA dashboard password, Google Drive credentials, and API health.
        </p>
      </div>
      <EnvCheckPanel />
    </main>
  )
}
