import { ScrollProgress } from '@/components/3d/scroll-progress'
import { RevealObserver } from '@/components/ui/reveal-observer'

/** Global shell — static backdrop + two tiny observers. No per-frame JS. */
export function SceneProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-[30vh] left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.13)_0%,transparent_65%)]" />
        <div className="absolute -right-[20vw] top-[40vh] h-[60vh] w-[60vw] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06)_0%,transparent_65%)]" />
        <div className="grid-bg mask-radial absolute inset-0 opacity-60" />
      </div>
      <ScrollProgress />
      <RevealObserver />
      <div className="relative z-[2]">{children}</div>
    </>
  )
}
