'use client'

import { useState } from 'react'
import { skillCategories } from '@/data/skills'
import { cn } from '@/lib/utils'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TechIcon } from '@/components/ui/tech-icon'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

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
    <Section id="skills" className="pt-0 sm:pt-0 lg:pt-0">
      <Reveal>
        <div role="tablist" aria-label="Skill categories" className="mask-fade-x -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {skillCategories.map((cat) => {
            const selected = active === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(cat.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300',
                  selected
                    ? 'border-violet-400/50 bg-violet-500/15 text-foreground shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)]'
                    : 'border-white/[0.08] text-muted hover:border-white/20 hover:text-foreground',
                )}
              >
                <TechIcon name={CATEGORY_ICONS[cat.id] ?? cat.label} size={15} />
                {cat.label}
                <span className="font-mono text-[10px] text-muted">{cat.items.length}</span>
              </button>
            )
          })}
        </div>

        {/* key re-mounts the grid so the CSS entry animation replays */}
        <div key={current.id} role="tabpanel" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {current.items.map((item, i) => (
            <div key={item} className="animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
              <TiltCard maxRotate={10}>
                <GlassCard className="flex flex-col items-center gap-4 px-4 py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d18] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                    <TechIcon name={item} size={30} />
                  </div>
                  <span className="text-sm font-medium text-foreground/90">{item}</span>
                </GlassCard>
              </TiltCard>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
