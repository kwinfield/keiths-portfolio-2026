import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem', screens: { lg: '64rem' } },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5', // indigo-600
          fg: '#ffffff',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 6px 20px rgba(0,0,0,.06)'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
export default config
