import { ArrowUpRight } from 'lucide-react'
import { clientProjects } from '@/data/clients'
import { CLIENT_VISUALS, getDomainFromUrl } from '@/lib/visuals'
import { cn } from '@/lib/utils'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { SiteFavicon } from '@/components/ui/site-favicon'
import { TechIcon } from '@/components/ui/tech-icon'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

export function ClientGrid({ limit, className }: { limit?: number; className?: string }) {
  const list = limit ? clientProjects.slice(0, limit) : clientProjects

  return (
    <div className={cn('grid gap-4 md:grid-cols-2', className)}>
      {list.map((project, i) => {
        const accent = CLIENT_VISUALS[project.name]?.accent ?? '#a78bfa'
        return (
          <Reveal key={project.name} delay={(i % 2) * 0.08} className="h-full">
            <TiltCard maxRotate={4} className="h-full">
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="block h-full">
                <GlassCard className="flex h-full flex-col p-6 sm:p-7">
                  <span
                    className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)` }}
                    aria-hidden
                  />
                  <div className="flex items-center gap-4">
                    <SiteFavicon website={project.website} name={project.name} size={52} className="rounded-2xl border-white/10" />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: accent }}>
                        {project.category}
                      </p>
                    </div>
                    <span className="icon-btn shrink-0 group-hover:border-violet-400/40 group-hover:text-foreground">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        <TechIcon name={tech} size={11} />
                        {tech}
                      </span>
                    ))}
                    <span className="ml-auto font-mono text-[11px] text-muted/70">{getDomainFromUrl(project.website)}</span>
                  </div>
                </GlassCard>
              </a>
            </TiltCard>
          </Reveal>
        )
      })}
    </div>
  )
}

export function ClientProjects() {
  return (
    <Section id="client-work">
      <SectionHeader
        label="Client work"
        title={
          <>
            Built for <span className="text-gradient">real businesses.</span>
          </>
        }
        description="Production systems delivered for clients in India and Dubai."
      />
      <ClientGrid className="mt-14" />
    </Section>
  )
}
