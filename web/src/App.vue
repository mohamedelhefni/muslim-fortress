<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import MainContent from './components/MainContent.vue';

import { useUIStore } from './stores/ui';
const uiStore = useUIStore()
document.documentElement.classList.toggle("dark", uiStore.currentTheme == "dark")


</script>

<template>
  <Navbar />
  <main class="grid grid-cols-10">
    <Sidebar />
    <MainContent />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
