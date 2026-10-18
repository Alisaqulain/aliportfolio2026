import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/section'
import { ClientGrid } from '@/components/client-projects/client-projects'

export function HomeClients() {
  return (
    <Section id="clients">
      <SectionHeader
        label="Client work"
        title={
          <>
            Systems built for <span className="text-gradient">real businesses.</span>
          </>
        }
        description="Production platforms delivered for clients in India and Dubai."
        action={
          <Link href="/projects#client-work" className="btn btn-secondary">
            View all work <ArrowUpRight size={15} />
          </Link>
        }
      />
      <ClientGrid limit={4} className="mt-14" />
    </Section>
  )
}
