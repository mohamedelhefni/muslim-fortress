<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue'
import { useUIStore } from './stores/ui'

const ui = useUIStore()
</script>

<template>
    <div class="h-[100dvh] flex flex-col">
        <Navbar />
        <!-- Phone: the index is home and a section replaces it. md+: index | reader. -->
        <div class="flex-1 min-h-0 md:grid md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr]">
            <Sidebar :class="ui.activeId ? 'hidden md:flex' : 'flex'" />
            <MainContent :class="ui.activeId ? 'block' : 'hidden md:block'" />
        </div>
    </div>
</template>
