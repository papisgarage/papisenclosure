/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YOUTUBE_API_KEY?: string
  readonly VITE_YOUTUBE_PLAYLIST_ID?: string
  readonly VITE_YOUTUBE_BUILD_VIDEO_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
