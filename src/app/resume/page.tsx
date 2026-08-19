import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { ResumeView } from '@/components/resume/resume-view'

export const metadata: Metadata = {
  title: 'Resume — Ali Saqulain',
  description: 'Professional resume of Ali Saqulain — Forward Deployed Engineer and Full-Stack Systems Developer.',
}

export default function ResumePage() {
  return (
    <PageShell>
      <ResumeView />
    </PageShell>
  )
}
