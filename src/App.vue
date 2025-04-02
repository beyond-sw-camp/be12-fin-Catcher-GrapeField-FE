<script setup>
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'
</script>

<template>
  <div class="layout">
    <Header />
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