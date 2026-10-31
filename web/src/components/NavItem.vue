<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
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
    <li class="group flex items-start rounded-md transition-colors duration-150"
        :class="active ? 'bg-primary-soft' : 'hover:bg-sunken'">
        <a :href="`#${zekr.id}`" :aria-current="active ? 'page' : undefined"
            class="flex-1 min-w-0 flex items-center gap-3 min-h-11 py-2 ps-4 pe-1 rounded-md text-ink no-underline">
            <span class="flex-1 min-w-0">
                <span class="block text-label">{{ zekr.title }}</span>
                <span v-if="snippet" class="block mt-0.5 text-caption text-muted line-clamp-2">
                    <template v-for="(part, i) in snippet" :key="i">
                        <mark v-if="part.hit" class="bg-primary-soft text-ink rounded-xs px-0.5">{{ part.text }}</mark>
                        <template v-else>{{ part.text }}</template>
                    </template>
                </span>
            </span>
            <span v-if="progress.done === progress.total"
                class="shrink-0 grid place-items-center w-5 h-5 rounded-full bg-primary text-on-primary"
                aria-label="مكتمل اليوم">
                <Icon name="check" :size="12" />
            </span>
            <span v-else-if="progress.done" class="shrink-0 text-caption text-muted tabular-nums">
                {{ arNum(progress.done) }}/{{ arNum(progress.total) }}
            </span>
        </a>
        <button type="button" @click="ui.toggleFavorite(zekr)"
            class="shrink-0 grid place-items-center w-11 h-11 rounded-md transition-opacity duration-150"
            :class="fav ? 'text-primary' : 'text-muted md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100'"
            :aria-label="fav ? `إزالة «${zekr.title}» من المفضلة` : `إضافة «${zekr.title}» إلى المفضلة`"
            :aria-pressed="fav">
            <Icon name="heart" :size="18" :fill="fav ? 'currentColor' : 'none'" />
        </button>
    </li>
</template>
