'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Building2, Calendar, GraduationCap, MapPin } from 'lucide-react'
import { experience } from '@/data/experience'
import { Reveal } from '@/components/ui/reveal'
import { AnimatedSectionHeader } from '@/components/ui/animated-section-header'
import { GlassCard } from '@/components/3d/glass-card'
import { TiltCard } from '@/components/3d/tilt-card'

const ROLE_ICONS = [Building2, Briefcase, GraduationCap]

export function HomeExperience() {
  const preview = experience.slice(0, 3)

  return (
    <section className="scene-3d border-t border-border/60 bg-background section-padding">
      <div className="container-wide">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <AnimatedSectionHeader
            icon={Briefcase}
            label="Experience"
            title="Production engineering roles."
            description="Roles spanning full-stack development, forward deployed engineering, and teaching."
          />
          <Link href="/experience" data-cursor="link" className="inline-flex shrink-0 items-center gap-1 self-start text-sm text-muted transition-colors hover:text-foreground sm:self-end">
            Full timeline <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="relative mt-10">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-emerald-400/40 via-border to-transparent sm:left-[19px]" />

          <div className="space-y-5 pl-8 sm:pl-10">
            {preview.map((item, i) => {
              const Icon = ROLE_ICONS[i] ?? Briefcase
              return (
                <Reveal key={item.company} delay={i * 0.08}>
                  <TiltCard maxRotate={2}>
                    <GlassCard glow={i === 0} className="relative">
                      <article className="p-5 sm:p-6">
                        <motion.span
                          className="absolute -left-[calc(2rem+1px)] top-6 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/30 bg-background shadow-[0_0_12px_rgba(52,211,153,0.15)] sm:-left-[calc(2.5rem+1px)]"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Icon size={14} className="text-emerald-400/80" />
                        </motion.span>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-base font-medium text-foreground sm:text-lg">{item.role}</h3>
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted sm:text-xs">
                            <Calendar size={11} /> {item.startDate} – {item.endDate}
                          </span>
                        </div>
                        <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted">
                          <Building2 size={12} className="text-muted/60" /> {item.company}
                          <span className="text-border">·</span>
                          <MapPin size={12} className="text-muted/60" /> {item.location}
                        </p>
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{item.description[0]}</p>
                      </article>
                    </GlassCard>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
