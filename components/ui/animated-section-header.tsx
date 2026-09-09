'use client'

import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/3d/depth'
import { cn } from '@/lib/utils'

type AnimatedSectionHeaderProps = {
  label: string
  title: string
  description?: string
  icon?: LucideIcon
  className?: string
  align?: 'left' | 'center'
}

export function AnimatedSectionHeader({
  label,
  title,
  description,
  icon: Icon,
  className,
  align = 'left',
}: AnimatedSectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn(align === 'center' && 'text-center', className)}
    >
      <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface/50 text-emerald-400/90">
            <Icon size={18} strokeWidth={1.75} />
          </div>
        )}
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      </div>
      <h2
        className={cn(
          'mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl',
          align === 'center' && 'mx-auto',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
