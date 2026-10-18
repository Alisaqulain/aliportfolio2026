'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { BrandLogo } from '@/components/ui/brand-logo'
import { NAV_LINKS, SOCIAL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <div
          className={cn(
            'mx-auto flex h-14 max-w-wide items-center justify-between rounded-full border pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-5',
            scrolled || open
              ? 'border-white/[0.08] bg-[#0a0a12]/85 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md'
              : 'border-transparent bg-transparent',
          )}
        >
          <BrandLogo size="sm" />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                  isActive(link.href)
                    ? 'bg-white/[0.07] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                    : 'text-muted hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn h-10 w-10 border-transparent bg-transparent">
              <Github size={17} />
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn h-10 w-10 border-transparent bg-transparent">
              <Linkedin size={17} />
            </a>
            <Link href="/contact" className="btn btn-primary ml-1 min-h-[40px] px-5">
              Let&apos;s Build <ArrowUpRight size={15} />
            </Link>
          </div>

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={cn('absolute h-[1.5px] w-5 bg-current transition-transform duration-300', open ? 'rotate-45' : '-translate-y-[4px]')} />
            <span className={cn('absolute h-[1.5px] w-5 bg-current transition-transform duration-300', open ? '-rotate-45' : 'translate-y-[4px]')} />
          </button>
        </div>
      </header>

      {/* Mobile menu — CSS transitions only */}
      <div
        id="mobile-nav"
        className={cn(
          'fixed inset-0 z-40 bg-[#05050a]/95 transition-[opacity,visibility] duration-300 lg:hidden',
          open ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-between px-6 pb-10"
          style={{ paddingTop: 'calc(6rem + env(safe-area-inset-top))' }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="space-y-1">
            {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map((link, i) => (
              <li
                key={link.href}
                className={cn('transition-all duration-500', open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center justify-between border-b border-white/[0.06] py-4 text-3xl font-semibold tracking-tight',
                    isActive(link.href) ? 'text-gradient' : 'text-foreground/80',
                  )}
                >
                  {link.label}
                  <ArrowUpRight size={22} className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 safe-bottom">
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
              <Github size={18} />
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
              <Linkedin size={18} />
            </a>
            <Link href="/contact" className="btn btn-primary flex-1">
              Let&apos;s Build
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
