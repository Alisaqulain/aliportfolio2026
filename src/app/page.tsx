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
import { HomeDevSphere } from '@/components/home/home-devsphere'
import { HomeCTA } from '@/components/home/home-cta'
import { SEO } from '@/lib/constants'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: SEO.title,
  description: SEO.description,
  path: '/',
  absolute: true,
})

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <TechMarquee />
      <HomeCapabilities />
      <HomeFeatured />
      <HomeDevSphere />
      <HomeClients />
      <HomeTechGrid />
      <HomeProcess />
      <HomeExperience />
      <HomeCTA />
    </PageShell>
  )
}
