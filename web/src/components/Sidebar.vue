<script setup>
import NavItem from './NavItem.vue'
import { useUIStore, searchRegex, arNum } from '../stores/ui'

const ui = useUIStore()

// Text around the first match in a section's items, split into highlighted parts.
function snippet(zekr) {
    const re = searchRegex(ui.searchQuery)
    if (!re) return null
    re.lastIndex = 0
    if (re.test(zekr.title)) return null
    for (const item of zekr.items) {
        re.lastIndex = 0
        const m = re.exec(item.text)
        if (!m) continue
        const start = Math.max(0, m.index - 30)
        const end = Math.min(item.text.length, m.index + m[0].length + 80)
        const text = (start ? '… ' : '') + item.text.slice(start, end) + (end < item.text.length ? ' …' : '')
        return text.split(new RegExp(`(${re.source})`)).map((t, i) => ({ text: t, hit: i % 2 === 1 }))
    }
    return null
}
</script>

<template>
    <nav class="h-full flex-col overflow-y-auto no-scrollbar bg-surface md:border-e md:border-line" aria-label="الفهرس">
        <div class="sticky top-0 z-10 bg-surface px-4 pt-4 pb-3">
            <label class="flex items-center gap-2 h-11 px-3 rounded-md border border-line bg-raised focus-within:border-focus transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                    stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
                </svg>
                <input v-model="ui.searchQuery" type="search" placeholder="ابحث في الأذكار"
                    class="flex-1 min-w-0 bg-transparent outline-none text-sm text-ink placeholder:text-muted"
                    aria-label="ابحث في الأذكار" />
            </label>
        </div>

        <div class="px-2 md:px-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <template v-if="ui.searchQuery.trim()">
                <h2 class="flex items-center justify-between px-3 mt-1 mb-1 text-xs font-medium text-muted">
                    نتائج البحث <span class="tabular-nums">{{ arNum(ui.searchResults.length) }}</span>
                </h2>
                <ul v-if="ui.searchResults.length" class="flex flex-col gap-0.5">
                    <NavItem v-for="zekr in ui.searchResults" :key="zekr.id" :zekr="zekr" :snippet="snippet(zekr)" />
                </ul>
                <p v-else class="px-3 py-10 text-center text-sm text-muted text-balance">
                    لا نتائج لـ «{{ ui.searchQuery }}». جرّب كلمة أخرى.
                </p>
            </template>

            <template v-else>
                <template v-if="ui.favoriteAzkar.length">
                    <h2 class="px-3 mt-1 mb-1 text-xs font-medium text-muted">المفضلة</h2>
                    <ul class="flex flex-col gap-0.5 mb-5">
                        <NavItem v-for="zekr in ui.favoriteAzkar" :key="zekr.id" :zekr="zekr" />
                    </ul>
                </template>

                <h2 class="flex items-center justify-between px-3 mt-1 mb-1 text-xs font-medium text-muted">
                    الأبواب <span class="tabular-nums">{{ arNum(ui.azkar.length) }}</span>
                </h2>
                <ul class="flex flex-col gap-0.5">
                    <NavItem v-for="zekr in ui.azkar" :key="zekr.id" :zekr="zekr" />
                </ul>
            </template>
        </div>
    </nav>
</template>
