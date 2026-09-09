'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

type MouseParallaxContextValue = {
  smoothX: ReturnType<typeof useSpring>
  smoothY: ReturnType<typeof useSpring>
  isFinePointer: boolean
  reducedMotion: boolean
}

const MouseParallaxContext = createContext<MouseParallaxContextValue | null>(null)

export function MouseParallaxProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion() ?? false
  const [isFinePointer, setIsFinePointer] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const smoothX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.6 })
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsFinePointer(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion || !isFinePointer) return

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      rawX.set(nx)
      rawY.set(ny)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, reducedMotion, isFinePointer])

  const value = useMemo(
    () => ({ smoothX, smoothY, isFinePointer, reducedMotion }),
    [smoothX, smoothY, isFinePointer, reducedMotion],
  )

  return <MouseParallaxContext.Provider value={value}>{children}</MouseParallaxContext.Provider>
}

export function useMouseParallax() {
  const ctx = useContext(MouseParallaxContext)
  if (!ctx) {
    throw new Error('useMouseParallax must be used within MouseParallaxProvider')
  }
  return ctx
}
