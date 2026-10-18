import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { NAV_LINKS, SITE, SOCIAL } from '@/lib/constants'
import { isValidHref, toTelHref } from '@/lib/links'
import { BrandLogo } from '@/components/ui/brand-logo'

export function Footer() {
  const mailto = `mailto:${SITE.email}`
  const tel = toTelHref(SITE.phone)

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-4 pt-20 safe-bottom sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.18)_0%,transparent_65%)]" aria-hidden />

      <div className="container-wide relative">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <BrandLogo size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {SITE.title} · {SITE.subtitle}. Turning business requirements into production-ready web, mobile and AI products.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-muted">
              <p className="flex items-center gap-2.5">
                <MapPin size={14} className="shrink-0 text-violet-300" aria-hidden />
                {SITE.location}
              </p>
              <a href={mailto} className="flex items-center gap-2.5 transition-colors hover:text-foreground">
                <Mail size={14} className="shrink-0 text-violet-300" aria-hidden />
                {SITE.email}
              </a>
              <a href={tel} className="flex items-center gap-2.5 transition-colors hover:text-foreground">
                <Phone size={14} className="shrink-0 text-violet-300" aria-hidden />
                {SITE.phone}
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Connect</p>
            <div className="mt-5 flex gap-2">
              {isValidHref(SOCIAL.github) && (
                <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="icon-btn">
                  <Github size={17} />
                </a>
              )}
              {isValidHref(SOCIAL.linkedin) && (
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="icon-btn">
                  <Linkedin size={17} />
                </a>
              )}
              <a href={mailto} aria-label="Send email" className="icon-btn">
                <Mail size={17} />
              </a>
              <a href={tel} aria-label="Call" className="icon-btn">
                <Phone size={17} />
              </a>
            </div>
            <Link href="/contact" className="btn btn-secondary mt-6">
              Start a project <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          className="text-gradient-soft pointer-events-none mt-16 select-none whitespace-nowrap text-center text-[clamp(3rem,13.5vw,12rem)] font-semibold leading-[0.85] tracking-[-0.06em] opacity-[0.14]"
          aria-hidden
        >
          ALI SAQULAIN
        </p>

        <div className="flex flex-col gap-2 border-t border-white/[0.06] py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="font-mono">Built with Next.js · Three.js · Tailwind</p>
        </div>
      </div>
    </footer>
  )
}
