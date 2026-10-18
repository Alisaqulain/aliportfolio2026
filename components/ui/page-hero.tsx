import { WireCube } from '@/components/3d/wire-cube'
import { SectionLabel } from '@/components/ui/section'
import { cn } from '@/lib/utils'

type PageHeroProps = {
  label: string
  title: React.ReactNode
  description?: string
  children?: React.ReactNode
  /** custom right-side visual; pass false for none */
  visual?: React.ReactNode | false
  className?: string
}

/** Header for inner pages — big type on the left, a CSS 3D object on the right */
export function PageHero({ label, title, description, children, visual, className }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden px-4 pb-10 pt-32 sm:px-8 sm:pb-16 sm:pt-40 lg:px-12', className)}>
      <div className={`container-wide grid items-center gap-12 ${visual === false ? '' : 'lg:grid-cols-[1.4fr_0.6fr]'}`}>
        <div className="hero-in">
          <SectionLabel>{label}</SectionLabel>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {title}
          </h1>
          {description && <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {visual !== false && (
          <div className="hidden justify-center lg:flex">{visual ?? <WireCube size={150} className="h-72 w-72" />}</div>
        )}
      </div>
    </section>
  )
}
