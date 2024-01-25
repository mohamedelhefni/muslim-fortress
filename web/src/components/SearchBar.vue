<script setup>
import { useUIStore } from '@/stores/ui';
import IconSearch from './icons/IconSearch.vue';
const uiStore = useUIStore()

</script>

<template>
    <div class="flex items-center mb-3 pb-5 relative">
        <IconSearch class="w-6 h-6 text-gray-400 absolute left-4 " />
        <input type="text" class="w-full outline-none  pl-10 p-3 rounded-lg text-lg  border-2 border-gray-400"
            placeholder="البحث عن ذكر" v-model="uiStore.searchQuery" @input="uiStore.searchZekr">
    </div>
</template>