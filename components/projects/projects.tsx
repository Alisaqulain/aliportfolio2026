import { projects } from '@/data/projects'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { ProjectBlock } from '@/components/projects/project-block'

export function Projects() {
  return (
    <Section id="projects" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="space-y-6">
        {projects.map((project, i) => (
          <Reveal key={project.slug}>
            <ProjectBlock project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
