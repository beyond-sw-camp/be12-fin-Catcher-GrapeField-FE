<script setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'
import SideBar from './common/SideBar.vue'

// 로그인, 회원가입 페이지일 때는 사이드바 가리기
const route = useRoute()
const showSidebar = computed(() => !['Login', 'SignUp'].includes(route.name))
</script>

<template>
  <div class="layout">
    <Header/>
    <router-view/>
    <SideBar v-if="showSidebar"/>
    <Footer/>
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
  margin-top: 4rem;
  /* 헤더 높이와 동일하게 설정 (기존 5vw에서 4rem으로 변경) */
  padding: 1rem; /* 1vw에서 1rem으로 변경 */
}

@media screen and (max-width: 1024px) {
  main {
    margin-top: 4.5rem; /* 헤더 높이와 일치하도록 추가 */
  }
}

@media screen and (max-width: 768px) {
  main {
    /* 모바일에서는 헤더 높이가 커짐 (8vw에서 5rem으로 변경) */
    margin-top: 5rem;
  }
}

@media screen and (max-width: 480px) {
  main {
    /* 작은 화면에서 추가 여백 (10vw에서 5.5rem으로 변경) */
    margin-top: 5.5rem;
  }
}
</style>