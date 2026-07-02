/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#111111',
        matte: '#0a0a0a',
        navy: {
          DEFAULT: '#0d1b2a',
          deep: '#071018',
        },
        teal: {
          DEFAULT: '#14b8a6',
          muted: '#0d9488',
        },
        electric: {
          DEFAULT: '#3b82f6',
          bright: '#60a5fa',
        },
        cyan: {
          DEFAULT: '#22d3ee',
          muted: '#06b6d4',
        },
      },
      fontFamily: {
        display: ['Ethnocentric', 'Orbitron', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.35)',
        soft: '0 4px 24px rgba(0, 0, 0, 0.25)',
        glow: '0 0 40px rgba(34, 211, 238, 0.15)',
      },
      animation: {
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
      },
      keyframes: {
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        section: '7rem',
      },
    },
  },
  plugins: [],
}
