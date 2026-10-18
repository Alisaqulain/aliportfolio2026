'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  maxRotate?: number
  enableTilt?: boolean
  style?: React.CSSProperties
}

let canTilt: boolean | null = null
function tiltAllowed() {
  if (canTilt === null) {
    canTilt =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return canTilt
}

/**
 * 3D tilt + spotlight. Pointer moves are batched to one style write per frame,
 * no React state, and it does nothing on touch devices.
 */
export function TiltCard({ children, className, maxRotate = 6, enableTilt = true, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const point = useRef({ x: 0, y: 0 })

  const apply = () => {
    frame.current = 0
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (point.current.x - rect.left) / rect.width
    const py = (point.current.y - rect.top) / rect.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (enableTilt) {
      el.style.setProperty('--ry', `${(px - 0.5) * maxRotate * 2}deg`)
      el.style.setProperty('--rx', `${(0.5 - py) * maxRotate * 2}deg`)
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !tiltAllowed()) return
    point.current = { x: e.clientX, y: e.clientY }
    ref.current?.classList.add('is-tilting')
    if (!frame.current) frame.current = requestAnimationFrame(apply)
  }

  const onPointerLeave = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    frame.current = 0
    el.classList.remove('is-tilting')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      className={cn('tilt', className)}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </div>
  )
}
