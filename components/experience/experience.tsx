import { experience } from '@/data/experience'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'

export function Experience() {
  return (
    <Section id="experience" className="pt-28">
      <SectionLabel>Experience</SectionLabel>
      <SectionTitle>Production engineering roles</SectionTitle>

      <div className="mt-10 space-y-0 border-l border-border pl-6 sm:pl-8">
        {experience.map((item, i) => (
          <Reveal key={item.company} delay={i * 0.05}>
            <article className="relative pb-12 last:pb-0">
              <span className="absolute -left-[calc(1.5rem+1px)] top-1.5 h-2.5 w-2.5 rounded-full bg-foreground sm:-left-[calc(2rem+1px)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-medium text-foreground">{item.role}</h3>
                <p className="font-mono text-xs text-muted">
                  {item.startDate} – {item.endDate}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {item.company} · {item.location}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {item.description.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
