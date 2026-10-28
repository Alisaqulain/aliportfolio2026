import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Contact } from '@/components/contact/contact'
import { JsonLd } from '@/components/seo/json-ld'
import { createPageMetadata, getBreadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Ali Saqulain for full-stack development, SaaS builds, AI products and freelance engineering across India, Dubai and globally.',
  path: '/contact',
  keywords: ['contact Ali Saqulain', 'hire Ali Saqulain', 'freelance developer contact India'],
})

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHero
        label="Contact"
        title={
          <>
            Have a system <span className="text-gradient">worth building?</span>
          </>
        }
        description="A new product, an existing platform that needs engineering help, or an idea that needs to reach production — let's talk."
        visual={false}
      />
      <Contact />
    </PageShell>
  )
}
