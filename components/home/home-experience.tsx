import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { experience } from '@/data/experience'
import { Section, SectionHeader } from '@/components/ui/section'
import { Timeline } from '@/components/experience/experience'

export function HomeExperience() {
  return (
    <Section id="experience">
      <SectionHeader
        label="Experience"
        title={
          <>
            Where I&apos;ve <span className="text-gradient">shipped.</span>
          </>
        }
        description="Full-stack development, forward deployed engineering, and teaching."
        action={
          <Link href="/experience" className="btn btn-secondary">
            Full timeline <ArrowUpRight size={15} />
          </Link>
        }
      />
      <Timeline items={experience} compact className="mt-14" />
    </Section>
  )
}
