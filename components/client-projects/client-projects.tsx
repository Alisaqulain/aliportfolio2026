'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight, Building2, MapPin } from 'lucide-react'
import { CLIENT_INDUSTRIES, clientProjects, type ClientProject } from '@/data/clients'
import { getClientAccent, getDomainFromUrl } from '@/lib/visuals'
import { cn } from '@/lib/utils'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { SiteShot } from '@/components/ui/site-shot'
import { TechIcon } from '@/components/ui/tech-icon'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

function ClientCard({ project, index }: { project: ClientProject; index: number }) {
  const accent = getClientAccent(project.name)
  return (
    <TiltCard maxRotate={3} className="h-full">
      <a href={project.website} target="_blank" rel="noopener noreferrer" className="block h-full">
        <GlassCard className="flex h-full flex-col">
          <div className="relative p-3 pb-0 sm:p-4 sm:pb-0">
            <SiteShot website={project.website} name={project.name} accent={accent} className="aspect-[16/10] rounded-b-none border-b-0" />
            <span className="absolute left-6 top-12 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur sm:left-7 sm:top-14">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-1 flex-col border-t border-white/[0.06] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: accent }}>
                  {project.category}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{project.name}</h3>
              </div>
              <span className="icon-btn h-10 w-10 shrink-0 group-hover:border-violet-400/40 group-hover:text-foreground">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
              <MapPin size={12} /> {project.location}
              {project.devsphere && (
                <>
                  <span className="mx-1 h-1 w-1 rounded-full bg-white/20" />
                  <Building2 size={12} /> DevSphere
                </>
              )}
            </p>
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>

            {project.stats && (
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06]">
                {project.stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse bg-[#0b0b13] px-3 py-2.5">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{s.label}</dt>
                    <dd className="text-lg font-semibold tracking-tight">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="chip">
                  <TechIcon name={tech} size={11} />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </a>
    </TiltCard>
  )
}

export function ClientGrid({ limit, className, filter = 'All' }: { limit?: number; className?: string; filter?: string }) {
  const filtered = filter === 'All' ? clientProjects : clientProjects.filter((c) => c.industry === filter)
  const list = limit ? filtered.slice(0, limit) : filtered

  return (
    <div className={cn('grid gap-5 md:grid-cols-2 xl:grid-cols-3', className)}>
      {list.map((project, i) => (
        <Reveal key={project.name} delay={(i % 3) * 0.06} className="h-full">
          <ClientCard project={project} index={clientProjects.indexOf(project)} />
        </Reveal>
      ))}
    </div>
  )
}

/** Industry filter chips + grid */
export function ClientShowcase({ className }: { className?: string }) {
  const [filter, setFilter] = useState('All')

  return (
    <div className={className}>
      <div className="mask-fade-x -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filter by industry">
        {CLIENT_INDUSTRIES.map((industry) => {
          const count = industry === 'All' ? clientProjects.length : clientProjects.filter((c) => c.industry === industry).length
          const selected = filter === industry
          return (
            <button
              key={industry}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(industry)}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300',
                selected
                  ? 'border-violet-400/50 bg-violet-500/15 text-foreground shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)]'
                  : 'border-white/[0.08] text-muted hover:border-white/20 hover:text-foreground',
              )}
            >
              {industry}
              <span className="font-mono text-[10px] text-muted">{count}</span>
            </button>
          )
        })}
      </div>
      <ClientGrid key={filter} filter={filter} className="mt-8" />
    </div>
  )
}

/** Dense table of every build. On pointer devices a live preview follows the cursor. */
export function ClientIndex({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<ClientProject | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      if (previewRef.current) previewRef.current.style.transform = `translate3d(${clientX + 24}px, ${clientY - 110}px, 0)`
    })
  }

  return (
    <div className={cn('relative', className)} onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      <div className="hidden grid-cols-[3rem_1.4fr_1.2fr_1.6fr_2rem] gap-4 border-b border-white/[0.08] pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:grid">
        <span>No.</span>
        <span>Partner</span>
        <span>Platform</span>
        <span>Built with</span>
        <span />
      </div>
      <ul>
        {clientProjects.map((p, i) => {
          const accent = getClientAccent(p.name)
          return (
            <li key={p.name}>
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={() => setHovered(p)}
                className="group/row relative grid grid-cols-[2.5rem_1fr_1.5rem] items-center gap-x-4 gap-y-1 border-b border-white/[0.06] py-5 transition-colors md:grid-cols-[3rem_1.4fr_1.2fr_1.6fr_2rem]"
              >
                <span
                  className="pointer-events-none absolute inset-y-0 -left-4 -right-4 -z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover/row:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${accent}14, transparent 70%)` }}
                  aria-hidden
                />
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="block truncate text-lg font-medium tracking-tight transition-transform duration-500 [transition-timing-function:var(--ease)] group-hover/row:translate-x-1.5 sm:text-xl">
                    {p.name}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-muted md:hidden">{p.category}</span>
                </span>
                <span className="hidden truncate text-sm text-muted md:block">{p.category}</span>
                <span className="hidden truncate font-mono text-[11px] text-muted/80 md:block">{p.technologies.join(', ')}</span>
                <ArrowUpRight
                  size={18}
                  className="justify-self-end text-muted transition-all duration-300 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-foreground"
                />
              </a>
            </li>
          )
        })}
      </ul>

      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[320px] [@media(hover:hover)]:block"
        aria-hidden
      >
        <div
          className={cn(
            'transition-[opacity,transform] duration-300 [transition-timing-function:var(--ease)]',
            hovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
          )}
        >
          {hovered && (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b14] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
              <SiteShot key={hovered.name} website={hovered.website} name={hovered.name} accent={getClientAccent(hovered.name)} className="aspect-[16/10]" />
              <div className="flex items-center justify-between px-2 pb-1 pt-2.5">
                <span className="text-sm font-medium">{hovered.name}</span>
                <span className="font-mono text-[10px] text-muted">{getDomainFromUrl(hovered.website)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ClientProjects() {
  return (
    <>
      <Section id="client-work">
        <SectionHeader
          label="Client work · DevSphere Solutions"
          title={
            <>
              Built for <span className="text-gradient">real businesses.</span>
            </>
          }
          description={`${clientProjects.length} production platforms for clients across India, Dubai and global markets — e-commerce, CRM, AgriTech, EdTech, FinTech and more.`}
        />
        <ClientShowcase className="mt-12" />
      </Section>
      <Section id="index" className="pt-0 sm:pt-0 lg:pt-0">
        <SectionHeader
          label="Project index"
          title={
            <>
              Every build, <span className="text-gradient">at a glance.</span>
            </>
          }
          description="Hover a row to preview the live site. Click to open it."
        />
        <ClientIndex className="mt-12" />
      </Section>
    </>
  )
}
