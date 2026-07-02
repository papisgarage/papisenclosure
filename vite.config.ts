import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production base path for GitHub Pages — matches github.com/papisgarage/papisenclosure
const GITHUB_PAGES_BASE = '/papisenclosure/'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? GITHUB_PAGES_BASE : '/',
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true,
  },
}))
