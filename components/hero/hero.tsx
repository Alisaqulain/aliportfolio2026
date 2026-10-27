import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Building2, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { DEVSPHERE, SITE, SOCIAL } from '@/lib/constants'
import { TechIcon } from '@/components/ui/tech-icon'
import { CountUp } from '@/components/ui/count-up'
import { RotatingText } from '@/components/ui/rotating-text'
import { HeroSceneLazy } from '@/components/3d/hero-scene-lazy'

const STATS = [
  { value: '15+', label: 'Production apps' },
  { value: '13+', label: 'Agency client builds' },
  { value: '40+', label: 'Technologies' },
  { value: '3+', label: 'Years building' },
]

const ROLES = ['AI-powered products', 'SaaS platforms', 'real-time systems', 'mobile apps', 'client websites']

const FLOATING = [
  { name: 'Next.js', label: 'Next.js', className: 'right-[30%] top-[22%]', delay: '0s' },
  { name: 'Node.js', label: 'Node.js', className: 'right-[6%] top-[34%]', delay: '-2s' },
  { name: 'OpenAI API', label: 'AI / LLM', className: 'right-[26%] bottom-[22%]', delay: '-4s' },
  { name: 'React Native', label: 'Mobile', className: 'right-[4%] bottom-[30%]', delay: '-1s' },
]

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      {/* CSS fallback glow — visible instantly, and the only visual if WebGL is unavailable */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-[22%] h-[52vmin] w-[52vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.32)_0%,rgba(99,102,241,0.14)_35%,rgba(34,211,238,0.05)_55%,transparent_70%)] lg:left-[74%] lg:top-1/2 lg:-translate-y-1/2" />
        <div className="perspective absolute inset-x-0 bottom-0 h-[45%] overflow-hidden [mask-image:linear-gradient(to_top,#000_10%,transparent)]" data-inview>
          <div className="grid-floor loop opacity-50" />
        </div>
      </div>

      <HeroSceneLazy className="-z-[5]" />

      {/* readability scrims */}
      <div className="pointer-events-none absolute inset-0 -z-[4] bg-gradient-to-b from-transparent via-transparent to-background" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-[4] hidden bg-gradient-to-r from-background/80 via-background/20 to-transparent lg:block" aria-hidden />

      {/* desktop floating chips around the 3D object */}
      <div className="pointer-events-none absolute inset-0 -z-[3] hidden xl:block" aria-hidden>
        {FLOATING.map((chip) => (
          <div
            key={chip.label}
            data-inview
            className={`absolute ${chip.className}`}
          >
            <div
              className="loop animate-float flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0c0c16]/80 px-3.5 py-2.5 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]"
              style={{ animationDelay: chip.delay }}
            >
              <TechIcon name={chip.name} size={16} />
              <span className="font-mono text-[11px] text-foreground/80">{chip.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex min-h-[100svh] flex-col justify-end px-4 pb-12 pt-[54svh] sm:px-8 sm:pb-16 lg:justify-center lg:px-12 lg:pb-20 lg:pt-32">
        <div className="container-wide">
          <div className="hero-in max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4">
                <Image
                  src="/images/avatar.svg"
                  alt={SITE.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full border border-white/10"
                  priority
                />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{SITE.title}</span>
              </div>
              <Link
                href="/devsphere"
                className="group inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-violet-100 transition-colors hover:border-violet-300/50"
              >
                <Building2 size={13} /> Founder · {DEVSPHERE.name}
                <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <h1 className="mt-6 text-[clamp(3rem,11vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
              <span className="text-gradient-soft block">Ali</span>
              <span className="text-gradient block pb-2">Saqulain</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
              I design, build &amp; ship{' '}
              <RotatingText words={ROLES} className="font-medium text-foreground" />
              <br className="hidden sm:block" /> — from first requirement to production deploy.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-violet-300" /> {SITE.location}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
              <span>{SITE.subtitle}</span>
            </div>

            <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
              <Link href="/projects" className="btn btn-primary group">
                View my work
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Let&apos;s talk <ArrowUpRight size={16} />
              </Link>
              <div className="flex gap-2 sm:ml-2">
                <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
                  <Github size={17} />
                </a>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
                  <Linkedin size={17} />
                </a>
                <a href={`mailto:${SITE.email}`} aria-label="Email" className="icon-btn">
                  <Mail size={17} />
                </a>
              </div>
            </div>
          </div>

          <dl className="hero-in mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-4 lg:mt-16">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse bg-[#07070d]/90 px-4 py-4 sm:px-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{stat.label}</dt>
                <dd className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" aria-hidden>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Scroll</span>
        <span className="relative h-10 w-[22px] rounded-full border border-white/20">
          <span className="animate-float absolute left-[8.5px] top-2 h-2 w-[3px] rounded-full bg-white/70" style={{ animationDuration: '2s' }} />
        </span>
      </div>
    </section>
  )
}
