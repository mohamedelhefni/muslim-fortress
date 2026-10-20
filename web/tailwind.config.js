// Rawdah tokens live in CSS vars; color-mix lets opacity modifiers (bg-primary/20) work on them.
const c = (v) => `color-mix(in srgb, var(--${v}) calc(<alpha-value> * 100%), transparent)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        surface: c('surface'),
        raised: c('surface-raised'),
        sunken: c('surface-sunken'),
        ink: c('ink'),
        muted: c('ink-muted'),
        line: c('line'),
        'line-strong': c('line-strong'),
        primary: c('primary'),
        'primary-hover': c('primary-hover'),
        'on-primary': c('on-primary'),
        'primary-soft': c('primary-soft'),
        copper: c('copper'),
        'copper-soft': c('copper-soft'),
        gold: c('gold'),
        'on-gold': c('on-gold'),
        focus: c('focus'),
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        display: ['"Reem Kufi"', '"IBM Plex Sans Arabic"', 'sans-serif'],
        quran: ['Amiri', 'serif'],
      },
      borderRadius: { sm: '6px', md: '12px', lg: '20px' },
    },
  },
  plugins: [],
}
