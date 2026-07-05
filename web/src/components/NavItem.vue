<script setup>
import { useUIStore } from '@/stores/ui';
import IconHeart from './icons/IconHeart.vue';
import IconHeartFilled from './icons/IconHeartFilled.vue';

const uiStore = useUIStore()
defineProps({
    zekr: Object,
    snippetHtml: { type: String, default: '' },
})
</script>

<template>
    <div :key="zekr.id"
        class="nav-item group relative flex items-start gap-2 py-2.5 pe-2.5 ps-3 md:py-2.5 md:ps-4 md:pe-3 rounded-item cursor-pointer min-h-11 transition-colors duration-150 ease-out"
        :class="{
            'is-active': uiStore.activeZekr?.id === zekr.id,
            'is-fav': uiStore.isFavorite(zekr),
        }"
        role="button" tabindex="0"
        @click="uiStore.setActiveZekr(zekr)"
        @keydown.enter.prevent="uiStore.setActiveZekr(zekr)"
        @keydown.space.prevent="uiStore.setActiveZekr(zekr)">

        <span class="active-rule" aria-hidden="true"></span>

        <div class="flex-1 min-w-0">
            <h3 class="truncate text-[15px] leading-snug">
                {{ zekr.title }}
            </h3>
            <p v-if="snippetHtml" class="snippet mt-1 text-[12px] leading-relaxed text-muted text-pretty line-clamp-2"
                v-html="snippetHtml"></p>
        </div>

        <button
            class="heart-btn grid place-items-center w-9 h-9 -m-1 rounded-full transition-all duration-200 ease-out-quart shrink-0"
            :class="{
                'is-fav': uiStore.isFavorite(zekr),
                'opacity-0 group-hover:opacity-100 focus-visible:opacity-100': !uiStore.isFavorite(zekr),
            }"
            @click.stop="uiStore.setIsFavrorite(zekr)"
            :aria-label="uiStore.isFavorite(zekr) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'"
            :aria-pressed="uiStore.isFavorite(zekr)">
            <IconHeartFilled v-if="uiStore.isFavorite(zekr)" class="w-[18px] h-[18px] text-accent" />
            <IconHeart v-else class="w-[18px] h-[18px] text-muted group-hover:text-ink-soft" />
        </button>
    </div>
</template>

<style scoped>
.nav-item {
    color: var(--ink-soft);
}

.nav-item:hover {
    background: var(--surface-2);
    color: var(--ink);
}

.nav-item.is-active {
    background: var(--surface-2);
    color: var(--ink);
    font-weight: 600;
}

.nav-item.is-active h3 {
    color: var(--ink);
}

.active-rule {
    position: absolute;
    inset-inline-end: 0;
    top: 6px;
    bottom: 6px;
    width: 2px;
    border-radius: 2px;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: center;
    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-item.is-active .active-rule {
    transform: scaleY(1);
}

.heart-btn.is-fav {
    opacity: 1 !important;
}

.snippet {
    word-break: break-word;
}

.snippet :deep(mark) {
    background: var(--accent-mark);
    color: var(--accent-deep);
    border-radius: 3px;
    padding: 0 2px;
    font-weight: 700;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
