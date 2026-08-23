'use client'

import { motion } from 'framer-motion'
import { capabilities } from '@/data/skills'
import { CAPABILITY_ICONS } from '@/lib/visuals'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

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
    <section className="relative overflow-hidden border-t border-border/60 bg-surface/20 section-padding">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 rounded-full bg-emerald-500/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="container-wide relative">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Capabilities</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl">
            What I build for production.
          </h2>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {capabilities.map((item) => {
            const Icon = CAPABILITY_ICONS[item.title] ?? CAPABILITY_ICONS['Full-Stack Products']

            return (
              <motion.div
                key={item.title}
                variants={card}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden border border-border bg-background/50 p-5 transition-colors hover:border-foreground/15 hover:bg-surface-elevated/40 sm:p-6"
              >
                <motion.div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-foreground transition-colors group-hover:border-emerald-400/30 group-hover:shadow-[0_0_24px_rgba(52,211,153,0.12)]"
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </motion.div>
                <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                <motion.div
                  className="absolute bottom-0 left-0 h-px w-0 bg-emerald-400/60 group-hover:w-full"
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        <Reveal delay={0.2}>
          <Link
            href="/skills"
            className="mt-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground sm:mt-10"
          >
            View full tech stack <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
