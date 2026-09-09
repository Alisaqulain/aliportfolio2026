'use client'

import { useCallback, useRef } from 'react'
import { TILT_MAX } from '@/lib/3d/depth'

type UseTiltOptions = {
  maxRotate?: number
  scale?: number
  enabled?: boolean
}

export function useTilt({ maxRotate = TILT_MAX, scale = 1.02, enabled = true }: UseTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled) return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${x * maxRotate * 2}deg) rotateX(${-y * maxRotate * 2}deg) scale3d(${scale}, ${scale}, ${scale})`
      el.style.transition = 'transform 0.1s ease-out'
    },
    [maxRotate, scale, enabled],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
  }, [])

  return { ref, handlers: { onMouseMove, onMouseLeave, onMouseEnter: undefined } }
}
