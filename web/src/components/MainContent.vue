<script setup>
import { computed } from 'vue'
import { useUIStore, arNum } from '../stores/ui'

const ui = useUIStore()
const zekr = computed(() => ui.activeZekr)
const progress = computed(() => zekr.value && ui.sectionProgress(zekr.value))
const index = computed(() => ui.azkar.indexOf(zekr.value))
const prev = computed(() => ui.azkar[index.value - 1] ?? null)
const next = computed(() => ui.azkar[index.value + 1] ?? null)
function tap(item) {
    if (ui.increment(item)) navigator.vibrate?.(15)
}

function featured(id) { return ui.azkar.find(z => z.id === id) }
</script>

<template>
    <main class="h-full overflow-y-auto bg-surface" :key="zekr?.id ?? 'home'">
        <!-- Home (md+ only; on phones the index is home) -->
        <div v-if="!zekr" class="min-h-full grid place-items-center px-6 py-12">
            <div class="w-full max-w-sm text-center">
                <div class="relative overflow-hidden mx-auto w-56 h-72 rounded-t-full rounded-b-md bg-primary text-on-primary grid place-items-center px-6 pt-16 pb-8">
                    <div class="khatam absolute inset-0 opacity-[0.12]" aria-hidden="true"></div>
                    <div class="relative">
                        <p class="font-quran text-2xl leading-[2] text-balance">أحبُّ الأعمالِ إلى اللهِ أدومُها وإن قلَّ</p>
                        <p class="mt-3 text-xs opacity-80">متفق عليه</p>
                    </div>
                </div>
                <h1 class="mt-8 font-display font-bold text-4xl">حصن المسلم</h1>
                <p class="mt-2 text-muted text-pretty">من أذكار الكتاب والسنة. اختر بابًا من الفهرس، واضغط على الذكر لتعدّه.</p>
                <div class="mt-6 flex flex-wrap justify-center gap-3">
                    <a v-if="featured(27)" href="#27"
                        class="inline-flex items-center min-h-11 px-5 rounded-md bg-primary text-on-primary text-sm font-semibold no-underline hover:bg-primary-hover transition-colors duration-200">
                        أذكار الصباح والمساء
                    </a>
                    <a v-if="featured(28)" href="#28"
                        class="inline-flex items-center min-h-11 px-5 rounded-md border border-line-strong text-ink text-sm font-semibold no-underline hover:border-primary hover:text-primary transition-colors duration-200">
                        أذكار النوم
                    </a>
                </div>
            </div>
        </div>

        <article v-else class="max-w-3xl mx-auto px-4 md:px-8">
            <header class="sticky top-0 z-10 bg-surface pt-6 pb-4 border-b border-line">
                <h1 class="font-display font-semibold text-2xl md:text-3xl leading-[1.5] text-balance">{{ zekr.title }}</h1>
                <div class="mt-3 flex items-center gap-3">
                    <div class="flex-1 h-2 rounded-full overflow-hidden bg-primary/20" role="progressbar"
                        :aria-valuenow="progress.done" aria-valuemin="0" :aria-valuemax="progress.total"
                        :aria-label="`أتممت ${progress.done} من ${progress.total}`">
                        <div class="h-full rounded-full bg-gold transition-[width] duration-300 ease-out"
                            :style="{ width: progress.percent + '%' }"></div>
                    </div>
                    <span class="text-xs text-muted tabular-nums whitespace-nowrap">
                        <span class="text-primary font-semibold">{{ arNum(progress.done) }}</span> من {{ arNum(progress.total) }}
                    </span>
                    <button v-if="zekr.items.some(i => ui.countOf(i))" type="button" @click="ui.resetSection(zekr)"
                        class="min-h-9 px-3 -me-3 rounded-md text-xs text-muted hover:bg-primary-soft hover:text-ink transition-colors duration-200">
                        إعادة الكل
                    </button>
                </div>
            </header>

            <ol class="flex flex-col gap-4 py-6">
                <li v-for="(item, idx) in zekr.items" :key="item.id" :id="`item-${item.id}`"
                    class="rounded-md border bg-raised transition-colors duration-300"
                    :class="ui.isDone(item) ? 'border-gold/60' : 'border-line'">
                    <button type="button" @click="tap(item)"
                        class="block w-full text-start px-4 md:px-6 pt-5 pb-4 rounded-t-md active:bg-primary-soft transition-colors duration-200 cursor-pointer select-none"
                        :aria-label="`الذكر ${idx + 1}: ${ui.countOf(item)} من ${item.count}. اضغط للعدّ`">
                        <p class="font-quran text-[21px] md:text-[25px] leading-[2.1] text-pretty transition-opacity duration-300"
                            :class="ui.isDone(item) && 'opacity-60'">{{ item.text }}</p>
                    </button>

                    <div class="flex items-center gap-3 px-4 md:px-6 py-2.5 border-t border-line">
                        <span class="text-xs text-muted tabular-nums" aria-hidden="true">{{ arNum(idx + 1) }}</span>
                        <span v-if="item.count > 1 && !ui.isDone(item)" class="flex-1 h-1 rounded-full overflow-hidden bg-primary/15" aria-hidden="true">
                            <span class="block h-full bg-primary transition-[width] duration-200 ease-out"
                                :style="{ width: (ui.countOf(item) / item.count) * 100 + '%' }"></span>
                        </span>
                        <span v-else class="flex-1"></span>

                        <button v-if="ui.countOf(item)" type="button" @click="ui.reset(item)"
                            class="min-h-11 px-2 rounded-md text-xs text-muted hover:text-ink hover:bg-primary-soft transition-colors duration-200"
                            :aria-label="`إعادة عدّ الذكر ${idx + 1}`">
                            إعادة
                        </button>

                        <span aria-live="polite"
                            class="inline-flex items-center justify-center gap-1.5 min-w-[4.5rem] h-9 px-3 rounded-full text-sm tabular-nums transition-colors duration-300"
                            :class="ui.isDone(item) ? 'bg-gold text-on-gold font-semibold' : 'bg-sunken text-ink'">
                            <template v-if="ui.isDone(item)">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                                تمّ
                            </template>
                            <template v-else>
                                <span class="font-display font-bold">{{ arNum(ui.countOf(item)) }}</span>
                                <span class="text-muted">/ {{ arNum(item.count) }}</span>
                            </template>
                        </span>
                    </div>
                </li>
            </ol>

            <footer class="pb-[calc(3rem+env(safe-area-inset-bottom))]">
                <div class="flex items-center gap-3 text-gold" aria-hidden="true">
                    <span class="flex-1 h-px bg-line"></span>
                    <svg width="16" height="16" viewBox="0 0 24 24" class="fill-gold">
                        <rect x="5" y="5" width="14" height="14" /><rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                    </svg>
                    <span class="flex-1 h-px bg-line"></span>
                </div>
                <!-- RTL: previous sits on the right (pointing right), next on the left (pointing left) -->
                <nav class="mt-6 grid gap-3 sm:grid-cols-2" aria-label="التنقل بين الأبواب">
                    <a v-if="prev" :href="`#${prev.id}`"
                        class="flex items-center gap-3 min-h-11 px-4 py-3 rounded-md border border-line-strong text-ink no-underline hover:border-primary hover:text-primary transition-colors duration-200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                            stroke-linecap="round" stroke-linejoin="round" class="shrink-0" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                        <span class="min-w-0"><span class="block text-xs text-muted">الباب السابق</span>{{ prev.title }}</span>
                    </a>
                    <a v-if="next" :href="`#${next.id}`"
                        class="flex items-center justify-end gap-3 min-h-11 px-4 py-3 rounded-md border border-line-strong text-ink no-underline text-end hover:border-primary hover:text-primary transition-colors duration-200 sm:col-start-2">
                        <span class="min-w-0"><span class="block text-xs text-muted">الباب التالي</span>{{ next.title }}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                            stroke-linecap="round" stroke-linejoin="round" class="shrink-0" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                    </a>
                </nav>
            </footer>
        </article>
    </main>
</template>
