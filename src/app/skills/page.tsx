import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { PageHero } from '@/components/ui/page-hero'
import { Skills } from '@/components/skills/skills'
import { TechOrbit } from '@/components/3d/tech-orbit'

export const metadata: Metadata = {
  title: 'Skills — Ali Saqulain',
  description: 'Full-stack, mobile, AI, cloud, and real-time technologies.',
}

export default function SkillsPage() {
  return (
    <PageShell>
      <PageHero
        label="Technical stack"
        title={
          <>
            Technologies <span className="text-gradient">I work with.</span>
          </>
        }
        description="Frontend, backend, mobile, real-time, AI and DevOps — the tools I use to ship production systems."
        visual={<TechOrbit className="max-w-[380px] lg:[--k:0.8]" />}
      />
      <div className="px-4 pb-6 sm:px-8 lg:hidden">
        <TechOrbit className="max-w-[320px]" />
      </div>
      <Skills />
    </PageShell>
  )
}
