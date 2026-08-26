/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0a0a0a',
          50: '#f5f5f4',
          100: '#141414',
          200: '#1a1a1a',
          300: '#202020',
          400: '#2b2b2b',
          500: '#0d0d0d',
          900: '#050505',
        },
        gold: {
          50: '#fbf6e9',
          100: '#f3e6bd',
          200: '#e8d190',
          300: '#dfc06a',
          400: '#d4af37',
          500: '#c9a24b',
          600: '#b3872f',
          700: '#8f6a24',
          800: '#6b4f1c',
          900: '#473413',
        },
        ivory: '#f6f2e9',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f3e6bd 0%, #d4af37 30%, #b3872f 60%, #d4af37 100%)',
        'radial-fade': 'radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 70%)',
      },
      boxShadow: {
        gold: '0 0 40px rgba(212,175,55,0.25)',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
