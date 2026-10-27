'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** Cycles through words with a vertical slide. Width follows the longest word so layout never jumps. */
export function RotatingText({ words, interval = 2600, className }: { words: string[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className={cn('relative inline-grid overflow-hidden align-bottom', className)} aria-live="polite">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {longest}
      </span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={cn(
            'col-start-1 row-start-1 whitespace-nowrap transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease)]',
            i === index ? 'translate-y-0 opacity-100' : i === (index - 1 + words.length) % words.length ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0',
          )}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
