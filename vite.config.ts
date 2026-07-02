import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the custom apex domain papisenclosures.com, so assets live at the root.
export default defineConfig(() => ({
  plugins: [react()],
  base: '/',
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
