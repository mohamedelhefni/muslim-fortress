<script setup>
import Icon from './Icon.vue'

// Mizan's app icon template: black tile, faint khatam frame, one white glyph at 42%.
defineProps({ size: { type: Number, default: 40 } })
</script>

<template>
    <span class="relative inline-grid place-items-center shrink-0 overflow-hidden rounded-[22.5%] bg-[var(--app-tile)] text-[var(--app-glyph)] shadow-[inset_0_0_0_1px_var(--app-ring)]"
        :style="{ width: size + 'px', height: size + 'px' }" aria-hidden="true">
        <svg class="absolute inset-0" viewBox="0 0 64 64" :width="size" :height="size">
            <polygon points="32,7 39.32,14.32 49.68,14.32 49.68,24.68 57,32 49.68,39.32 49.68,49.68 39.32,49.68 32,57 24.68,49.68 14.32,49.68 14.32,39.32 7,32 14.32,24.68 14.32,14.32 24.68,14.32"
                fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5" />
        </svg>
        <Icon name="book" :size="Math.round(size * 0.42)" class="relative" />
    </span>
</template>
