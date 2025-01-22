<script setup>
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';
import NavItem from './NavItem.vue';
import NavHeader from './NavHeader.vue';
import { useUIStore } from '@/stores/ui';

const uiStore = useUIStore()


</script>

<template>
    <div
        class="bg-white dark:bg-stone-800 dark:text-white col-span-10 md:col-span-3 lg:col-span-2 py-10  px-3 flex flex-col items-center h-[92vh] max-h-[92vh] overflow-y-scroll">
        <SearchBar />
        <template v-if="uiStore.searchResults.length > 0 && uiStore.searchQuery != ''">
            <NavHeader text="نتائج البحث" />
            <div class="flex flex-col items-start flex-col gap-2 my-5 w-full mb-5">
                <NavItem v-for="zekr in uiStore.searchResults" :key="zekr.id" :zekr="zekr" />
            </div>
        </template>
        <template v-else-if="uiStore.searchResults.length == 0 && uiStore.searchQuery != ''">
            <p class="font-bold">لا يوجد ذكر يحتوي على هذا النص</p>
        </template>
        <template v-else>
            <template v-if="uiStore.favoriteAzkar.length > 0">
                <NavHeader text="المفضله" />
                <div class="flex flex-col items-start flex-col gap-2 my-5 w-full mb-5">
                    <NavItem v-for="zekr in uiStore.favoriteAzkar" :key="zekr.id" :zekr="zekr" />
                </div>
            </template>
            <NavHeader text="الأذكار" />
            <div class="flex flex-col items-start flex-col gap-2 my-5 w-full">
                <NavItem v-for="zekr in uiStore.azkar" :key="zekr.id" :zekr="zekr" />
            </div>
        </template>
    </div>
</template>