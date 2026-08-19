import Link from 'next/link'
import { NAV_LINKS, SITE, SOCIAL } from '@/lib/constants'
import { BrandLogo } from '@/components/ui/brand-logo'

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8 lg:px-12">
      <div className="container-wide grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <BrandLogo showText={false} size="md" />
          <p className="mt-4 font-mono text-sm tracking-[0.14em]">ALI SAQULAIN</p>
          <p className="mt-2 text-sm text-muted">
            {SITE.title} · {SITE.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="block text-muted transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="block text-muted transition-colors hover:text-foreground">GitHub</a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="block text-muted transition-colors hover:text-foreground">LinkedIn</a>
            <a href={`mailto:${SITE.email}`} className="block text-muted transition-colors hover:text-foreground">Email</a>
          </div>
        </div>
      </div>

      <p className="container-wide mt-10 text-xs text-muted">© 2026 Ali Saqulain. All rights reserved.</p>
    </footer>
  )
}
