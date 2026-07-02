import { parseVideoId } from './youtube'

/** Design tokens — avoid magic numbers in components */
export const ANIMATION = {
  /** Carousel autoplay interval in milliseconds */
  CAROUSEL_INTERVAL_MS: 4500,
  /** Ken Burns zoom scale at end of transition */
  KEN_BURNS_SCALE: 1.06,
  /** Default transition duration in seconds */
  TRANSITION_DURATION_S: 0.8,
  /** Scroll reveal stagger delay */
  STAGGER_DELAY_S: 0.1,
  /** Hero background rotation interval */
  HERO_INTERVAL_MS: 6000,
} as const

export const SECTION_IDS = {
  hero: 'hero',
  features: 'features',
  financing: 'financing',
  gallery: 'gallery',
  video: 'video',
  shorts: 'shorts',
  quote: 'quote',
} as const

export const CONTACT = {
  phone: '(786) 301-9542',
  email: 'info@papisgarage.com',
} as const

export const PRICING = {
  display: '$55,000',
  orderEmailSubject: 'Order Today — $55K Enclosure',
} as const

export const YOUTUBE = {
  /** Long format build video — set VITE_YOUTUBE_BUILD_VIDEO_ID in .env */
  buildVideoId: parseVideoId(
    import.meta.env.VITE_YOUTUBE_BUILD_VIDEO_ID ?? '7Ol9WkUZeus',
  ),
  /** Label shown on Shorts cards */
  shortsLabel: 'PAPIS Enclosures',
} as const
