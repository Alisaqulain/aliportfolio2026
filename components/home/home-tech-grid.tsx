import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { skillCategories } from '@/data/skills'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TechOrbit } from '@/components/3d/tech-orbit'

export function HomeTechGrid() {
  return (
    <Section id="stack" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionLabel>Tech stack</SectionLabel>
          <SectionTitle className="mt-4">
            A toolkit that covers <span className="text-gradient">every layer.</span>
          </SectionTitle>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            From pixel-perfect interfaces to real-time backends, AI integrations and the servers they run on.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {skillCategories.slice(0, 6).map((cat) => (
              <div key={cat.id} className="border-l border-violet-400/30 pl-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{cat.label}</dt>
                <dd className="mt-1 text-sm text-foreground/85">{cat.items.slice(0, 3).join(' · ')}</dd>
              </div>
            ))}
          </dl>

          <Link href="/skills" className="btn btn-secondary mt-10">
            Explore all skills <ArrowUpRight size={15} />
          </Link>
        </Reveal>

        <Reveal variant="scale" delay={0.1}>
          <TechOrbit />
        </Reveal>
      </div>
    </Section>
  )
}
