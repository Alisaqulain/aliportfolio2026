import React, { useEffect, useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

const LogoBackground = ({ intensity = 1, size = '60%', opacity = 0.05 }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 10])
  const z = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <div ref={containerRef} className="logo-bg-container" style={{ '--logo-size': size, '--logo-opacity': opacity }}>
      <motion.div
        className="logo-bg-layer logo-bg-main"
        style={{
          y,
          scale,
          rotateX,
          rotateY,
          z,
        }}
      />
      <motion.div
        className="logo-bg-layer logo-bg-glow"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 80]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.3]),
          opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.6]),
        }}
      />
      <motion.div
        className="logo-bg-layer logo-bg-shadow"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 120]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.4]),
          opacity: useTransform(scrollYProgress, [0, 1], [0.1, 0.3]),
        }}
      />
    </div>
  )
}

export default LogoBackground

