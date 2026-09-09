import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/data/projects'
import { getProjectVisual } from '@/lib/visuals'
import { cn } from '@/lib/utils'
import { isValidHref } from '@/lib/links'
import { ProjectPreview } from '@/components/ui/project-preview'
import { TechIcon } from '@/components/ui/tech-icon'

export function ProjectBlock({ project }: { project: Project }) {
  const visual = getProjectVisual(project.slug, project.title)

  return (
    <article
      className={cn(
        'group grid gap-6 border border-border bg-surface/30 p-6 transition-colors hover:border-border/90 hover:bg-surface-elevated/40 lg:grid-cols-[minmax(0,180px)_1fr_auto]',
        project.featured && 'lg:p-8',
      )}
    >
      <div>
        <p className="font-mono text-sm text-muted">{project.number}</p>
        <div className="mt-4">
          <ProjectPreview title={project.title} slug={project.slug} visual={visual} featured={project.featured} />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-background/60"
            style={{ color: visual.accent }}
          >
            <visual.icon size={16} strokeWidth={1.75} />
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">{project.category}</p>
        </div>
        <h3 className="mt-2 text-xl font-medium text-foreground">{project.title}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 border border-border px-2 py-1 font-mono text-[11px] text-muted"
            >
              <TechIcon name={tech} size={12} />
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 lg:flex-col">
        {isValidHref(project.github) && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Github size={14} /> GitHub
          </a>
        )}
        {isValidHref(project.liveUrl) && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
      </div>
    </article>
  )
}
