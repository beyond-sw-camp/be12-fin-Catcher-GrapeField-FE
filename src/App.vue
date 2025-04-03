<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'
import SideBar from './common/SideBar.vue'

// 로그인, 회원가입 페이지일 때는 사이드바 가리기
const route = useRoute()
const showSidebar = computed(() => !['Login', 'SignUp'].includes(route.name))
</script>

<template>
  <div class="layout">
    <Header />
    <main>
      <router-view />
    </main>
    <SideBar v-if="showSidebar" />
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
  margin-top: 5vw;
  /* 헤더 높이와 동일하게 설정 */
  padding: 1vw;
}

@media screen and (max-width: 768px) {
  main {
    /* 모바일에서는 헤더 높이가 커짐 */
    margin-top: 8vw;
  }
}

@media screen and (max-width: 480px) {
  main {
    /* 작은 화면에서 추가 여백 */
    margin-top: 10vw;
  }
}
</style>