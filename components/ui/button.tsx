import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  external?: boolean
  onClick?: () => void
}

export function Button({ href, children, variant = 'primary', className, external, onClick }: ButtonProps) {
  const styles = cn(
    'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors',
    variant === 'primary' && 'bg-foreground text-background hover:bg-zinc-200',
    variant === 'secondary' && 'border border-border bg-transparent text-foreground hover:bg-surface-elevated',
    variant === 'ghost' && 'text-muted hover:text-foreground',
    className,
  )

  if (/^https?:/.test(href) || external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles} onClick={onClick}>
        {children}
      </a>
    )
  }

  if (href.startsWith('#') || /^(mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={styles} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={styles} onClick={onClick}>
      {children}
    </Link>
  )
}
