import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png', 'fonts/ScheherazadeNew-Regular.woff2'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
        // Offline-first: keep the Google Fonts the reader needs.
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
          handler: 'CacheFirst',
          options: { cacheName: 'fonts', expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } },
        }],
      },
      manifest: {
        name: 'حصن المسلم',
        short_name: 'حصن المسلم',
        description: 'حصن المسلم من أذكار الكتاب والسنة',
        lang: 'ar',
        dir: 'rtl',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
