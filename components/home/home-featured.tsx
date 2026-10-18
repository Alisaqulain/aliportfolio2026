import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { getProjectVisual } from '@/lib/visuals'
import { getProjectHref, isExternalHref } from '@/lib/links'
import { Section, SectionHeader } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { ProjectPreview } from '@/components/ui/project-preview'
import { TechIcon } from '@/components/ui/tech-icon'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

export function HomeFeatured() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const display = [...featured, ...rest].slice(0, 4)

  return (
    <Section id="work">
      <SectionHeader
        label="Selected work"
        title={
          <>
            Products I&apos;ve <span className="text-gradient">designed &amp; shipped.</span>
          </>
        }
        description="AI, real-time, fintech and full-stack platforms — built end to end."
        action={
          <Link href="/projects" className="btn btn-secondary">
            All projects <ArrowUpRight size={15} />
          </Link>
        }
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {display.map((project, i) => {
          const visual = getProjectVisual(project.slug, project.title)
          const href = getProjectHref(project)
          const external = isExternalHref(href)
          const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

          return (
            <Reveal key={project.slug} delay={(i % 2) * 0.1}>
              <TiltCard maxRotate={4} className="h-full">
                <Link href={href} {...linkProps} className="block h-full">
                  <GlassCard className="flex h-full flex-col">
                    <ProjectPreview title={project.title} slug={project.slug} visual={visual} featured flip={i % 2 === 1} />
                    <div className="flex flex-1 flex-col border-t border-white/[0.06] p-6 sm:p-7">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: visual.accent }}>
                          {project.category}
                        </p>
                        <span className="font-mono text-xs text-muted">{project.number}</span>
                      </div>
                      <h3 className="mt-3 flex items-center gap-2 text-2xl font-semibold tracking-tight">
                        {project.title}
                        <ArrowUpRight
                          size={20}
                          className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                        />
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span key={tech} className="chip">
                            <TechIcon name={tech} size={11} />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
