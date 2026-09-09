'use client'

import { motion } from 'framer-motion'
import { Award, Globe2, Layers, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const STATS: { icon: LucideIcon; value: string; label: string; color: string }[] = [
  { icon: Zap, value: '15+', label: 'Production Apps', color: 'text-amber-400' },
  { icon: Globe2, value: '2', label: 'Countries Served', color: 'text-blue-400' },
  { icon: Layers, value: '30+', label: 'Technologies', color: 'text-violet-400' },
  { icon: Award, value: '3+', label: 'Years Experience', color: 'text-emerald-400' },
]

export function HomeStatsBanner() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-surface/30 py-6 sm:py-8">
      <div className="container-wide">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/30 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/50 ${stat.color}`}>
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">{stat.value}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted sm:text-xs">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
