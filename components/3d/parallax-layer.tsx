'use client'

import { motion, useTransform, useReducedMotion } from 'framer-motion'
import { useMouseParallax } from '@/components/3d/mouse-parallax-provider'
import { PARALLAX_STrength } from '@/lib/3d/depth'
import { cn } from '@/lib/utils'

type ParallaxLayerProps = {
  children: React.ReactNode
  className?: string
  strength?: keyof typeof PARALLAX_STrength
  axis?: 'both' | 'x' | 'y'
}

export function ParallaxLayer({ children, className, strength = 'mid', axis = 'both' }: ParallaxLayerProps) {
  const reduce = useReducedMotion()
  const { smoothX, smoothY, isFinePointer, reducedMotion } = useMouseParallax()

  const factor = PARALLAX_STrength[strength]
  const x = useTransform(smoothX, (v) => (axis === 'y' ? 0 : v * factor * 24))
  const y = useTransform(smoothY, (v) => (axis === 'x' ? 0 : v * factor * 24))

  if (reduce || reducedMotion || !isFinePointer) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={cn('preserve-3d', className)} style={{ x, y }}>
      {children}
    </motion.div>
  )
}
