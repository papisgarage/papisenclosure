import { motion } from 'framer-motion'
import Container from './ui/Container'
import SectionTitle from './ui/SectionTitle'
import { SECTION_IDS, YOUTUBE } from '../lib/constants'

export default function VideoSection() {
  return (
    <section
      id={SECTION_IDS.video}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-charcoal via-navy-deep/40 to-charcoal"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionTitle
          label="Process"
          title="Watch the Build Process"
          subtitle="See how every enclosure comes together, from raw steel to finished product ready for the road."
        />

        <motion.div
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-glass ring-1 ring-white/10"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-video w-full bg-navy">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE.buildVideoId}?rel=0&modestbranding=1`}
              title="PAPIS Enclosures build process"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
