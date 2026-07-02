import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { ANIMATION } from '../lib/constants'

interface ImageCarouselProps {
  images: string[]
  altPrefix: string
  className?: string
  aspectRatio?: string
}

export default function ImageCarousel({
  images,
  altPrefix,
  className = '',
  aspectRatio = 'aspect-[4/3]',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(1)
  const userStoppedRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = images.length

  const goTo = useCallback(
    (index: number, dir?: number) => {
      if (total === 0) return
      const next = ((index % total) + total) % total
      setDirection(dir ?? (next > currentIndex ? 1 : -1))
      setCurrentIndex(next)
    },
    [currentIndex, total],
  )

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo])

  /** Any manual interaction stops autoplay until Play is pressed */
  const stopAutoplay = useCallback(() => {
    userStoppedRef.current = true
    setIsPlaying(false)
  }, [])

  const handlePlay = useCallback(() => {
    userStoppedRef.current = false
    setIsPlaying(true)
  }, [])

  const handlePause = useCallback(() => {
    userStoppedRef.current = true
    setIsPlaying(false)
  }, [])

  const handleDotClick = useCallback(
    (index: number) => {
      stopAutoplay()
      goTo(index, index > currentIndex ? 1 : -1)
    },
    [currentIndex, goTo, stopAutoplay],
  )

  const handleArrow = useCallback(
    (fn: () => void) => {
      stopAutoplay()
      fn()
    },
    [stopAutoplay],
  )

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50
      if (info.offset.x < -threshold) {
        stopAutoplay()
        goNext()
      } else if (info.offset.x > threshold) {
        stopAutoplay()
        goPrev()
      }
    },
    [goNext, goPrev, stopAutoplay],
  )

  // Autoplay interval
  useEffect(() => {
    if (!isPlaying || total <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % total)
    }, ANIMATION.CAROUSEL_INTERVAL_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, total])

  if (total === 0) {
    return (
      <div
        className={`${aspectRatio} flex items-center justify-center rounded-3xl bg-navy/50 ${className}`}
      >
        <p className="text-white/40">No images available</p>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl ${aspectRatio} ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${altPrefix} image carousel`}
    >
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          custom={direction}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: ANIMATION.KEN_BURNS_SCALE }}
          transition={{ duration: ANIMATION.TRANSITION_DURATION_S, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          <motion.img
            src={currentImage}
            alt={`${altPrefix}, image ${currentIndex + 1} of ${total}`}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            initial={{ scale: 1 }}
            animate={{ scale: ANIMATION.KEN_BURNS_SCALE }}
            transition={{
              duration: ANIMATION.CAROUSEL_INTERVAL_MS / 1000,
              ease: 'linear',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay for controls readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />

      {/* Arrow controls */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => handleArrow(goPrev)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full glass p-2.5 text-white opacity-0 transition-opacity duration-300 hover:bg-white/15 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleArrow(goNext)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full glass p-2.5 text-white opacity-0 transition-opacity duration-300 hover:bg-white/15 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Bottom controls: dots + play/pause */}
      {total > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-4 px-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Carousel slides">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => handleDotClick(i)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 ${
                  i === currentIndex
                    ? 'w-6 bg-cyan'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={isPlaying ? handlePause : handlePlay}
            className="rounded-full glass p-2 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50"
            aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  )
}
