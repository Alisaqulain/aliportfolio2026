import { cn } from '@/lib/utils'
import { getProjectVisual, type ProjectVisual } from '@/lib/visuals'

type Kind = 'chat' | 'video' | 'chart' | 'listing' | 'flow' | 'code' | 'app'

const KIND: Record<string, Kind> = {
  'batchx-amu': 'app',
  'flowforge-ai': 'flow',
  devforge: 'code',
  'ali-gpt': 'chat',
  chatapp: 'chat',
  'apna-video-call': 'video',
  'zerodha-clone': 'chart',
  'ali-irctic': 'listing',
  'airbnb-clone': 'listing',
}

type ProjectPreviewProps = {
  title: string
  slug?: string
  visual?: ProjectVisual
  className?: string
  featured?: boolean
  flip?: boolean
}

function Screen({ kind, accent }: { kind: Kind; accent: string }) {
  if (kind === 'flow') {
    const nodes = [
      { x: 8, y: 18, w: 26 },
      { x: 40, y: 8, w: 24 },
      { x: 40, y: 54, w: 24 },
      { x: 72, y: 30, w: 22 },
    ]
    return (
      <div className="relative h-full">
        <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
          {[
            'M34 26 C38 26 36 16 40 16',
            'M34 26 C38 26 36 62 40 62',
            'M64 16 C68 16 68 38 72 38',
            'M64 62 C68 62 68 38 72 38',
          ].map((d) => (
            <path key={d} d={d} fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="0.8" strokeDasharray="2 1.5" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <div
            key={i}
            className="absolute flex h-[22%] items-center gap-1 rounded-md border px-1.5"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: `${n.w}%`,
              borderColor: i === 3 ? accent : 'rgba(255,255,255,0.12)',
              background: i === 3 ? `${accent}30` : 'rgba(255,255,255,0.05)',
            }}
          >
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: i === 0 ? '#22d3ee' : accent }} />
            <span className="h-1 flex-1 rounded bg-white/20" />
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'code') {
    const lines = [
      [12, 30],
      [20, 46, 18],
      [20, 24],
      [28, 40, 14],
      [28, 34],
      [20, 10],
      [12, 52],
    ]
    return (
      <div className="flex h-full">
        <div className="w-[18%] space-y-1.5 border-r border-white/[0.06] p-2">
          {[60, 80, 50, 70, 40].map((w, i) => (
            <div key={i} className="h-1.5 rounded bg-white/10" style={{ width: `${w}%`, ...(i === 1 ? { background: `${accent}88` } : {}) }} />
          ))}
        </div>
        <div className="flex-1 space-y-2 p-3">
          {lines.map((segs, i) => (
            <div key={i} className="flex gap-1.5" style={{ paddingLeft: `${segs[0] - 12}%` }}>
              {segs.slice(1).map((w, j) => (
                <div key={j} className="h-1.5 rounded" style={{ width: `${w}%`, background: j === 0 && i % 2 ? `${accent}aa` : 'rgba(255,255,255,0.14)' }} />
              ))}
            </div>
          ))}
          <div className="ml-auto mt-3 w-3/5 rounded-md border p-1.5" style={{ borderColor: `${accent}66`, background: `${accent}14` }}>
            <div className="h-1.5 w-4/5 rounded bg-white/20" />
            <div className="mt-1 h-1.5 w-3/5 rounded bg-white/15" />
          </div>
        </div>
      </div>
    )
  }
  if (kind === 'app') {
    return (
      <div className="flex h-full items-end justify-center gap-3 pt-3">
        {[0, 1].map((p) => (
          <div key={p} className="flex h-[92%] w-[30%] flex-col gap-1.5 rounded-t-xl border border-b-0 border-white/10 bg-white/[0.03] p-2">
            <div className="h-6 rounded-md" style={{ background: `${accent}55` }} />
            {[0, 1, 2].map((r) => (
              <div key={r} className="flex items-center gap-1.5 rounded-md bg-white/[0.06] p-1.5">
                <div className="h-3 w-3 rounded-full" style={{ background: r === p ? accent : 'rgba(255,255,255,0.2)' }} />
                <div className="h-1 flex-1 rounded bg-white/20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'chat') {
    return (
      <div className="flex h-full flex-col justify-end gap-2 p-4">
        <div className="h-5 w-2/3 rounded-xl rounded-bl-sm bg-white/[0.08]" />
        <div className="ml-auto h-5 w-1/2 rounded-xl rounded-br-sm" style={{ background: `${accent}55` }} />
        <div className="h-8 w-3/4 rounded-xl rounded-bl-sm bg-white/[0.08]" />
        <div className="ml-auto h-5 w-2/5 rounded-xl rounded-br-sm" style={{ background: `${accent}55` }} />
        <div className="mt-1 flex h-7 items-center rounded-full border border-white/10 px-3">
          <div className="h-1.5 w-1/3 rounded bg-white/15" />
          <div className="ml-auto h-4 w-4 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    )
  }
  if (kind === 'video') {
    return (
      <div className="grid h-full grid-cols-2 gap-2 p-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative rounded-lg bg-white/[0.06]" style={i === 0 ? { background: `${accent}33`, boxShadow: `inset 0 0 0 1px ${accent}88` } : undefined}>
            <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15" />
            <div className="absolute bottom-1.5 left-1.5 h-1.5 w-8 rounded bg-white/20" />
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'chart') {
    return (
      <div className="flex h-full flex-col p-4">
        <div className="flex gap-2">
          <div className="h-2 w-12 rounded bg-white/20" />
          <div className="h-2 w-8 rounded" style={{ background: accent }} />
        </div>
        <svg viewBox="0 0 200 80" className="mt-auto h-3/4 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 62 L20 55 L40 58 L60 40 L80 46 L100 30 L120 36 L140 18 L160 26 L180 10 L200 14 L200 80 L0 80 Z" fill="url(#chart-fill)" />
          <path d="M0 62 L20 55 L40 58 L60 40 L80 46 L100 30 L120 36 L140 18 L160 26 L180 10 L200 14" fill="none" stroke={accent} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    )
  }
  return (
    <div className="grid h-full grid-cols-3 gap-2 p-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex-1 rounded-md bg-white/[0.07]" style={i === 1 ? { background: `${accent}40` } : undefined} />
          <div className="h-1.5 w-3/4 rounded bg-white/15" />
        </div>
      ))}
    </div>
  )
}

/** Browser-window mockup tilted in 3D; straightens when its `.group` parent is hovered */
export function ProjectPreview({ title, slug, visual, className, featured, flip }: ProjectPreviewProps) {
  const key = slug ?? title.toLowerCase().replace(/\s+/g, '-')
  const data = visual ?? getProjectVisual(key, title)
  const kind = KIND[key] ?? 'listing'
  const Icon = data.icon

  return (
    <div
      className={cn('relative overflow-hidden', featured ? 'h-56 sm:h-64' : 'h-48 sm:h-56', className)}
      role="img"
      aria-label={`${title} preview`}
    >
      <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 70% 0%, ${data.accent}40 0%, transparent 60%)` }} />
      <div className="grid-bg mask-radial absolute inset-0 opacity-70" />

      <div className={cn('mockup absolute inset-x-[10%] bottom-[-8%] top-[14%]', flip && 'mockup-alt')}>
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0b14] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex h-4 flex-1 items-center gap-1.5 rounded-md bg-white/[0.05] px-2">
              <Icon size={9} style={{ color: data.accent }} />
              <span className="truncate font-mono text-[8px] text-muted">{key}.app</span>
            </div>
          </div>
          <div className="flex-1">
            <Screen kind={kind} accent={data.accent} />
          </div>
        </div>
      </div>
    </div>
  )
}
