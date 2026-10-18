'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * One IntersectionObserver for every [data-reveal] (adds .is-in once) and
 * every [data-inview] (toggles .is-visible so offscreen loops pause).
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
      document.querySelectorAll('[data-inview]').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            revealIO.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const inviewIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle('is-visible', entry.isIntersecting)
      },
      { rootMargin: '120px 0px' },
    )

    const seen = new WeakSet<Element>()
    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        revealIO.observe(el)
      })
      document.querySelectorAll('[data-inview]').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        inviewIO.observe(el)
      })
    }

    scan()
    // Catch elements that mount later (tab switches, lazy sections)
    let queued = 0
    const mo = new MutationObserver(() => {
      if (!queued) queued = requestAnimationFrame(() => { queued = 0; scan() })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(queued)
      mo.disconnect()
      revealIO.disconnect()
      inviewIO.disconnect()
    }
  }, [pathname])

  return null
}
