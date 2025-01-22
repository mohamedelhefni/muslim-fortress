<script setup>
import { useUIStore } from '../stores/ui';
import IconClose from "./icons/IconClose.vue";
import IconMoon from './icons/IconMoon.vue';
import IconSun from './icons/IconSun.vue';

const uiStore = useUIStore()


</script>
<template>
    <nav class="flex items-center justify-between bg-teal-800 dark:bg-stone-900 w-full p-5">
        <div class="flex items-center gap-3">
            <button v-if="uiStore.isSmallScreen && uiStore.isContentActive" class="ml-auto"
                @click="() => { uiStore.toggleContent() }">
                <IconClose class="w-6 h-6 fill-white" />
            </button>
            <div class="flex items-center">
                <img src="@/assets/logo.png" alt="logo" class="w-10 h-10 ml-4" />
                <h1 class="font-bold text-3xl text-white">حصن المسلم</h1>
            </div>
        </div>
        <button class="ml-2.5" @click="() => { uiStore.toggleDarkTheme() }">
            <IconMoon v-if="uiStore.currentTheme == 'light'" class="w-6 h-6 fill-white " />
            <IconSun v-else class="w-6 h-6 fill-white" />
        </button>
    </nav>
</template>