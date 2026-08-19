import type { Metadata } from 'next'
import { McaShell } from '@/components/mca/mca-shell'

export const metadata: Metadata = {
  title: 'MCA Drive — Private',
  robots: { index: false, follow: false },
}

export default function McaPage() {
  return <McaShell />
}
