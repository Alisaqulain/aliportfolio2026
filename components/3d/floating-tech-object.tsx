'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { TechIcon } from '@/components/ui/tech-icon'
import { cn } from '@/lib/utils'

type FloatingTechObjectProps = {
  name: string
  className?: string
  depth?: number
  speed?: number
  delay?: number
  size?: number
}

export function FloatingTechObject({
  name,
  className,
  depth = 40,
  speed = 5,
  delay = 0,
  size = 18,
}: FloatingTechObjectProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn(
        'floating-tech-object pointer-events-none absolute flex items-center justify-center rounded-xl border border-white/[0.1] bg-background/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md',
        'h-11 w-11 sm:h-12 sm:w-12',
        className,
      )}
      style={{ transform: `translateZ(${depth}px)` }}
      animate={
        reduce
          ? undefined
          : {
              y: [0, -10, 0],
              rotateZ: [0, 3, -3, 0],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              duration: speed,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }
      }
      aria-hidden
    >
      <TechIcon name={name} size={size} />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.08] to-transparent" />
    </motion.div>
  )
}
