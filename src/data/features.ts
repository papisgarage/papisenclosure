import type { ImageCategory } from '../lib/images'

export interface FeatureSection {
  id: string
  title: string
  subtitle: string
  bullets: string[]
  imageCategory: ImageCategory
  imageOnLeft: boolean
}

export const features: FeatureSection[] = [
  {
    id: 'framing',
    title: 'Heavy Duty Fabricated Frame',
    subtitle:
      'Structural integrity engineered from the ground up. Every joint, weld, and tube chosen for trucks that work without compromise.',
    bullets: [
      'Heavy gauge structural tubing',
      'Precision CNC laser cut components',
      'Fully welded construction',
      'Reinforced stress points',
      'Built to outlast the truck',
    ],
    imageCategory: 'framing',
    imageOnLeft: true,
  },
  {
    id: 'hydraulics',
    title: 'Integrated Hydraulic Systems',
    subtitle:
      'Clean, professional hydraulic integration that keeps your equipment running reliably while maintaining a premium appearance.',
    bullets: [
      'Concealed plumbing and routing',
      'Easy OEM accessibility',
      'Professional grade hose management',
      'Clean, factory level installation',
      'Reliable daily operation',
    ],
    imageCategory: 'hydraulics',
    imageOnLeft: false,
  },
  {
    id: 'finish',
    title: 'Premium Finish',
    subtitle:
      'The details that separate professional equipment from everything else. Finishes that look as good as they perform.',
    bullets: [
      'Durable powder coat finish',
      'Integrated LED lighting',
      'Stainless steel hardware',
      'Precision aluminum panels',
      'Showroom level appearance',
    ],
    imageCategory: 'finish',
    imageOnLeft: true,
  },
]
