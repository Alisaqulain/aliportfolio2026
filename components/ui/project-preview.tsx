import { cn } from '@/lib/utils'
import { getProjectVisual, type ProjectVisual } from '@/lib/visuals'

type Kind = 'chat' | 'video' | 'chart' | 'listing'

const KIND: Record<string, Kind> = {
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
