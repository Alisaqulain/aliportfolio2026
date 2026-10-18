'use client'

import { useEffect, useRef } from 'react'

/** Top progress bar — writes transform directly, at most once per frame */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = barRef.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      el.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden>
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-300"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
