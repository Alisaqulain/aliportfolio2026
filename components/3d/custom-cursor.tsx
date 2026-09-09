'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useMouseParallax } from '@/components/3d/mouse-parallax-provider'

type CursorState = 'default' | 'button' | 'card' | 'link' | 'view'

export function CustomCursor() {
  const reduce = useReducedMotion()
  const { isFinePointer } = useMouseParallax()
  const [state, setState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 22 })
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 22 })

  useEffect(() => {
    if (reduce || !isFinePointer) return

    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('[data-cursor]') as HTMLElement | null
      if (!interactive) {
        setState('default')
        return
      }
      const type = interactive.getAttribute('data-cursor') as CursorState
      setState(type ?? 'default')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
    }
  }, [cursorX, cursorY, reduce, isFinePointer, visible])

  if (reduce || !isFinePointer) return null

  const ringScale = state === 'button' ? 1.6 : state === 'card' ? 1.35 : state === 'view' ? 1.5 : state === 'link' ? 1.2 : 1

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference"
        style={{ x: cursorX, y: cursorY, opacity: visible ? 1 : 0 }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25"
        style={{
          x: ringX,
          y: ringY,
          width: state === 'view' ? 64 : 32,
          height: state === 'view' ? 64 : 32,
          scale: ringScale,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        aria-hidden
      >
        {state === 'view' && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/70">View</span>
        )}
      </motion.div>
    </>
  )
}
