'use client'

import { ScrollProgress } from '@/components/3d/scroll-progress'

/** Global shell — only cheap, always-on effects */
export function SceneProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(52,211,153,0.035)_0%,transparent_60%)]"
        aria-hidden
      />
      <ScrollProgress />
      <div className="relative z-[2]">{children}</div>
    </>
  )
}
