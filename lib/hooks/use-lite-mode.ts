'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Lightweight mode — disables expensive effects on mobile / reduced motion */
export function useLiteMode() {
  const reducedMotion = useReducedMotion()
  const [lite, setLite] = useState(true)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.innerWidth < 1024
    setLite(coarse || narrow)
  }, [])

  return reducedMotion || lite
}
