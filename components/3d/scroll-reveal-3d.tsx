'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/3d/depth'
import { cn } from '@/lib/utils'

type ScrollReveal3DProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  depth?: 'subtle' | 'medium' | 'strong'
}

const DEPTH_CONFIG = {
  subtle: { z: -80, rotate: 4, y: 24 },
  medium: { z: -120, rotate: 6, y: 32 },
  strong: { z: -150, rotate: 8, y: 40 },
}

export function ScrollReveal3D({ children, className, delay = 0, depth = 'medium' }: ScrollReveal3DProps) {
  const reduce = useReducedMotion()
  const cfg = DEPTH_CONFIG[depth]

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn('preserve-3d', className)}
      initial={{ opacity: 0, y: cfg.y, rotateX: cfg.rotate, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  )
}
