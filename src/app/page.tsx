import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { Hero, HomeExplore } from '@/components/hero/hero'
import { Achievements } from '@/components/achievements/achievements'
import { HomeFeatured } from '@/components/home/home-featured'
import { TechMarquee } from '@/components/home/tech-marquee'
import { HomeCapabilities } from '@/components/home/home-capabilities'
import { HomeTechGrid } from '@/components/home/home-tech-grid'
import { HomeProcess } from '@/components/home/home-process'
import { HomeExperience } from '@/components/home/home-experience'
import { HomeClients } from '@/components/home/home-clients'
import { HomePhilosophy } from '@/components/home/home-philosophy'
import { HomeStatsBanner } from '@/components/home/home-stats-banner'
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
      <HomeStatsBanner />
      <HomeCapabilities />
      <HomePhilosophy />
      <HomeFeatured />
      <HomeTechGrid />
      <Achievements />
      <HomeProcess />
      <HomeExperience />
      <HomeClients />
      <HomeExplore />
      <HomeCTA />
    </PageShell>
  )
}
