import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getFaviconUrl } from '@/lib/visuals'

type SiteFaviconProps = {
  website: string
  name: string
  className?: string
  size?: number
}

export function SiteFavicon({ website, name, className, size = 40 }: SiteFaviconProps) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={getFaviconUrl(website, 128)}
        alt={`${name} favicon`}
        width={size}
        height={size}
        className="object-contain p-1.5"
        unoptimized
      />
    </div>
  )
}
