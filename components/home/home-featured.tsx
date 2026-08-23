'use client'

import { projects } from '@/data/projects'
import { getProjectVisual } from '@/lib/visuals'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { ProjectPreview } from '@/components/ui/project-preview'

export function HomeFeatured() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const display = [...featured, ...rest].slice(0, 4)

  return (
    <section className="relative border-t border-border/60 bg-background">
      <div className="section-padding container-wide">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Featured Work</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl">Production systems shipped.</h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex min-h-[44px] items-center gap-1 self-start text-sm text-muted transition-colors hover:text-foreground sm:min-h-0 sm:self-auto"
            >
              All projects <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
          {display.map((project, i) => {
            const visual = getProjectVisual(project.slug, project.title)
            return (
              <Reveal key={project.slug} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                <Link
                  href="/projects"
                  className="group block overflow-hidden border border-border bg-surface/30 transition-all active:scale-[0.99] sm:hover:border-foreground/15 sm:hover:bg-surface-elevated/30"
                >
                  <ProjectPreview title={project.title} slug={project.slug} visual={visual} featured className="rounded-none border-0" />
                  <div className="border-t border-border/60 p-4 sm:p-6">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted sm:text-xs">{project.category}</p>
                    <h3 className="mt-1.5 text-lg font-medium sm:mt-2 sm:text-xl">{project.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted sm:mt-2">{project.description}</p>
                  </div>
                </Link>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
