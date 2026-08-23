'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandLogo } from '@/components/ui/brand-logo'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react'
import { NAV_LINKS, SOCIAL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300',
          scrolled && 'border-border/70 bg-background/85 backdrop-blur-md',
          open && 'border-border/70 bg-background/95 backdrop-blur-md',
        )}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div
          className={cn(
            'container-wide flex items-center justify-between px-4 transition-all duration-300 sm:px-8 lg:px-12',
            scrolled || open ? 'h-14' : 'h-16',
          )}
        >
          <BrandLogo size="sm" />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm transition-colors',
                  isActive(link.href) ? 'text-foreground' : 'text-muted hover:text-foreground',
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 h-px w-full bg-foreground/70"
                    aria-hidden
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-foreground"
            >
              <Github size={18} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-foreground"
            >
              <Linkedin size={18} />
            </a>
            <Button href="/contact" variant="secondary" className="ml-2">
              Let&apos;s Build
            </Button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-elevated/50 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.nav
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 z-40 border-b border-border bg-background/98 backdrop-blur-xl lg:hidden"
              style={{ top: 'calc(3.5rem + env(safe-area-inset-top))' }}
              aria-label="Mobile"
            >
              <div className="container-wide flex flex-col gap-1 px-4 py-4 sm:px-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'flex min-h-[48px] items-center justify-between rounded-lg px-3 text-base transition-colors',
                        isActive(link.href)
                          ? 'bg-surface-elevated/60 text-foreground'
                          : 'text-muted hover:bg-surface/40 hover:text-foreground',
                      )}
                    >
                      {link.label}
                      <ArrowUpRight size={16} className="opacity-40" />
                    </Link>
                  </motion.div>
                ))}

                <div className="mt-4 flex items-center gap-4 border-t border-border/60 pt-4">
                  <a
                    href={SOCIAL.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:text-foreground"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:text-foreground"
                  >
                    <Linkedin size={20} />
                  </a>
                  <Button href="/contact" className="flex-1">
                    Let&apos;s Build
                  </Button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
