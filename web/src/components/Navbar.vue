<script setup>
import { useUIStore } from '../stores/ui';
import IconClose from "./icons/IconClose.vue";

const uiStore = useUIStore()


</script>
<template>
    <nav class="flex items-center  bg-teal-800 w-full p-5">
        <div class="flex items-center gap-3">
            <button v-if="uiStore.isSmallScreen && uiStore.isContentActive" class="ml-auto"
                @click="() => { uiStore.toggleContent() }">
                <IconClose class="w-6 h-6 fill-white" />
            </button>
            <div class="flex items-center">
                <img src="/logo.png" alt="logo" class="w-10 h-10 ml-4" />
                <h1 class="font-bold text-3xl text-white">حصن المسلم</h1>
            </div>
        </div>
    </nav>
</template>