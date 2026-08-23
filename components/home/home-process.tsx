'use client'

import { motion } from 'framer-motion'
import { Code2, Layers, Rocket, Search } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const STEPS = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Understand business goals, users, and technical constraints before writing code.',
    color: 'text-blue-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]',
  },
  {
    icon: Layers,
    title: 'Design',
    description: 'Architect systems, APIs, and interfaces for scalability and maintainability.',
    color: 'text-violet-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]',
  },
  {
    icon: Code2,
    title: 'Build',
    description: 'Ship full-stack features across web, mobile, and AI with production quality.',
    color: 'text-emerald-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description: 'Deploy, monitor, and iterate on live systems with real users and clients.',
    color: 'text-amber-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]',
  },
]

export function HomeProcess() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-surface/30 section-padding">
      <div className="container-wide">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Process</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl">
            How I deliver production systems.
          </h2>
        </Reveal>

        <div className="relative mt-8 sm:mt-12">
          <div className="absolute left-0 right-0 top-[2.75rem] hidden h-px bg-border/60 sm:block lg:top-[3rem]" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={i * 0.1}>
                  <motion.div
                    className="group relative"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.div
                      className={`relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-border/70 bg-background/80 transition-shadow sm:mb-6 sm:h-16 sm:w-16 ${step.glow}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.5, type: 'spring', stiffness: 200 }}
                    >
                      <Icon size={24} className={step.color} strokeWidth={1.75} />
                      <motion.span
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface font-mono text-[10px] text-muted"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.2, type: 'spring' }}
                      >
                        {i + 1}
                      </motion.span>
                    </motion.div>
                    <h3 className="text-center text-base font-medium text-foreground sm:text-left">{step.title}</h3>
                    <p className="mt-2 text-center text-sm leading-relaxed text-muted sm:text-left">{step.description}</p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
