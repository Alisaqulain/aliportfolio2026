import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Experience } from '@/components/experience/experience'
import { Education } from '@/components/education/education'
import { JsonLd } from '@/components/seo/json-ld'
import { createPageMetadata, getBreadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Experience',
  description:
    'Professional experience of Ali Saqulain — production engineering roles, client delivery, DevSphere Solutions, and education at Aligarh Muslim University.',
  path: '/experience',
  keywords: ['Ali Saqulain experience', 'Ali Saqulain work history', 'Bizsun Creative developer'],
})

export default function ExperiencePage() {
  return (
    <PageShell>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Experience', path: '/experience' },
        ])}
      />
      <PageHero
        label="Experience"
        title={
          <>
            Production <span className="text-gradient">engineering roles.</span>
          </>
        }
        description="Owning products end to end — from requirements and system design to deployment and client delivery."
      />
      <Experience />
      <Education />
    </PageShell>
  )
}
