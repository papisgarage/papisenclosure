export type ImageCategory = 'framing' | 'hydraulics' | 'finish'

export type GalleryCategory =
  | 'all'
  | 'framing'
  | 'hydraulics'
  | 'finished-builds'
  | 'behind-the-scenes'

export interface GalleryImage {
  src: string
  alt: string
  category: Exclude<GalleryCategory, 'all'>
}

/** How many gallery images to pull from each truck folder before switching */
const GALLERY_BATCH_SIZE = 2

/**
 * Auto-load images from src/assets/images via Vite's import.meta.glob.
 * Drop files into the matching folder and they appear automatically.
 */
const assetModules = import.meta.glob<{ default: string }>(
  '../assets/images/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
)

const BASE_URL = import.meta.env.BASE_URL

function parseAssetPath(path: string): { folder: string; filename: string } {
  const parts = path.split('/')
  const filename = parts[parts.length - 1] ?? 'image'
  const imagesIndex = parts.indexOf('images')
  const folder = imagesIndex >= 0 ? (parts[imagesIndex + 1] ?? '') : ''
  return { folder, filename }
}

/** Load sorted image URLs from a specific assets subfolder via glob */
function getAssetImagesFromPath(pathSegment: string): string[] {
  return Object.entries(assetModules)
    .filter(([path]) => path.includes(pathSegment))
    .map(([, mod]) => mod.default)
    .sort()
}

function getAssetImages(category: ImageCategory): string[] {
  return getAssetImagesFromPath(`/images/${category}/`)
}

function publicImageUrl(folder: string, filename: string): string {
  return `${BASE_URL}images/${folder}/${encodeURIComponent(filename)}`
}

/**
 * Load images from public/images/<folder>/ when listed in manifest.
 * Run scripts/sync-images.ps1 after adding photos to Web Pictures.
 */
function getPublicImagesFromFolder(folder: string, filenames: string[]): string[] {
  if (filenames.length === 0) return []
  return filenames.map((f) => publicImageUrl(folder, f))
}

/**
 * Interleave two image lists in batches (e.g. 2 from truck 1, 2 from truck 2, repeat).
 */
export function interleaveInBatches(
  first: string[],
  second: string[],
  batchSize = GALLERY_BATCH_SIZE,
): string[] {
  const result: string[] = []
  let i = 0
  let j = 0

  while (i < first.length || j < second.length) {
    for (let n = 0; n < batchSize && i < first.length; n++) {
      result.push(first[i])
      i++
    }
    for (let n = 0; n < batchSize && j < second.length; n++) {
      result.push(second[j])
      j++
    }
  }

  return result
}

