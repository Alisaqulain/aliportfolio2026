'use client'

import { useState } from 'react'
import { PROJECT_TAGS, projects, type ProjectTag } from '@/data/projects'
import { cn } from '@/lib/utils'
import { Section } from '@/components/ui/section'
import { ProjectBlock } from '@/components/projects/project-block'

export function Projects() {
  const [tag, setTag] = useState<ProjectTag | 'all'>('all')
  const list = tag === 'all' ? projects : projects.filter((p) => p.tags.includes(tag))

  return (
    <Section id="projects" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="sticky top-[calc(env(safe-area-inset-top)+4.75rem)] z-30 -mx-4 mb-8 px-4 sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="Filter projects"
          className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-white/[0.08] bg-[#0a0a12]/90 p-1 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md [&::-webkit-scrollbar]:hidden"
        >
          {PROJECT_TAGS.map((t) => {
            const count = t.id === 'all' ? projects.length : projects.filter((p) => p.tags.includes(t.id as ProjectTag)).length
            const selected = tag === t.id
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTag(t.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-all duration-300',
                  selected ? 'bg-white/[0.09] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' : 'text-muted hover:text-foreground',
                )}
              >
                {t.label}
                <span className={cn('font-mono text-[10px]', selected ? 'text-violet-300' : 'text-muted/60')}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div key={tag} className="space-y-6">
        {list.map((project, i) => (
          <div key={project.slug} className="animate-fade-in" style={{ animationDelay: `${Math.min(i, 4) * 70}ms` }}>
            <ProjectBlock project={project} index={i} />
          </div>
        ))}
      </div>
    </Section>
  )
}
