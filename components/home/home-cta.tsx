import { ArrowRight, Mail } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'

/** Closing call-to-action with CSS 3D spinning rings */
export function HomeCTA() {
  return (
    <section className="px-4 pb-24 pt-8 sm:px-8 lg:px-12 lg:pb-32">
      <Reveal variant="scale" className="container-wide">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0a0a14] px-6 py-20 text-center sm:px-12 sm:py-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgba(124,58,237,0.45)_0%,rgba(34,211,238,0.12)_40%,transparent_70%)]" aria-hidden />
          <div className="grid-bg mask-radial absolute inset-0 -z-10 opacity-80" aria-hidden />

          {/* 3D rings */}
          <div data-inview className="perspective pointer-events-none absolute left-1/2 top-full -z-10 h-0 w-0" aria-hidden>
            {[520, 760, 1000].map((s, i) => (
              <div
                key={s}
                className="loop absolute rounded-full border border-violet-300/20"
                style={{
                  width: s,
                  height: s,
                  left: -s / 2,
                  top: -s / 2,
                  animation: `ring-spin ${30 + i * 12}s linear infinite ${i % 2 ? 'reverse' : 'normal'}`,
                  borderStyle: i === 1 ? 'dashed' : 'solid',
                }}
              />
            ))}
          </div>

          <p className="eyebrow justify-center">Open to new projects</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Have a system <span className="text-gradient">worth building?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Web platform, mobile app, or AI-powered product — I take ideas from concept to production deployment.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact">
              Start a project <ArrowRight size={16} />
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="secondary">
              <Mail size={16} /> {SITE.email}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
