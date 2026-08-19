import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { Hero, HomeExplore } from '@/components/hero/hero'
import { Achievements } from '@/components/achievements/achievements'
import { HomeFeatured } from '@/components/home/home-featured'
import { TechMarquee } from '@/components/home/tech-marquee'
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
      <HomeFeatured />
      <Achievements />
      <HomeExplore />
    </PageShell>
  )
}
