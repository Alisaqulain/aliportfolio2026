import { GraduationCap } from 'lucide-react'
import { education } from '@/data/skills'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

export function Education() {
  return (
    <Section id="education" container="content">
      <SectionHeader label="Education" title="Academic background" />
      <Reveal className="mt-10">
        <TiltCard maxRotate={3}>
          <GlassCard glow className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-cyan-400/10 text-violet-100">
              <GraduationCap size={24} strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold tracking-tight">{education.degree}</h3>
              <p className="mt-1 text-sm text-muted">{education.location}</p>
            </div>
            <div className="flex gap-2">
              <span className="chip">{education.period}</span>
              <span className="chip border-violet-400/30 text-violet-200">{education.status}</span>
            </div>
          </GlassCard>
        </TiltCard>
      </Reveal>
    </Section>
  )
}
