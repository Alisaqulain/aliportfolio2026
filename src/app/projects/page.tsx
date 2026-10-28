import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Projects } from '@/components/projects/projects'
import { ClientProjects } from '@/components/client-projects/client-projects'
import { HomeCTA } from '@/components/home/home-cta'
import { JsonLd } from '@/components/seo/json-ld'
import { projects, clientProjects } from '@/data/projects'
import { createPageMetadata, getBreadcrumbJsonLd, getProjectsItemListJsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Featured projects and client platforms by Ali Saqulain — AI automation, campus apps, SaaS, e-commerce and real-time systems shipped for India and Dubai.',
  path: '/projects',
  keywords: [
    'Ali Saqulain projects',
    'Ali Saqulain portfolio projects',
    'BatchX AMU',
    'FlowForge AI',
    'DevSphere client work',
  ],
})

export default function ProjectsPage() {
  const listItems = [
    ...projects.map((p) => ({
      name: p.title,
      description: p.description,
      url: p.liveUrl,
    })),
    ...clientProjects.map((p) => ({
      name: p.name,
      description: p.description,
      url: p.website,
    })),
  ]

  return (
    <PageShell>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <JsonLd data={getProjectsItemListJsonLd(listItems)} />
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
