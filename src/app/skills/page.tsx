import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Skills } from '@/components/skills/skills'
import { TechOrbit } from '@/components/3d/tech-orbit'
import { JsonLd } from '@/components/seo/json-ld'
import { createPageMetadata, getBreadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Skills',
  description:
    'Technical skills of Ali Saqulain — Next.js, React, Node.js, TypeScript, mobile, AI, cloud, Redis, WebRTC and production DevOps.',
  path: '/skills',
  keywords: ['Ali Saqulain skills', 'Next.js developer skills', 'React Node TypeScript stack'],
})

export default function SkillsPage() {
  return (
    <PageShell>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Skills', path: '/skills' },
        ])}
      />
      <PageHero
        label="Technical stack"
        title={
          <>
            Technologies <span className="text-gradient">I work with.</span>
          </>
        }
        description="Frontend, backend, mobile, real-time, AI and DevOps — the tools I use to ship production systems."
        visual={<TechOrbit className="max-w-[380px] lg:[--k:0.8]" />}
      />
      <div className="px-4 pb-6 sm:px-8 lg:hidden">
        <TechOrbit className="max-w-[320px]" />
      </div>
      <Skills />
    </PageShell>
  )
}
