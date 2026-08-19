import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { img: 28, text: 'text-xs' },
  md: { img: 32, text: 'text-sm' },
  lg: { img: 40, text: 'text-base' },
}

export function BrandLogo({ className, showText = true, size = 'md' }: BrandLogoProps) {
  const dim = sizes[size]

  return (
    <Link href="/" className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src="/images/logo.svg"
        alt="Ali Saqulain"
        width={dim.img}
        height={dim.img}
        className="rounded-md"
        priority
      />
      {showText && (
        <span className={cn('font-mono font-semibold tracking-[0.16em] text-foreground', dim.text)}>
          ALI SAQULAIN
        </span>
      )}
    </Link>
  )
}
