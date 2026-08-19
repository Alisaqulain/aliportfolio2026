'use client'

import { skillCategories } from '@/data/skills'
import { TechIcon } from '@/components/ui/tech-icon'

const MARQUEE_ITEMS = skillCategories.flatMap((cat) => cat.items.slice(0, 3))

export function TechMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <section className="overflow-hidden border-y border-border/60 bg-surface/30 py-5">
      <div className="marquee-track flex w-max gap-8">
        {items.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-border/70 bg-background/50 px-4 py-2 font-mono text-xs text-muted"
          >
            <TechIcon name={tech} size={14} />
            {tech}
          </div>
        ))}
      </div>
    </section>
  )
}
