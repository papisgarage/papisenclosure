interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
}

const sizes = {
  sm: { brand: 'text-xl', tagline: 'text-[0.5rem] tracking-[0.35em]' },
  md: { brand: 'text-2xl', tagline: 'text-[0.55rem] tracking-[0.4em]' },
  lg: { brand: 'text-3xl', tagline: 'text-[0.6rem] tracking-[0.45em]' },
}

export default function Logo({ className = '', size = 'md', light = true }: LogoProps) {
  const s = sizes[size]
  const textColor = light ? 'text-white' : 'text-charcoal'

  return (
    <div className={`flex flex-col items-start leading-none ${className}`} aria-label="PAPIS Enclosures">
      <span className={`font-display font-bold ${s.brand} ${textColor}`}>PAPIS</span>
      <span
        className={`mt-1 font-body font-light uppercase ${s.tagline} ${light ? 'text-white/50' : 'text-charcoal/50'}`}
      >
        enclosures
      </span>
    </div>
  )
}
