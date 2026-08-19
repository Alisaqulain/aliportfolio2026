import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { clientProjects } from '@/data/clients'
import { CLIENT_VISUALS } from '@/lib/visuals'
import { Reveal } from '@/components/ui/reveal'
import { SiteFavicon } from '@/components/ui/site-favicon'
import { TechIcon } from '@/components/ui/tech-icon'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'

export function ClientProjects() {
  return (
    <Section id="client-work" className="bg-surface/40">
      <SectionLabel>Client Work</SectionLabel>
      <SectionTitle>Selected Client Work</SectionTitle>
      <p className="mt-4 max-w-2xl text-muted">Production systems built for real businesses.</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {clientProjects.map((project, i) => {
          const visual = CLIENT_VISUALS[project.name] ?? {
            initials: project.name.slice(0, 2).toUpperCase(),
            accent: '#a1a1aa',
            gradient: 'from-zinc-500/20 to-transparent',
          }

          return (
            <Reveal key={project.name} delay={i * 0.04}>
              <article className="group overflow-hidden border border-border bg-background/40 transition-colors hover:bg-surface-elevated/20">
                <div className="relative border-b border-border/60 p-5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-80`} />
                  <div className="relative flex items-center gap-4">
                    <SiteFavicon website={project.website} name={project.name} size={48} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-medium">{project.name}</h3>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">{project.category}</p>
                      <p className="mt-1 truncate font-mono text-[11px] text-muted/80">
                        {project.website.replace('https://', '')}
                      </p>
                    </div>
                    <Link
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-border p-2 text-muted transition-colors hover:text-foreground"
                      aria-label={`Visit ${project.name}`}
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted"
                      >
                        <TechIcon name={tech} size={12} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
