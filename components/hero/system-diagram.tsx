'use client'

import { motion, useReducedMotion } from 'framer-motion'

const nodes = [
  { id: 'user', label: 'User', x: 50, y: 8 },
  { id: 'next', label: 'Next.js', x: 50, y: 28 },
  { id: 'api', label: 'API', x: 50, y: 48 },
  { id: 'db', label: 'Database', x: 50, y: 68 },
  { id: 'cloud', label: 'Cloud', x: 50, y: 88 },
]

const satellites = [
  { label: 'AI', x: 18, y: 42 },
  { label: 'Realtime', x: 82, y: 38 },
  { label: 'Mobile', x: 14, y: 72 },
  { label: 'DevOps', x: 84, y: 76 },
]

export function SystemDiagram() {
  const reduce = useReducedMotion()

  return (
    <div className="relative aspect-[4/5] w-full max-w-md rounded-xl border border-border bg-surface p-6">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">System Flow</p>
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
        <line x1="50" y1="14" x2="50" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" />
        {nodes.slice(0, -1).map((node, i) => (
          <line
            key={node.id}
            x1={node.x}
            y1={node.y + 4}
            x2={nodes[i + 1].x}
            y2={nodes[i + 1].y - 4}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.35"
          />
        ))}
      </svg>

      <div className="absolute inset-6">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-border bg-surface-elevated px-2 py-1 font-mono text-[10px] text-foreground sm:text-xs"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
          >
            {node.label}
          </motion.div>
        ))}

        {satellites.map((sat, i) => (
          <motion.div
            key={sat.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/80 bg-background px-2 py-0.5 font-mono text-[9px] text-muted"
            style={{ left: `${sat.x}%`, top: `${sat.y}%` }}
            animate={reduce ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {sat.label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
