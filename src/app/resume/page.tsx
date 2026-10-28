import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/page-shell'
import { ResumeView } from '@/components/resume/resume-view'
import { JsonLd } from '@/components/seo/json-ld'
import { createPageMetadata, getBreadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Resume',
  description:
    'Resume of Ali Saqulain — Forward Deployed Engineer, Full-Stack Systems Developer and Founder of DevSphere Solutions. Download or view the print-ready CV.',
  path: '/resume',
  keywords: ['Ali Saqulain resume', 'Ali Saqulain CV', 'hire Ali Saqulain'],
})

export default function ResumePage() {
  return (
    <PageShell>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Resume', path: '/resume' },
        ])}
      />
      <ResumeView />
    </PageShell>
  )
}
