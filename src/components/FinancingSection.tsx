import { motion } from 'framer-motion'
import { Truck, CreditCard, CalendarClock } from 'lucide-react'
import Container from './ui/Container'
import SectionTitle from './ui/SectionTitle'
import Button from './ui/Button'
import { SECTION_IDS } from '../lib/constants'

const points = [
  {
    icon: Truck,
    title: 'Buy the Truck, Build the Enclosure',
    description:
      'Purchasing a new truck? We can build your enclosure into the same deal so it becomes part of one financed package.',
  },
  {
    icon: CreditCard,
    title: 'Rolled Into Your Payment',
    description:
      'Instead of a large upfront cost, the enclosure is financed right into the payment of your new truck.',
  },
  {
    icon: CalendarClock,
    title: 'One Simple Monthly Payment',
    description:
      'Drive away with a fully built rig that is ready for the road and a single manageable monthly payment.',
  },
]

export default function FinancingSection() {
  return (
    <section
      id={SECTION_IDS.financing}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-charcoal via-navy-deep/40 to-charcoal"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan/5 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionTitle
          label="Financing"
          title="Finance It With Your New Truck"
          subtitle="Buying a new truck? Your enclosure doesn't have to be a separate, upfront expense. We can build it into your truck purchase so the cost is financed into your monthly payment."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              className="glass-card flex flex-col gap-4 rounded-3xl p-8"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                <point.icon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl font-semibold text-white">
                {point.title}
              </h3>
              <p className="text-base leading-relaxed text-white/60">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-white/50">
            Ask us how to bundle your enclosure into your next truck purchase, and
            we'll walk you through the options.
          </p>
          <Button href={`#${SECTION_IDS.quote}`} size="lg">
            Ask About Financing
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
