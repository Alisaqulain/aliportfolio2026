'use client'

import { cn } from '@/lib/utils'

type GlassCardProps = {
  children: React.ReactNode
  className?: string
  depth?: 'back' | 'normal' | 'front'
  glow?: boolean
}

export function GlassCard({ children, className, depth = 'normal', glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card relative overflow-hidden rounded-xl border border-white/[0.08]',
        depth === 'back' && 'glass-depth-back',
        depth === 'normal' && 'glass-depth-normal',
        depth === 'front' && 'glass-depth-front',
        glow && 'glass-glow',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
      {children}
    </div>
  )
}
