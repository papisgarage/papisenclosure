export interface YouTubeShort {
  id: string
  title: string
  thumbnail: string
  duration: string
  viewCount: string
  hashtag: string
  videoUrl: string
}

/** Fallback cards when the YouTube API key or playlist is unavailable */
export const PLACEHOLDER_SHORTS: YouTubeShort[] = [
  {
    id: 'short-1',
    title: 'Frame Welding, Precision Fabrication',
    thumbnail: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=700&fit=crop&q=80',
    duration: '0:42',
    viewCount: '12.4K',
    hashtag: '#PAPISEnclosures',
    videoUrl: '#',
  },
  {
    id: 'short-2',
    title: 'Hydraulic Line Routing Walkthrough',
    thumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=700&fit=crop&q=80',
    duration: '0:58',
    viewCount: '8.7K',
    hashtag: '#PAPISEnclosures',
    videoUrl: '#',
  },
  {
    id: 'short-3',
    title: 'Premium Finish Walkthrough',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=700&fit=crop&q=80',
    duration: '0:35',
    viewCount: '15.2K',
    hashtag: '#PAPISEnclosures',
    videoUrl: '#',
  },
  {
    id: 'short-4',
    title: 'Powder Coat & LED Install',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=700&fit=crop&q=80',
    duration: '0:51',
    viewCount: '9.1K',
    hashtag: '#PAPISEnclosures',
    videoUrl: '#',
  },
  {
    id: 'short-5',
    title: 'Finished Build, Full Walkaround',
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=700&fit=crop&q=80',
    duration: '0:47',
    viewCount: '22.8K',
    hashtag: '#PAPISEnclosures',
    videoUrl: '#',
  },
  {
    id: 'short-6',
    title: 'Behind the Scenes, Shop Floor',
    thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=700&fit=crop&q=80',
    duration: '0:39',
    viewCount: '6.3K',
    hashtag: '#PAPISEnclosures',
    videoUrl: '#',
  },
]
