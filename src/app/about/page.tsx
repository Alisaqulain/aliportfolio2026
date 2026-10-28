import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { About } from '@/components/about/about'
import { HomeCapabilities } from '@/components/home/home-capabilities'
import { HomeCTA } from '@/components/home/home-cta'
import { JsonLd } from '@/components/seo/json-ld'
import { createPageMetadata, getBreadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description:
    'About Ali Saqulain — Forward Deployed Engineer and Full-Stack Systems Developer. Engineering philosophy, product thinking, and how production systems get shipped.',
  path: '/about',
  keywords: ['about Ali Saqulain', 'Ali Saqulain engineer', 'Ali Saqulain AMU'],
})

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHero
        label="About"
        title={
          <>
            Engineering <span className="text-gradient">beyond the code.</span>
          </>
        }
        description="Forward Deployed Engineer and Full-Stack Systems Developer turning business requirements into production-ready products."
      />
      <About />
      <HomeCapabilities />
      <HomeCTA />
    </PageShell>
  )
}
