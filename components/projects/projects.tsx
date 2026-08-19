import { projects } from '@/data/projects'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionLabel, SectionTitle } from '@/components/ui/section'
import { ProjectBlock } from '@/components/projects/project-block'

export function Projects() {
  return (
    <Section id="projects" className="pt-28">
      <SectionLabel>Selected Work</SectionLabel>
      <SectionTitle>Featured projects</SectionTitle>

      <div className="mt-10 space-y-6">
        {projects.map((project, i) => (
          <Reveal key={project.number} delay={i * 0.04}>
            <ProjectBlock project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
