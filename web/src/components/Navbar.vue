<script setup>
import { useUIStore } from '../stores/ui'

const ui = useUIStore()

function confirmResetAll() {
    if (confirm('تصفير جميع العدّادات في كل الأبواب؟')) ui.resetAll()
}
</script>

<template>
    <header class="shrink-0 border-b border-line bg-surface pt-[env(safe-area-inset-top)]">
        <div class="flex items-center justify-between gap-3 h-16 px-4 md:px-6">
            <div class="flex items-center gap-1 min-w-0">
                <a v-if="ui.activeId" href="#"
                    class="md:hidden grid place-items-center w-11 h-11 -ms-2 rounded-md text-ink hover:bg-primary-soft transition-colors duration-200"
                    aria-label="العودة إلى الفهرس">
                    <!-- RTL: back points to the right -->
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </a>
                <a href="#" class="flex items-center gap-2 text-ink no-underline min-w-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" class="shrink-0 fill-gold" aria-hidden="true">
                        <rect x="5" y="5" width="14" height="14" />
                        <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                    </svg>
                    <span class="font-display font-bold text-[22px] leading-none truncate">حصن المسلم</span>
                </a>
            </div>

            <div class="flex items-center gap-1">
            <button v-if="ui.hasProgress" type="button" @click="confirmResetAll" aria-label="تصفير العدّادات"
                class="inline-flex items-center justify-center gap-1.5 h-11 min-w-11 px-3 rounded-md text-sm text-ink hover:bg-primary-soft transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                </svg>
                <span class="hidden sm:inline whitespace-nowrap">تصفير العدّادات</span>
            </button>
            <button type="button" @click="ui.toggleTheme()"
                class="grid place-items-center w-11 h-11 rounded-md text-ink hover:bg-primary-soft transition-colors duration-200"
                :aria-label="ui.currentTheme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'">
                <svg v-if="ui.currentTheme === 'dark'" width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41M17.66 6.34l1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41" />
                </svg>
                <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            </button>
            </div>
        </div>
    </header>
</template>
