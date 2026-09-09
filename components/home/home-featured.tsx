'use client'

import { projects } from '@/data/projects'
import { getProjectVisual } from '@/lib/visuals'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FolderKanban } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { AnimatedSectionHeader } from '@/components/ui/animated-section-header'
import { ProjectPreview } from '@/components/ui/project-preview'
import { TechIcon } from '@/components/ui/tech-icon'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'
import { getProjectHref, isExternalHref } from '@/lib/links'

export function HomeFeatured() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const display = [...featured, ...rest].slice(0, 4)

  return (
    <section className="scene-3d relative border-t border-border/60 bg-background">
      <div className="section-padding container-wide">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <AnimatedSectionHeader
            icon={FolderKanban}
            label="Featured Work"
            title="Production systems shipped."
            description="Selected builds spanning AI, real-time, fintech, and full-stack platforms."
          />
          <Link
            href="/projects"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1 self-start text-sm text-muted transition-colors hover:text-foreground sm:min-h-0 sm:self-end"
          >
            All projects <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {display.map((project, i) => {
            const visual = getProjectVisual(project.slug, project.title)
            const Icon = visual.icon
            const href = getProjectHref(project)
            const external = isExternalHref(href)

            const card = (
              <GlassCard className="group/card overflow-hidden transition-all hover:border-foreground/15">
                <ProjectPreview title={project.title} slug={project.slug} visual={visual} featured className="rounded-none border-0" />
                <div className="border-t border-border/60 p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-background/50"
                      style={{ color: visual.accent }}
                    >
                      <Icon size={14} strokeWidth={1.75} />
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted sm:text-xs">{project.category}</p>
                  </div>
                  <h3 className="mt-2 flex items-center gap-2 text-lg font-medium sm:text-xl">
                    {project.title}
                    {external && <ExternalLink size={14} className="text-muted opacity-0 transition-opacity group-hover/card:opacity-100" aria-hidden />}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted sm:mt-2">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/30 px-2 py-0.5 font-mono text-[9px] text-muted">
                        <TechIcon name={tech} size={10} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )

            return (
              <Reveal key={project.slug} delay={i * 0.08}>
                <TiltCard maxRotate={4}>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                      {card}
                    </a>
                  ) : (
                    <Link href={href} className="block">
                      {card}
                    </Link>
                  )}
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
