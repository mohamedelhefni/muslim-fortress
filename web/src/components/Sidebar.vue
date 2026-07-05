<script setup>
import SearchBar from './SearchBar.vue';
import NavItem from './NavItem.vue';
import NavHeader from './NavHeader.vue';
import { useUIStore } from '@/stores/ui';

const uiStore = useUIStore()

function closeOnBackdrop() {
    uiStore.closeSidebar()
}

function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function makeSnippet(zekr, q, before = 40, after = 90) {
    if (!q || zekr.title.includes(q)) return ''
    const line = zekr.text.find(t => t && t.includes(q))
    if (!line) return ''
    const i = line.indexOf(q)
    const start = Math.max(0, i - before)
    const end = Math.min(line.length, i + q.length + after)
    let s = line.slice(start, end).replace(/\s+/g, ' ').trim()
    if (start > 0) s = '… ' + s
    if (end < line.length) s = s + ' …'
    const re = new RegExp(escapeRegex(escapeHtml(q)), 'g')
    return escapeHtml(s).replace(re, m => `<mark>${m}</mark>`)
}
</script>

<template>
    <Transition enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0" enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-out"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="uiStore.isSmallScreen && uiStore.isSidebarOpen" @click="closeOnBackdrop"
            class="fixed inset-0 z-40 md:hidden backdrop-blur-sm"
            style="background: oklch(from var(--bg-deep) l c h / 0.72);" aria-hidden="true"></div>
    </Transition>

    <aside
        :class="[
            'flex flex-col py-5 md:py-7 px-4 md:px-5 overflow-y-scroll no-scrollbar',
            'border-l border-border/40',
            'md:relative md:col-span-3 lg:col-span-2 md:translate-x-0 md:z-auto',
            'fixed top-0 bottom-0 z-50 w-[320px] max-w-[88vw] shadow-lift',
            'transition-transform duration-300 ease-out-expo',
            uiStore.isSmallScreen
                ? (uiStore.isSidebarOpen ? 'translate-x-0' : 'translate-x-full')
                : '',
        ]"
        style="background: var(--bg-deep);">

        <div class="flex items-center justify-between mb-5 md:hidden px-1">
            <div class="flex items-center gap-2.5">
                <div
                    class="grid place-items-center w-9 h-9 rounded-full"
                    style="background: var(--accent-soft); color: var(--accent);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.2"
                            stroke-dasharray="1.6 2.4" opacity="0.45" />
                        <path d="M16.2 8.5a5.5 5.5 0 1 0 0 7" stroke="currentColor"
                            stroke-width="1.7" stroke-linecap="round" />
                    </svg>
                </div>
                <span class="font-bold text-base text-ink font-quran">حصن المسلم</span>
            </div>
            <button @click="uiStore.closeSidebar()"
                class="grid place-items-center w-10 h-10 -m-2 text-muted hover:text-ink hover:bg-surface-2 rounded-item transition-colors"
                aria-label="إغلاق">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                    <line x1="6" y1="18" x2="18" y2="6"></line>
                </svg>
            </button>
        </div>

        <SearchBar />

        <template v-if="uiStore.searchQuery != ''">
            <NavHeader text="نتائج البحث" :count="uiStore.searchResults.length" />
            <div v-if="uiStore.searchResults.length > 0" class="flex flex-col gap-1 mt-2 mb-5">
                <NavItem v-for="zekr in uiStore.searchResults" :key="zekr.id" :zekr="zekr"
                    :snippet-html="makeSnippet(zekr, uiStore.searchQuery)" />
            </div>
            <div v-else class="flex flex-col items-center justify-center text-center py-12 px-4 mt-2 mb-5 rounded-card border border-dashed"
                style="border-color: var(--border);">
                <div class="grid place-items-center w-12 h-12 rounded-full mb-3"
                    style="background: var(--accent-soft); color: var(--accent);">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="7"></circle>
                        <line x1="21" y1="21" x2="16.6" y2="16.6"></line>
                    </svg>
                </div>
                <p class="text-sm font-medium text-ink text-balance">
                    لا توجد نتائج لـ "{{ uiStore.searchQuery }}"
                </p>
                <p class="text-xs text-muted mt-1 text-balance">جرّب كلمة مختلفة</p>
            </div>
        </template>

        <template v-else>
            <template v-if="uiStore.favoriteAzkar.length > 0">
                <NavHeader text="المفضلة" :count="uiStore.favoriteAzkar.length" />
                <div class="flex flex-col gap-1 mt-2 mb-6">
                    <NavItem v-for="zekr in uiStore.favoriteAzkar" :key="zekr.id" :zekr="zekr" />
                </div>
            </template>

            <NavHeader text="الأذكار" :count="uiStore.azkar.length" />
            <div class="flex flex-col gap-1 mt-2">
                <NavItem v-for="zekr in uiStore.azkar" :key="zekr.id" :zekr="zekr" />
            </div>

            <div class="mt-8 mx-1 p-4 rounded-card hairline"
                style="background: var(--surface);">
                <p class="text-xs leading-relaxed text-ink-soft text-pretty font-quran">
                    أفضِلُ الأعمالِ إلى اللهِ أدوَمُها وإن قلَّ
                </p>
                <p class="text-[10px] mt-2 text-muted tracking-wider">
                    رواه مسلم
                </p>
            </div>
        </template>
    </aside>
</template>
