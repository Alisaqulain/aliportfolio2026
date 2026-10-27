import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Projects } from '@/components/projects/projects'
import { ClientProjects } from '@/components/client-projects/client-projects'
import { HomeCTA } from '@/components/home/home-cta'

export const metadata: Metadata = {
  title: 'Projects — Ali Saqulain',
  description: 'Featured projects and selected client work built for production.',
}

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHero
        label="Selected work"
        title={
          <>
            Things I&apos;ve <span className="text-gradient">built &amp; shipped.</span>
          </>
        }
        description="AI automation platforms, developer tools, campus apps and real-time systems — plus 14 production client platforms, most shipped through DevSphere Solutions."
      />
      <Projects />
      <ClientProjects />
      <HomeCTA />
    </PageShell>
  )
}
