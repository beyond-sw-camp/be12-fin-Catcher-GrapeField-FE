<template>
    <div class="sidebar-container">
        <div class="sidebar">
            <div class="menu-section">
                <router-link to="/mypage" class="menu-item" :class="{ active: $route.path === '/mypage' }">
                    <div class="menu-icon">
                        <img src="../assets/icons/profile.png" alt="프로필" />
                    </div>
                </router-link>

                <router-link to="/chat" class="menu-item" :class="{ active: $route.path === '/chat' }">
                    <div class="menu-icon">
                        <img src="../assets/icons/chat.png" alt="채팅" />
                    </div>
                </router-link>

                <router-link to="/calendar" class="menu-item" :class="{ active: $route.path === '/calendar' }">
                    <div class="menu-icon">
                        <img src="../assets/icons/calendar.png" alt="캘린더" />
                    </div>
                </router-link>

                <router-link to="/interest" class="menu-item" :class="{ active: $route.path === '/interest' }">
                    <div class="menu-icon">
                        <img src="../assets/icons/interest.png" alt="관심목록" />
                    </div>
                </router-link>
            </div>

            <div class="divider"></div>

            <div class="bottom-section">
                <router-link to="/history" class="menu-item" :class="{ active: $route.path === '/history' }">
                    <div class="menu-icon">
                        <img src="../assets/icons/history.png" alt="히스토리" />
                    </div>
                </router-link>

                <router-link to="/logout" class="menu-item">
                    <div class="menu-icon">
                        <img src="../assets/icons/close.png" alt="로그아웃" />
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar-container {
    position: absolute;
    right: 0;
    top: 20vh;
}

.sidebar {
    width: 3vw;
    min-width: 2.5vw;
    background-color: #F5F0FF;
    display: flex;
    flex-direction: column;
    margin-bottom: 5vh;
    box-shadow: 0 0 0.3vh rgba(0, 0, 0, 0.05);
    border-radius: 0.5vw 0 0 0.5vw;
    height: 50vh;
    position: relative;
}

.menu-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1vh 0;
    gap: 1.5vh;
}

.menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3vw;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #666;
}

.menu-item:hover {
    background-color: rgba(106, 13, 173, 0.08);
    color: #6A0DAD;
}

.menu-item.active {
    background-color: #6A0DAD;
    color: white;
}

.menu-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2vw;
    height: 2vw;
}

.menu-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.divider {
    height: 0.1vh;
    background-color: #E0E0E0;
    margin: 0.5vh 0.4vw;
}

.bottom-section {
    padding: 1vh 0;
    display: flex;
    flex-direction: column;
    gap: 1.5vh;
}

/* 팝업 패널 스타일 */
.side-panel {
    position: fixed;
    top: 5vh;
    right: 3vw;
    height: 50vh;
    width: 16vw;
    background-color: white;
    box-shadow: 0 0 0.6vh rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 51;
    border-radius: 0.5vw 0 0 0.5vw;
}

.side-panel.open {
    transform: translateX(0);
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 1vw;
    border-bottom: 0.1vh solid #eee;
}

.panel-header h3 {
    margin: 0;
    color: #6A0DAD;
    font-size: 1vw;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5vw;
    cursor: pointer;
    color: #666;
}

.close-btn:hover {
    color: #6A0DAD;
}

.panel-content {
    padding: 1vh 1vw;
}
</style>