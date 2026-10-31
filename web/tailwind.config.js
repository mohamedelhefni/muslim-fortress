// Mizan tokens live in CSS vars; color-mix lets opacity modifiers (bg-primary/20) work on them.
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
        feature: c('feature'),
        ink: c('ink'),
        muted: c('ink-muted'),
        line: c('line'),
        'line-strong': c('line-strong'),
        primary: c('primary'),
        'primary-hover': c('primary-hover'),
        'on-primary': c('on-primary'),
        'primary-soft': c('primary-soft'),
        ornament: c('ornament'),
      },
      fontFamily: {
        head: 'var(--font-head)',
        text: 'var(--font-text)',
        digital: 'var(--font-digital)',
        quran: 'var(--font-quran)',
      },
      fontSize: {
        h1: ['34px', { lineHeight: '54px', fontWeight: '700' }],
        h2: ['26px', { lineHeight: '42px', fontWeight: '500' }],
        h3: ['20px', { lineHeight: '32px', fontWeight: '500' }],
        lead: ['21px', { lineHeight: '38px', fontWeight: '300' }],
        quote: ['20px', { lineHeight: '38px', fontWeight: '400' }],
        'verse-sm': ['23px', { lineHeight: '50px', fontWeight: '400' }],
        label: ['15px', { lineHeight: '24px', fontWeight: '500' }],
        caption: ['13px', { lineHeight: '20px', fontWeight: '400' }],
      },
      borderRadius: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' },
      boxShadow: { focus: 'var(--focus-ring)' },
    },
  },
  plugins: [],
}
