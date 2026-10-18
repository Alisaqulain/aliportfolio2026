import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { Hero } from '@/components/hero/hero'
import { TechMarquee } from '@/components/home/tech-marquee'
import { HomeCapabilities } from '@/components/home/home-capabilities'
import { HomeFeatured } from '@/components/home/home-featured'
import { HomeTechGrid } from '@/components/home/home-tech-grid'
import { HomeProcess } from '@/components/home/home-process'
import { HomeExperience } from '@/components/home/home-experience'
import { HomeClients } from '@/components/home/home-clients'
import { HomeCTA } from '@/components/home/home-cta'
import { SEO, SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: SEO.ogTitle,
    description: SEO.description,
    url: SITE.url,
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <TechMarquee />
      <HomeCapabilities />
      <HomeFeatured />
      <HomeTechGrid />
      <HomeProcess />
      <HomeExperience />
      <HomeClients />
      <HomeCTA />
    </PageShell>
  )
}
