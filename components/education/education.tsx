import { education } from '@/data/skills'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'

export function Education() {
  return (
    <Section id="education">
      <SectionLabel>Education</SectionLabel>
      <SectionTitle>Academic background</SectionTitle>

      <div className="mt-8 max-w-2xl border border-border p-6">
        <h3 className="text-lg font-medium">{education.degree}</h3>
        <p className="mt-2 text-sm text-muted">
          {education.location} · {education.period} · {education.status}
        </p>
      </div>
    </Section>
  )
}
