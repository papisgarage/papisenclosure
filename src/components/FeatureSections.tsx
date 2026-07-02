import Container from './ui/Container'
import SectionTitle from './ui/SectionTitle'
import FeatureCarousel from './FeatureCarousel'
import { features, type FeatureSection } from '../data/features'
import { SECTION_IDS } from '../lib/constants'

interface FeatureSectionsProps {
  items?: FeatureSection[]
  showHeader?: boolean
  startIndex?: number
  sectionId?: string
  className?: string
}

export default function FeatureSections({
  items = features,
  showHeader = true,
  startIndex = 0,
  sectionId = SECTION_IDS.features,
  className = 'section-padding bg-gradient-to-b from-charcoal via-navy-deep/30 to-charcoal',
}: FeatureSectionsProps) {
  return (
    <section id={sectionId} className={className}>
      {showHeader && (
        <Container>
          <SectionTitle
            label="Engineering"
            title="Built to Perform. Designed to Impress."
            subtitle="Every enclosure is engineered around the demands of professional towing from structural integrity to daily usability."
          />
        </Container>
      )}

      <div className="space-y-24 lg:space-y-32">
        {items.map((feature, index) => (
          <Container key={feature.id}>
            <FeatureCarousel feature={feature} index={startIndex + index} />
          </Container>
        ))}
      </div>
    </section>
  )
}
