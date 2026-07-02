import { useCallback, useEffect, useState } from 'react'
import type { YouTubeShort } from '../data/shorts'
import { PLACEHOLDER_SHORTS } from '../data/shorts'
import { fetchYouTubeShortsFromPlaylist } from '../lib/youtube'
import { YOUTUBE } from '../lib/constants'

interface UseYouTubeShortsResult {
  shorts: YouTubeShort[]
  loading: boolean
  error: string | null
  isLive: boolean
  retry: () => void
}

export function useYouTubeShorts(): UseYouTubeShortsResult {
  const [shorts, setShorts] = useState<YouTubeShort[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLive, setIsLive] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const playlistId = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID

    if (!apiKey) {
      setShorts(PLACEHOLDER_SHORTS)
      setLoading(false)
      setIsLive(false)
      setError('Add VITE_YOUTUBE_API_KEY to .env to load your Shorts playlist.')
      return
    }

    if (!playlistId) {
      setShorts(PLACEHOLDER_SHORTS)
      setLoading(false)
      setIsLive(false)
      setError(
        'Add VITE_YOUTUBE_PLAYLIST_ID to .env. Paste your playlist URL or ID (playlist must be Unlisted or Public).',
      )
      return
    }

    let cancelled = false

    async function load(playlistId: string, apiKey: string) {
      setLoading(true)
      setError(null)

      try {
        const results = await fetchYouTubeShortsFromPlaylist(
          playlistId,
          apiKey,
          YOUTUBE.shortsLabel,
        )

        if (cancelled) return

        if (results.length === 0) {
          setShorts(PLACEHOLDER_SHORTS)
          setIsLive(false)
          setError('Playlist is empty. Add Shorts to your playlist in YouTube Studio.')
        } else {
          setShorts(results)
          setIsLive(true)
        }
      } catch (err) {
        if (cancelled) return
        const message = err instanceof Error ? err.message : 'Failed to load YouTube Shorts'
        setError(message)
        setShorts(PLACEHOLDER_SHORTS)
        setIsLive(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load(playlistId, apiKey)

    return () => {
      cancelled = true
    }
  }, [attempt])

  return { shorts, loading, error, isLive, retry }
}
