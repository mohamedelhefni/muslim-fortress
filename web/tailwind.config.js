/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-deep': 'var(--bg-deep)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        'muted-2': 'var(--muted-2)',
        primary: 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        quran: ['"Amiri"', 'serif'],
      },
      letterSpacing: {
        tightish: '-0.012em',
        tightest: '-0.022em',
      },
      borderRadius: {
        card: '16px',
        item: '12px',
      },
      boxShadow: {
        soft: '0 1px 0 hsl(165 30% 0% / 0.20), 0 8px 32px hsl(165 30% 0% / 0.18)',
        glow: '0 0 0 1px hsl(80 80% 50% / 0.10), 0 8px 28px hsl(80 80% 40% / 0.12)',
        lift: '0 8px 24px hsl(165 40% 0% / 0.28)',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-once': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(0.94)' },
          '100%': { transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 320ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-once': 'pulse-once 220ms cubic-bezier(0.25, 1, 0.5, 1)',
        'shimmer': 'shimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
}
