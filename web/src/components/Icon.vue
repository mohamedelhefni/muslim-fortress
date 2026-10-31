<script setup>
// Mizan's Icon: 24px grid, 1.75px stroke. sun, moon and refresh aren't in its set, so they come from Lucide, which it allows.
const ICONS = {
    'chevron-forward': { d: 'M9 5l7 7-7 7', dir: true },
    'chevron-back': { d: 'M15 5l-7 7 7 7', dir: true },
    check: { d: 'M4.5 12.5l5 5L19.5 7' },
    search: { d: 'M10.5 3.5a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM15.6 15.6l4.9 4.9' },
    heart: { d: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z' },
    book: { d: 'M3 5.5c3-1 6-1 9 1.5c3-2.5 6-2.5 9-1.5v13c-3-1-6-1-9 1.5c-3-2.5-6-2.5-9-1.5zM12 7v13' },
    sun: { d: 'M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8zM12 2v2M12 20v2m-7.07-2.93 1.41-1.41M17.66 6.34l1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41' },
    moon: { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' },
    refresh: { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5' },
}
defineProps({ name: String, size: { type: Number, default: 20 } })
</script>

<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
        stroke-linecap="round" stroke-linejoin="round" class="shrink-0" :class="ICONS[name].dir && 'rtl:-scale-x-100'"
        aria-hidden="true">
        <path :d="ICONS[name].d" />
    </svg>
</template>