function resolveFolderImages(assetPath: string, publicFolder: string): string[] {
  const assets = getAssetImagesFromPath(assetPath)
  if (assets.length > 0) return assets

  // Public folder: attempt to read any synced files via known manifest keys
  const manifestKey = publicFolder.replace(/^images\//, '')
  const manifestFiles = PUBLIC_IMAGE_MANIFEST[manifestKey] ?? []
  const publicImages = getPublicImagesFromFolder(publicFolder, manifestFiles)
  if (publicImages.length > 0) return publicImages

  return []
}

/** Tow Truck #1 and #2 gallery sources */
function getTowTruck1Images(): string[] {
  return resolveFolderImages('/images/gallery/tow-truck-1/', 'gallery/tow-truck-1')
}

function getTowTruck2Images(): string[] {
  return resolveFolderImages('/images/gallery/tow-truck-2/', 'gallery/tow-truck-2')
}

/** Finished builds gallery: 2 from truck 1, 2 from truck 2, alternating */
export function getInterleavedTowTruckImages(): string[] {
  return interleaveInBatches(getTowTruck1Images(), getTowTruck2Images(), GALLERY_BATCH_SIZE)
}

/** Hero backgrounds from Main photo folder — drop images in src/assets/images/hero/ */
export function getHeroImages(): string[] {
  const assets = getAssetImagesFromPath('/images/hero/')
  if (assets.length > 0) return assets

  const publicHero = getPublicImagesFromFolder('hero', PUBLIC_IMAGE_MANIFEST.hero ?? [])
  if (publicHero.length > 0) return publicHero

  // Fallback to first framing image if hero folder is empty
  const framing = getCategoryImages('framing')
  if (framing.length > 0) return framing

  return [PLACEHOLDERS.framing[0]]
}

/**
 * Public folder manifest for categories not yet synced to src/assets.
 * After running sync-images.ps1, src/assets glob takes priority automatically.
 */
const PUBLIC_IMAGE_MANIFEST: Record<string, string[]> = {
  hero: [],
  framing: [
    'IMG_4677.jpg',
    'IMG_4686.jpg',
    'IMG_4687.jpg',
    'IMG_4688 (2).jpg',
    'IMG_4760 (2).jpg',
    'IMG_4761 (2).jpg',
    'IMG_4762 (2).jpg',
  ],
  hydraulics: [
    'IMG_4778.jpg',
    'IMG_4779.jpg',
    'photo_25_2026-06-29_14-02-02.jpg',
    'photo_27_2026-06-29_14-02-02.jpg',
    'photo_28_2026-06-29_14-02-02.jpg',
    'photo_29_2026-06-29_14-02-02.jpg',
    'photo_30_2026-06-29_14-02-02.jpg',
    'photo_31_2026-06-29_14-02-02.jpg',
    'photo_33_2026-06-29_14-02-02.jpg',
    'photo_37_2026-06-29_14-02-02.jpg',
  ],
  finish: [
    'IMG_4769.jpg',
    'IMG_4774.jpg',
    'IMG_4777.jpg',
    'IMG_4790.jpg',
    'photo_20_2026-06-29_14-02-02.jpg',
    'photo_21_2026-06-29_14-02-02.jpg',
    'photo_35_2026-06-29_14-02-02.jpg',
    'photo_40_2026-06-29_14-02-02.jpg',
  ],
  'gallery/tow-truck-1': [],
  'gallery/tow-truck-2': [],
  'gallery/framing': [],
  'gallery/hydraulics': [],
  'gallery/behind-the-scenes': [],
}

/** Premium placeholder images when folders are empty */
const PLACEHOLDERS: Record<ImageCategory, string[]> = {
  framing: [
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80',
  ],
  hydraulics: [
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
  ],
  finish: [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1600&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80',
  ],
}

export function getCategoryImages(category: ImageCategory): string[] {
  const assets = getAssetImages(category)
  if (assets.length > 0) return assets

  const publicImages = getPublicImagesFromFolder(category, PUBLIC_IMAGE_MANIFEST[category] ?? [])
  if (publicImages.length > 0) return publicImages

  return PLACEHOLDERS[category]
}

const GALLERY_CATEGORY_MAP: Record<Exclude<GalleryCategory, 'all'>, string> = {
  framing: 'gallery/framing',
  hydraulics: 'gallery/hydraulics',
  'finished-builds': 'gallery/finished-builds',
  'behind-the-scenes': 'gallery/behind-the-scenes',
}

const GALLERY_LABELS: Record<Exclude<GalleryCategory, 'all'>, string> = {
  framing: 'Framing',
  hydraulics: 'Hydraulics',
  'finished-builds': 'Finished Builds',
  'behind-the-scenes': 'Behind the Scenes',
}
function srcToGalleryImage(
  src: string,
  category: Exclude<GalleryCategory, 'all'>,
  alt: string,
): GalleryImage {
  return { src, alt, category }
}

/** Build gallery dataset — finished builds interleaves tow truck #1 and #2 (2 at a time) */
export function getGalleryImages(): GalleryImage[] {
  const images: GalleryImage[] = []
  const seen = new Set<string>()

  const add = (img: GalleryImage) => {
    if (seen.has(img.src)) return
    seen.add(img.src)
    images.push(img)
  }

  // Finished builds: alternating tow truck folders (2 + 2 + 2...)
  getInterleavedTowTruckImages().forEach((src, i) => {
    add(
      srcToGalleryImage(
        src,
        'finished-builds',
        `Finished Build photo ${i + 1}`,
      ),
    )
  })

  // Other gallery subfolders from assets
  Object.entries(assetModules).forEach(([path, mod]) => {
    if (!path.includes('/images/gallery/')) return
    if (path.includes('/tow-truck-1/') || path.includes('/tow-truck-2/')) return

    const subfolder = path.split('/images/gallery/')[1]?.split('/')[0]
    if (!subfolder || subfolder.startsWith('tow-truck')) return

    const category = subfolder as Exclude<GalleryCategory, 'all'>
    if (!GALLERY_LABELS[category]) return

    const { filename } = parseAssetPath(path)
    add(
      srcToGalleryImage(
        mod.default,
        category,
        `${GALLERY_LABELS[category]}, ${filename}`,
      ),
    )
  })

  // Public manifest for non tow-truck categories
  ;(['framing', 'hydraulics', 'behind-the-scenes'] as const).forEach(
    (category) => {
      const folder = GALLERY_CATEGORY_MAP[category]
      const files = PUBLIC_IMAGE_MANIFEST[folder] ?? []
      files.forEach((filename) => {
        add(
          srcToGalleryImage(
            publicImageUrl(folder, filename),
            category,
            `${GALLERY_LABELS[category]}, ${filename}`,
          ),
        )
      })
    },
  )

  // Supplement feature categories when no dedicated gallery folder exists
  const featureCategories: ImageCategory[] = ['framing', 'hydraulics', 'finish']
  featureCategories.forEach((cat) => {
    const galleryCat: Exclude<GalleryCategory, 'all'> =
      cat === 'finish' ? 'finished-builds' : cat
    if (galleryCat === 'finished-builds') return // already handled by interleave

    getCategoryImages(cat).forEach((src, i) => {
      add(
        srcToGalleryImage(
          src,
          galleryCat,
          `${GALLERY_LABELS[galleryCat]} build photo ${i + 1}`,
        ),
      )
    })
  })

  return images
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'framing', label: 'Framing' },
  { id: 'hydraulics', label: 'Hydraulics' },
  { id: 'finished-builds', label: 'Finished Builds' },
  { id: 'behind-the-scenes', label: 'Behind the Scenes' },
]