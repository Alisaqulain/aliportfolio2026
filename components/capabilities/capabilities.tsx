import { capabilities } from '@/data/skills'
import { CAPABILITY_ICONS } from '@/lib/visuals'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'

export function Capabilities() {
  return (
    <Section id="capabilities">
      <SectionLabel>Capabilities</SectionLabel>
      <SectionTitle>What I build</SectionTitle>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item, i) => {
          const Icon = CAPABILITY_ICONS[item.title] ?? CAPABILITY_ICONS['Full-Stack Products']

          return (
            <Reveal key={item.title} delay={i * 0.03}>
              <div className="h-full border border-border p-5 transition-colors hover:bg-surface-elevated/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-background/50 text-foreground">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
