import Link from 'next/link'
import { Brain, Cloud, Code2, Rocket, Shield, Users } from 'lucide-react'
import { achievements, keyAchievements } from '@/data/skills'
import { DEVSPHERE } from '@/lib/constants'
import { CountUp } from '@/components/ui/count-up'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

const POINTS = [
  'Product thinking',
  'System design',
  'Full-stack development',
  'Deployment',
  'Client collaboration',
  'Production ownership',
]

const VALUES = [
  { icon: Brain, title: 'Product Thinking', description: 'Engineering aligned with business outcomes and user needs.' },
  { icon: Code2, title: 'Clean Architecture', description: 'Scalable systems designed for long-term maintainability.' },
  { icon: Rocket, title: 'Ship Fast', description: 'Rapid iteration from prototype to production deployment.' },
  { icon: Shield, title: 'Production Quality', description: 'Secure, tested, and reliable code that clients trust.' },
  { icon: Cloud, title: 'Cloud Native', description: 'Modern deployment on Vercel, Render, Docker, and VPS.' },
  { icon: Users, title: 'Client First', description: 'Direct collaboration from requirements to delivery.' },
]

export function About() {
  return (
    <>
      <Section id="about" className="pt-0 sm:pt-0 lg:pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <GlassCard hover={false} glow className="h-full p-7 sm:p-10">
              <div className="space-y-5 text-lg leading-relaxed text-foreground/80 sm:text-xl">
                <p>
                  I&apos;m a Forward Deployed Engineer and Full-Stack Systems Developer who works across the entire product
                  lifecycle — from understanding business requirements and designing system architecture to development,
                  deployment, and production delivery.
                </p>
                <p className="text-muted">
                  I founded{' '}
                  <Link href="/devsphere" className="text-foreground underline decoration-violet-400/50 underline-offset-4 hover:decoration-violet-300">
                    {DEVSPHERE.name}
                  </Link>
                  , where I&apos;ve shipped 13+ products for clients across India, Dubai and beyond, while working as a
                  Full-Stack Developer at Bizsun Creative and pursuing my MCA at Aligarh Muslim University.
                </p>
              </div>
              <ul className="mt-8 space-y-2.5">
                {keyAchievements.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-foreground/75 sm:text-[15px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300" />
                    {line}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 flex flex-wrap gap-2">
                {POINTS.map((point) => (
                  <li key={point} className="chip px-3 py-1.5 text-xs text-foreground/80">
                    {point}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {achievements.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06} className="h-full">
                <TiltCard className="h-full">
                  <GlassCard className="flex h-full flex-col justify-end p-5 sm:p-6">
                    <p className="text-gradient text-2xl font-semibold leading-tight tabular-nums tracking-tight sm:text-3xl">
                      <CountUp value={item.value} />
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="values">
        <SectionHeader
          label="How I work"
          title={
            <>
              Principles behind <span className="text-gradient">every build.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.06} className="h-full">
                <TiltCard className="h-full">
                  <GlassCard className="h-full p-6 sm:p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-cyan-400/10 text-violet-100">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </Section>
    </>
  )
}
