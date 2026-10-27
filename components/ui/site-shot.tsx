'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getDomainFromUrl, getFaviconUrl, getScreenshotUrl } from '@/lib/visuals'

type SiteShotProps = {
  website: string
  name: string
  accent: string
  className?: string
  /** Show the browser chrome bar */
  chrome?: boolean
}

/**
 * Browser-framed live screenshot of a client site. A branded gradient + favicon
 * sits underneath, so the frame still looks intentional while the shot loads or if it fails.
 */
export function SiteShot({ website, name, accent, className, chrome = true }: SiteShotProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0b14]', className)}>
      {chrome && (
        <div className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex h-4 flex-1 items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-2 font-mono text-[9px] text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
            {getDomainFromUrl(website)}
          </div>
        </div>
      )}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `radial-gradient(120% 90% at 50% 0%, ${accent}40 0%, transparent 65%), #0b0b14` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={getFaviconUrl(website, 128)} alt="" className="h-12 w-12 rounded-xl opacity-80" loading="lazy" />
        </div>
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getScreenshotUrl(website)}
            alt={`${name} website screenshot`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease)] group-hover:scale-[1.04]',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        )}
      </div>
    </div>
  )
}
