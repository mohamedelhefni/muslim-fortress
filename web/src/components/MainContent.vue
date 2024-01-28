<script setup>
import { useUIStore } from '../stores/ui';
import Navbar from './Navbar.vue';

const uiStore = useUIStore()

</script>
<template>
    <div class="fixed top-0 left-0 bg-gray-100 col-span-10 md:relative md:col-span-8 w-full h-full  md:max-h-[92vh] overflow-y-scroll"
        v-if="uiStore.isContentActive && uiStore.activeZekr">
        <Navbar v-if="uiStore.isSmallScreen" />
        <div class="p-10">
            <h2 class="font-bold text-3xl md:text-4xl my-5"> {{ uiStore.activeZekr.title }}</h2>
            <div class="flex flex-col gap-4">
                <div v-for="zekr in uiStore.activeZekr.content" class="p-5 rounded shadow cursor-pointer " :class="[zekr.isRead ? 'bg-teal-500 text-white' : 'text-gray-800 bg-white  hover:bg-teal-50']"  role="button" @click="uiStore.setActiveContentRead(zekr)">
                    <p class="text-xl leading-10 font-quran">
                        {{ zekr.text }}
                    </p>
                </div>
            </div>

        </div>

    </div>
</template>
