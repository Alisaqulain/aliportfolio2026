import { cn } from '@/lib/utils'

type SectionProps = {
  id?: string
  className?: string
  children: React.ReactNode
  container?: 'content' | 'wide' | 'full'
}

export function Section({ id, className, children, container = 'content' }: SectionProps) {
  return (
    <section id={id} className={cn('section-padding border-t border-border/60', className)}>
      <div
        className={cn(
          container === 'wide' && 'container-wide',
          container === 'content' && 'container-content',
          container === 'full' && 'w-full',
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">{children}</p>
  )
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn('max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl', className)}>
      {children}
    </h2>
  )
}
