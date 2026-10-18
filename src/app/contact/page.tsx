import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Contact } from '@/components/contact/contact'

export const metadata: Metadata = {
  title: 'Contact — Ali Saqulain',
  description: 'Get in touch with Ali Saqulain for production engineering and full-stack development.',
}

export default function ContactPage() {
  return (
    <PageShell>
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
