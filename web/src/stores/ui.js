import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { data } from '../data/data.js';

export const useUIStore = defineStore('uiStore', () => {
    const searchQuery = ref('');
    const searchResults = ref([])
    const isContentActive = ref(false);
    const isSmallScreen = computed(() => window.innerWidth < 640);
    const azkar = ref(data)
    const activeZekr = ref({})
    const favoriteZekrIds = ref([])
    const favoriteAzkar = computed(() => azkar.value.filter((zekr) => favoriteZekrIds.value.includes(zekr.id)))


    function toggleContent() {
        isContentActive.value = !isContentActive.value;
    }

    function setActiveZekr(zekr) {
        isContentActive.value = true
        activeZekr.value = zekr
        activeZekr.value.content = zekr.text.map((content, idx) => {
            let item = {}
            item.id = idx
            item.isRead = false
            item.text = content
            return item
        })

    }

    function setActiveContentRead(item) {
        activeZekr.value.content.forEach((currentItem) => {
            if (item.id === currentItem.id) {
                item.isRead = !item.isRead
                return
            }
        })
    }

    function isFavorite(zekr) {
        return favoriteZekrIds.value.includes(zekr.id)
    }


    function setIsFavrorite(zekr) {
        console.log('is favorite')
        if (isFavorite(zekr)) {
            const index = favoriteZekrIds.value.indexOf(zekr.id)
            favoriteZekrIds.value.splice(index, 1)
        } else {
            favoriteZekrIds.value.push(zekr.id)
        }
    }

    function searchZekr() {
        if (searchQuery.value === '') {
            searchResults.value = []
            return
        }

        searchResults.value = azkar.value.filter(zekr => zekr.title.includes(searchQuery.value))
    }

    return { azkar, searchResults, isContentActive, isSmallScreen, toggleContent, activeZekr, favoriteZekrIds, favoriteAzkar, searchQuery, setActiveZekr, setActiveContentRead, setIsFavrorite, isFavorite, searchZekr }
})

