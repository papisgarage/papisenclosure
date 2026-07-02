import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import Container from './ui/Container'
import { SECTION_IDS, CONTACT, PRICING } from '../lib/constants'

export default function ContactSection() {
  const phoneHref = `tel:${CONTACT.phone.replace(/\D/g, '')}`

  return (
    <section id={SECTION_IDS.quote} className="section-padding bg-gradient-to-b from-charcoal to-navy-deep/50">
      <Container>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan">
            Order Today
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to Build Yours?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Premium tow truck enclosures starting at {PRICING.display}. Call or email to get started.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
            <a
              href={phoneHref}
              className="group flex items-center gap-4 rounded-2xl glass-card px-8 py-6 transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan/20">
                <Phone className="h-5 w-5" />
              </span>
              <span className="text-left">
                <span className="block text-xs uppercase tracking-wider text-white/50">Phone</span>
                <span className="block text-lg font-semibold text-white">{CONTACT.phone}</span>
              </span>
            </a>

            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(PRICING.orderEmailSubject)}`}
              className="group flex items-center gap-4 rounded-2xl glass-card px-8 py-6 transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan/20">
                <Mail className="h-5 w-5" />
              </span>
              <span className="text-left">
                <span className="block text-xs uppercase tracking-wider text-white/50">Email</span>
                <span className="block text-lg font-semibold text-white">{CONTACT.email}</span>
              </span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
