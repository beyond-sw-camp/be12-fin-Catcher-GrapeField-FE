<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <div class="logo-image">
            <img src="/logo.png" alt="Logo" />
          </div>
        </router-link>
      </div>

      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" :class="{ 'router-link-active': isActive('/') }" class="truncate">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/events" :class="{ 'router-link-active': isActive('/events') }"
              class="truncate">공연/전시</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/community" :class="{ 'router-link-active': isActive('/community') }"
              class="truncate">커뮤니티</router-link>
          </li>
        </ul>
      </nav>
      <div class="search-box">
        <input type="text" placeholder="꽃의 비밀 🔍" />
      </div>

      <!-- 로그인 상태별 UI -->
      <div class="flex items-center gap-2">
        <!-- ✅ 비로그인 -->
        <template v-if="!isLogin">
          <router-link to="/login" class="text-sm text-gray-700 hover:underline">로그인</router-link>
          <span class="text-gray-400">/</span>
          <router-link to="/signup" class="text-sm text-gray-700 hover:underline">회원가입</router-link>
        </template>

        <!-- ✅ 로그인 -->
        <template v-else>
          <!-- 프로필 원형 버튼 -->
          <button class="w-8 h-8 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center">
            {{ userInitial }}
          </button>

          <!-- 알림 버튼 -->
          <button
            class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200">
            🔔
          </button>

          <!-- 점 세 개 메뉴 버튼 -->
          <div class="relative">
            <button
              class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200"
              @click="toggleMenu">
              ⋯
            </button>

            <!-- 드롭다운 메뉴 -->
            <div v-if="showMenu"
              class="flex flex-col gap-2 absolute left-1/2 mt-2 transform -translate-x-1/2 bg-white border rounded shadow px-3 py-2 text-sm z-10 w-max">
              <button class="text-gray-700 hover:underline whitespace-nowrap">설정</button>
              <button @click="logout" class="text-red-500 hover:underline whitespace-nowrap">로그아웃</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const currentPath = ref('')

// 로그인 상태 확인
const isLogin = computed(() => userStore.isLogin)
const userInitial = computed(() => userStore.user?.email?.charAt(0)?.toUpperCase() || 'U')

// 더보기 버튼 드롭다운 상태
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// 로그아웃 처리
const logout = () => {
  userStore.user = null
  userStore.isLogin = false
  showMenu.value = false
  router.push('/')
}


// 초기 경로 설정
onMounted(() => {
  currentPath.value = route.path
})

// 라우트 변경 감지
watch(() => route.path, (newPath) => {
  currentPath.value = newPath
})

// 경로 활성화 판단 함수
const isActive = (path) => {
  if (path === '/') {
    return currentPath.value === '/'
  }
  return currentPath.value.startsWith(path)
}
</script>


<style scoped>
.header {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 4rem;
  /* 5vw에서 4rem으로 변경 */
}

.header-container {
  width: 90%;
  max-width: 120rem;
  /* 90vw에서 120rem으로 변경 */
  margin: 0 auto;
  padding: 0 2rem;
  /* 2vw에서 2rem으로 변경 */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 10rem;
  /* 10vw에서 10rem으로 변경 */
  height: 3rem;
  /* 3vw에서 3rem으로 변경 */
  display: flex;
  align-items: center;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
}

.logo-image {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo-image img {
  max-height: 2.5rem;
  /* 2.5vw에서 2.5rem으로 변경 */
  width: auto;
}

.main-nav {
  flex: 1;
  margin-left: 2rem;
  /* 2vw에서 2rem으로 변경 */
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 1.5rem;
  /* 1.5vw에서 1.5rem으로 변경 */
}

.nav-item a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  /* 1vw에서 1rem으로 변경 */
  font-weight: 500;
  padding: 0.5rem 0;
  /* 0.5vw에서 0.5rem으로 변경 */
  transition: color 0.3s, font-weight 0.3s;
  position: relative;
  display: inline-block;
}

.nav-item a:hover {
  color: #7c4dff;
}

.nav-item a.router-link-active {
  color: #7c4dff;
  font-weight: 700;
  border-bottom: 0.15rem solid #7c4dff;
  /* 0.15vw에서 0.15rem으로 변경 */
  padding-bottom: 0.2rem;
  /* 0.2vw에서 0.2rem으로 변경 */
}

.auth-section {
  display: flex;
  align-items: center;
}

.search-box {
  margin-right: 1.5rem;
  /* 1.5vw에서 1.5rem으로 변경 */
  position: relative;
}

.search-box input {
  padding: 0.5rem 1rem;
  /* 0.5vw 1vw에서 0.5rem 1rem으로 변경 */
  border: 0.07rem solid #e0e0e0;
  /* 0.07vw에서 0.07rem으로 변경 */
  border-radius: 1.5rem;
  /* 1.5vw에서 1.5rem으로 변경 */
  background-color: #f5f0ff;
  width: 30rem;
  /* 20vw에서 20rem으로 변경 */
  font-size: 0.9rem;
  /* 0.9vw에서 0.9rem으로 변경 */
}

.auth-buttons {
  display: flex;
  align-items: center;
}

.login-button,
.signup-button {
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
  /* 0.9vw에서 0.9rem으로 변경 */
  font-weight: 500;
}

.divider {
  margin: 0 0.5rem;
  /* 0.5vw에서 0.5rem으로 변경 */
  color: #ccc;
}

/* 반응형 미디어 쿼리 */
@media screen and (max-width: 1024px) {
  .search-box input {
    width: 15rem;
    /* 15vw에서 15rem으로 변경 */
  }

  .header {
    height: 4.5rem;
    /* 6vw에서 4.5rem으로 변경 */
  }
}

@media screen and (max-width: 768px) {
  .search-box {
    display: none;
  }

  .header {
    height: 5rem;
    /* 8vw에서 5rem으로 변경 */
  }

  .nav-item {
    margin: 0 1rem;
    /* 1vw에서 1rem으로 변경 */
  }

  .nav-item a {
    font-size: 1rem;
    /* 1.5vw에서 1rem으로 유지 */
  }

  .login-button,
  .signup-button {
    font-size: 0.9rem;
    /* 1.2vw에서 0.9rem으로 변경 */
  }
}

@media screen and (max-width: 480px) {
  .header-container {
    padding: 0 1.5rem;
    /* 3vw에서 1.5rem으로 변경 */
  }

  .logo-image img {
    max-height: 2rem;
    /* 4vw에서 2rem으로 변경 */
  }

  .nav-item a {
    font-size: 0.875rem;
    /* 2vw에서 0.875rem으로 변경 */
  }

  .login-button,
  .signup-button {
    font-size: 0.8rem;
    /* 1.8vw에서 0.8rem으로 변경 */
  }
}
</style>