type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'scale' | 'left'
  as?: 'div' | 'li' | 'article' | 'section'
}

/** Marks an element for the shared scroll-reveal observer. CSS does the animation. */
export function Reveal({ children, className, delay = 0, variant = 'up', as: Tag = 'div' }: RevealProps) {
  return (
    <Tag
      data-reveal={variant === 'up' ? '' : variant}
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
