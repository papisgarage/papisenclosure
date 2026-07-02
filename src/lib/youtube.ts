import type { YouTubeShort } from '../data/shorts'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

interface YouTubeVideoItem {
  id: string
  snippet: {
    title: string
    thumbnails: {
      high?: { url: string }
      medium?: { url: string }
      default?: { url: string }
    }
  }
  contentDetails: { duration: string }
  statistics: { viewCount?: string }
}

interface PlaylistItem {
  snippet: {
    title: string
    resourceId: { kind: string; videoId: string }
    thumbnails: {
      high?: { url: string }
      medium?: { url: string }
      default?: { url: string }
    }
  }
}

interface PlaylistItemsResponse {
  items?: PlaylistItem[]
  nextPageToken?: string
  error?: { message: string }
}

interface YouTubeVideosResponse {
  items?: YouTubeVideoItem[]
  error?: { message: string }
}

/** Parse ISO 8601 duration (e.g. PT1M30S) to m:ss */
export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '0:00'

  const hours = parseInt(match[1] ?? '0', 10)
  const minutes = parseInt(match[2] ?? '0', 10)
  const seconds = parseInt(match[3] ?? '0', 10)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/** Format view count (e.g. 12400 -> 12.4K) */
export function formatViewCount(count: string | number): string {
  const n = typeof count === 'string' ? parseInt(count, 10) : count
  if (Number.isNaN(n)) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return n.toString()
}

/** Extract video ID from a full YouTube URL or return the ID as-is */
export function parseVideoId(input: string): string {
  const trimmed = input.trim()
  try {
    const url = new URL(trimmed)
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace(/^\//, '').split('/')[0] ?? trimmed
    }
    const v = url.searchParams.get('v')
    if (v) return v
    // /embed/VIDEO_ID or /shorts/VIDEO_ID
    const parts = url.pathname.split('/').filter(Boolean)
    const embedIndex = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'v')
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1]
  } catch {
    // Not a URL — use as raw video ID
  }
  return trimmed
}

/** Extract playlist ID from a full YouTube URL or return the ID as-is */
export function parsePlaylistId(input: string): string {
  const trimmed = input.trim()
  try {
    const url = new URL(trimmed)
    const list = url.searchParams.get('list')
    if (list) return list
  } catch {
    // Not a URL — use as raw playlist ID
  }
  return trimmed
}

function getThumbnail(snippet: YouTubeVideoItem['snippet']): string {
  return (
    snippet.thumbnails.high?.url ??
    snippet.thumbnails.medium?.url ??
    snippet.thumbnails.default?.url ??
    ''
  )
}

function mapVideoToShort(video: YouTubeVideoItem, label: string): YouTubeShort {
  return {
    id: video.id,
    title: video.snippet.title,
    thumbnail: getThumbnail(video.snippet),
    duration: formatDuration(video.contentDetails.duration),
    viewCount: formatViewCount(video.statistics.viewCount ?? '0'),
    hashtag: label,
    videoUrl: `https://www.youtube.com/shorts/${video.id}`,
  }
}

/**
 * Fetch Shorts from a YouTube playlist via the Data API v3.
 *
 * Playlist must be Public or Unlisted — Private playlists require OAuth and won't work.
 * Paste the playlist ID or full URL into VITE_YOUTUBE_PLAYLIST_ID in .env
 */
export async function fetchYouTubeShortsFromPlaylist(
  playlistIdOrUrl: string,
  apiKey: string,
  label: string,
  maxResults = 50,
): Promise<YouTubeShort[]> {
  const playlistId = parsePlaylistId(playlistIdOrUrl)
  const playlistEntries: { videoId: string; snippet: PlaylistItem['snippet'] }[] = []
  let pageToken: string | undefined

  do {
    const playlistUrl = new URL(`${YOUTUBE_API_BASE}/playlistItems`)
    playlistUrl.searchParams.set('part', 'snippet')
    playlistUrl.searchParams.set('playlistId', playlistId)
    playlistUrl.searchParams.set('maxResults', String(Math.min(maxResults, 50)))
    playlistUrl.searchParams.set('key', apiKey)
    if (pageToken) playlistUrl.searchParams.set('pageToken', pageToken)

    const playlistRes = await fetch(playlistUrl.toString())
    const playlistData: PlaylistItemsResponse = await playlistRes.json()

    if (playlistData.error) {
      const msg = playlistData.error.message
      if (msg.toLowerCase().includes('cannot be found')) {
        throw new Error(
          'Playlist not found or is Private. Set the playlist to Unlisted or Public, then add VITE_YOUTUBE_PLAYLIST_ID to .env',
        )
      }
      throw new Error(msg)
    }

    for (const item of playlistData.items ?? []) {
      const videoId = item.snippet?.resourceId?.videoId
      if (!videoId) continue
      if (!playlistEntries.some((e) => e.videoId === videoId)) {
        playlistEntries.push({ videoId, snippet: item.snippet })
      }
    }

    pageToken = playlistData.nextPageToken
  } while (pageToken && playlistEntries.length < maxResults)

  if (playlistEntries.length === 0) return []

  const allVideoIds = playlistEntries.map((e) => e.videoId)
  const videoDetails = new Map<string, YouTubeVideoItem>()

  for (let i = 0; i < allVideoIds.length; i += 50) {
    const batch = allVideoIds.slice(i, i + 50)
    const videosUrl = new URL(`${YOUTUBE_API_BASE}/videos`)
    videosUrl.searchParams.set('part', 'contentDetails,statistics,snippet')
    videosUrl.searchParams.set('id', batch.join(','))
    videosUrl.searchParams.set('key', apiKey)

    const videosRes = await fetch(videosUrl.toString())
    const videosData: YouTubeVideosResponse = await videosRes.json()

    if (videosData.error) {
      throw new Error(videosData.error.message)
    }

    for (const video of videosData.items ?? []) {
      videoDetails.set(video.id, video)
    }
  }

  const privateCount = playlistEntries.filter(
    (e) => e.snippet.title === 'Private video' || !videoDetails.has(e.videoId),
  ).length

  if (privateCount === playlistEntries.length) {
    throw new Error(
      'All videos in this playlist are Private. In YouTube Studio, set each Short to Unlisted (not Private) so the site can display them.',
    )
  }

  return playlistEntries
    .map(({ videoId }) => {
      const video = videoDetails.get(videoId)
      if (!video) return null
      return mapVideoToShort(video, label)
    })
    .filter((s): s is YouTubeShort => s !== null)
}
