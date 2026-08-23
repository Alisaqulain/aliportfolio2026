'use client'

import { motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import { Reveal } from '@/components/ui/reveal'
import { TechIcon } from '@/components/ui/tech-icon'

const ALL_TECH = skillCategories.flatMap((cat) => cat.items)

export function HomeTechGrid() {
  return (
    <section className="relative border-t border-border/60 bg-background section-padding">
      <div className="container-wide">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Tech Stack</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl">
            Tools & technologies I ship with.
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
          {ALL_TECH.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 12) * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.04 }}
              className="group flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-surface/30 px-2 py-4 transition-colors hover:border-foreground/20 hover:bg-surface-elevated/50 sm:gap-2.5 sm:py-5"
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background/50 sm:h-11 sm:w-11"
                animate={{ rotate: [0, 0, 0] }}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.35 }}
              >
                <TechIcon name={tech} size={22} />
              </motion.div>
              <span className="text-center font-mono text-[9px] leading-tight text-muted group-hover:text-foreground sm:text-[10px]">
                {tech}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
