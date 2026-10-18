import { cn } from '@/lib/utils'

type GlassCardProps = {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  as?: 'div' | 'article'
}

/** Elevated surface. No backdrop-filter — layered gradients look the same and cost nothing. */
export function GlassCard({ children, className, glow, hover = true, as: Tag = 'div' }: GlassCardProps) {
  return (
    <Tag className={cn('card group overflow-hidden', hover && 'card-hover', className)}>
      <span className="spotlight" aria-hidden />
      {glow && (
        <span
          className="pointer-events-none absolute -right-20 -top-20 -z-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22)_0%,transparent_70%)]"
          aria-hidden
        />
      )}
      {children}
    </Tag>
  )
}
