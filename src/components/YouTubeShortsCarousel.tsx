import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight, Eye, RefreshCw } from 'lucide-react'
import Container from './ui/Container'
import SectionTitle from './ui/SectionTitle'
import { useYouTubeShorts } from '../hooks/useYouTubeShorts'
import { SECTION_IDS } from '../lib/constants'

function ShortCardSkeleton() {
  return (
    <div className="w-64 shrink-0 snap-start">
      <div className="glass-card overflow-hidden animate-pulse">
        <div className="aspect-[9/16] bg-white/10" />
        <div className="space-y-3 p-4">
          <div className="h-4 rounded bg-white/10" />
          <div className="h-3 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    </div>
  )
}

export default function YouTubeShortsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { shorts, loading, error, isLive, retry } = useYouTubeShorts()

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section id={SECTION_IDS.shorts} className="section-padding bg-charcoal">
      <Container>
        <SectionTitle
          label="Shorts"
          title="Behind the Build"
          subtitle="Quick looks at our shop floor, fabrication process, and finished builds, pulled from your YouTube playlist."
        />

        {error && (
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-white/60">
            <span>{error}</span>
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2 text-white hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        )}

        {isLive && !loading && (
          <p className="mb-6 text-center text-xs uppercase tracking-widest text-cyan/80">
            Live from YouTube · {shorts.length} Short{shorts.length !== 1 ? 's' : ''}
          </p>
        )}

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass p-3 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 lg:flex"
            aria-label="Scroll shorts left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full glass p-3 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 lg:flex"
            aria-label="Scroll shorts right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="hide-scrollbar flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            role="list"
            aria-label="YouTube Shorts"
            aria-busy={loading}
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ShortCardSkeleton key={i} />)
              : shorts.map((short, i) => (
                  <motion.a
                    key={short.id}
                    href={short.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    className="group w-64 shrink-0 snap-start rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <article className="glass-card overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                      <div className="relative aspect-[9/16] overflow-hidden">
                        <img
                          src={short.thumbnail}
                          alt={short.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                            <Play className="h-6 w-6 fill-white text-white" />
                          </span>
                        </div>

                        <span className="absolute bottom-3 right-3 rounded-md bg-charcoal/80 px-2 py-0.5 text-xs font-medium text-white">
                          {short.duration}
                        </span>
                      </div>

                      <div className="p-4">
                        <h3 className="line-clamp-2 text-sm font-semibold text-white">
                          {short.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {short.viewCount} views
                          </span>
                        </div>
                        <p className="mt-2 text-xs font-medium text-cyan">{short.hashtag}</p>
                      </div>
                    </article>
                  </motion.a>
                ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
