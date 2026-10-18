'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------
   Shaders
   ------------------------------------------------------------------ */

// Ashima 3D simplex noise (MIT)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const BLOB_VERT = /* glsl */ `
uniform float uTime;
uniform float uDistort;
uniform vec2 uMouse;
varying vec3 vViewPos;
varying float vNoise;
${NOISE}
void main(){
  vec3 n = normalize(position);
  float t = uTime * 0.22;
  float d = snoise(n * 1.25 + vec3(t, t * 0.8, -t)) ;
  d += 0.4 * snoise(n * 2.8 + vec3(-t * 1.3, t, t * 0.6) + vec3(uMouse * 0.6, 0.0));
  d *= uDistort;
  vNoise = d;
  vec4 mv = modelViewMatrix * vec4(position + n * d, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`

const BLOB_FRAG = /* glsl */ `
uniform float uTime;
varying vec3 vViewPos;
varying float vNoise;
vec3 palette(float t){
  return vec3(0.5) + vec3(0.5) * cos(6.28318 * (vec3(1.0) * t + vec3(0.0, 0.33, 0.67)));
}
void main(){
  // faceted normal from screen-space derivatives -> crisp crystal look
  vec3 N = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
  vec3 V = normalize(-vViewPos);
  float ndv = max(dot(N, V), 0.0);
  float fres = pow(1.0 - ndv, 2.2);

  vec3 L1 = normalize(vec3(0.7, 0.9, 0.8));
  vec3 L2 = normalize(vec3(-0.9, -0.3, 0.4));
  float diff = max(dot(N, L1), 0.0);
  float rim2 = max(dot(N, L2), 0.0);
  float spec = pow(max(dot(N, normalize(L1 + V)), 0.0), 90.0);

  vec3 deep = vec3(0.10, 0.05, 0.28);
  vec3 violet = vec3(0.49, 0.30, 0.98);
  vec3 cyan = vec3(0.13, 0.83, 0.93);
  vec3 base = mix(deep, violet, diff);
  base = mix(base, cyan, rim2 * 0.55);

  vec3 irid = palette(fres * 0.9 + vNoise * 0.55 + uTime * 0.03 + 0.55);
  vec3 col = base * 0.85 + irid * fres * 0.75 + vec3(spec) * 0.45;
  col += vec3(0.96, 0.45, 0.75) * pow(fres, 5.0) * 0.6;
  gl_FragColor = vec4(col, 1.0);
}
`

const PARTICLE_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aRadius;
attribute float aAngle;
attribute float aSpeed;
attribute float aSize;
attribute float aY;
varying float vMix;
varying float vAlpha;
void main(){
  float a = aAngle + uTime * aSpeed;
  vec3 p = vec3(cos(a) * aRadius, aY + sin(a * 3.0 + aRadius) * 0.05, sin(a) * aRadius);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z);
  vMix = smoothstep(1.9, 4.2, aRadius);
  vAlpha = 0.35 + 0.65 * fract(aAngle * 13.37);
}
`

const PARTICLE_FRAG = /* glsl */ `
varying float vMix;
varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.0, d);
  vec3 col = mix(vec3(0.75, 0.62, 1.0), vec3(0.4, 0.9, 1.0), vMix);
  gl_FragColor = vec4(col, glow * glow * vAlpha);
}
`

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export default function HeroScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let cleanup: (() => void) | undefined

    const init = async () => {
      const THREE = await import('three')
      if (disposed) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const small = window.matchMedia('(max-width: 767px)').matches
      const cores = navigator.hardwareConcurrency ?? 4
      const lowEnd = small || cores <= 4

      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !lowEnd,
          alpha: true,
          stencil: false,
          powerPreference: 'high-performance',
        })
      } catch {
        return // no WebGL — CSS glow fallback stays visible
      }

      const dprCap = Math.min(window.devicePixelRatio || 1, lowEnd ? 1.25 : 1.75)
      let dpr = dprCap
      renderer.setPixelRatio(dpr)
      renderer.setClearColor(0x000000, 0)
      const canvas = renderer.domElement
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.display = 'block'
      container.appendChild(canvas)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
      camera.position.set(0, 0, 7)

      const root = new THREE.Group()
      scene.add(root)

      // --- Morphing crystal
      const blobUniforms = {
        uTime: { value: 0 },
        uDistort: { value: 0.32 },
        uMouse: { value: new THREE.Vector2() },
      }
      const blobGeo = new THREE.IcosahedronGeometry(1.25, lowEnd ? 14 : 26)
      const blobMat = new THREE.ShaderMaterial({
        vertexShader: BLOB_VERT,
        fragmentShader: BLOB_FRAG,
        uniforms: blobUniforms,
      })
      const blob = new THREE.Mesh(blobGeo, blobMat)
      root.add(blob)

      // --- Wireframe shell
      const shellGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.05, 1))
      const shellMat = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const shell = new THREE.LineSegments(shellGeo, shellMat)
      root.add(shell)

      // --- Particle galaxy ring (animated entirely in the vertex shader)
      const count = lowEnd ? 1400 : 3600
      const radius = new Float32Array(count)
      const angle = new Float32Array(count)
      const speed = new Float32Array(count)
      const size = new Float32Array(count)
      const yOff = new Float32Array(count)
      for (let i = 0; i < count; i += 1) {
        const band = Math.random()
        radius[i] = 2.0 + Math.pow(band, 1.6) * 2.6
        angle[i] = Math.random() * Math.PI * 2
        speed[i] = (0.05 + Math.random() * 0.08) * (1.4 - band * 0.6)
        size[i] = 0.6 + Math.random() * 1.8
        yOff[i] = (Math.random() - 0.5) * 0.35 * (1 - band * 0.5)
      }
      const ringGeo = new THREE.BufferGeometry()
      // position attribute is required by three; values are computed in the shader
      ringGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
      ringGeo.setAttribute('aRadius', new THREE.BufferAttribute(radius, 1))
      ringGeo.setAttribute('aAngle', new THREE.BufferAttribute(angle, 1))
      ringGeo.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1))
      ringGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
      ringGeo.setAttribute('aY', new THREE.BufferAttribute(yOff, 1))
      ringGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 5)
      const ringUniforms = { uTime: { value: 0 }, uPixelRatio: { value: dpr } }
      const ringMat = new THREE.ShaderMaterial({
        vertexShader: PARTICLE_VERT,
        fragmentShader: PARTICLE_FRAG,
        uniforms: ringUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const ring = new THREE.Points(ringGeo, ringMat)
      ring.rotation.set(1.18, 0, 0.32)
      root.add(ring)

      // --- Layout: object on the right on wide screens, top-centre on phones
      const base = { x: 0, y: 0, scale: 1, h: 1 }
      const layout = () => {
        const w = container.clientWidth
        const h = container.clientHeight
        if (!w || !h) return
        base.h = h
        const aspect = w / h
        camera.aspect = aspect
        camera.updateProjectionMatrix()
        renderer.setSize(w, h, false)
        const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
        const halfW = halfH * aspect
        if (aspect >= 1.05) {
          base.x = halfW * 0.48
          base.y = 0
          base.scale = Math.min(1, halfW / 4.6)
        } else {
          base.x = 0
          base.y = halfH * 0.5
          base.scale = Math.max(0.42, Math.min(0.7, halfW / 4.6))
        }
      }
      layout()
      const ro = new ResizeObserver(() => {
        layout()
        if (!running) renderFrame(0)
      })
      ro.observe(container)

      // --- Input (pointer -> eased target; no per-event rendering)
      const pointer = { x: 0, y: 0 }
      const eased = { x: 0, y: 0 }
      const onPointer = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1
      }
      window.addEventListener('pointermove', onPointer, { passive: true })

      // --- Render loop: fully stops when hidden or offscreen
      let running = false
      let raf = 0
      let last = 0
      let elapsed = 0
      let frames = 0
      let frameTime = 0

      const renderFrame = (dt: number) => {
        elapsed += dt
        eased.x += (pointer.x - eased.x) * Math.min(1, dt * 3)
        eased.y += (pointer.y - eased.y) * Math.min(1, dt * 3)

        const scrollP = Math.min(window.scrollY / base.h, 1)

        blobUniforms.uTime.value = elapsed
        blobUniforms.uDistort.value = 0.3 + scrollP * 0.25
        blobUniforms.uMouse.value.set(eased.x, eased.y)
        ringUniforms.uTime.value = elapsed

        root.position.set(base.x, base.y + scrollP * 1.4, 0)
        root.scale.setScalar(base.scale * (1 - scrollP * 0.15))
        root.rotation.y = eased.x * 0.35
        root.rotation.x = eased.y * 0.22
        blob.rotation.y = elapsed * 0.12
        blob.rotation.z = elapsed * 0.05
        shell.rotation.y = -elapsed * 0.06
        shell.rotation.x = elapsed * 0.04

        renderer.render(scene, camera)
      }

      const loop = (now: number) => {
        if (!running) return
        raf = requestAnimationFrame(loop)
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        renderFrame(dt)

        // Adaptive quality: if we average under ~45fps, render fewer pixels
        frames += 1
        frameTime += dt
        if (frames === 90) {
          const avg = frameTime / frames
          if (avg > 0.022 && dpr > 0.75) {
            dpr = Math.max(0.75, dpr - 0.25)
            renderer.setPixelRatio(dpr)
            ringUniforms.uPixelRatio.value = dpr
            layout()
          }
          frames = 0
          frameTime = 0
        }
      }

      let onScreen = true
      const setRunning = () => {
        const shouldRun = onScreen && !document.hidden && !reduced
        if (shouldRun === running) return
        running = shouldRun
        if (running) {
          last = performance.now()
          raf = requestAnimationFrame(loop)
        } else {
          cancelAnimationFrame(raf)
        }
      }

      const io = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting
        setRunning()
      })
      io.observe(container)
      document.addEventListener('visibilitychange', setRunning)

      // First frame immediately (also the only frame with reduced motion)
      renderFrame(0.016)
      setRunning()
      setReady(true)

      cleanup = () => {
        running = false
        cancelAnimationFrame(raf)
        io.disconnect()
        ro.disconnect()
        document.removeEventListener('visibilitychange', setRunning)
        window.removeEventListener('pointermove', onPointer)
        blobGeo.dispose()
        blobMat.dispose()
        shellGeo.dispose()
        shellMat.dispose()
        ringGeo.dispose()
        ringMat.dispose()
        renderer.dispose()
        canvas.remove()
      }
    }

    // Start after the browser is idle so the hero text paints first
    const start = () => void init().catch(() => {})
    const hasIdle = 'requestIdleCallback' in window
    const handle = hasIdle ? window.requestIdleCallback(start, { timeout: 800 }) : window.setTimeout(start, 120)

    return () => {
      disposed = true
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
      cleanup?.()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 transition-opacity duration-[1400ms] ease-out', ready ? 'opacity-100' : 'opacity-0', className)}
      aria-hidden
    />
  )
}
