import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { About } from '@/components/about/about'
import { HomeCapabilities } from '@/components/home/home-capabilities'
import { HomeCTA } from '@/components/home/home-cta'

export const metadata: Metadata = {
  title: 'About — Ali Saqulain',
  description: 'Engineering philosophy, product thinking, and how Ali Saqulain delivers production systems.',
}

export default function AboutPage() {
  return (
    <PageShell>
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
