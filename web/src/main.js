import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// The SDK only auto-tracks the first load and <a> clicks, and buffers events for 30s.
// This is a single-page app, so send a page_view per section and flush when the tab is hidden
// (mobile browsers rarely fire beforeunload, so buffered events were being lost).
const siraaj = window.SiraajAnalytics?.analytics
if (siraaj) {
    siraaj.init({ apiUrl: 'https://analytics.hefni101.dev', projectId: 'muslim-fortress', autoTrack: true, useBeacon: true })
    window.addEventListener('hashchange', () => siraaj.pageView(location.pathname + location.hash))
    document.addEventListener('visibilitychange', () => document.hidden && siraaj.flush(true))
}

createApp(App).use(createPinia()).mount('#app')
