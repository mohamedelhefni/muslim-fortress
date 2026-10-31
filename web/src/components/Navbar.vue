<script setup>
import AppIcon from './AppIcon.vue'
import Icon from './Icon.vue'
import { useUIStore } from '../stores/ui'

const ui = useUIStore()

function confirmResetAll() {
    if (confirm('تصفير جميع العدّادات في كل الأبواب؟')) ui.resetAll()
}
</script>

<template>
    <header class="shrink-0 border-b border-line bg-surface pt-[env(safe-area-inset-top)]">
        <div class="flex items-center justify-between gap-3 h-14 px-4 md:px-6">
            <div class="flex items-center gap-2 min-w-0">
                <a v-if="ui.activeId" href="#"
                    class="md:hidden grid place-items-center w-11 h-11 -ms-2 rounded-md text-ink hover:bg-primary-soft transition-colors duration-150"
                    aria-label="العودة إلى الفهرس">
                    <Icon name="chevron-back" :size="24" />
                </a>
                <a href="#" class="flex items-center gap-2 text-ink no-underline min-w-0">
                    <AppIcon />
                    <span class="font-head text-h3 truncate">حصن المسلم</span>
                </a>
            </div>

            <div class="flex items-center gap-1">
            <button v-if="ui.hasProgress" type="button" @click="confirmResetAll" aria-label="تصفير العدّادات"
                class="inline-flex items-center justify-center gap-2 h-11 min-w-11 px-3 rounded-md text-label text-ink hover:bg-primary-soft transition-colors duration-150">
                <Icon name="refresh" />
                <span class="hidden sm:inline whitespace-nowrap">تصفير العدّادات</span>
            </button>
            <button type="button" @click="ui.toggleTheme()"
                class="grid place-items-center w-11 h-11 rounded-md text-ink hover:bg-primary-soft transition-colors duration-150"
                :aria-label="ui.currentTheme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'">
                <Icon :name="ui.currentTheme === 'dark' ? 'sun' : 'moon'" :size="22" />
            </button>
            </div>
        </div>
    </header>
</template>
