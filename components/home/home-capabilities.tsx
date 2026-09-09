'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { capabilities } from '@/data/skills'
import { CAPABILITY_ICONS } from '@/lib/visuals'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSectionHeader } from '@/components/ui/animated-section-header'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function HomeCapabilities() {
  return (
    <section className="scene-3d relative overflow-hidden border-t border-border/60 bg-surface/20 section-padding">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 rounded-full bg-emerald-500/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="container-wide relative">
        <AnimatedSectionHeader
          icon={Sparkles}
          label="Capabilities"
          title="What I build for production."
          description="End-to-end engineering across web, mobile, AI, and infrastructure."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {capabilities.map((item) => {
            const Icon = CAPABILITY_ICONS[item.title] ?? CAPABILITY_ICONS['Full-Stack Products']
            return (
              <motion.div key={item.title} variants={card} className="h-full">
                <TiltCard maxRotate={4}>
                  <GlassCard glow className="group relative h-full p-5 sm:p-6" data-cursor="card">
                    <motion.div
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-background/60 text-foreground"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </motion.div>
                    <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                    <div className="mt-4 h-px w-0 bg-gradient-to-r from-emerald-400/50 to-transparent transition-all duration-500 group-hover:w-full" />
                  </GlassCard>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10"
        >
          <Link href="/skills" data-cursor="link" className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground">
            View full tech stack <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
