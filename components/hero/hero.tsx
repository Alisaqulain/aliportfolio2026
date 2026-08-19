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

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Hero3DScene />

      {/* Gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,#070708_72%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/75 to-background/20" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/60" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center section-padding pb-28 pt-28">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={item} className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-background/40 px-4 py-2 backdrop-blur-sm">
              <Image src="/images/avatar.svg" alt={SITE.name} width={32} height={32} className="rounded-full border border-border/70" priority />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Forward Deployed Engineer</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden />
            </motion.div>

            <motion.h1 variants={item} className="mt-7 max-w-4xl">
              <span className="block text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.0] tracking-tight">
                {SITE.name}
              </span>
              <span className="mt-4 block text-[clamp(1.35rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-tight text-muted">
                I build, deploy, and{' '}
                <span className="text-foreground">scale production systems.</span>
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {SITE.title} & {SITE.subtitle} in {SITE.location}. Full-stack engineer turning business requirements into production-ready web, mobile, and AI-powered products.
            </motion.p>

            <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/30 px-3 py-1.5">
                <MapPin size={14} /> {SITE.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/30 px-3 py-1.5">
                <motion.span
                  className="h-2 w-2 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  aria-hidden
                />
                {SITE.availabilityStatus}
              </span>
            </motion.div>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <Button href="/projects">View Projects</Button>
              <Button href="/contact" variant="secondary">Let&apos;s Work Together</Button>
            </motion.div>

            <motion.div variants={item} className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-muted">
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">GitHub</a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">LinkedIn</a>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
                <Mail size={12} /> Email
              </a>
            </motion.div>
          </motion.div>

          {/* Right panel — command terminal + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="rounded-xl border border-border/80 bg-background/30 p-1 backdrop-blur-md">
              <div className="rounded-lg border border-border/50 bg-surface/60 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted">system.status</span>
                </div>
                <div className="space-y-2 font-mono text-xs leading-relaxed text-muted">
                  <p><span className="text-emerald-400">▸</span> role: forward_deployed_engineer</p>
                  <p><span className="text-emerald-400">▸</span> stack: next.js · node · mongodb · ai</p>
                  <p><span className="text-emerald-400">▸</span> deploy: vercel · render · linux_vps</p>
                  <p><span className="text-emerald-400">▸</span> status: <span className="text-foreground">building_production_systems</span></p>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border/60 pt-5">
                  {QUICK_STATS.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
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
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore the full portfolio.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAGE_LINKS.map((page, i) => {
            const Icon = PAGE_ICONS[page.label]

            return (
              <Reveal key={page.href} delay={i * 0.05}>
                <Link
                  href={page.href}
                  className="group relative flex h-full flex-col justify-between overflow-hidden border border-border bg-surface/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-surface-elevated/40"
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-foreground/[0.03] blur-2xl transition-all group-hover:bg-foreground/[0.06]" />
                  <div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-foreground transition-all group-hover:border-foreground/25 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]">
                      {Icon ? <Icon size={20} strokeWidth={1.75} /> : null}
                    </div>
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">{page.label}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{page.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm text-foreground">
                    Open <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
