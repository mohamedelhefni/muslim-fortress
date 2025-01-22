<script setup>
import { useUIStore } from '@/stores/ui';
import IconHeart from './icons/IconHeart.vue';
import IconHeartFilled from './icons/IconHeartFilled.vue';


const uiStore = useUIStore()
defineProps({
    zekr: Object
})

</script>

<template>
    <div :key="zekr.id" class="flex items-center justify-between hover:bg-stone-100 dark:hover:bg-stone-700 py-2 px-5 rounded  w-full cursor-pointer"
        :class="{ 'bg-teal-500 text-white dark:bg-stone-950': uiStore.activeZekr?.id === zekr.id }" role="button" @click="uiStore.setActiveZekr(zekr)">
        <h3>{{ zekr.title }}</h3>
        <button class="" @click.stop="uiStore.setIsFavrorite(zekr)">
            <IconHeartFilled v-if="uiStore.isFavorite(zekr)" class="w-5 h-5 " role="button"   :class="{'fill-white': uiStore.activeZekr?.id === zekr.id, 'fill-teal-500 dark:fill-stone-500': uiStore.activeZekr?.id !== zekr.id}" />
            <IconHeart v-else class="w-5 h-5 dark:fill-white" role="button"  :class="{'fill-white ': uiStore.activeZekr?.id === zekr.id}"  />
        </button>

    </div>
</template>