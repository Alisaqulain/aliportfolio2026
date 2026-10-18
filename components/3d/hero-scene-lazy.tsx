'use client'

import dynamic from 'next/dynamic'

/** Client boundary so three.js is code-split and never rendered on the server */
export const HeroSceneLazy = dynamic(() => import('@/components/3d/hero-scene'), { ssr: false })
