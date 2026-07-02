import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Container from './ui/Container'
import SectionTitle from './ui/SectionTitle'
import Lightbox from './Lightbox'
import {
  getGalleryImages,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryImage,
} from '../lib/images'
import { SECTION_IDS } from '../lib/constants'

export default function GalleryGrid() {
  const allImages = useMemo(() => getGalleryImages(), [])
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return allImages
    return allImages.filter((img) => img.category === activeCategory)
  }, [activeCategory, allImages])

  const openLightbox = (image: GalleryImage) => {
    const index = filteredImages.findIndex((img) => img.src === image.src)
    setLightboxIndex(index >= 0 ? index : 0)
  }

  return (
    <section id={SECTION_IDS.gallery} className="section-padding bg-charcoal">
      <Container>
        <SectionTitle
          label="Portfolio"
          title="Our Work"
          subtitle="Every build tells a story of precision engineering and uncompromising craftsmanship."
        />

        {/* Category filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 ${
                activeCategory === cat.id
                  ? 'text-charcoal'
                  : 'glass text-white/70 hover:text-white'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="galleryFilter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-teal to-cyan"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.button
                  key={image.src}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50"
                  onClick={() => openLightbox(image)}
                  aria-label={`View ${image.alt}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <p className="absolute bottom-0 left-0 right-0 p-4 text-left text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {image.alt}
                    </p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filteredImages.length === 0 && (
          <p className="text-center text-white/40">No images in this category yet.</p>
        )}
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
