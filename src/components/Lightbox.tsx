import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '../lib/images'

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const image = images[currentIndex]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [currentIndex, images.length, onClose, onNavigate])

  if (!image) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 z-10 rounded-full glass p-3 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((currentIndex - 1 + images.length) % images.length)
        }}
        className="absolute left-4 z-10 rounded-full glass p-3 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 sm:left-6"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((currentIndex + 1) % images.length)
        }}
        className="absolute right-4 z-10 rounded-full glass p-3 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 sm:right-6"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={image.src}
          className="relative max-h-[85vh] max-w-[90vw]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-glass"
          />
          <figcaption className="mt-4 text-center text-sm text-white/60">
            {image.alt} · {currentIndex + 1} of {images.length}
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  )
}
