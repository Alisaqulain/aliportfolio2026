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
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'ghost' && 'btn-ghost',
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
