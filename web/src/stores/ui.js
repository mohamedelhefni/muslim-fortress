import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { data } from '../data/data.js';

const STORAGE_THEME = 'mf:theme'

export const useUIStore = defineStore('uiStore', () => {
    const searchQuery = ref('');
    const searchResults = ref([])
    const isContentActive = ref(false);
    const isSmallScreen = ref(typeof window !== 'undefined' && window.innerWidth < 640)
    const isSidebarOpen = ref(false)
    const azkar = ref(data)
    const activeZekr = ref({})
    const favoriteZekrIds = ref([])
    const favoriteAzkar = computed(() => azkar.value.filter((zekr) => favoriteZekrIds.value.includes(zekr.id)))

    const initialTheme = (() => {
        if (typeof window === 'undefined') return 'dark'
        const saved = localStorage.getItem(STORAGE_THEME)
        if (saved === 'light' || saved === 'dark') return saved
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    })()
    const currentTheme = ref(initialTheme)

    function applyTheme(theme) {
        if (typeof document === 'undefined') return
        document.documentElement.classList.toggle('light', theme === 'light')
    }
    applyTheme(currentTheme.value)

    if (typeof window !== 'undefined') {
        window.addEventListener('resize', () => {
            isSmallScreen.value = window.innerWidth < 640
            if (!isSmallScreen.value) isSidebarOpen.value = false
        })
    }

    function openSidebar() { isSidebarOpen.value = true }
    function closeSidebar() { isSidebarOpen.value = false }
    function toggleSidebar() { isSidebarOpen.value = !isSidebarOpen.value }

    function toggleContent() {
        isContentActive.value = !isContentActive.value;
        if (!isContentActive.value) closeSidebar()
    }

    function setActiveZekr(zekr) {
        isContentActive.value = true
        isSidebarOpen.value = false
        activeZekr.value = zekr
        activeZekr.value.content = zekr.text.map((content, idx) => ({
            id: idx,
            isRead: false,
            text: content,
            count: zekr.counts?.[idx] ?? 1,
            currentCount: 0,
        }))
    }

    function incrementCounter(item) {
        const target = item.count || 1
        if (item.currentCount < target) {
            item.currentCount += 1
            if (item.currentCount >= target) item.isRead = true
        } else {
            item.currentCount = 0
            item.isRead = false
        }
    }

    function resetCounter(item) {
        item.currentCount = 0
        item.isRead = false
    }

    function isFavorite(zekr) {
        return favoriteZekrIds.value.includes(zekr.id)
    }

    function setIsFavrorite(zekr) {
        if (isFavorite(zekr)) {
            const index = favoriteZekrIds.value.indexOf(zekr.id)
            favoriteZekrIds.value.splice(index, 1)
        } else {
            favoriteZekrIds.value.push(zekr.id)
        }
    }

    function searchZekr() {
        if (searchQuery.value === '') {
            searchResults.value = []
            return
        }

        const q = searchQuery.value
        searchResults.value = azkar.value.filter(zekr =>
            zekr.title.includes(q) ||
            zekr.text.some(line => line && line.includes(q))
        )
    }

    function toggleDarkTheme() {
        currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
        applyTheme(currentTheme.value)
        try { localStorage.setItem(STORAGE_THEME, currentTheme.value) } catch {}
    }

    const progress = computed(() => {
        if (!activeZekr.value?.content?.length) return { read: 0, total: 0, percent: 0 }
        const total = activeZekr.value.content.length
        const read = activeZekr.value.content.filter((c) => c.isRead).length
        return { read, total, percent: total ? Math.round((read / total) * 100) : 0 }
    })

    return {
        azkar, searchResults, isContentActive, isSmallScreen, isSidebarOpen,
        toggleContent, openSidebar, closeSidebar, toggleSidebar,
        activeZekr, favoriteZekrIds, favoriteAzkar, searchQuery,
        setActiveZekr, incrementCounter, resetCounter,
        setIsFavrorite, isFavorite, searchZekr, currentTheme, toggleDarkTheme,
        progress,
    }
})
