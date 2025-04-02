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
                        <router-link to="/home" :class="{ 'router-link-active': isActive('/home') }">홈</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/events"
                            :class="{ 'router-link-active': isActive('/events') }">공연/전시</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/community"
                            :class="{ 'router-link-active': isActive('/community') }">커뮤니티</router-link>
                    </li>
                </ul>
            </nav>

            <div class="auth-section">
                <div class="search-box">
                    <input type="text" placeholder="꽃의 비밀 🔍" />
                </div>
                <div class="auth-buttons">
                    <router-link to="/login" class="login-button">로그인</router-link>
                    <span class="divider">/</span>
                    <router-link to="/signup" class="signup-button">회원가입</router-link>
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
    box-shadow: 0 0.1vw 0.3vw rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 5vw;
}

.header-container {
    width: 90%;
    max-width: 90vw;
    margin: 0 auto;
    padding: 0 2vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    width: 10vw;
    height: 3vw;
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
    max-height: 2.5vw;
    width: auto;
}

.main-nav {
    flex: 1;
    margin-left: 2vw;
}

.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    margin: 0 1.5vw;
}

.nav-item a {
    text-decoration: none;
    color: #333;
    font-size: 1vw;
    font-weight: 500;
    padding: 0.5vw 0;
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
    border-bottom: 0.15vw solid #7c4dff;
    padding-bottom: 0.2vw;
}

.auth-section {
    display: flex;
    align-items: center;
}

.search-box {
    margin-right: 1.5vw;
    position: relative;
}

.search-box input {
    padding: 0.5vw 1vw;
    border: 0.07vw solid #e0e0e0;
    border-radius: 1.5vw;
    background-color: #f5f0ff;
    width: 20vw;
    font-size: 0.9vw;
}

.auth-buttons {
    display: flex;
    align-items: center;
}

.login-button,
.signup-button {
    text-decoration: none;
    color: #333;
    font-size: 0.9vw;
    font-weight: 500;
}

.divider {
    margin: 0 0.5vw;
    color: #ccc;
}

/* 반응형 미디어 쿼리 */
@media screen and (max-width: 1024px) {
    .search-box input {
        width: 15vw;
    }

    .header {
        height: 6vw;
    }
}

@media screen and (max-width: 768px) {
    .search-box {
        display: none;
    }

    .header {
        height: 8vw;
    }

    .nav-item {
        margin: 0 1vw;
    }

    .nav-item a {
        font-size: 1.5vw;
    }

    .login-button,
    .signup-button {
        font-size: 1.2vw;
    }
}

@media screen and (max-width: 480px) {
    .header-container {
        padding: 0 3vw;
    }

    .logo-image img {
        max-height: 4vw;
    }

    .nav-item a {
        font-size: 2vw;
    }

    .login-button,
    .signup-button {
        font-size: 1.8vw;
    }
}
</style>