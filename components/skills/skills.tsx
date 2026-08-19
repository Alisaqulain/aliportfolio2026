'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/reveal'
import { TechIcon } from '@/components/ui/tech-icon'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'

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

export function Skills() {
  const [active, setActive] = useState(skillCategories[0].id)
  const current = skillCategories.find((c) => c.id === active) ?? skillCategories[0]

  return (
    <Section id="skills" className="pt-28">
      <SectionLabel>Technical Stack</SectionLabel>
      <SectionTitle>Technologies I work with</SectionTitle>

      <Reveal className="mt-10">
        <div className="flex flex-wrap gap-2">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-all duration-200',
                active === cat.id
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted hover:border-foreground/30 hover:text-foreground',
              )}
            >
              <TechIcon
                name={CATEGORY_ICONS[cat.id] ?? cat.label}
                size={14}
                colored={active === cat.id}
                className={active === cat.id ? 'text-background' : undefined}
              />
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {current.items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
                className="flex items-center gap-3 border border-border/80 px-4 py-3 transition-colors hover:border-foreground/20 hover:bg-surface/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/50">
                  <TechIcon name={item} size={18} />
                </div>
                <span className="font-mono text-sm text-foreground">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </Section>
  )
}
