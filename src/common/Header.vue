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
            <router-link to="/home" :class="{ 'router-link-active': isActive('/home') }" class="truncate">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/events"
                         :class="{ 'router-link-active': isActive('/events') } "class="truncate">공연/전시</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/community"
                         :class="{ 'router-link-active': isActive('/community') }"class="truncate">커뮤니티</router-link>
          </li>
        </ul>
      </nav>

      <div class="auth-section">
        <div class="search-box">
          <input type="text" placeholder="꽃의 비밀 🔍" />
        </div>
        <div class="auth-buttons">
          <router-link to="/login" class="login-button truncate">로그인</router-link>
          <span class="divider">/</span>
          <router-link to="/signup" class="signup-button truncate">회원가입</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      currentPath: ''
    }
  },
  created() {
    // 초기 경로 설정
    this.currentPath = this.$route.path;
  },
  watch: {
    // 라우트 변경 감지
    $route(to) {
      this.currentPath = to.path;
    }
  },
  methods: {
    isActive(path) {
      // 홈 경로는 정확히 '/'일 때만 활성화
      if (path === '/home') {
        return this.currentPath === '/home' || this.currentPath === '/';
      }
      // 다른 경로는 시작 부분이 일치하면 활성화 (예: /performance/123도 /performance로 인식)
      return this.currentPath.startsWith(path);
    }
  }
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
  height: 4rem;  /* 5vw에서 4rem으로 변경 */
}

.header-container {
  width: 90%;
  max-width: 120rem;  /* 90vw에서 120rem으로 변경 */
  margin: 0 auto;
  padding: 0 2rem;  /* 2vw에서 2rem으로 변경 */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 10rem;  /* 10vw에서 10rem으로 변경 */
  height: 3rem;  /* 3vw에서 3rem으로 변경 */
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
  max-height: 2.5rem;  /* 2.5vw에서 2.5rem으로 변경 */
  width: auto;
}

.main-nav {
  flex: 1;
  margin-left: 2rem;  /* 2vw에서 2rem으로 변경 */
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 1.5rem;  /* 1.5vw에서 1.5rem으로 변경 */
}

.nav-item a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;  /* 1vw에서 1rem으로 변경 */
  font-weight: 500;
  padding: 0.5rem 0;  /* 0.5vw에서 0.5rem으로 변경 */
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
  border-bottom: 0.15rem solid #7c4dff;  /* 0.15vw에서 0.15rem으로 변경 */
  padding-bottom: 0.2rem;  /* 0.2vw에서 0.2rem으로 변경 */
}

.auth-section {
  display: flex;
  align-items: center;
}

.search-box {
  margin-right: 1.5rem;  /* 1.5vw에서 1.5rem으로 변경 */
  position: relative;
}

.search-box input {
  padding: 0.5rem 1rem;  /* 0.5vw 1vw에서 0.5rem 1rem으로 변경 */
  border: 0.07rem solid #e0e0e0;  /* 0.07vw에서 0.07rem으로 변경 */
  border-radius: 1.5rem;  /* 1.5vw에서 1.5rem으로 변경 */
  background-color: #f5f0ff;
  width: 20rem;  /* 20vw에서 20rem으로 변경 */
  font-size: 0.9rem;  /* 0.9vw에서 0.9rem으로 변경 */
}

.auth-buttons {
  display: flex;
  align-items: center;
}

.login-button,
.signup-button {
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;  /* 0.9vw에서 0.9rem으로 변경 */
  font-weight: 500;
}

.divider {
  margin: 0 0.5rem;  /* 0.5vw에서 0.5rem으로 변경 */
  color: #ccc;
}

/* 반응형 미디어 쿼리 */
@media screen and (max-width: 1024px) {
  .search-box input {
    width: 15rem;  /* 15vw에서 15rem으로 변경 */
  }

  .header {
    height: 4.5rem;  /* 6vw에서 4.5rem으로 변경 */
  }
}

@media screen and (max-width: 768px) {
  .search-box {
    display: none;
  }

  .header {
    height: 5rem;  /* 8vw에서 5rem으로 변경 */
  }

  .nav-item {
    margin: 0 1rem;  /* 1vw에서 1rem으로 변경 */
  }

  .nav-item a {
    font-size: 1rem;  /* 1.5vw에서 1rem으로 유지 */
  }

  .login-button,
  .signup-button {
    font-size: 0.9rem;  /* 1.2vw에서 0.9rem으로 변경 */
  }
}

@media screen and (max-width: 480px) {
  .header-container {
    padding: 0 1.5rem;  /* 3vw에서 1.5rem으로 변경 */
  }

  .logo-image img {
    max-height: 2rem;  /* 4vw에서 2rem으로 변경 */
  }

  .nav-item a {
    font-size: 0.875rem;  /* 2vw에서 0.875rem으로 변경 */
  }

  .login-button,
  .signup-button {
    font-size: 0.8rem;  /* 1.8vw에서 0.8rem으로 변경 */
  }
}
</style>