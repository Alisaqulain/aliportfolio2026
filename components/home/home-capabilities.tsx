import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { capabilities } from '@/data/skills'
import { CAPABILITY_ICONS } from '@/lib/visuals'
import { cn } from '@/lib/utils'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

/** Isometric stack of layers that spreads apart on hover */
function LayerStack() {
  const layers = [
    { z: 0, label: 'Database', tint: 'rgba(34,211,238,0.18)', border: 'rgba(34,211,238,0.5)' },
    { z: 28, label: 'API', tint: 'rgba(99,102,241,0.2)', border: 'rgba(129,140,248,0.55)' },
    { z: 56, label: 'Interface', tint: 'rgba(139,92,246,0.25)', border: 'rgba(167,139,250,0.65)' },
  ]
  return (
    <div className="perspective relative mx-auto h-48 w-48 sm:h-56 sm:w-56" aria-hidden>
      <div className="iso-stack absolute inset-6">
        {layers.map((l) => (
          <div
            key={l.label}
            className="iso-layer flex items-end p-3"
            style={{ '--z': `${l.z}px`, background: l.tint, border: `1px solid ${l.border}`, boxShadow: `0 0 40px -10px ${l.border}` } as React.CSSProperties}
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 3-col bento: hero tile 2x2 + five singles fills a clean 3x3; on 2-col the last tile spans to close the gap
const SPANS = ['sm:col-span-2 lg:row-span-2', '', '', '', '', 'sm:col-span-2 lg:col-span-1']

export function HomeCapabilities() {
  return (
    <Section id="capabilities">
      <SectionHeader
        label="What I do"
        title={
          <>
            End-to-end engineering, <span className="text-gradient">shipped to production.</span>
          </>
        }
        description="Web, mobile, AI and infrastructure — one engineer owning the whole lifecycle."
        action={
          <Link href="/skills" className="btn btn-secondary">
            Full tech stack <ArrowUpRight size={15} />
          </Link>
        }
      />

      <div className="mt-14 grid auto-rows-[minmax(200px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, i) => {
          const Icon = CAPABILITY_ICONS[item.title] ?? CAPABILITY_ICONS['Full-Stack Products']
          const hero = i === 0
          return (
            <Reveal key={item.title} delay={i * 0.06} className={cn('h-full', SPANS[i])}>
              <TiltCard maxRotate={hero ? 3 : 6} className="h-full">
                <GlassCard glow={hero} className={cn('flex h-full flex-col p-6 sm:p-7', hero && 'justify-between')}>
                  {hero && <LayerStack />}
                  <div className={cn(!hero && 'flex h-full flex-col')}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-cyan-400/10 text-violet-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_30px_-10px_rgba(139,92,246,0.6)]">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <h3 className={cn('mt-5 font-semibold tracking-tight', hero ? 'text-2xl sm:text-3xl' : 'text-lg')}>{item.title}</h3>
                    <p className={cn('mt-2 leading-relaxed text-muted', hero ? 'max-w-md text-base' : 'text-sm')}>{item.description}</p>
                    {!hero && (
                      <span className="mt-auto pt-5 font-mono text-[11px] text-muted/70">0{i + 1}</span>
                    )}
                  </div>
                </GlassCard>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
