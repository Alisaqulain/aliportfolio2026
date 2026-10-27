import { GraduationCap } from 'lucide-react'
import { education } from '@/data/skills'
import { cn } from '@/lib/utils'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

export function Education() {
  return (
    <Section id="education" container="content">
      <SectionHeader label="Education" title="Academic background" />
      <div className="mt-10 grid gap-4">
        {education.map((item, i) => {
          const current = item.status === 'Pursuing'
          return (
            <Reveal key={item.short} delay={i * 0.08}>
              <TiltCard maxRotate={3}>
                <GlassCard glow={current} className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:p-8">
                  <div className="relative flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-cyan-400/10 text-violet-100">
                    <GraduationCap size={20} strokeWidth={1.75} />
                    <span className="mt-0.5 font-mono text-[10px] font-semibold tracking-wider">{item.short}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold tracking-tight">{item.degree}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {item.institution} · {item.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="chip">{item.period}</span>
                    <span className={cn('chip', current ? 'border-emerald-400/30 text-emerald-300' : 'border-violet-400/30 text-violet-200')}>
                      {current && <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                      {item.status}
                    </span>
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
