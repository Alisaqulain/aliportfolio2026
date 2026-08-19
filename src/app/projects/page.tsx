import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { Projects } from '@/components/projects/projects'
import { ClientProjects } from '@/components/client-projects/client-projects'

export const metadata: Metadata = {
  title: 'Projects — Ali Saqulain',
  description: 'Featured projects and selected client work built for production.',
}

export default function ProjectsPage() {
  return (
    <PageShell>
      <Projects />
      <ClientProjects />
    </PageShell>
  )
}
