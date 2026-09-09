'use client'

import { useLiteMode } from '@/lib/hooks/use-lite-mode'
import { TechIcon } from '@/components/ui/tech-icon'

const FLOATING_TECH = [
  { name: 'React.js', x: '8%', y: '18%' },
  { name: 'Next.js', x: '88%', y: '22%' },
  { name: 'Node.js', x: '92%', y: '55%' },
  { name: 'TypeScript', x: '78%', y: '76%' },
  { name: 'MongoDB', x: '6%', y: '62%' },
  { name: 'Docker', x: '14%', y: '82%' },
]

export function FloatingTechIcons() {
  const lite = useLiteMode()

  if (lite) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden max-xl:hidden" aria-hidden>
      {FLOATING_TECH.map((tech, i) => (
        <div
          key={tech.name}
          className="float-tech absolute flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-background/50 lg:h-11 lg:w-11"
          style={{ left: tech.x, top: tech.y, animationDelay: `${i * 0.5}s` }}
        >
          <TechIcon name={tech.name} size={18} />
        </div>
      ))}
    </div>
  )
}
