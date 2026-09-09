'use client'

import { motion, useTransform, useReducedMotion } from 'framer-motion'
import { useScrollProgress } from '@/lib/hooks/use-scroll-progress'
import { useMouseParallax } from '@/components/3d/mouse-parallax-provider'

export function ScrollProgress() {
  const progress = useScrollProgress()
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-px bg-border/30" style={{ paddingTop: 'env(safe-area-inset-top)' }} aria-hidden>
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-emerald-400/60 via-foreground/50 to-emerald-400/60"
        animate={{ scaleX: progress }}
        initial={{ scaleX: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 28 }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}

export function CursorGlow() {
  const reduce = useReducedMotion()
  const { smoothX, smoothY, isFinePointer, reducedMotion } = useMouseParallax()

  const x = useTransform(smoothX, (v) => `calc(${(v + 1) * 50}%)`)
  const y = useTransform(smoothY, (v) => `calc(${(v + 1) * 50}%)`)

  if (reduce || reducedMotion || !isFinePointer) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] opacity-40"
      aria-hidden
    >
      <motion.div
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.08)_0%,transparent_70%)]"
        style={{ left: x, top: y }}
      />
    </motion.div>
  )
}
