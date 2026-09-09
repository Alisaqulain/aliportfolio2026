'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Home, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { NAV_LINKS, SITE, SOCIAL } from '@/lib/constants'
import { isValidHref, toTelHref } from '@/lib/links'
import { BrandLogo } from '@/components/ui/brand-logo'
import { PAGE_ICONS } from '@/lib/visuals'

export function Footer() {
  const mailto = `mailto:${SITE.email}`
  const tel = toTelHref(SITE.phone)

  return (
    <footer className="relative border-t border-border bg-surface/20 px-4 py-10 safe-bottom sm:px-8 sm:py-12 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(52,211,153,0.03)_0%,transparent_60%)]" />

      <div className="container-wide relative grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandLogo showText={false} size="md" />
          <p className="mt-4 font-mono text-sm tracking-[0.14em]">ALI SAQULAIN</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {SITE.title} · {SITE.subtitle}
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p className="flex items-center gap-2">
              <MapPin size={13} className="shrink-0 text-emerald-400/60" aria-hidden />
              {SITE.location}
            </p>
            <a href={mailto} className="flex items-center gap-2 transition-colors hover:text-foreground">
              <Mail size={13} className="shrink-0 text-emerald-400/60" aria-hidden />
              {SITE.email}
            </a>
            <a href={tel} className="flex items-center gap-2 transition-colors hover:text-foreground">
              <Phone size={13} className="shrink-0 text-emerald-400/60" aria-hidden />
              {SITE.phone}
            </a>
          </div>
          <div className="mt-5 flex gap-3">
            {isValidHref(SOCIAL.github) && (
              <motion.a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                <Github size={16} />
              </motion.a>
            )}
            {isValidHref(SOCIAL.linkedin) && (
              <motion.a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                <Linkedin size={16} />
              </motion.a>
            )}
            <motion.a
              href={mailto}
              aria-label="Send email"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
              whileHover={{ y: -2, scale: 1.05 }}
            >
              <Mail size={16} />
            </motion.a>
          </div>
        </div>

        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Navigation</p>
          <div className="space-y-1">
            <Link
              href="/"
              className="flex min-h-[36px] items-center gap-2 py-0.5 text-sm text-muted transition-colors hover:text-foreground sm:min-h-0"
            >
              <Home size={13} className="opacity-50" aria-hidden />
              Home
            </Link>
            {NAV_LINKS.map((link) => {
              const Icon = PAGE_ICONS[link.label]
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-[36px] items-center gap-2 py-0.5 text-sm text-muted transition-colors hover:text-foreground sm:min-h-0"
                >
                  {Icon && <Icon size={13} className="opacity-50" aria-hidden />}
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Connect</p>
          <div className="space-y-1">
            {isValidHref(SOCIAL.github) && (
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[36px] items-center gap-2 py-0.5 text-sm text-muted transition-colors hover:text-foreground sm:min-h-0"
              >
                <Github size={13} className="opacity-50" aria-hidden /> GitHub
              </a>
            )}
            {isValidHref(SOCIAL.linkedin) && (
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[36px] items-center gap-2 py-0.5 text-sm text-muted transition-colors hover:text-foreground sm:min-h-0"
              >
                <Linkedin size={13} className="opacity-50" aria-hidden /> LinkedIn
              </a>
            )}
            <a
              href={mailto}
              className="flex min-h-[36px] items-center gap-2 py-0.5 text-sm text-muted transition-colors hover:text-foreground sm:min-h-0"
            >
              <Mail size={13} className="opacity-50" aria-hidden /> Email
            </a>
            <a
              href={tel}
              className="flex min-h-[36px] items-center gap-2 py-0.5 text-sm text-muted transition-colors hover:text-foreground sm:min-h-0"
            >
              <Phone size={13} className="opacity-50" aria-hidden /> Phone
            </a>
          </div>
        </div>
      </div>

      <p className="container-wide relative mt-8 text-xs text-muted sm:mt-10">© 2026 Ali Saqulain. All rights reserved.</p>
    </footer>
  )
}
