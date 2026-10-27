import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { clientProjects } from '@/data/projects'
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
        description={`${clientProjects.length} production platforms delivered for clients in India, Dubai and beyond.`}
        action={
          <Link href="/devsphere" className="btn btn-secondary">
            All {clientProjects.length} client builds <ArrowUpRight size={15} />
          </Link>
        }
      />
      <ClientGrid limit={6} className="mt-14" />
    </Section>
  )
}
