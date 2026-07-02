import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Phone, Mail } from 'lucide-react'
import Button from './ui/Button'
import { getHeroImages } from '../lib/images'
import { ANIMATION, CONTACT, PRICING, SECTION_IDS } from '../lib/constants'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const heroImages = getHeroImages()
  const [currentIndex, setCurrentIndex] = useState(0)
  const phoneHref = `tel:${CONTACT.phone.replace(/\D/g, '')}`

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Rotate hero backgrounds from Main photo folder
  useEffect(() => {
    if (heroImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, ANIMATION.HERO_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const currentImage = heroImages[currentIndex] ?? heroImages[0]

  return (
    <section
      id={SECTION_IDS.hero}
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Parallax background with rotating images */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage}
            src={currentImage}
            alt="Premium tow truck enclosure"
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: ANIMATION.KEN_BURNS_SCALE }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/30" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        style={{ opacity }}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
      >
        <motion.p
          className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-cyan"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Premium Custom Fabrication
        </motion.p>

        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
          Luxury Meets
          <br />
          <span className="text-gradient">Utility.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
          We design and manufacture premium tow truck enclosures engineered around
          durability, hydraulics, and professional appearance.
        </p>

        <div className="mt-10 inline-flex items-center rounded-2xl border border-cyan/25 bg-cyan/10 px-6 py-3 backdrop-blur-xl shadow-glass">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/75 sm:text-base">
            Starting at{' '}
            <span className="text-gradient text-xl font-semibold sm:text-2xl">
              {PRICING.display}
            </span>
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={`#${SECTION_IDS.gallery}`} size="lg">
            View Gallery
          </Button>
          <Button href={`#${SECTION_IDS.quote}`} variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href={phoneHref}
            className="group flex w-full max-w-sm items-center gap-4 rounded-2xl glass-card px-6 py-5 transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan/20">
              <Phone className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-xs uppercase tracking-wider text-white/50">
                Call to Order Today
              </span>
              <span className="block text-lg font-semibold text-white">{CONTACT.phone}</span>
            </span>
          </a>

          <a
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(PRICING.orderEmailSubject)}`}
            className="group flex w-full max-w-sm items-center gap-4 rounded-2xl glass-card px-6 py-5 transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan/20">
              <Mail className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-xs uppercase tracking-wider text-white/50">
                Email to Order Today
              </span>
              <span className="block text-lg font-semibold text-white">{CONTACT.email}</span>
            </span>
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href={`#${SECTION_IDS.features}`}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50 transition-colors hover:text-cyan"
        aria-label="Scroll to features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.a>
    </section>
  )
}
