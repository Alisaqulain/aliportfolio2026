import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { Contact } from '@/components/contact/contact'

export const metadata: Metadata = {
  title: 'Contact — Ali Saqulain',
  description: 'Get in touch with Ali Saqulain for production engineering and full-stack development.',
}

export default function ContactPage() {
  return (
    <PageShell>
      <Contact />
    </PageShell>
  )
}
