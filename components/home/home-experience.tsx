'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Building2, GraduationCap } from 'lucide-react'
import { experience } from '@/data/experience'
import { Reveal } from '@/components/ui/reveal'

const ROLE_ICONS = [Building2, Briefcase, GraduationCap]

export function HomeExperience() {
  const preview = experience.slice(0, 3)

  return (
    <section className="border-t border-border/60 bg-background section-padding">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Experience</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl">
                Production engineering roles.
              </h2>
            </div>
            <Link href="/experience" className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground">
              Full timeline <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 space-y-0 border-l border-border pl-6 sm:mt-10 sm:pl-8">
          {preview.map((item, i) => {
            const Icon = ROLE_ICONS[i] ?? Briefcase
            return (
              <Reveal key={item.company} delay={i * 0.08}>
                <motion.article
                  className="group relative pb-10 last:pb-0"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="absolute -left-[calc(1.5rem+1px)] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background sm:-left-[calc(2rem+1px)] sm:h-8 sm:w-8"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(52,211,153,0.4)' }}
                  >
                    <Icon size={14} className="text-muted group-hover:text-emerald-400" />
                  </motion.span>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-medium text-foreground sm:text-lg">{item.role}</h3>
                    <p className="font-mono text-[11px] text-muted sm:text-xs">
                      {item.startDate} – {item.endDate}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {item.company} · {item.location}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                    {item.description[0]}
                  </p>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
