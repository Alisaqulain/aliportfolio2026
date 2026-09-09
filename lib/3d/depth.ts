/** Consistent depth scale for the 3D environment (px translateZ) */
export const DEPTH = {
  background: -200,
  back: -100,
  normal: 0,
  front: 40,
  foreground: 80,
} as const

export type DepthLevel = keyof typeof DEPTH

export const EASE = [0.22, 1, 0.36, 1] as const

export const SPRING = { stiffness: 150, damping: 22, mass: 0.8 } as const

export const TILT_MAX = 5

export const PARALLAX_STrength = {
  background: 0.15,
  mid: 0.35,
  foreground: 0.6,
} as const
