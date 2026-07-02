import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production base path for GitHub Pages — matches github.com/papisgarage/papisenclosure
const GITHUB_PAGES_BASE = '/papisenclosure/'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/',
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
