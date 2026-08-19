'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Cpu, Globe2, Layers, Rocket } from 'lucide-react'
import { achievements } from '@/data/skills'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'

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

export function Achievements() {
  return (
    <Section className="bg-surface/40">
      <SectionLabel>Impact</SectionLabel>
      <SectionTitle>Key achievements</SectionTitle>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, i) => {
          const Icon = ACHIEVEMENT_ICONS[i] ?? Rocket
          return (
          <Reveal key={item.label} delay={i * 0.05}>
            <div className="border border-border bg-background/40 p-6 transition-colors hover:bg-surface-elevated/20">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-background/50 text-foreground">
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                <CountUp value={item.value} />
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">{item.label}</p>
            </div>
          </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
