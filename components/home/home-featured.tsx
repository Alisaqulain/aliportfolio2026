'use client'

import { projects } from '@/data/projects'
import { getProjectVisual } from '@/lib/visuals'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { ProjectPreview } from '@/components/ui/project-preview'

export function HomeFeatured() {
  const featured = projects.filter((p) => p.featured).slice(0, 2)

  return (
    <section className="relative border-t border-border/60 bg-background">
      <div className="section-padding container-wide">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Featured Work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Production systems shipped.</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground">
              All projects <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {featured.map((project, i) => {
            const visual = getProjectVisual(project.slug, project.title)
            return (
              <Reveal key={project.slug} delay={i * 0.08}>
                <Link
                  href="/projects"
                  className="group block overflow-hidden border border-border bg-surface/30 transition-all hover:border-foreground/15 hover:bg-surface-elevated/30"
                >
                  <ProjectPreview title={project.title} slug={project.slug} visual={visual} featured className="rounded-none border-0" />
                  <div className="border-t border-border/60 p-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">{project.category}</p>
                    <h3 className="mt-2 text-xl font-medium">{project.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{project.description}</p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
