import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Experience } from '@/components/experience/experience'
import { Education } from '@/components/education/education'

export const metadata: Metadata = {
  title: 'Experience — Ali Saqulain',
  description: 'Production engineering roles, client delivery, and professional experience.',
}

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHero
        label="Experience"
        title={
          <>
            Production <span className="text-gradient">engineering roles.</span>
          </>
        }
        description="Owning products end to end — from requirements and system design to deployment and client delivery."
      />
      <Experience />
      <Education />
    </PageShell>
  )
}
