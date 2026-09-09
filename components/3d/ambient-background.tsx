'use client'

import { motion, useTransform, useReducedMotion } from 'framer-motion'
import { useMouseParallax } from '@/components/3d/mouse-parallax-provider'

export function AmbientBackground() {
  const reduce = useReducedMotion()
  const { smoothX, smoothY, isFinePointer, reducedMotion } = useMouseParallax()

  const glowX = useTransform(smoothX, (v) => `${50 + v * 8}%`)
  const glowY = useTransform(smoothY, (v) => `${40 + v * 6}%`)

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Base gradient atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(52,211,153,0.04)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(59,130,246,0.03)_0%,transparent_60%)]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise opacity-60" />

      {/* Mouse-reactive ambient glow */}
      {!reduce && !reducedMotion && isFinePointer && (
        <motion.div
          className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025)_0%,transparent_65%)]"
          style={{ left: glowX, top: glowY }}
        />
      )}

      {/* Floating blurred orbs */}
      {!reduce && (
        <>
          <motion.div
            className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-emerald-500/[0.03] blur-3xl"
            animate={{ y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[15%] top-[60%] h-48 w-48 rounded-full bg-blue-500/[0.03] blur-3xl"
            animate={{ y: [0, 15, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}
    </div>
  )
}
