'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animates the leading number in a value like "15+", "4.9/5" or "25,000+"
 * when it scrolls into view. Non-numeric values render as-is.
 */
export function CountUp({ value, duration = 1400, className }: { value: string; duration?: number; className?: string }) {
  const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!match || !ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const [, prefix, raw, suffix] = match
    const target = parseFloat(raw.replace(/,/g, ''))
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0
    const grouped = raw.includes(',')
    const format = (n: number) =>
      prefix +
      (grouped ? Math.round(n).toLocaleString('en-US') : n.toFixed(decimals)) +
      suffix

    setDisplay(format(0))
    let frame = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 4)
          setDisplay(format(target * eased))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
