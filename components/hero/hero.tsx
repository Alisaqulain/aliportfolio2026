'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { PAGE_LINKS, SITE, SOCIAL } from '@/lib/constants'
import { PAGE_ICONS } from '@/lib/visuals'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { FloatingTechIcons } from '@/components/home/floating-tech-icons'

const Hero3DScene = dynamic(() => import('@/components/home/hero-3d-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-background" aria-hidden />,
})

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const QUICK_STATS = [
  { value: '15+', label: 'Production Apps' },
  { value: 'India + Dubai', label: 'Client Delivery' },
  { value: 'Full-Stack', label: 'Web · Mobile · AI' },
]

function StatusTerminal({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="rounded-xl border border-border/80 bg-background/30 p-1 backdrop-blur-md">
        <div className="rounded-lg border border-border/50 bg-surface/60 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted">system.status</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed text-muted sm:space-y-2 sm:text-xs">
            <p><span className="text-emerald-400">▸</span> role: forward_deployed_engineer</p>
            <p><span className="text-emerald-400">▸</span> stack: next.js · node · mongodb · ai</p>
            <p><span className="text-emerald-400">▸</span> deploy: vercel · render · linux_vps</p>
            <p><span className="text-emerald-400">▸</span> status: <span className="text-foreground">building_production_systems</span></p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-4 sm:mt-5 sm:gap-3 sm:pt-5">
            {QUICK_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xs font-semibold text-foreground sm:text-sm">{stat.value}</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase leading-tight tracking-wider text-muted sm:mt-1 sm:text-[9px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Hero3DScene />
      <FloatingTechIcons />

      {/* Gradient overlays — stronger on mobile for text readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,#070708_72%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/90 to-background/30 max-lg:via-background/95 max-lg:to-background/70" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/80 max-lg:from-background/90" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center section-padding pb-24 pt-20 sm:pb-28 sm:pt-28">
        <div className="container-wide grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={item} className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/80 bg-background/50 px-3 py-1.5 backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-2">
              <Image src="/images/avatar.svg" alt={SITE.name} width={32} height={32} className="h-7 w-7 shrink-0 rounded-full border border-border/70 sm:h-8 sm:w-8" priority />
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px] sm:tracking-[0.22em]">Forward Deployed Engineer</span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden />
            </motion.div>

            <motion.h1 variants={item} className="mt-5 max-w-4xl sm:mt-7">
              <span className="block text-[clamp(2.25rem,10vw,5rem)] font-semibold leading-[1.02] tracking-tight">
                {SITE.name}
              </span>
              <span className="mt-3 block text-[clamp(1.15rem,4.5vw,2.25rem)] font-medium leading-[1.2] tracking-tight text-muted sm:mt-4 sm:leading-[1.15]">
                I build, deploy, and{' '}
                <span className="text-foreground">scale production systems.</span>
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg">
              {SITE.title} & {SITE.subtitle} in {SITE.location}. Full-stack engineer turning business requirements into production-ready web, mobile, and AI-powered products.
            </motion.p>

            <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-muted sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
                <MapPin size={13} className="shrink-0 sm:h-3.5 sm:w-3.5" /> {SITE.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-muted sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
                <motion.span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 sm:h-2 sm:w-2"
                  animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  aria-hidden
                />
                <span className="truncate">{SITE.availabilityStatus}</span>
              </span>
            </motion.div>

            <motion.div variants={item} className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button href="/projects" className="w-full sm:w-auto">View Projects</Button>
              <Button href="/contact" variant="secondary" className="w-full sm:w-auto">Let&apos;s Work Together</Button>
            </motion.div>

            <motion.div variants={item} className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted sm:mt-6 sm:gap-4">
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center transition-colors hover:text-foreground sm:min-h-0">GitHub</a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center transition-colors hover:text-foreground sm:min-h-0">LinkedIn</a>
              <a href={`mailto:${SITE.email}`} className="inline-flex min-h-[44px] items-center gap-1 transition-colors hover:text-foreground sm:min-h-0">
                <Mail size={12} /> Email
              </a>
            </motion.div>

            {/* Mobile stats strip */}
            <motion.div variants={item} className="mt-8 grid grid-cols-3 gap-2 lg:hidden">
              {QUICK_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/70 bg-background/40 px-2 py-3 text-center backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 font-mono text-[8px] uppercase leading-tight tracking-wider text-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Desktop terminal panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <StatusTerminal />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:bottom-8 sm:flex safe-bottom"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown size={16} />
        </div>
      </motion.div>
    </section>
  )
}

export function HomeExplore() {
  return (
    <section className="section-padding border-t border-border/60 bg-background">
      <div className="container-wide">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Navigate</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl">
            Explore the full portfolio.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {PAGE_LINKS.map((page, i) => {
            const Icon = PAGE_ICONS[page.label]

            return (
              <Reveal key={page.href} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                <Link
                  href={page.href}
                  className="group relative flex min-h-[120px] flex-col justify-between overflow-hidden border border-border bg-surface/20 p-5 transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:p-6 sm:hover:border-foreground/20 sm:hover:bg-surface-elevated/40"
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-foreground/[0.03] blur-2xl transition-all group-hover:bg-foreground/[0.06]" />
                  <div>
                    <motion.div
                      className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-foreground transition-all group-hover:border-foreground/25 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] sm:mb-4 sm:h-11 sm:w-11"
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                      transition={{ duration: 0.35 }}
                    >
                      {Icon ? <Icon size={20} strokeWidth={1.75} /> : null}
                    </motion.div>
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">{page.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{page.description}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-foreground sm:mt-6">
                    Open <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
