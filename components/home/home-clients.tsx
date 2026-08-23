'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { clientProjects } from '@/data/clients'
import { CLIENT_VISUALS } from '@/lib/visuals'
import { Reveal } from '@/components/ui/reveal'
import { SiteFavicon } from '@/components/ui/site-favicon'
import { TechIcon } from '@/components/ui/tech-icon'

export function HomeClients() {
  const preview = clientProjects.slice(0, 4)

  return (
    <section className="border-t border-border/60 bg-surface/40 section-padding">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Client Work</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl">
                Systems built for real businesses.
              </h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground">
              View all work <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
          {preview.map((project, i) => {
            const visual = CLIENT_VISUALS[project.name] ?? {
              initials: project.name.slice(0, 2).toUpperCase(),
              accent: '#a1a1aa',
              gradient: 'from-zinc-500/20 to-transparent',
            }

            return (
              <Reveal key={project.name} delay={i * 0.06}>
                <motion.article
                  className="group overflow-hidden border border-border bg-background/40 transition-colors hover:border-foreground/15 hover:bg-surface-elevated/30"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="relative border-b border-border/60 p-4 sm:p-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-80`} />
                    <div className="relative flex items-center gap-3 sm:gap-4">
                      <motion.div whileHover={{ rotate: [0, -6, 6, 0] }} transition={{ duration: 0.35 }}>
                        <SiteFavicon website={project.website} name={project.name} size={44} />
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-medium sm:text-lg">{project.name}</h3>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted sm:text-xs">{project.category}</p>
                      </div>
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-border p-2 text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
                        aria-label={`Visit ${project.name}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted">
                          <TechIcon name={tech} size={11} />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
