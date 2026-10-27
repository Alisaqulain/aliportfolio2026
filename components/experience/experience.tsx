import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import { experience, formatPeriod, type ExperienceItem } from '@/data/experience'
import { cn } from '@/lib/utils'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

/** Vertical timeline with glowing nodes and tilting role cards */
export function Timeline({ items, compact, className }: { items: ExperienceItem[]; compact?: boolean; className?: string }) {
  return (
    <ol className={cn('relative space-y-5 pl-8 sm:pl-12', className)}>
      <span
        className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-violet-400/70 via-cyan-300/30 to-transparent sm:left-[15px]"
        aria-hidden
      />
      {items.map((item, i) => {
        const current = item.endDate === 'Present'
        return (
          <Reveal as="li" key={item.company} delay={i * 0.08} className="relative">
            <span
              className="absolute -left-8 top-7 flex h-6 w-6 items-center justify-center sm:-left-12 sm:h-8 sm:w-8"
              aria-hidden
            >
              {current && <span className="animate-ping-ring absolute h-full w-full rounded-full bg-violet-400/40" />}
              <span className="relative h-3 w-3 rounded-full border-2 border-violet-300 bg-background shadow-[0_0_16px_rgba(139,92,246,0.8)]" />
            </span>
            <TiltCard maxRotate={2}>
              <GlassCard glow={current} as="article" className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
                      <span
                        className={cn(
                          'chip',
                          item.type === 'Founder' && 'border-amber-300/30 bg-amber-400/10 text-amber-200',
                        )}
                      >
                        {item.type}
                      </span>
                    </div>
                    {item.website ? (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-base text-gradient hover:opacity-80"
                      >
                        {item.company} <ArrowUpRight size={14} className="text-violet-300" />
                      </a>
                    ) : (
                      <p className="mt-1 text-base text-gradient">{item.company}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="chip">
                      <Calendar size={11} /> {formatPeriod(item)}
                    </span>
                    <span className="chip">
                      <MapPin size={11} /> {item.location}
                    </span>
                  </div>
                </div>
                {compact ? (
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{item.description[0]}</p>
                ) : (
                  <ul className="mt-5 space-y-2.5">
                    {item.description.map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300" />
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            </TiltCard>
          </Reveal>
        )
      })}
    </ol>
  )
}

export function Experience() {
  return (
    <Section id="experience" container="content" className="pt-0 sm:pt-0 lg:pt-0">
      <Timeline items={experience} />
    </Section>
  )
}
