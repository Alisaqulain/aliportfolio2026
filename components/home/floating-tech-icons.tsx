'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { TechIcon } from '@/components/ui/tech-icon'

const FLOATING_TECH = [
  { name: 'React.js', x: '8%', y: '18%', delay: 0 },
  { name: 'Next.js', x: '88%', y: '22%', delay: 0.4 },
  { name: 'Node.js', x: '92%', y: '58%', delay: 0.8 },
  { name: 'MongoDB', x: '6%', y: '62%', delay: 1.2 },
  { name: 'TypeScript', x: '78%', y: '78%', delay: 0.6 },
  { name: 'Docker', x: '14%', y: '82%', delay: 1.0 },
  { name: 'OpenAI API', x: '52%', y: '12%', delay: 0.2 },
  { name: 'Socket.io', x: '38%', y: '88%', delay: 1.4 },
]

export function FloatingTechIcons() {
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      {FLOATING_TECH.map((tech) => (
        <motion.div
          key={tech.name}
          className="absolute hidden sm:flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/30 backdrop-blur-sm md:h-11 md:w-11"
          style={{ left: tech.x, top: tech.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.35, 0.65, 0.35],
            y: [0, -12, 0],
            rotate: [0, 6, -6, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 5 + tech.delay * 2,
            repeat: Infinity,
            delay: tech.delay,
            ease: 'easeInOut',
          }}
        >
          <TechIcon name={tech.name} size={18} />
        </motion.div>
      ))}
    </div>
  )
}
