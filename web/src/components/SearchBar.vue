<script setup>
import { useUIStore } from '@/stores/ui';
import IconSearch from './icons/IconSearch.vue';
const uiStore = useUIStore()
</script>

<template>
    <div class="relative w-full mb-4">
        <div
            class="flex items-center rounded-item border border-border transition-all duration-200 ease-out-quart focus-within:border-accent focus-within:bg-surface-2"
            style="background: var(--surface);">
            <span class="grid place-items-center w-11 h-11 shrink-0 text-muted">
                <IconSearch class="w-[18px] h-[18px]" />
            </span>
            <input type="text"
                class="flex-1 bg-transparent outline-none pe-3 ps-1 py-2.5 text-[15px] text-ink placeholder:text-muted border-0"
                placeholder="البحث عن ذكر"
                v-model="uiStore.searchQuery"
                @input="uiStore.searchZekr"
                aria-label="البحث عن ذكر" />
        </div>
    </div>
</template>
