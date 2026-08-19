import { Reveal } from '@/components/ui/reveal'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'

const points = [
  'Product thinking',
  'System design',
  'Full-stack development',
  'Deployment',
  'Client collaboration',
  'Production ownership',
]

export function About() {
  return (
    <Section id="about" className="pt-28">
      <SectionLabel>Engineering Philosophy</SectionLabel>
      <SectionTitle>Engineering beyond the code.</SectionTitle>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              I work across the entire product lifecycle — from understanding business requirements and designing system architecture to development, deployment, and production delivery.
            </p>
            <p>
              I specialize in building products that connect engineering decisions with real business requirements.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {points.map((point) => (
              <li key={point} className="border-l border-border pl-4 font-mono text-sm text-foreground">
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
