<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import Icon from './Icon.vue'
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

// Odd parts are the Qur'an passages (﴿…﴾), which Mizan sets apart from athkar in the Qur'an face.
const parts = (text) => text.split(/(﴿[^﴾]*﴾)/)
</script>

<template>
    <main class="h-full overflow-y-auto bg-surface" :key="zekr?.id ?? 'home'">
        <!-- Home (md+ only; on phones the index is home) -->
        <div v-if="!zekr" class="min-h-full grid place-items-center px-6 py-12">
            <div class="w-full max-w-md text-center">
                <div class="relative overflow-hidden rounded-xl bg-feature h-52 grid place-items-center">
                    <svg class="absolute inset-0" width="100%" height="100%" aria-hidden="true">
                        <defs>
                            <pattern id="star-cross" width="48" height="48" patternUnits="userSpaceOnUse">
                                <g fill="none" stroke="var(--ornament)" stroke-opacity=".45">
                                    <polygon points="24,0 31.03,7.03 40.97,7.03 40.97,16.97 48,24 40.97,31.03 40.97,40.97 31.03,40.97 24,48 16.97,40.97 7.03,40.97 7.03,31.03 0,24 7.03,16.97 7.03,7.03 16.97,7.03" />
                                    <polygon points="31.1,26.94 26.94,31.1 21.06,31.1 16.9,26.94 16.9,21.06 21.06,16.9 26.94,16.9 31.1,21.06" />
                                </g>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#star-cross)" />
                    </svg>
                    <AppIcon :size="96" class="relative" />
                </div>
                <h1 class="mt-8 font-head text-h1">حصن <span class="mz-mursala">المسلم</span></h1>
                <p class="mt-2 font-text text-lead text-muted text-pretty">من أذكار الكتاب والسنة. اختر بابًا من الفهرس، واضغط على الذكر لتعدّه.</p>
                <div class="mt-6 flex flex-wrap justify-center gap-3">
                    <a v-if="featured(27)" href="#27"
                        class="inline-flex items-center min-h-11 px-4 rounded-md bg-primary text-on-primary text-label no-underline hover:bg-primary-hover transition-colors duration-150">
                        أذكار الصباح والمساء
                    </a>
                    <a v-if="featured(28)" href="#28"
                        class="inline-flex items-center min-h-11 px-4 rounded-md border border-line-strong text-ink text-label no-underline hover:bg-primary-soft transition-colors duration-150">
                        أذكار النوم
                    </a>
                </div>
                <figure class="mt-8 pt-6 border-t border-line">
                    <blockquote class="font-text text-quote text-balance">أحبُّ الأعمالِ إلى اللهِ أدومُها وإن قلَّ</blockquote>
                    <figcaption class="mt-1 text-caption text-muted">متفق عليه</figcaption>
                </figure>
            </div>
        </div>

        <article v-else class="max-w-3xl mx-auto px-4 md:px-8">
            <header class="sticky top-0 z-10 bg-surface pt-6 pb-4 border-b border-line">
                <h1 class="font-head text-h2 md:text-h1 text-balance">{{ zekr.title }}</h1>
                <div class="mt-3 flex items-center gap-3">
                    <div class="flex-1 h-2 rounded-full overflow-hidden bg-sunken" role="progressbar"
                        :aria-valuenow="progress.done" aria-valuemin="0" :aria-valuemax="progress.total"
                        :aria-label="`أتممت ${progress.done} من ${progress.total}`">
                        <div class="h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
                            :style="{ width: progress.percent + '%' }"></div>
                    </div>
                    <span class="text-caption text-muted tabular-nums whitespace-nowrap">
                        <span class="text-ink font-medium">{{ arNum(progress.done) }}</span> من {{ arNum(progress.total) }}
                    </span>
                    <button v-if="zekr.items.some(i => ui.countOf(i))" type="button" @click="ui.resetSection(zekr)"
                        class="min-h-11 px-3 -me-3 rounded-md text-caption text-muted hover:bg-primary-soft hover:text-ink transition-colors duration-150">
                        إعادة الكل
                    </button>
                </div>
            </header>

            <ol class="flex flex-col gap-4 py-6">
                <li v-for="(item, idx) in zekr.items" :key="item.id" :id="`item-${item.id}`"
                    class="rounded-lg border border-line bg-raised">
                    <button type="button" @click="tap(item)"
                        class="block w-full text-start px-4 md:px-6 pt-5 pb-4 rounded-t-lg active:bg-primary-soft transition-colors duration-150 cursor-pointer select-none"
                        :aria-label="`الذكر ${idx + 1}: ${ui.countOf(item)} من ${item.count}. اضغط للعدّ`">
                        <p class="font-text text-quote text-pretty transition-colors duration-150"
                            :class="ui.isDone(item) && 'text-muted'">
                            <template v-for="(part, i) in parts(item.text)" :key="i">
                                <span v-if="i % 2" class="font-quran text-verse-sm">{{ part }}</span>
                                <template v-else>{{ part }}</template>
                            </template>
                        </p>
                    </button>

                    <div class="flex items-center gap-3 px-4 md:px-6 py-2.5 border-t border-line">
                        <span class="text-caption text-muted tabular-nums" aria-hidden="true">{{ arNum(idx + 1) }}</span>
                        <span v-if="item.count > 1 && !ui.isDone(item)" class="flex-1 h-1 rounded-full overflow-hidden bg-sunken" aria-hidden="true">
                            <span class="block h-full bg-primary transition-[width] duration-150 ease-out"
                                :style="{ width: (ui.countOf(item) / item.count) * 100 + '%' }"></span>
                        </span>
                        <span v-else class="flex-1"></span>

                        <button v-if="ui.countOf(item)" type="button" @click="ui.reset(item)"
                            class="min-h-11 px-2 rounded-md text-caption text-muted hover:text-ink hover:bg-primary-soft transition-colors duration-150"
                            :aria-label="`إعادة عدّ الذكر ${idx + 1}`">
                            إعادة
                        </button>

                        <span aria-live="polite"
                            class="inline-flex items-center justify-center gap-1 min-w-[4.5rem] h-9 px-3 rounded-full text-label tabular-nums transition-colors duration-150"
                            :class="ui.isDone(item) ? 'bg-primary text-on-primary' : 'bg-sunken text-ink'">
                            <template v-if="ui.isDone(item)">
                                <Icon name="check" :size="14" />
                                تمّ
                            </template>
                            <template v-else>
                                <span>{{ arNum(ui.countOf(item)) }}</span>
                                <span class="text-muted font-normal">/ {{ arNum(item.count) }}</span>
                            </template>
                        </span>
                    </div>
                </li>
            </ol>

            <footer class="pb-[calc(3rem+env(safe-area-inset-bottom))]">
                <div class="flex items-center gap-3" aria-hidden="true">
                    <span class="flex-1 h-px bg-line"></span>
                    <svg width="18" height="18" viewBox="0 0 24 24" class="fill-ornament">
                        <polygon points="12,1 15.22,4.22 19.78,4.22 19.78,8.78 23,12 19.78,15.22 19.78,19.78 15.22,19.78 12,23 8.78,19.78 4.22,19.78 4.22,15.22 1,12 4.22,8.78 4.22,4.22 8.78,4.22" />
                    </svg>
                    <span class="flex-1 h-px bg-line"></span>
                </div>
                <!-- RTL: previous sits on the right (pointing right), next on the left (pointing left) -->
                <nav class="mt-6 grid gap-3 sm:grid-cols-2" aria-label="التنقل بين الأبواب">
                    <a v-if="prev" :href="`#${prev.id}`"
                        class="flex items-center gap-3 min-h-11 px-4 py-3 rounded-md border border-line-strong text-ink text-label no-underline hover:bg-primary-soft transition-colors duration-150">
                        <Icon name="chevron-back" />
                        <span class="min-w-0"><span class="block text-caption text-muted">الباب السابق</span>{{ prev.title }}</span>
                    </a>
                    <a v-if="next" :href="`#${next.id}`"
                        class="flex items-center justify-end gap-3 min-h-11 px-4 py-3 rounded-md border border-line-strong text-ink text-label no-underline text-end hover:bg-primary-soft transition-colors duration-150 sm:col-start-2">
                        <span class="min-w-0"><span class="block text-caption text-muted">الباب التالي</span>{{ next.title }}</span>
                        <Icon name="chevron-forward" />
                    </a>
                </nav>
            </footer>
        </article>
    </main>
</template>
