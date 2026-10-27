import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Building2, Check } from 'lucide-react'
import { DEVSPHERE } from '@/lib/constants'
import { clientProjects } from '@/data/projects'
import { getClientAccent } from '@/lib/visuals'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { SiteShot } from '@/components/ui/site-shot'
import { CountUp } from '@/components/ui/count-up'
import { SiteFavicon } from '@/components/ui/site-favicon'

const STATS = [
  { value: `${clientProjects.filter((c) => c.devsphere).length}+`, label: 'Client products' },
  { value: '4', label: 'Markets served' },
  { value: '25,000+', label: 'End users reached' },
  { value: '4.9/5', label: 'Client ratings' },
]

const FAN = ['LaptopSecure', 'The Vega Wealth', 'Krishi Kutumb']

/** Three live client sites fanned out in 3D; they spread further on hover */
function SiteFan() {
  const sites = FAN.map((name) => clientProjects.find((c) => c.name === name)!).filter(Boolean)
  const poses = [
    'translate3d(-26%, 8%, -80px) rotateY(18deg) rotateZ(-4deg)',
    'translate3d(0, -4%, 40px) rotateY(0deg)',
    'translate3d(26%, 10%, -80px) rotateY(-18deg) rotateZ(4deg)',
  ]
  return (
    <div className="perspective group relative mx-auto aspect-[4/3] w-full max-w-[560px]" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(124,58,237,0.35)_0%,transparent_60%)]" />
      <div className="preserve-3d absolute inset-0">
        {sites.map((site, i) => (
          <div
            key={site.name}
            className="absolute left-[17%] top-[18%] w-[66%] transition-transform duration-700 [transform:var(--pose)] [transition-timing-function:var(--ease)] group-hover:[transform:var(--hover)]"
            style={
              {
                '--pose': poses[i],
                '--hover': poses[i].replace(/-?26%/, (m) => (m.startsWith('-') ? '-34%' : '34%')),
                zIndex: i === 1 ? 3 : 1,
              } as React.CSSProperties
            }
          >
            <SiteShot
              website={site.website}
              name={site.name}
              accent={getClientAccent(site.name)}
              className="aspect-[16/10] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ClientMarquee() {
  const list = clientProjects
  const doubled = [...list, ...list]
  return (
    <div data-inview className="hover-pause mask-fade-x overflow-hidden">
      <ul className="loop animate-marquee flex w-max gap-3" style={{ animationDuration: '60s' }}>
        {doubled.map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            aria-hidden={i >= list.length}
            className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] py-2 pl-2 pr-4"
          >
            <SiteFavicon website={c.website} name={c.name} size={30} className="rounded-lg border-white/10" />
            <span className="text-sm text-foreground/80">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HomeDevSphere() {
  return (
    <Section id="devsphere" className="overflow-hidden">
      <Reveal variant="scale">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#08080f] p-6 sm:p-10 lg:p-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_100%_0%,rgba(124,58,237,0.28)_0%,transparent_60%),radial-gradient(60%_50%_at_0%_100%,rgba(34,211,238,0.12)_0%,transparent_60%)]" aria-hidden />
          <div className="grid-bg mask-radial absolute inset-0 -z-10 opacity-70" aria-hidden />

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <SectionLabel>Founder</SectionLabel>
              <SectionTitle className="mt-4">
                I founded <span className="text-gradient">{DEVSPHERE.name}.</span>
              </SectionTitle>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                {DEVSPHERE.tagline} Every engagement is led by me — from discovery and pricing to architecture, build and launch.
              </p>

              <ul className="mt-7 grid max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
                {DEVSPHERE.services.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-foreground/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-200">
                      <Check size={12} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/devsphere" className="btn btn-primary group">
                  Explore agency work <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a href={DEVSPHERE.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Building2 size={15} /> devspheresolutions.com <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <SiteFan />
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-[#07070d]/95 px-5 py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{s.label}</dt>
                <dd className="text-gradient text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Trusted by businesses in {DEVSPHERE.markets.join(' · ')}
            </p>
            <ClientMarquee />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
