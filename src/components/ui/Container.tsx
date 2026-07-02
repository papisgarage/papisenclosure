import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav'
  id?: string
}

export default function Container({
  children,
  className = '',
  as: Tag = 'div',
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  )
}
