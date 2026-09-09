'use client'

import { motion } from 'framer-motion'
import { Code2, GitBranch, Layers, Rocket, Search } from 'lucide-react'
import { AnimatedSectionHeader } from '@/components/ui/animated-section-header'
import { Reveal } from '@/components/ui/reveal'
import { GlassCard } from '@/components/3d/glass-card'
import { TiltCard } from '@/components/3d/tilt-card'

const STEPS = [
  { icon: Search, title: 'Discover', description: 'Understand business goals, users, and technical constraints.', color: 'text-blue-400', bg: 'from-blue-500/10' },
  { icon: Layers, title: 'Design', description: 'Architect systems, APIs, and interfaces for scalability.', color: 'text-violet-400', bg: 'from-violet-500/10' },
  { icon: Code2, title: 'Build', description: 'Ship full-stack features across web, mobile, and AI.', color: 'text-emerald-400', bg: 'from-emerald-500/10' },
  { icon: Rocket, title: 'Deploy', description: 'Deploy, monitor, and iterate on live production systems.', color: 'text-amber-400', bg: 'from-amber-500/10' },
]

export function HomeProcess() {
  return (
    <section className="scene-3d relative overflow-hidden border-t border-border/60 bg-surface/30 section-padding">
      <div className="container-wide">
        <AnimatedSectionHeader
          icon={GitBranch}
          label="Process"
          title="How I deliver production systems."
          description="A structured approach from discovery to deployment."
        />

        <div className="relative mt-10 sm:mt-12">
          <motion.div
            className="absolute left-0 right-0 top-[3rem] hidden h-px sm:block lg:top-[3.5rem]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left', background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)' }}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={i * 0.1}>
                  <TiltCard maxRotate={3}>
                    <GlassCard className={`group h-full bg-gradient-to-b ${step.bg} to-transparent p-5 sm:p-6`}>
                      <motion.div
                        className={`relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-border/70 bg-background/80 sm:mb-5 sm:mx-0 ${step.color}`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={24} strokeWidth={1.75} />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface font-mono text-[10px] text-muted">
                          {i + 1}
                        </span>
                      </motion.div>
                      <h3 className="text-center text-base font-medium text-foreground sm:text-left">{step.title}</h3>
                      <p className="mt-2 text-center text-sm leading-relaxed text-muted sm:text-left">{step.description}</p>
                    </GlassCard>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
