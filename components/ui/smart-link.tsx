import Link from 'next/link'
import { isExternalHref, isValidHref } from '@/lib/links'
import { cn } from '@/lib/utils'

type SmartLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
  ariaLabel?: string
}

/** Renders Link or <a> based on href type; skips invalid URLs */
export function SmartLink({ href, children, className, external, ariaLabel }: SmartLinkProps) {
  if (!isValidHref(href)) return null

  if (external || isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}

type SmartAnchorProps = {
  href: string
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}

/** Always renders an anchor — for mailto/tel/http */
export function SmartAnchor({ href, children, className, ariaLabel }: SmartAnchorProps) {
  if (!isValidHref(href)) return <span className={className}>{children}</span>

  const external = isExternalHref(href)

  return (
    <a
      href={href}
      className={cn(className)}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
