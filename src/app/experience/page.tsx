import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { Experience } from '@/components/experience/experience'
import { Education } from '@/components/education/education'

export const metadata: Metadata = {
  title: 'Experience — Ali Saqulain',
  description: 'Production engineering roles, client delivery, and professional experience.',
}

export default function ExperiencePage() {
  return (
    <PageShell>
      <Experience />
      <Education />
    </PageShell>
  )
}
