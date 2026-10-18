import { Code2, Layers, Rocket, Search } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

const STEPS = [
  { icon: Search, title: 'Discover', description: 'Understand business goals, users, and technical constraints.' },
  { icon: Layers, title: 'Design', description: 'Architect systems, APIs, and interfaces for scalability.' },
  { icon: Code2, title: 'Build', description: 'Ship full-stack features across web, mobile, and AI.' },
  { icon: Rocket, title: 'Deploy', description: 'Deploy, monitor, and iterate on live production systems.' },
]

export function HomeProcess() {
  return (
    <Section id="process">
      <SectionHeader
        label="Process"
        title={
          <>
            From idea to <span className="text-gradient">production.</span>
          </>
        }
        description="A structured approach that keeps scope clear and delivery predictable."
      />

      <div className="relative mt-14">
        <div
          className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent lg:block"
          aria-hidden
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="h-full">
                <TiltCard className="h-full">
                  <GlassCard className="h-full p-6">
                    <div className="flex items-center justify-between">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-[#0d0d18] text-violet-200 shadow-[0_0_0_6px_rgba(5,5,10,1),0_10px_30px_-10px_rgba(139,92,246,0.6)]">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <span className="text-5xl font-semibold tracking-tighter text-white/[0.06]">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
