'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PAGE_LINKS, SITE, SOCIAL } from '@/lib/constants'
import { PAGE_ICONS } from '@/lib/visuals'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { FloatingTechIcons } from '@/components/home/floating-tech-icons'
import { GlassCard } from '@/components/3d/glass-card'
import { TiltCard } from '@/components/3d/tilt-card'
import { MagneticWrap } from '@/components/3d/magnetic-button'
import { TechIcon } from '@/components/ui/tech-icon'
import { useLiteMode } from '@/lib/hooks/use-lite-mode'
import { EASE } from '@/lib/3d/depth'

const Hero3DScene = dynamic(() => import('@/components/home/hero-3d-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-background" aria-hidden />,
})

const QUICK_STATS = [
  { value: '15+', label: 'Production Apps', icon: 'React.js' },
  { value: 'India + Dubai', label: 'Client Delivery', icon: 'Node.js' },
  { value: 'Full-Stack', label: 'Web · Mobile · AI', icon: 'OpenAI API' },
]

const HERO_STACK = ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'MongoDB', 'Docker']

function TypingTerminal() {
  const lines = [
    'role: forward_deployed_engineer',
    'stack: next.js · node · mongodb · ai',
    'deploy: vercel · render · linux_vps',
    'status: building_production_systems',
  ]

  return (
    <GlassCard glow depth="front" className="hidden lg:block">
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <motion.span className="h-2.5 w-2.5 rounded-full bg-red-400/80" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
          <motion.span className="h-2.5 w-2.5 rounded-full bg-green-400/80" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted">system.status</span>
        </div>
        <div className="space-y-2 font-mono text-[11px] leading-relaxed text-muted sm:text-xs">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.4, ease: EASE }}
            >
              <span className="text-emerald-400">▸</span>{' '}
              {i === lines.length - 1 ? (
                <span className="text-foreground">{line}</span>
              ) : (
                line
              )}
            </motion.p>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-4 sm:mt-5 sm:gap-3 sm:pt-5">
          {QUICK_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.4 }}
            >
              <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center">
                <TechIcon name={stat.icon} size={14} />
              </div>
              <p className="text-xs font-semibold text-foreground sm:text-sm">{stat.value}</p>
              <p className="mt-0.5 font-mono text-[8px] uppercase leading-tight tracking-wider text-muted sm:text-[9px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-4">
          {HERO_STACK.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.05 }}
              className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/40 px-2 py-0.5 font-mono text-[9px] text-muted"
            >
              <TechIcon name={tech} size={10} />
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const lite = useLiteMode()
  const show3D = !reduce && !lite

  return (
    <section className="scene-3d relative min-h-[100svh] overflow-hidden">
      {show3D && <Hero3DScene />}
      {show3D && <FloatingTechIcons />}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,#070708_72%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/90 to-background/30 max-lg:via-background/95 max-lg:to-background/70" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/80 max-lg:from-background/90" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center section-padding pb-24 pt-20 sm:pb-28 sm:pt-28">
        <div className="container-wide grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <TiltCard enableTilt={!reduce}>
            <GlassCard glow className="p-6 sm:p-8 lg:p-10">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/80 bg-background/50 px-3 py-1.5 backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-2"
                >
                  <Image src="/images/avatar.svg" alt={SITE.name} width={32} height={32} className="h-7 w-7 shrink-0 rounded-full border border-border/70 sm:h-8 sm:w-8" priority />
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px]">Forward Deployed Engineer</span>
                  <motion.span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    aria-hidden
                  />
                </motion.div>

                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                  className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/80 sm:mt-6 sm:text-sm"
                >
                  <Sparkles size={14} /> Hello, I&apos;m
                </motion.p>

                <motion.h1
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                  className="mt-2 max-w-4xl sm:mt-3"
                >
                  <span className="block text-[clamp(2.25rem,10vw,5rem)] font-semibold leading-[1.02] tracking-tight">
                    {SITE.name}
                  </span>
                  <span className="mt-3 block text-[clamp(1.15rem,4.5vw,2.25rem)] font-medium leading-[1.2] tracking-tight text-muted sm:leading-[1.15]">
                    {SITE.title}.{' '}
                    <span className="text-foreground">Building scalable web & mobile apps.</span>
                  </span>
                </motion.h1>

                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
                  className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg"
                >
                  {SITE.subtitle} in {SITE.location}. Full-stack engineer turning business requirements into production-ready web, mobile, and AI-powered products.
                </motion.p>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-muted sm:px-3 sm:py-1.5 sm:text-sm">
                    <MapPin size={13} className="shrink-0 text-emerald-400/70" /> {SITE.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-muted sm:px-3 sm:py-1.5 sm:text-sm">
                    <motion.span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />
                    {SITE.availabilityStatus}
                  </span>
                </motion.div>

                {/* Tech stack pills */}
                <motion.div
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="mt-5 flex flex-wrap gap-1.5"
                >
                  {HERO_STACK.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/30 px-2.5 py-1 font-mono text-[10px] text-muted"
                    >
                      <TechIcon name={tech} size={11} />
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-3"
                >
                  <MagneticWrap><Button href="/projects" className="w-full sm:w-auto">View Projects</Button></MagneticWrap>
                  <MagneticWrap><Button href="/contact" variant="secondary" className="w-full sm:w-auto">Contact Me</Button></MagneticWrap>
                </motion.div>

                <motion.div
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="mt-5 flex flex-wrap gap-3 sm:mt-6"
                >
                  {[
                    { href: SOCIAL.github, label: 'GitHub', Icon: Github },
                    { href: SOCIAL.linkedin, label: 'LinkedIn', Icon: Linkedin },
                    { href: `mailto:${SITE.email}`, label: 'Email', Icon: Mail },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={label !== 'Email' ? '_blank' : undefined}
                      rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                      data-cursor="link"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/30 px-3 py-2 font-mono text-xs text-muted transition-all hover:border-foreground/20 hover:text-foreground"
                    >
                      <Icon size={14} /> {label}
                    </a>
                  ))}
                </motion.div>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.5 }}
                  className="mt-8 grid grid-cols-3 gap-2 lg:hidden"
                >
                  {QUICK_STATS.map((stat) => (
                    <div key={stat.label} className="rounded-lg border border-border/70 bg-background/40 px-2 py-3 text-center backdrop-blur-sm">
                      <div className="mx-auto mb-1 flex h-5 w-5 items-center justify-center">
                        <TechIcon name={stat.icon} size={12} />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                      <p className="mt-1 font-mono text-[8px] uppercase leading-tight tracking-wider text-muted">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </GlassCard>
          </TiltCard>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            <TypingTerminal />
          </motion.div>
        </div>
      </div>

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
    <section className="scene-3d section-padding border-t border-border/60 bg-background">
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
                <TiltCard maxRotate={4}>
                  <Link
                    href={page.href}
                    data-cursor="view"
                    className="group relative flex min-h-[120px] flex-col justify-between overflow-hidden border border-border bg-surface/20 p-5 transition-all sm:min-h-0 sm:p-6 sm:hover:border-foreground/20 sm:hover:bg-surface-elevated/40"
                  >
                    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-foreground/[0.03] blur-2xl transition-all group-hover:bg-foreground/[0.06]" />
                    <div>
                      <motion.div
                        className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-foreground sm:mb-4 sm:h-11 sm:w-11"
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
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
