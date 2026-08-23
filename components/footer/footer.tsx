import Link from 'next/link'
import { NAV_LINKS, SITE, SOCIAL } from '@/lib/constants'
import { BrandLogo } from '@/components/ui/brand-logo'

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 safe-bottom sm:px-8 sm:py-12 lg:px-12">
      <div className="container-wide grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <BrandLogo showText={false} size="md" />
          <p className="mt-4 font-mono text-sm tracking-[0.14em]">ALI SAQULAIN</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {SITE.title} · {SITE.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm sm:gap-4">
          <div className="space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block min-h-[36px] py-0.5 text-muted transition-colors hover:text-foreground sm:min-h-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="block min-h-[36px] py-0.5 text-muted transition-colors hover:text-foreground sm:min-h-0">GitHub</a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="block min-h-[36px] py-0.5 text-muted transition-colors hover:text-foreground sm:min-h-0">LinkedIn</a>
            <a href={`mailto:${SITE.email}`} className="block min-h-[36px] py-0.5 text-muted transition-colors hover:text-foreground sm:min-h-0">Email</a>
          </div>
        </div>
      </div>

      <p className="container-wide mt-8 text-xs text-muted sm:mt-10">© 2026 Ali Saqulain. All rights reserved.</p>
    </footer>
  )
}
