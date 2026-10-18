import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/reveal'

type SectionProps = {
  id?: string
  className?: string
  children: React.ReactNode
  container?: 'content' | 'wide' | 'full'
}

export function Section({ id, className, children, container = 'wide' }: SectionProps) {
  return (
    <section id={id} className={cn('section-padding relative', className)}>
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

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        'max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground',
        className,
      )}
    >
      {children}
    </h2>
  )
}

type SectionHeaderProps = {
  label: string
  title: React.ReactNode
  description?: string
  className?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
}

/** Standard section heading: eyebrow, big title, optional description and right-side action */
export function SectionHeader({ label, title, description, className, align = 'left', action }: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-6',
        action && 'sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className={cn(align === 'center' && 'flex flex-col items-center')}>
        <SectionLabel>{label}</SectionLabel>
        <SectionTitle className={cn('mt-4', align === 'center' && 'mx-auto')}>{title}</SectionTitle>
        {description && (
          <p
            className={cn(
              'mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  )
}
