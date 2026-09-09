'use client'

import { useState } from 'react'
import { Copy, Check, Mail, Phone } from 'lucide-react'
import { SITE, SOCIAL } from '@/lib/constants'
import { toTelHref } from '@/lib/links'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionTitle } from '@/components/ui/section'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const mailto = `mailto:${SITE.email}`
  const tel = toTelHref(SITE.phone)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(SITE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Section id="contact" className="bg-surface/40 pt-28">
      <Reveal>
        <SectionTitle>Have a system worth building?</SectionTitle>
        <p className="mt-4 max-w-2xl text-muted">
          Whether it&apos;s a new product, an existing platform that needs engineering help, or a system that needs to move from idea to production — let&apos;s talk.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
        <Button href={mailto}>Email Me</Button>
        <Button href={SOCIAL.linkedin} variant="secondary" external>LinkedIn</Button>
        <Button href={SOCIAL.github} variant="secondary" external>GitHub</Button>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 space-y-3 font-mono text-sm text-muted">
        <a href={mailto} className="flex items-center gap-2 transition-colors hover:text-foreground">
          <Mail size={14} aria-hidden /> {SITE.email}
        </a>
        <a href={tel} className="flex items-center gap-2 transition-colors hover:text-foreground">
          <Phone size={14} aria-hidden /> {SITE.phone}
        </a>
        <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground">
          {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </Reveal>
    </Section>
  )
}
