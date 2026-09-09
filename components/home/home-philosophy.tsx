'use client'

import { motion } from 'framer-motion'
import { Brain, Cloud, Code2, Rocket, Shield, Users } from 'lucide-react'
import { AnimatedSectionHeader } from '@/components/ui/animated-section-header'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

const VALUES = [
  { icon: Brain, title: 'Product Thinking', description: 'Engineering aligned with business outcomes and user needs.', color: 'text-violet-400' },
  { icon: Code2, title: 'Clean Architecture', description: 'Scalable systems designed for long-term maintainability.', color: 'text-blue-400' },
  { icon: Rocket, title: 'Ship Fast', description: 'Rapid iteration from prototype to production deployment.', color: 'text-emerald-400' },
  { icon: Shield, title: 'Production Quality', description: 'Secure, tested, and reliable code that clients trust.', color: 'text-amber-400' },
  { icon: Cloud, title: 'Cloud Native', description: 'Modern deployment on Vercel, Render, Docker, and VPS.', color: 'text-sky-400' },
  { icon: Users, title: 'Client First', description: 'Direct collaboration from requirements to delivery.', color: 'text-pink-400' },
]

export function HomePhilosophy() {
  return (
    <section className="scene-3d relative overflow-hidden border-t border-border/60 bg-background section-padding">
      <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-500/[0.03] blur-3xl" />

      <div className="container-wide">
        <AnimatedSectionHeader
          icon={Brain}
          label="Engineering Philosophy"
          title="How I approach every build."
          description="Beyond writing code — I think in systems, products, and production outcomes."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {VALUES.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <TiltCard maxRotate={4}>
                  <GlassCard className="group h-full p-5 sm:p-6">
                    <motion.div
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background/50 ${item.color}`}
                      whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 0.35 }}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </motion.div>
                    <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                    <div className="mt-4 h-px w-0 bg-gradient-to-r from-emerald-400/50 to-transparent transition-all duration-500 group-hover:w-full" />
                  </GlassCard>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
