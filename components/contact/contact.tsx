'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { SITE, SOCIAL } from '@/lib/constants'
import { toTelHref } from '@/lib/links'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

/** Holographic 3D business card */
function ContactCard() {
  return (
    <TiltCard maxRotate={14} className="mx-auto w-full max-w-[440px]">
      <div className="card relative aspect-[1.6/1] overflow-hidden p-6 sm:p-7">
        <span className="spotlight opacity-100" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(139,92,246,0.45)_0%,rgba(34,211,238,0.12)_45%,transparent_70%)]" aria-hidden />
        <div className="grid-bg absolute inset-0 -z-10 opacity-60" aria-hidden />
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <Image src="/images/logo.svg" alt="" width={40} height={40} className="rounded-lg" />
            <span className="chip border-emerald-400/30 text-emerald-300">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> Available
            </span>
          </div>
          <div>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{SITE.name}</p>
            <p className="mt-1 text-sm text-muted">{SITE.title}</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-foreground/70">
              <span>{SITE.email}</span>
              <span>{SITE.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const mailto = `mailto:${SITE.email}`
  const tel = toTelHref(SITE.phone)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = mailto
    }
  }

  const channels = [
    { icon: Mail, label: 'Email', value: SITE.email, href: mailto },
    { icon: Phone, label: 'Phone', value: SITE.phone, href: tel },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect professionally', href: SOCIAL.linkedin, external: true },
    { icon: Github, label: 'GitHub', value: 'Browse my code', href: SOCIAL.github, external: true },
  ]

  return (
    <Section id="contact" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal variant="scale" className="lg:order-2">
          <ContactCard />
        </Reveal>

        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {channels.map(({ icon: Icon, label, value, href, external }, i) => (
              <Reveal key={label} delay={i * 0.06} className="h-full">
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="block h-full"
                >
                  <GlassCard className="flex h-full items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-cyan-400/10 text-violet-100">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</p>
                      <p className="mt-0.5 truncate text-sm text-foreground">{value}</p>
                    </div>
                    <ArrowUpRight size={16} className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </GlassCard>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25} className="mt-6 flex flex-wrap items-center gap-3">
            <a href={mailto} className="btn btn-primary">
              <Mail size={16} /> Email me
            </a>
            <button type="button" onClick={copyEmail} className="btn btn-secondary" aria-live="polite">
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} className="text-violet-300" /> {SITE.location}
            </span>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
