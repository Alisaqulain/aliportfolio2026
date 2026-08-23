'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
        {achievements.map((item, i) => {
          const Icon = ACHIEVEMENT_ICONS[i] ?? Rocket
          return (
          <Reveal key={item.label} delay={i * 0.05}>
            <motion.div
              className="border border-border bg-background/40 p-4 transition-colors hover:bg-surface-elevated/20 sm:p-6"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/50 text-foreground sm:mb-4 sm:h-9 sm:w-9"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon size={16} strokeWidth={1.75} />
              </motion.div>
              <p className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                <CountUp value={item.value} />
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase leading-tight tracking-wider text-muted sm:mt-2 sm:text-xs">{item.label}</p>
            </motion.div>
          </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
