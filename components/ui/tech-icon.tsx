import { cn } from '@/lib/utils'
import { getTechIcon, getTechIconColor } from '@/lib/tech-icons'

type TechIconProps = {
  name: string
  className?: string
  size?: number
  colored?: boolean
}

export function TechIcon({ name, className, size = 18, colored = true }: TechIconProps) {
  const Icon = getTechIcon(name)
  const color = colored ? getTechIconColor(name) : 'currentColor'

  return (
    <Icon
      className={cn('shrink-0', className)}
      size={size}
      style={{ color }}
      aria-hidden
    />
  )
}
