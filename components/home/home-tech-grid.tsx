'use client'

import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { skillCategories } from '@/data/skills'
import { AnimatedSectionHeader } from '@/components/ui/animated-section-header'
import { TechIcon } from '@/components/ui/tech-icon'

const CATEGORY_ICONS: Record<string, string> = {
  frontend: 'React.js',
  backend: 'Node.js',
  mobile: 'React Native',
  databases: 'MongoDB',
  realtime: 'Socket.io',
  ai: 'OpenAI API',
  cloud: 'Docker',
  tools: 'GitHub',
}

export function HomeTechGrid() {
  return (
    <section className="scene-3d relative border-t border-border/60 bg-background section-padding">
      <div className="container-wide">
        <AnimatedSectionHeader
          icon={Layers}
          label="Tech Stack"
          title="Tools & technologies I ship with."
          description="Full-stack ecosystem spanning frontend, backend, mobile, AI, and cloud."
        />

        <div className="mt-10 space-y-10">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: catIndex * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-surface/50">
                  <TechIcon name={CATEGORY_ICONS[cat.id] ?? cat.label} size={16} />
                </div>
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{cat.label}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
                {cat.items.map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="group flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-surface/30 px-2 py-4 transition-colors hover:border-foreground/20 hover:bg-surface-elevated/50 sm:gap-2.5 sm:py-5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/50 sm:h-11 sm:w-11">
                        <TechIcon name={tech} size={22} />
                      </div>
                      <span className="text-center font-mono text-[9px] leading-tight text-muted group-hover:text-foreground sm:text-[10px]">
                        {tech}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
