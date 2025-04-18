<script setup>
import { ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'
import Sidebar from './common/Sidebar.vue'
import GlobalLoading from './common/GlobalLoading.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 초기 상태 확인이 끝났는지 여부
const isInitialized = ref(false)

//로그인 여부 확인
onMounted(async () => {
  const result = await userStore.checkAuthStatus()
  console.log('🔍 checkAuthStatus 결과:', result)
  isInitialized.value = true
})

// 전역 세션 만료 핸들러 등록
window.handleSessionExpired = () => {
  userStore.resetUserState();
  router.push('/login');
};

// 로그인, 회원가입 페이지일 때는 사이드바 가리기
const showSidebar = computed(() => !['Login', 'SignUp'].includes(route.name))
const isStandalonePage = computed(() => route.meta.standalone === true)

// 페이지에 따라 레이아웃 클래스를 동적으로 결정
const layoutClass = computed(() => {
  if (route.path.startsWith('/admin')) return 'admin-layout'
  if (route.path.startsWith('/mypage')) return 'mypage-layout'
  return isStandalonePage.value ? 'standalone-page' : 'main-content'
})
</script>

<template>
  <!-- 인증 확인이 완료될 때만 전체 앱 렌더링 -->
  <div v-if="isInitialized" class="layout">
    <Header v-if="!isStandalonePage" />
    <div :class="layoutClass">
      <router-view />
      <GlobalLoading />
    </div>
    <Sidebar v-if="showSidebar && !isStandalonePage" />
    <Footer v-if="!isStandalonePage" />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 98vh;
}

.main-content {
  flex: 1;
  margin-top: 4rem;
  /* 헤더 높이와 동일하게 설정 (기존 5vw에서 4rem으로 변경) */
  padding-bottom: 1rem; /* 1vw에서 1rem으로 변경 */
}

.standalone-page {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
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