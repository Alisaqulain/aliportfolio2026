import { TechIcon } from '@/components/ui/tech-icon'
import { cn } from '@/lib/utils'

type Ring = { items: string[]; radius: number; duration: number; tilt: number; roll: number; reverse?: boolean }

const DEFAULT_RINGS: Ring[] = [
  {
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Docker', 'OpenAI API'],
    radius: 200,
    duration: 38,
    tilt: -28,
    roll: 0,
  },
  {
    items: ['Socket.io', 'WebRTC', 'React Native', 'Firebase', 'Vercel', 'Express.js'],
    radius: 128,
    duration: 30,
    tilt: -28,
    roll: 22,
    reverse: true,
  },
]

/**
 * CSS-only 3D gyroscope of tech icons. Every moving part is a transform
 * animation, so it runs on the compositor and pauses when offscreen.
 * The `--k` CSS var scales the radii (smaller on phones).
 */
export function TechOrbit({ rings = DEFAULT_RINGS, className }: { rings?: Ring[]; className?: string }) {
  return (
    <div
      data-inview
      className={cn(
        'orbit-stage relative mx-auto aspect-square w-full max-w-[460px] [--k:0.66] sm:[--k:1]',
        className,
      )}
      aria-hidden
    >
      {/* glowing core */}
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f5f3ff_0%,#a78bfa_30%,#4c1d95_68%,transparent_71%)] shadow-[0_0_90px_24px_rgba(139,92,246,0.35)] sm:h-24 sm:w-24" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16)_0%,transparent_70%)]" />

      {rings.map((ring, ri) => (
        <div
          key={ri}
          className="orbit-tilt absolute inset-0"
          style={{ '--tilt': `${ring.tilt}deg`, '--roll': `${ring.roll}deg` } as React.CSSProperties}
        >
          {/* ring path */}
          <div
            className="absolute left-1/2 top-1/2 rounded-full border border-violet-300/20"
            style={{
              width: `calc(${ring.radius * 2}px * var(--k))`,
              height: `calc(${ring.radius * 2}px * var(--k))`,
              transform: 'translate(-50%, -50%) rotateX(90deg)',
            }}
          />
          <div
            className="orbit-ring loop"
            style={{ '--dur': `${ring.duration}s`, '--dir': ring.reverse ? 'reverse' : 'normal' } as React.CSSProperties}
          >
            {ring.items.map((name, i) => (
              <div
                key={name}
                className="orbit-item"
                style={{
                  '--a': `${(360 / ring.items.length) * i}deg`,
                  '--r': `calc(${ring.radius}px * var(--k))`,
                } as React.CSSProperties}
              >
                <div
                  className="orbit-face loop -ml-6 -mt-6"
                  style={{
                    '--dur': `${ring.duration}s`,
                    '--dir': ring.reverse ? 'reverse' : 'normal',
                  } as React.CSSProperties}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d18] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <TechIcon name={name} size={22} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
