import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { FeatureSection } from '../data/features'
import { getCategoryImages } from '../lib/images'
import { ANIMATION } from '../lib/constants'
import ImageCarousel from './ImageCarousel'

interface FeatureCarouselProps {
  feature: FeatureSection
  index: number
}

export default function FeatureCarousel({ feature, index }: FeatureCarouselProps) {
  const images = getCategoryImages(feature.imageCategory)

  const content = (
    <motion.div
      className="flex flex-col justify-center"
      initial={{ opacity: 0, x: feature.imageOnLeft ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: ANIMATION.STAGGER_DELAY_S }}
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan">
        0{index + 1}
      </p>
      <h3 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {feature.title}
      </h3>
      {feature.subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-white/60">{feature.subtitle}</p>
      )}
      <ul className={`space-y-3 ${feature.subtitle ? 'mt-8' : 'mt-6'}`}>
        {feature.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-white/80">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
              <Check className="h-3 w-3" />
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  )

  const carousel = (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <ImageCarousel
        images={images}
        altPrefix={feature.title}
        className="shadow-soft ring-1 ring-white/10"
      />
    </motion.div>
  )

  return (
    <div
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
        feature.imageOnLeft ? '' : ''
      }`}
    >
      {feature.imageOnLeft ? (
        <>
          {carousel}
          {content}
        </>
      ) : (
        <>
          {content}
          {carousel}
        </>
      )}
    </div>
  )
}
