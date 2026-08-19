import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { Skills } from '@/components/skills/skills'

export const metadata: Metadata = {
  title: 'Skills — Ali Saqulain',
  description: 'Full-stack, mobile, AI, cloud, and real-time technologies.',
}

export default function SkillsPage() {
  return (
    <PageShell>
      <Skills />
    </PageShell>
  )
}
