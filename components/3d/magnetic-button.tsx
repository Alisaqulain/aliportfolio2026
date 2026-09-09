'use client'

import { useLiteMode } from '@/lib/hooks/use-lite-mode'
import { cn } from '@/lib/utils'

type MagneticButtonProps = {
  children: React.ReactNode
  className?: string
}

/** Passthrough wrapper — magnetic effect removed for performance */
export function MagneticWrap({ children, className }: MagneticButtonProps) {
  const lite = useLiteMode()

  if (lite) {
    return <div className={className}>{children}</div>
  }

  return <div className={cn('inline-block', className)}>{children}</div>
}
