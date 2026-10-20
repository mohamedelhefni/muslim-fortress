<script setup>
import { computed } from 'vue'
import { useUIStore, arNum } from '../stores/ui'

const props = defineProps({
    zekr: Object,
    snippet: { type: Array, default: null }, // [{ text, hit }]
})
const ui = useUIStore()
const progress = computed(() => ui.sectionProgress(props.zekr))
const fav = computed(() => ui.isFavorite(props.zekr))
const active = computed(() => ui.activeId === props.zekr.id)
</script>

<template>
    <li class="group relative flex items-start rounded-md transition-colors duration-200"
        :class="active ? 'bg-primary-soft' : 'hover:bg-sunken'">
        <span v-if="active" class="absolute start-0 inset-y-2 w-[3px] rounded-full bg-gold" aria-hidden="true"></span>
        <a :href="`#${zekr.id}`" :aria-current="active ? 'page' : undefined"
            class="flex-1 min-w-0 flex items-center gap-3 min-h-11 py-2 ps-4 pe-1 text-ink no-underline">
            <span class="flex-1 min-w-0">
                <span class="block text-[15px] leading-relaxed" :class="active && 'font-medium'">{{ zekr.title }}</span>
                <span v-if="snippet" class="block mt-0.5 text-[13px] leading-relaxed text-muted line-clamp-2">
                    <template v-for="(part, i) in snippet" :key="i">
                        <mark v-if="part.hit" class="bg-copper-soft text-ink rounded-sm px-0.5">{{ part.text }}</mark>
                        <template v-else>{{ part.text }}</template>
                    </template>
                </span>
            </span>
            <span v-if="progress.done === progress.total"
                class="shrink-0 grid place-items-center w-5 h-5 rounded-full bg-gold text-on-gold"
                aria-label="مكتمل اليوم">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
            <span v-else-if="progress.done" class="shrink-0 text-xs text-muted tabular-nums">
                {{ arNum(progress.done) }}/{{ arNum(progress.total) }}
            </span>
        </a>
        <button type="button" @click="ui.toggleFavorite(zekr)"
            class="shrink-0 grid place-items-center w-11 h-11 rounded-md transition-opacity duration-200"
            :class="fav ? 'text-copper' : 'text-muted md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100'"
            :aria-label="fav ? `إزالة «${zekr.title}» من المفضلة` : `إضافة «${zekr.title}» إلى المفضلة`"
            :aria-pressed="fav">
            <svg width="18" height="18" viewBox="0 0 24 24" :fill="fav ? 'currentColor' : 'none'" stroke="currentColor"
                stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        </button>
    </li>
</template>
