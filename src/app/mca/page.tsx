import type { Metadata } from 'next'
import { McaShell } from '@/components/mca/mca-shell'

export const metadata: Metadata = {
  title: 'MCA Drive — Private',
  description: 'Private MCA Drive dashboard.',
  robots: { index: false, follow: false, nocache: true },
}

export default function McaPage() {
  return <McaShell />
}
