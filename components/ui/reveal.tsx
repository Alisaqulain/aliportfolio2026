'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useLiteMode } from '@/lib/hooks/use-lite-mode'
import { EASE } from '@/lib/3d/depth'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  depth?: 'subtle' | 'medium' | 'strong'
}

export function Reveal({ children, className, delay = 0, depth = 'medium' }: RevealProps) {
  const reduce = useReducedMotion()
  const lite = useLiteMode()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  if (lite) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    )
  }

  const rotate = depth === 'subtle' ? 3 : depth === 'strong' ? 8 : 6
  const y = depth === 'subtle' ? 20 : depth === 'strong' ? 40 : 32

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, rotateX: rotate, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  )
}
