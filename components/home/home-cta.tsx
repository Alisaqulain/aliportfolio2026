'use client'

import { Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import { SITE, SOCIAL } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { GlassCard } from '@/components/3d/glass-card'
import { TiltCard } from '@/components/3d/tilt-card'
import { MagneticWrap } from '@/components/3d/magnetic-button'

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-background section-padding">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.04)_0%,transparent_60%)]" />

      <div className="container-wide relative">
        <Reveal depth="strong">
          <TiltCard maxRotate={2}>
            <GlassCard glow className="relative mx-auto max-w-2xl p-8 sm:p-12">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-border/70 bg-surface/60">
                  <Sparkles size={24} className="text-emerald-400" />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  Ready to build your next system?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  Whether it&apos;s a web platform, mobile app, or AI-powered product — I take ideas from concept to production deployment.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <MagneticWrap><Button href="/contact">Start a Project</Button></MagneticWrap>
                  <MagneticWrap><Button href="/projects" variant="secondary">Browse Work</Button></MagneticWrap>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground">
                    <Github size={18} />
                  </a>
                  <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground">
                    <Linkedin size={18} />
                  </a>
                  <a href={`mailto:${SITE.email}`} aria-label="Email" className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:border-foreground/25 hover:text-foreground">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </GlassCard>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
