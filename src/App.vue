<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'
import SideBar from './common/SideBar.vue'

// Get current route to check if we're on the login page
const route = useRoute()
const showSidebar = computed(() => !['Login', 'SignUp'].includes(route.name))
</script>

<template>
  <div class="layout">
    <Header />
    <SideBar v-if="showSidebar" />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 98vh;
}

main {
  flex: 1;
}
</style>