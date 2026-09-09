'use client'

import { useEffect, useRef, useState } from 'react'

function Hero3DSceneInner() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let frameId = 0
    let cleanup: (() => void) | undefined

    const init = async () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.innerWidth < 768
      if (reducedMotion || isMobile || disposed) return

      const THREE = await import('three')
      if (disposed || !containerRef.current) return

      const isTablet = window.innerWidth < 1024

      const width = container.clientWidth
      const height = container.clientHeight
      if (width === 0 || height === 0) return

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x070708, isMobile ? 0.045 : 0.035)

      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 120)
      camera.position.set(0, 0, isMobile ? 9 : 7.5)

      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTablet ? 1 : 1.25))
      renderer.setSize(width, height)
      renderer.setClearColor(0x070708, 1)
      container.appendChild(renderer.domElement)

      const world = new THREE.Group()
      scene.add(world)

      const starCount = isTablet ? 1200 : 2000
      const starPositions = new Float32Array(starCount * 3)
      for (let i = 0; i < starCount; i += 1) {
        starPositions[i * 3] = (Math.random() - 0.5) * 40
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 40
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 40
      }

      const starGeometry = new THREE.BufferGeometry()
      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
      const stars = new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({
          color: 0xe4e4e7,
          size: isMobile ? 0.015 : 0.022,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
        }),
      )
      world.add(stars)

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(isMobile ? 1.1 : 1.45, 1),
        new THREE.MeshBasicMaterial({ color: 0xf4f4f5, wireframe: true, transparent: true, opacity: 0.35 }),
      )
      world.add(core)

      const coreGlow = new THREE.Mesh(
        new THREE.IcosahedronGeometry(isMobile ? 0.55 : 0.72, 2),
        new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true, transparent: true, opacity: 0.5 }),
      )
      core.add(coreGlow)

      const orbitConfigs = [
        { geo: new THREE.OctahedronGeometry(0.28, 0), color: 0x93c5fd, radius: 2.6, speed: 0.35, y: 0.4 },
        { geo: new THREE.TorusGeometry(0.22, 0.06, 8, 20), color: 0xfbbf24, radius: 3.1, speed: -0.28, y: -0.5 },
        { geo: new THREE.BoxGeometry(0.38, 0.38, 0.38), color: 0xc4b5fd, radius: 2.2, speed: 0.42, y: 0.8 },
        { geo: new THREE.TetrahedronGeometry(0.32, 0), color: 0x6ee7b7, radius: 3.5, speed: -0.22, y: -0.9 },
      ]

      if (isTablet) orbitConfigs.splice(2)

      const orbiters: InstanceType<typeof THREE.Mesh>[] = []
      orbitConfigs.forEach((cfg, i) => {
        const mesh = new THREE.Mesh(
          cfg.geo,
          new THREE.MeshBasicMaterial({ color: cfg.color, wireframe: true, transparent: true, opacity: 0.55 }),
        )
        mesh.userData = { ...cfg, phase: (i / orbitConfigs.length) * Math.PI * 2 }
        orbiters.push(mesh)
        world.add(mesh)
      })

      const nodeCount = isTablet ? 24 : 36
      const networkNodes: InstanceType<typeof THREE.Vector3>[] = []
      for (let i = 0; i < nodeCount; i += 1) {
        networkNodes.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * (isMobile ? 10 : 14),
            (Math.random() - 0.5) * (isMobile ? 7 : 9),
            (Math.random() - 0.5) * (isMobile ? 6 : 8),
          ),
        )
      }

      const linePoints: number[] = []
      networkNodes.forEach((a, i) => {
        networkNodes.slice(i + 1).forEach((b) => {
          if (a.distanceTo(b) < (isMobile ? 2.4 : 3.2)) {
            linePoints.push(a.x, a.y, a.z, b.x, b.y, b.z)
          }
        })
      })

      const networkGeometry = new THREE.BufferGeometry()
      networkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3))
      const networkLines = new THREE.LineSegments(
        networkGeometry,
        new THREE.LineBasicMaterial({ color: 0xa1a1aa, transparent: true, opacity: 0.12 }),
      )
      world.add(networkLines)

      const nodeGeometry = new THREE.SphereGeometry(0.04, 8, 8)
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf4f4f5, transparent: true, opacity: 0.45 })
      networkNodes.forEach((node) => {
        const dot = new THREE.Mesh(nodeGeometry, nodeMaterial)
        dot.position.copy(node)
        world.add(dot)
      })

      const grid = new THREE.GridHelper(isMobile ? 16 : 22, isMobile ? 16 : 22, 0x27272a, 0x18181b)
      grid.position.y = -2.8
      if (!Array.isArray(grid.material)) {
        grid.material.opacity = 0.25
        grid.material.transparent = true
      }
      world.add(grid)

      const clock = new THREE.Clock()
      let visible = true
      let tabVisible = !document.hidden

      const observer = new IntersectionObserver(
        ([entry]) => { visible = entry.isIntersecting },
        { threshold: 0.05 },
      )
      observer.observe(container)

      const onVisibility = () => { tabVisible = !document.hidden }
      document.addEventListener('visibilitychange', onVisibility)

      const animate = () => {
        if (disposed) return

        if (!visible || !tabVisible) {
          frameId = window.requestAnimationFrame(animate)
          return
        }

        const elapsed = clock.getElapsedTime()

        core.rotation.x = elapsed * 0.15
        core.rotation.y = elapsed * 0.22
        coreGlow.rotation.x = -elapsed * 0.25
        coreGlow.rotation.y = -elapsed * 0.18

        orbiters.forEach((orb) => {
          const { radius, speed, phase, y } = orb.userData as {
            radius: number
            speed: number
            phase: number
            y: number
          }
          const angle = elapsed * speed + phase
          orb.position.set(
            Math.cos(angle) * radius,
            y + Math.sin(elapsed * 0.6 + phase) * 0.25,
            Math.sin(angle) * radius,
          )
          orb.rotation.x = elapsed * 0.5
          orb.rotation.y = elapsed * 0.35
        })

        world.rotation.y = elapsed * 0.04
        world.rotation.x = Math.sin(elapsed * 0.12) * 0.04
        stars.rotation.y = elapsed * 0.008
        networkLines.rotation.y = elapsed * 0.02

        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
        frameId = window.requestAnimationFrame(animate)
      }

      frameId = window.requestAnimationFrame(animate)

      const onResize = () => {
        const nextWidth = container.clientWidth
        const nextHeight = container.clientHeight
        if (nextWidth === 0 || nextHeight === 0) return
        camera.aspect = nextWidth / nextHeight
        camera.updateProjectionMatrix()
        renderer.setSize(nextWidth, nextHeight)
      }

      window.addEventListener('resize', onResize)

      cleanup = () => {
        observer.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        window.cancelAnimationFrame(frameId)
        window.removeEventListener('resize', onResize)
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
        starGeometry.dispose()
        if (Array.isArray(stars.material)) stars.material.forEach((m) => m.dispose())
        else stars.material.dispose()
        core.geometry.dispose()
        if (Array.isArray(core.material)) core.material.forEach((m) => m.dispose())
        else core.material.dispose()
        coreGlow.geometry.dispose()
        if (Array.isArray(coreGlow.material)) coreGlow.material.forEach((m) => m.dispose())
        else coreGlow.material.dispose()
        orbitConfigs.forEach((c) => c.geo.dispose())
        orbiters.forEach((o) => {
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose())
          else o.material.dispose()
        })
        networkGeometry.dispose()
        networkLines.material.dispose()
        nodeGeometry.dispose()
        nodeMaterial.dispose()
        grid.geometry.dispose()
        if (Array.isArray(grid.material)) {
          grid.material.forEach((m) => m.dispose())
        } else {
          grid.material.dispose()
        }
        renderer.dispose()
      }
    }

    void init().catch(() => {
      // Fail silently — gradient overlays still render
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden />
}

export default function Hero3DScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 z-0 bg-background" aria-hidden />
  }

  return <Hero3DSceneInner />
}
