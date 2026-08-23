'use client'

import { skillCategories } from '@/data/skills'
import { TechIcon } from '@/components/ui/tech-icon'

const ROW_A = skillCategories.flatMap((cat) => cat.items.slice(0, 4))
const ROW_B = [...skillCategories].reverse().flatMap((cat) => cat.items.slice(0, 3))

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-fade overflow-hidden py-1">
      <div
        className={`flex w-max gap-5 sm:gap-8 ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-background/50 px-3.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-foreground/20 hover:text-foreground sm:gap-2.5 sm:px-4 sm:py-2 sm:text-xs"
          >
            <TechIcon name={tech} size={14} />
            {tech}
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="overflow-hidden border-y border-border/60 bg-surface/30 py-4 sm:py-5">
      <MarqueeRow items={ROW_A} />
      <MarqueeRow items={ROW_B} reverse />
    </section>
  )
}
