import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production base path for GitHub Pages — update to match your repo name
const GITHUB_PAGES_BASE = '/tow-truck-enclosure-website/'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? GITHUB_PAGES_BASE : '/',
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    watch: {
      // Required when project lives on a network drive (UNC)
      usePolling: true,
      interval: 1000,
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true,
  },
}))
