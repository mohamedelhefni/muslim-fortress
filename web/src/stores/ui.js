import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { data } from '../data/data.js'

const KEY_THEME = 'mf:theme'
const KEY_FAVS = 'mf:favorites'
const KEY_PROGRESS = 'mf:progress'

function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}
const today = () => new Date().toLocaleDateString('en-CA')

// Strip tashkeel/tatweel and fold letter variants so "الحمد" finds "الحَمْدُ".
const MARKS = '[\\u064B-\\u065F\\u0670\\u0640]*'
const FOLD = { 'ا': '[اأإآٱ]', 'أ': '[اأإآٱ]', 'إ': '[اأإآٱ]', 'آ': '[اأإآٱ]', 'ه': '[هة]', 'ة': '[هة]', 'ي': '[يى]', 'ى': '[يى]' }
export function searchRegex(q) {
    const chars = [...q.replace(/[ً-ٰٟـ]/g, '').trim()]
    if (!chars.length) return null
    const body = chars.map(c => (FOLD[c] ?? c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s/, '\\s+')) + MARKS).join('')
    return new RegExp(body, 'g')
}

export const useUIStore = defineStore('uiStore', () => {
    const azkar = data
    const byId = new Map(data.map(z => [z.id, z]))

    // Section lives in the URL hash: deep links, browser back, and one page_view per section.
    const activeId = ref(null)
    function syncFromHash() {
        const z = byId.get(Number(location.hash.slice(1)))
        activeId.value = z ? z.id : null
        document.title = z ? `${z.title} · حصن المسلم` : 'حصن المسلم'
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    const activeZekr = computed(() => byId.get(activeId.value) ?? null)

    // Favorites (migrates the old whole-store `piniaState` blob once, by title).
    if (localStorage.getItem('piniaState')) {
        const old = load('piniaState', {})?.uiStore
        const titles = new Set((old?.azkar ?? []).filter(z => old.favoriteZekrIds?.includes(z.id)).map(z => z.title))
        save(KEY_FAVS, data.filter(z => titles.has(z.title)).map(z => z.id))
        localStorage.removeItem('piniaState')
    }
    const favoriteIds = ref(load(KEY_FAVS, []))
    watch(favoriteIds, v => save(KEY_FAVS, v), { deep: true })
    const favoriteAzkar = computed(() => favoriteIds.value.map(id => byId.get(id)).filter(Boolean))
    const isFavorite = (zekr) => favoriteIds.value.includes(zekr.id)
    function toggleFavorite(zekr) {
        const i = favoriteIds.value.indexOf(zekr.id)
        i === -1 ? favoriteIds.value.push(zekr.id) : favoriteIds.value.splice(i, 1)
    }

    // Counts: { date, counts: { [itemId]: n } }, kept per day so leaving a section or reloading keeps your place.
    const stored = load(KEY_PROGRESS, null)
    const progress = ref(stored?.date === today() ? stored : { date: today(), counts: {} })
    watch(progress, v => save(KEY_PROGRESS, v), { deep: true })
    function rollDay() {
        if (progress.value.date !== today()) progress.value = { date: today(), counts: {} }
    }
    const countOf = (item) => progress.value.counts[item.id] ?? 0
    const isDone = (item) => countOf(item) >= item.count
    function increment(item) {
        rollDay()
        if (isDone(item)) return false // a stray tap must never wipe a finished dhikr
        progress.value.counts[item.id] = countOf(item) + 1
        return isDone(item)
    }
    function reset(item) { delete progress.value.counts[item.id] }
    function resetSection(zekr) { zekr.items.forEach(reset) }
    const hasProgress = computed(() => Object.keys(progress.value.counts).length > 0)
    function resetAll() { progress.value.counts = {} }
    function sectionProgress(zekr) {
        const done = zekr.items.filter(isDone).length
        return { done, total: zekr.items.length, percent: Math.round((done / zekr.items.length) * 100) }
    }

    const searchQuery = ref('')
    const searchResults = computed(() => {
        const re = searchRegex(searchQuery.value)
        if (!re) return []
        const hit = (s) => { re.lastIndex = 0; return re.test(s) }
        return data.filter(z => hit(z.title) || z.items.some(i => hit(i.text)))
    })

    const currentTheme = ref(document.documentElement.dataset.theme)
    function toggleTheme() {
        currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
        document.documentElement.dataset.theme = currentTheme.value
        try { localStorage.setItem(KEY_THEME, currentTheme.value) } catch {}
    }

    return {
        azkar, activeId, activeZekr,
        favoriteAzkar, isFavorite, toggleFavorite,
        countOf, isDone, increment, reset, resetSection, sectionProgress, hasProgress, resetAll,
        searchQuery, searchResults,
        currentTheme, toggleTheme,
    }
})

export const arNum = (n) => n.toLocaleString('ar-EG')
