<script setup>
import { ref } from 'vue'
import { useUIStore } from '../stores/ui';
import IconCheck from './icons/IconCheck.vue';

const uiStore = useUIStore()
const tapTarget = ref(null)

function tapToCount(item, event) {
    uiStore.incrementCounter(item)
    pulse(event.currentTarget)
    if (item.isRead) scrollToNext()
}

function pulse(el) {
    if (!el) return
    el.classList.remove('tap-pulse')
    void el.offsetWidth
    el.classList.add('tap-pulse')
}

function scrollToNext() {
    setTimeout(() => {
        const content = uiStore.activeZekr?.content
        if (!content) return
        const next = content.find(c => !c.isRead)
        if (next) {
            document.getElementById(`zekr-${next.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, 120)
}
</script>

<template>
    <div v-if="uiStore.isContentActive && uiStore.activeZekr?.id"
        class="col-span-10 md:col-span-7 lg:col-span-8 w-full md:h-[calc(100dvh-65px)] md:max-h-[calc(100dvh-65px)] overflow-y-scroll no-scrollbar"
        style="background: var(--bg);">

        <div class="sticky top-0 z-20 backdrop-blur-md border-b border-border/60"
            style="background: color-mix(in oklch, var(--bg) 88%, transparent);">
            <div class="px-5 md:px-12 pt-6 md:pt-8 pb-4 md:pb-5 max-w-3xl">
                <div class="flex items-center gap-3 mb-2">
                    <span class="inline-block w-8 h-px"
                        style="background: var(--accent);" aria-hidden="true"></span>
                    <span class="text-[11px] tracking-[0.18em] uppercase font-semibold"
                        style="color: var(--accent);">
                        ذكر
                    </span>
                </div>
                <h2 class="font-bold text-2xl md:text-[2.5rem] text-ink leading-[1.15] tracking-tightish font-quran text-balance">
                    {{ uiStore.activeZekr.title }}
                </h2>
                <div v-if="uiStore.progress.total > 0" class="mt-5 flex items-center gap-3">
                    <div class="progress-track flex-1 h-1.5 rounded-full overflow-hidden"
                        style="background: var(--progress-trough);">
                        <div class="progress-fill h-full transition-[width] duration-700 ease-out-expo"
                            :style="{ width: uiStore.progress.percent + '%', background: 'var(--progress-fill)' }"></div>
                    </div>
                    <span class="text-xs font-bold tabular-nums whitespace-nowrap"
                        style="color: var(--accent);">
                        {{ uiStore.progress.read }} / {{ uiStore.progress.total }}
                    </span>
                </div>
            </div>
        </div>

        <div class="px-5 md:px-12 py-6 md:py-10 max-w-3xl space-y-3.5 md:space-y-4 pb-safe">
            <article v-for="zekr in uiStore.activeZekr.content" :key="zekr.id"
                :id="`zekr-${zekr.id}`"
                class="group relative rounded-card overflow-hidden transition-all duration-300 ease-out-quart"
                :class="zekr.isRead ? 'is-read' : ''"
                style="background: var(--surface);">

                <span class="absolute top-3.5 inset-inline-start-3.5 text-[10px] font-bold tabular-nums select-none pointer-events-none z-10"
                    style="color: var(--muted-2);" aria-hidden="true">
                    {{ zekr.id + 1 }}
                </span>

                <button type="button"
                    @click="tapToCount(zekr, $event)"
                    :aria-label="`الذكر ${zekr.id + 1}، ${zekr.currentCount ?? 0} من ${zekr.count ?? 1}. اضغط للتسبيح.`"
                    :aria-pressed="zekr.isRead"
                    class="tap-target block w-full text-right px-5 md:px-7 pt-9 pb-5 md:pt-11 md:pb-7 cursor-pointer transition-opacity duration-300 focus:outline-none"
                    :class="zekr.isRead ? 'opacity-55' : 'opacity-100'">
                    <p class="font-quran text-[1.25rem] md:text-[1.55rem] leading-[2.1] md:leading-[2.3] text-ink text-pretty text-center select-none"
                        dir="rtl">
                        {{ zekr.text }}
                    </p>
                </button>

                <div class="flex items-center justify-between gap-3 px-5 md:px-7 pb-4 md:pb-5 pt-2"
                    style="border-top: 1px solid var(--border);">

                    <div class="counter-display flex items-center gap-2.5 select-none pointer-events-none"
                        aria-hidden="true">
                        <span class="grid place-items-center w-8 h-8 rounded-full text-xs font-bold tabular-nums transition-all"
                            :class="zekr.isRead ? 'counter-done' : 'counter-pending'">
                            <IconCheck v-if="zekr.isRead" class="w-4 h-4" />
                            <template v-else>{{ zekr.currentCount ?? 0 }}</template>
                        </span>
                        <span class="text-sm font-quran"
                            :class="zekr.isRead ? 'counter-label-done' : 'counter-label-pending'">
                            <template v-if="zekr.isRead">
                                تم
                            </template>
                            <template v-else>
                                من {{ zekr.count ?? 1 }}
                            </template>
                        </span>
                    </div>

                    <button v-if="zekr.currentCount > 0" type="button"
                        @click.stop="uiStore.resetCounter(zekr)"
                        class="text-xs font-semibold min-h-11 px-3 rounded-md transition-colors duration-150"
                        style="color: var(--muted);"
                        aria-label="إعادة العدّ">
                        إعادة
                    </button>
                </div>
            </article>
        </div>
    </div>

    <div v-else class="col-span-10 md:col-span-7 lg:col-span-8 grid place-items-center px-6 py-10"
        style="background: var(--bg);">
        <div class="text-center max-w-md animate-fade-in">
            <div class="relative mx-auto mb-8 grid place-items-center w-24 h-24 rounded-full"
                style="background: var(--accent-soft);">
                <span class="absolute inset-0 rounded-full ring-1 ring-inset"
                    style="--tw-ring-color: var(--accent-ring);"></span>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                    style="color: var(--accent);">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.2"
                        stroke-dasharray="2 3" opacity="0.4" />
                    <path d="M16.6 8.4a6 6 0 1 0 0 7.2" stroke="currentColor"
                        stroke-width="1.7" stroke-linecap="round" />
                    <circle cx="19" cy="5.6" r="1" fill="currentColor" opacity="0.7" />
                </svg>
            </div>

            <h2 class="font-bold text-2xl md:text-3xl text-ink tracking-tightish text-balance font-quran">
                مرحبًا بك
            </h2>
            <p class="mt-3 text-[15px] leading-relaxed text-ink-soft text-pretty max-w-sm mx-auto">
                اختر ذكرًا من القائمة لتبدأ القراءة والتسبيح.
                التطبيق يعمل دون اتصال، والأذكار بانتظارك.
            </p>

            <div class="mt-8 mx-auto w-12 h-px"
                style="background: var(--accent); opacity: 0.4;" aria-hidden="true"></div>
        </div>
    </div>
</template>

<style scoped>
.tap-target {
    background: transparent;
    border: 0;
    color: inherit;
    font: inherit;
}
.tap-target:hover {
    background: color-mix(in oklch, var(--surface-2) 50%, transparent);
}
.tap-target:active {
    background: color-mix(in oklch, var(--accent) 7%, transparent);
}
.tap-target:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
}

.tap-pulse {
    animation: tap-bump 220ms cubic-bezier(0.25, 1, 0.5, 1);
}
@keyframes tap-bump {
    0%   { transform: scale(1); }
    35%  { transform: scale(0.985); }
    100% { transform: scale(1); }
}

.counter-display .counter-pending {
    background: var(--surface);
    color: var(--accent);
    box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--accent) 35%, transparent);
}
.counter-display .counter-done {
    background: var(--accent);
    color: var(--bg);
    box-shadow: none;
}
.counter-label-pending { color: var(--muted); }
.counter-label-done { color: var(--accent); font-weight: 600; }

.progress-track {
    box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--accent) 8%, transparent);
}

article.is-read {
    box-shadow: 0 0 0 1px color-mix(in oklch, var(--accent) 22%, transparent),
        0 6px 22px color-mix(in oklch, var(--accent) 18%, transparent);
}
article.is-read::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom,
        color-mix(in oklch, var(--accent) 60%, transparent),
        transparent);
    pointer-events: none;
}
</style>
