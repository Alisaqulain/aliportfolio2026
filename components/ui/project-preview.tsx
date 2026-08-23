import { cn } from '@/lib/utils'
import { getProjectVisual, type ProjectVisual } from '@/lib/visuals'

type ProjectPreviewProps = {
  title: string
  slug?: string
  visual?: ProjectVisual
  className?: string
  featured?: boolean
}

export function ProjectPreview({ title, slug, visual, className, featured }: ProjectPreviewProps) {
  const data = visual ?? getProjectVisual(slug ?? title.toLowerCase().replace(/\s+/g, '-'), title)
  const Icon = data.icon

  return (
    <div
      className={cn(
        'group/preview relative overflow-hidden rounded-lg border border-border/80 bg-surface/60',
        featured ? 'h-40 sm:h-36 lg:h-40' : 'h-32 sm:h-28 lg:h-32',
        className,
      )}
      aria-label={`${title} preview`}
      role="img"
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br', data.gradient)} />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="absolute inset-x-4 top-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      </div>

      <div className="absolute inset-x-4 top-10 rounded-md border border-border/50 bg-background/40 p-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/80"
            style={{ color: data.accent }}
          >
            <Icon size={18} strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="h-2 w-3/4 rounded-sm bg-foreground/20" />
            <div className="mt-2 h-1.5 w-1/2 rounded-sm bg-border" />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-sm bg-border/80" />
          <div className="h-1.5 w-5/6 rounded-sm bg-border/60" />
        </div>
      </div>

      <div
        className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-background/70 font-mono text-[10px] font-semibold text-muted transition-transform group-hover/preview:scale-105"
        style={{ color: data.accent }}
      >
        {data.initials}
      </div>

      <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-wider text-muted">{title}</p>
    </div>
  )
}
