<script setup>
import { useUIStore } from '../stores/ui';
import IconMoon from './icons/IconMoon.vue';
import IconSun from './icons/IconSun.vue';

const uiStore = useUIStore()
</script>

<template>
    <header
        class="sticky top-0 z-30 w-full backdrop-blur-md border-b border-border/60"
        style="background: color-mix(in oklch, var(--bg-deep) 88%, transparent);">
        <div class="flex items-center justify-between gap-3 px-4 md:px-7 py-3.5 max-w-[1600px] mx-auto">

            <div class="flex items-center gap-2 md:gap-3 min-w-0">
                <button v-if="uiStore.isSmallScreen && uiStore.isContentActive"
                    @click="uiStore.toggleContent()"
                    class="grid place-items-center w-11 h-11 -m-2 text-ink-soft rounded-item hover:bg-surface-2 hover:text-ink active:scale-95 transition-all duration-200 ease-out-quart"
                    aria-label="رجوع">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <button v-else-if="uiStore.isSmallScreen"
                    @click="uiStore.openSidebar()"
                    class="grid place-items-center w-11 h-11 -m-2 text-ink-soft rounded-item hover:bg-surface-2 hover:text-ink active:scale-95 transition-all duration-200 ease-out-quart"
                    aria-label="القائمة">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3.5" y1="6.5" x2="20.5" y2="6.5"></line>
                        <line x1="3.5" y1="12" x2="20.5" y2="12"></line>
                        <line x1="3.5" y1="17.5" x2="20.5" y2="17.5"></line>
                    </svg>
                </button>

                <div class="flex items-center gap-3 min-w-0">
                    <div
                        class="relative grid place-items-center w-10 h-10 md:w-11 md:h-11 rounded-full shrink-0 shadow-soft"
                        style="background: var(--accent-soft);">
                        <div class="absolute inset-0 rounded-full ring-1 ring-inset"
                            style="--tw-ring-color: var(--accent-ring);"></div>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                            style="color: var(--accent);">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.2"
                                stroke-dasharray="1.6 2.4" opacity="0.45" />
                            <path d="M16.2 8.5a5.5 5.5 0 1 0 0 7" stroke="currentColor"
                                stroke-width="1.7" stroke-linecap="round" />
                            <circle cx="18.5" cy="6" r="0.9" fill="currentColor" opacity="0.7" />
                        </svg>
                    </div>
                    <div class="flex flex-col min-w-0 leading-tight">
                        <h1 class="font-bold text-lg md:text-xl text-ink tracking-tightish font-quran">
                            حصن المسلم
                        </h1>
                        <span class="text-[10px] md:text-[11px] text-muted tracking-[0.18em] uppercase font-medium">
                            Hisn Almuslim
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-1">
                <button @click="uiStore.toggleDarkTheme()"
                    class="grid place-items-center w-11 h-11 text-ink-soft rounded-item hover:bg-surface-2 hover:text-ink active:scale-95 transition-all duration-200 ease-out-quart"
                    :aria-label="uiStore.currentTheme === 'light' ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'">
                    <Transition mode="out-in" enter-active-class="transition duration-200 ease-out-quart"
                        enter-from-class="opacity-0 -rotate-90 scale-75" enter-to-class="opacity-100 rotate-0 scale-100"
                        leave-active-class="transition duration-150 ease-out-quart"
                        leave-from-class="opacity-100 rotate-0 scale-100" leave-to-class="opacity-0 rotate-90 scale-75">
                        <IconMoon v-if="uiStore.currentTheme === 'light'" key="moon"
                            class="w-5 h-5" />
                        <IconSun v-else key="sun" class="w-5 h-5" />
                    </Transition>
                </button>
            </div>
        </div>
    </header>
</template>
