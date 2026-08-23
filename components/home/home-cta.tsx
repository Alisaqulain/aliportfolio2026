'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MessageSquare, Sparkles } from 'lucide-react'
import { SITE, SOCIAL } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'

const ORBIT_ICONS = [
  { Icon: Sparkles, angle: 0, color: 'text-emerald-400' },
  { Icon: MessageSquare, angle: 72, color: 'text-blue-400' },
  { Icon: Mail, angle: 144, color: 'text-violet-400' },
  { Icon: Github, angle: 216, color: 'text-amber-400' },
  { Icon: Linkedin, angle: 288, color: 'text-sky-400' },
]

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-background section-padding">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.04] blur-3xl" />

      <div className="container-wide relative">
        <Reveal>
          <div className="relative mx-auto max-w-2xl text-center">
            {/* Orbiting icons — desktop only */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 md:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              aria-hidden
            >
              {ORBIT_ICONS.map(({ Icon, angle, color }) => (
                <div
                  key={angle}
                  className={`absolute flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/60 ${color}`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-80px) rotate(-${angle}deg)`,
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </div>
              ))}
            </motion.div>

            <motion.div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-border/70 bg-surface/60"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={24} className="text-emerald-400" />
            </motion.div>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Ready to build your next system?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Whether it&apos;s a web platform, mobile app, or AI-powered product — I take ideas from concept to production deployment.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact">Start a Project</Button>
              <Button href="/projects" variant="secondary">Browse Work</Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-5">
              <motion.a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href={`mailto:${SITE.email}`}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
