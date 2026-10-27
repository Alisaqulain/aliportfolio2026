import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/data/projects'
import { getProjectVisual } from '@/lib/visuals'
import { cn } from '@/lib/utils'
import { isValidHref } from '@/lib/links'
import { ProjectPreview } from '@/components/ui/project-preview'
import { TechIcon } from '@/components/ui/tech-icon'
import { TiltCard } from '@/components/3d/tilt-card'
import { GlassCard } from '@/components/3d/glass-card'

export function ProjectBlock({ project, index = 0 }: { project: Project; index?: number }) {
  const visual = getProjectVisual(project.slug, project.title)
  const flip = index % 2 === 1

  return (
    <TiltCard maxRotate={2}>
      <GlassCard as="article" className="grid lg:grid-cols-2">
        <div className={cn('border-b border-white/[0.06] lg:border-b-0', flip ? 'lg:order-2 lg:border-l' : 'lg:border-r')}>
          <ProjectPreview title={project.title} slug={project.slug} visual={visual} featured flip={flip} className="h-64 sm:h-80 lg:h-full lg:min-h-[360px]" />
        </div>

        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-muted">{project.number}</span>
            <span className="h-px w-8 bg-white/15" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: visual.accent }}>
              {project.category}
            </p>
            {project.featured && <span className="chip ml-auto border-violet-400/30 text-violet-200">Featured</span>}
          </div>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>
          {project.highlights && (
            <ul className="mt-5 space-y-2">
              {project.highlights.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-foreground/75">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: visual.accent }} />
                  {line}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech} className="chip">
                <TechIcon name={tech} size={11} />
                {tech}
              </span>
            ))}
          </div>

          {(isValidHref(project.github) || isValidHref(project.liveUrl)) && (
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              {isValidHref(project.liveUrl) && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <ExternalLink size={15} /> Live demo
                </a>
              )}
              {isValidHref(project.github) && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Github size={15} /> Source
                </a>
              )}
            </div>
          )}
        </div>
      </GlassCard>
    </TiltCard>
  )
}
