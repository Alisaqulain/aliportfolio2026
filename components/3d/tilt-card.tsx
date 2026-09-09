'use client'

import { cn } from '@/lib/utils'
import { useTilt } from '@/lib/hooks/use-tilt'
import { useLiteMode } from '@/lib/hooks/use-lite-mode'

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  maxRotate?: number
  enableTilt?: boolean
  style?: React.CSSProperties
}

export function TiltCard({ children, className, maxRotate, enableTilt = true, style }: TiltCardProps) {
  const lite = useLiteMode()
  const tiltEnabled = enableTilt && !lite
  const { ref, handlers } = useTilt({ maxRotate, enabled: tiltEnabled })

  if (!tiltEnabled) {
    return (
      <div className={cn('tilt-card', className)} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn('tilt-card', className)}
      style={style}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
    >
      {children}
    </div>
  )
}
