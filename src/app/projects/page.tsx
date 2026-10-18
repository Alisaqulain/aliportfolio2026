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
        description="Personal builds across AI, real-time communication and fintech — plus production systems for clients."
      />
      <Projects />
      <ClientProjects />
      <HomeCTA />
    </PageShell>
  )
}
