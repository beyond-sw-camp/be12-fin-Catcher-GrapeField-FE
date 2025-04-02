<template>
    <header class="header">
        <div class="header-container">
            <div class="logo">
                <router-link to="/">
                    <div class="logo-image">

                        <img src="/logo.png" alt="Logo" width="auto" height="auto" />

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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo a {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.logo-image img {
    width: 60%;
    height: 100%;
}

.logo-text {
    font-size: 24px;
    font-weight: 700;
}

.logo-grape {
    color: #7c4dff;
}

.logo-field {
    color: #8c6bc7;
}

.main-nav {
    flex: 1;
    margin-left: 30px;
}

.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    margin: 0 20px;
}

.nav-item a {
    text-decoration: none;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 0;
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
    border-bottom: 2px solid #7c4dff;
    padding-bottom: 3px;
}

.auth-section {
    display: flex;
    align-items: center;
}

.search-box {
    margin-right: 20px;
    position: relative;
}

.search-box input {
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    background-color: #f5f0ff;
    width: 180px;
    font-size: 14px;
}

.auth-buttons {
    display: flex;
    align-items: center;
}

.login-button,
.signup-button {
    text-decoration: none;
    color: #333;
    font-size: 14px;
    font-weight: 500;
}

.divider {
    margin: 0 8px;
    color: #ccc;
}

</style>