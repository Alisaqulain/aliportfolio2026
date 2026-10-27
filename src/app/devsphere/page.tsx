import type { Metadata } from 'next'
import { ArrowUpRight, Code2, LayoutDashboard, Layers, Mail, Phone, ShoppingCart, Smartphone, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'
import { ClientIndex, ClientShowcase } from '@/components/client-projects/client-projects'
import { ClientMarquee } from '@/components/home/home-devsphere'
import { HomeProcess } from '@/components/home/home-process'
import { HomeCTA } from '@/components/home/home-cta'
import { CountUp } from '@/components/ui/count-up'
import { DEVSPHERE } from '@/lib/constants'
import { toTelHref } from '@/lib/links'
import { createPageMetadata } from '@/lib/seo'
import { clientProjects } from '@/data/projects'

export const metadata: Metadata = createPageMetadata({
  title: 'DevSphere Solutions — Founder',
  description:
    'Ali Saqulain is the founder of DevSphere Solutions — a full-stack agency shipping websites, SaaS, e-commerce, mobile apps and dashboards for clients in India, Dubai, Oman and globally.',
  path: '/devsphere',
})

const SERVICE_ICONS = [Code2, Layers, Sparkles, ShoppingCart, Smartphone, LayoutDashboard]
const SERVICE_COPY = [
  'Fast, SEO-optimised marketing and brand sites that turn visitors into enquiries.',
  'Custom web applications with auth, payments, APIs and admin panels.',
  'Multi-tenant SaaS products with subscriptions, roles and analytics.',
  'B2C and B2B stores with WhatsApp ordering, EMI, trade accounts and AI search.',
  'Cross-platform iOS & Android apps with offline mode and push notifications.',
  'CRM, inventory, billing and operations dashboards built around your workflow.',
]

export default function DevSpherePage() {
  const stats = [
    { value: `${clientProjects.filter((c) => c.devsphere).length}+`, label: 'Products shipped' },
    { value: String(DEVSPHERE.markets.length), label: 'Markets served' },
    { value: '25,000+', label: 'Customers on client platforms' },
    { value: '10', label: 'Indic languages supported' },
  ]

  return (
    <PageShell>
      <PageHero
        label={`Founder · ${DEVSPHERE.name}`}
        title={
          <>
            An agency built to <span className="text-gradient">ship real products.</span>
          </>
        }
        description={`${DEVSPHERE.tagline} I founded DevSphere and lead every build personally — discovery, architecture, engineering and launch.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={DEVSPHERE.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Visit devspheresolutions.com <ArrowUpRight size={16} />
          </a>
          <a href="#work" className="btn btn-secondary">
            See the work
          </a>
        </div>
      </PageHero>

      <section className="px-4 sm:px-8 lg:px-12">
        <div className="container-wide">
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse bg-[#07070d]/95 px-5 py-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{s.label}</dt>
                  <dd className="text-gradient text-3xl font-semibold tabular-nums tracking-tight sm:text-5xl">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="mt-8">
            <ClientMarquee />
          </div>
        </div>
      </section>

      <Section id="services">
        <SectionHeader
          label="Services"
          title={
            <>
              What DevSphere <span className="text-gradient">builds.</span>
            </>
          }
          description="One senior engineering team for the whole product — no hand-offs between agencies."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEVSPHERE.services.map((service, i) => {
            const Icon = SERVICE_ICONS[i]
            return (
              <Reveal key={service} delay={(i % 3) * 0.06} className="h-full">
                <TiltCard className="h-full">
                  <GlassCard className="h-full p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-cyan-400/10 text-violet-100">
                        <Icon size={20} strokeWidth={1.75} />
                      </div>
                      <span className="text-4xl font-semibold tracking-tighter text-white/[0.06]">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{service}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{SERVICE_COPY[i]}</p>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section id="work">
        <SectionHeader
          label="Selected work"
          title={
            <>
              Real products for <span className="text-gradient">real businesses.</span>
            </>
          }
          description="Live client platforms across e-commerce, CRM, AgriTech, EdTech, FinTech, services and sports."
        />
        <ClientShowcase className="mt-12" />
      </Section>

      <Section id="index" className="pt-0 sm:pt-0 lg:pt-0">
        <SectionHeader
          label="Project index"
          title={
            <>
              Every build, <span className="text-gradient">at a glance.</span>
            </>
          }
          description="Hover a row to preview the live site. Click to open it."
        />
        <ClientIndex className="mt-12" />
      </Section>

      <HomeProcess />

      <Section id="agency-contact" className="pt-0 sm:pt-0 lg:pt-0">
        <Reveal>
          <GlassCard hover={false} glow className="grid gap-8 p-7 sm:p-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <p className="eyebrow">Work with DevSphere</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Have a project in mind?</h2>
              <p className="mt-3 text-muted">{DEVSPHERE.location} · serving {DEVSPHERE.markets.join(', ')}</p>
            </div>
            <div className="space-y-3">
              <a href={`mailto:${DEVSPHERE.email}`} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm transition-colors hover:border-white/20">
                <Mail size={16} className="text-violet-300" /> {DEVSPHERE.email}
              </a>
              {DEVSPHERE.phones.map((p) => (
                <a key={p} href={toTelHref(p)} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm transition-colors hover:border-white/20">
                  <Phone size={16} className="text-violet-300" /> {p}
                </a>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      <HomeCTA />
    </PageShell>
  )
}
