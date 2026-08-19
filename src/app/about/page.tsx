import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { About } from '@/components/about/about'
import { Capabilities } from '@/components/capabilities/capabilities'

export const metadata: Metadata = {
  title: 'About — Ali Saqulain',
  description: 'Engineering philosophy, product thinking, and how Ali Saqulain delivers production systems.',
}

export default function AboutPage() {
  return (
    <PageShell>
      <About />
      <Capabilities />
    </PageShell>
  )
}
