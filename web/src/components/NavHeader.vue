<script setup>
defineProps({
    text: String,
    count: { type: Number, default: null },
})
</script>

<template>
    <header class="flex items-center justify-between gap-3 px-3 mt-2 mb-1">
        <h2 class="text-[15px] font-bold text-ink font-quran tracking-tightish">
            {{ text }}
        </h2>
        <span v-if="count != null"
            class="inline-flex items-center justify-center min-w-[26px] h-7 px-2.5 rounded-full text-[12px] font-bold tabular-nums chip-accent">
            {{ count }}
        </span>
    </header>
</template>
