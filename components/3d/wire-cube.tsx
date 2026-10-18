import { cn } from '@/lib/utils'

/** Pure CSS 3D wireframe cube with an inner cube spinning the other way */
export function WireCube({ size = 140, className }: { size?: number; className?: string }) {
  const inner = size * 0.45
  return (
    <div data-inview className={cn('perspective relative flex items-center justify-center', className)} aria-hidden>
      <div className="absolute h-[160%] w-[160%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.25)_0%,transparent_65%)]" />
      <div className="cube loop" style={{ '--s': `${size}px` } as React.CSSProperties}>
        <span /><span /><span /><span /><span /><span />
        <div
          className="cube loop absolute"
          style={{
            '--s': `${inner}px`,
            left: (size - inner) / 2,
            top: (size - inner) / 2,
            animationDirection: 'reverse',
            animationDuration: '9s',
          } as React.CSSProperties}
        >
          <span /><span /><span /><span /><span /><span />
        </div>
      </div>
    </div>
  )
}
