<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import MainContent from './components/MainContent.vue';
</script>

<template>
    <div class="flex flex-col min-h-[100dvh]">
        <Navbar />
        <main class="grid grid-cols-10 flex-1 min-h-0 md:h-[calc(100dvh-65px)] md:max-h-[calc(100dvh-65px)]">
            <Sidebar />
            <MainContent />
        </main>
    </div>
</template>
