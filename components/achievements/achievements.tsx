'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Cpu, Globe2, Layers, Rocket } from 'lucide-react'
import { achievements } from '@/data/skills'
import { Reveal } from '@/components/ui/reveal'
import { AnimatedSectionHeader } from '@/components/ui/animated-section-header'
import { Section } from '@/components/ui/section'
import { GlassCard } from '@/components/3d/glass-card'
import { TiltCard } from '@/components/3d/tilt-card'

function CountUp({ value }: { value: string }) {
  const reduce = useReducedMotion()
  const match = value.match(/^(\d+)(.*)$/)
  const [display, setDisplay] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    if (!match || reduce || started.current) {
      setDisplay(value)
      return
    }
    started.current = true
    const target = Number(match[1])
    const suffix = match[2]
    const duration = 900
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(`${Math.round(target * eased)}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [match, reduce, value])

  return <span>{display}</span>
}

const ACHIEVEMENT_ICONS = [Rocket, Globe2, Layers, Cpu]
const ACHIEVEMENT_COLORS = ['text-emerald-400', 'text-blue-400', 'text-violet-400', 'text-amber-400']

export function Achievements() {
  return (
    <Section className="bg-surface/40">
      <AnimatedSectionHeader
        icon={Rocket}
        label="Impact"
        title="Key achievements"
        description="Measurable outcomes from production engineering and client delivery."
      />

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {achievements.map((item, i) => {
          const Icon = ACHIEVEMENT_ICONS[i] ?? Rocket
          const color = ACHIEVEMENT_COLORS[i] ?? 'text-emerald-400'
          return (
            <Reveal key={item.label} delay={i * 0.06}>
              <TiltCard maxRotate={3}>
                <GlassCard glow={i === 0} className="group p-4 sm:p-6">
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/50 sm:mb-4 sm:h-11 sm:w-11 ${color}`}>
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                    <CountUp value={item.value} />
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase leading-tight tracking-wider text-muted sm:mt-2 sm:text-xs">{item.label}</p>
                </GlassCard>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
