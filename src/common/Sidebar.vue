<template>
    <div class="layout-container">
        <!-- 사이드 패널 컴포넌트 -->
        <transition name="slide">
            <div v-if="activePanel" class="side-panel">
                <div class="panel-header">
                    <h3>{{ getPanelTitle }}</h3>
                    <button class="close-btn" @click="closePanel">×</button>
                </div>
                <div class="panel-content">
                    <!-- 프로필 패널 -->
                    <div v-if="activePanel === 'profile'" class="profile-panel">
                        <div class="profile-avatar">
                            <img src="../assets/icons/user-avatar.png" alt="사용자 프로필" />
                        </div>
                        <div class="profile-name">사용자</div>
                        <div class="profile-email">grapefield@example.com</div>

                        <div class="menu-list">
                            <div class="menu-button">내 정보 수정</div>
                            <div class="menu-button">나의 예약 내역</div>
                            <div class="menu-button">관심 이벤트</div>
                            <div class="menu-button">알림 설정</div>
                            <div class="menu-button logout">로그아웃</div>
                        </div>
                    </div>

                    <!-- 채팅 패널 -->
                    <div v-else-if="activePanel === 'chat'" class="chat-panel">
                        <div class="chat-list">
                            <div class="chat-item">
                                <div class="chat-title">공연 A 채팅방</div>
                                <div class="chat-preview">최근 메시지: 오늘 공연 좋았어요!</div>
                            </div>
                            <div class="chat-item">
                                <div class="chat-title">전시회 B 채팅방</div>
                                <div class="chat-preview">최근 메시지: 입장 대기 시간 10분 정도예요</div>
                            </div>
                            <div class="chat-item">
                                <div class="chat-title">콘서트 C 채팅방</div>
                                <div class="chat-preview">최근 메시지: 주차장 아직 자리 있어요</div>
                            </div>
                        </div>
                    </div>

                    <!-- 캘린더 패널 -->
                    <div v-else-if="activePanel === 'calendar'" class="calendar-panel">
                        <div class="calendar-upcoming">
                            <h4>다가오는 일정</h4>
                            <div class="calendar-event">
                                <div class="event-date">4월 15일</div>
                                <div class="event-title">뮤지컬 '햄릿' 예매 오픈</div>
                            </div>
                            <div class="calendar-event">
                                <div class="event-date">4월 20일</div>
                                <div class="event-title">콘서트 티켓 예매</div>
                            </div>
                        </div>
                        <div class="calendar-browse">
                            <div class="calendar-button">전체 일정 보기</div>
                        </div>
                    </div>

                    <!-- 관심목록 패널 -->
                    <div v-else-if="activePanel === 'interest'" class="interest-panel">
                        <div class="interest-categories">
                            <div class="category-tab active">공연</div>
                            <div class="category-tab">전시</div>
                            <div class="category-tab">콘서트</div>
                        </div>
                        <div class="interest-list">
                            <div class="interest-item">
                                <div class="interest-title">뮤지컬 '햄릿'</div>
                                <div class="interest-date">2025.05.01 - 2025.06.30</div>
                            </div>
                            <div class="interest-item">
                                <div class="interest-title">전시 '봄의 풍경'</div>
                                <div class="interest-date">2025.04.10 - 2025.05.15</div>
                            </div>
                            <div class="interest-item">
                                <div class="interest-title">콘서트 '사계'</div>
                                <div class="interest-date">2025.04.25</div>
                            </div>
                        </div>
                    </div>

                    <!-- 히스토리 패널 -->
                    <div v-else-if="activePanel === 'history'" class="history-panel">
                        <div class="history-list">
                            <div class="history-item">
                                <div class="history-title">전시 '현대미술전'</div>
                                <div class="history-date">방문일: 2025.03.15</div>
                            </div>
                            <div class="history-item">
                                <div class="history-title">뮤지컬 '레미제라블'</div>
                                <div class="history-date">관람일: 2025.02.28</div>
                            </div>
                            <div class="history-item">
                                <div class="history-title">콘서트 '봄의 소리'</div>
                                <div class="history-date">관람일: 2025.02.10</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- 사이드바가 접혔을 때 나타나는 버튼 -->
        <div v-if="isSidebarCollapsed" class="expand-button" @click="toggleSidebar">
            <img src="../assets/icons/open.png" alt="사이드바 펼치기" />
        </div>

        <!-- 사이드바 -->
        <div v-show="!isSidebarCollapsed" class="sidebar-container">
            <div class="sidebar">
                <div class="menu-section">
                    <div class="menu-item" :class="{ active: activePanel === 'profile' }"
                        @click="togglePanel('profile')">
                        <div class="menu-icon">
                            <img src="../assets/icons/profile.png" alt="프로필" />
                        </div>
                    </div>

                    <div class="menu-item" :class="{ active: activePanel === 'chat' }" @click="togglePanel('chat')">
                        <div class="menu-icon">
                            <img src="../assets/icons/chat.png" alt="채팅" />
                        </div>
                    </div>

                    <div class="menu-item" :class="{ active: activePanel === 'calendar' }"
                        @click="togglePanel('calendar')">
                        <div class="menu-icon">
                            <img src="../assets/icons/calendar.png" alt="캘린더" />
                        </div>
                    </div>

                    <div class="menu-item" :class="{ active: activePanel === 'interest' }"
                        @click="togglePanel('interest')">
                        <div class="menu-icon">
                            <img src="../assets/icons/interest.png" alt="관심목록" />
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="bottom-section">
                    <div class="menu-item" :class="{ active: activePanel === 'history' }"
                        @click="togglePanel('history')">
                        <div class="menu-icon">
                            <img src="../assets/icons/history.png" alt="히스토리" />
                        </div>
                    </div>

                    <div class="menu-item" @click="toggleSidebar">
                        <div class="menu-icon">
                            <img src="../assets/icons/close.png" alt="사이드바 접기" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarPanel',
    data() {
        return {
            activePanel: null,
            isSidebarCollapsed: false
        };
    },
    computed: {
        getPanelTitle() {
            switch (this.activePanel) {
                case 'profile': return '프로필';
                case 'chat': return '채팅';
                case 'calendar': return '캘린더';
                case 'interest': return '관심목록';
                case 'history': return '히스토리';
                default: return '';
            }
        }
    },
    methods: {
        togglePanel(panelName) {
            if (this.activePanel === panelName) {
                this.activePanel = null;
            } else {
                this.activePanel = panelName;
            }
        },
        closePanel() {
            this.activePanel = null;
        },
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
            if (this.isSidebarCollapsed) {
                this.activePanel = null;
            }
            // 로컬 스토리지에 상태 저장
            localStorage.setItem('sidebarCollapsed', this.isSidebarCollapsed);
        },
        logout() {
            // 로그아웃 로직 구현
            alert('로그아웃되었습니다.');
            // this.$router.push('/login');
        }
    },
    mounted() {
        // 로컬 스토리지에서 사이드바 상태 복원
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            this.isSidebarCollapsed = savedState === 'true';
        }
    }
};
</script>

<style scoped>
.layout-container {
    position: relative;
    width: 100%;
    height: 100%;
}

/* 사이드바 스타일 */
.sidebar-container {
    position: fixed;
    right: 0;
    top: 20vh;
    z-index: 10;
}

.sidebar {
    width: 4vw;
    min-width: 55px;
    background-color: #F5F0FF;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 0.3vw rgba(0, 0, 0, 0.05);
    border-radius: 0.5vw 0 0 0.5vw;
    height: 60vh;
    position: relative;
}

.expand-button {
    position: fixed;
    top: 45vh;
    right: 0;
    width: 3vw;
    height: 4vw;
    background-color: #F5F0FF;
    border-radius: 0.5vw 0 0 0.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 0.3vw rgba(0, 0, 0, 0.1);
    z-index: 10;
    transition: all 0.3s ease;
}

.expand-button:hover {
    background-color: #E6D8FF;
}

.expand-button img {
    width: 2vw;
    height: 2vw;
}

/* 슬라이드 트랜지션 추가 */
.sidebar-container {
    transition: transform 0.3s ease;
}

/* 모바일 대응 추가 */
@media (max-width: 768px) {
    .expand-button {
        width: 10vw;
        height: 10vw;
        border-radius: 1vw 0 0 1vw;
    }

    .expand-button img {
        width: 6vw;
        height: 6vw;
    }
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
    width: 1.5vw;
    height: 1.5vw;
}

.menu-icon img {
    width: 2vw;
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

/* 사이드 패널 스타일 */
.side-panel {
    position: fixed;
    top: 20vh;
    right: 4vw;
    height: 60vh;
    width: 20vw;
    background-color: white;
    box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.1);
    z-index: 9;
    border-radius: 0.5vw 0 0 0.5vw;
    overflow: hidden;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 1vw;
    border-bottom: 0.1vh solid #eee;
    background-color: #fff;
}

.panel-header h3 {
    margin: 0;
    color: #6A0DAD;
    font-size: 1vw;
    font-weight: 600;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5vw;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5vw;
    height: 1.5vw;
}

.close-btn:hover {
    color: #6A0DAD;
}

.panel-content {
    padding: 1vh 1vw;
    height: calc(100% - 3.5vh);
    overflow-y: auto;
}

/* 패널 트랜지션 */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

/* 프로필 패널 스타일 */
.profile-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-avatar {
    width: 4vw;
    height: 4vw;
    border-radius: 50%;
    background-color: #F5F0FF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1vh;
    border: 0.1vh solid #6A0DAD;
    overflow: hidden;
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-name {
    font-size: 1vw;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5vh;
}

.profile-email {
    font-size: 0.8vw;
    color: #666;
    margin-bottom: 2vh;
}

.menu-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.menu-button {
    background-color: #F5F0FF;
    padding: 1vh 0.8vw;
    border-radius: 0.3vw;
    cursor: pointer;
    font-size: 0.9vw;
    color: #6A0DAD;
    transition: all 0.2s ease;
}

.menu-button:hover {
    background-color: #E6D8FF;
}

.menu-button.logout {
    border: 0.1vh solid #6A0DAD;
    margin-top: 1vh;
}

/* 채팅 패널 스타일 */
.chat-list {
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.chat-item {
    background-color: #F5F0FF;
    padding: 1vh 0.8vw;
    border-radius: 0.3vw;
    cursor: pointer;
}

.chat-title {
    font-size: 0.9vw;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5vh;
}

.chat-preview {
    font-size: 0.8vw;
    color: #666;
}

/* 캘린더 패널 스타일 */
.calendar-upcoming {
    margin-bottom: 2vh;
}

.calendar-upcoming h4 {
    font-size: 0.9vw;
    color: #333;
    margin-bottom: 1vh;
}

.calendar-event {
    background-color: #F5F0FF;
    padding: 1vh 0.8vw;
    border-radius: 0.3vw;
    margin-bottom: 0.8vh;
}

.event-date {
    font-size: 0.8vw;
    color: #6A0DAD;
    font-weight: 600;
}

.event-title {
    font-size: 0.9vw;
    color: #333;
}

.calendar-button {
    background-color: #6A0DAD;
    color: white;
    text-align: center;
    padding: 1vh 0.8vw;
    border-radius: 0.3vw;
    cursor: pointer;
    font-size: 0.9vw;
}

/* 관심목록 패널 스타일 */
.interest-categories {
    display: flex;
    gap: 0.6vw;
    margin-bottom: 1.5vh;
}

.category-tab {
    padding: 0.6vh 0.8vw;
    border-radius: 0.3vw;
    background-color: #F0F0F0;
    font-size: 0.8vw;
    cursor: pointer;
}

.category-tab.active {
    background-color: #6A0DAD;
    color: white;
}

.interest-list {
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.interest-item {
    background-color: #F5F0FF;
    padding: 1vh 0.8vw;
    border-radius: 0.3vw;
    cursor: pointer;
}

.interest-title {
    font-size: 0.9vw;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5vh;
}

.interest-date {
    font-size: 0.8vw;
    color: #666;
}

/* 히스토리 패널 스타일 */
.history-list {
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.history-item {
    background-color: #F5F0FF;
    padding: 1vh 0.8vw;
    border-radius: 0.3vw;
    cursor: pointer;
}

.history-title {
    font-size: 0.9vw;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5vh;
}

.history-date {
    font-size: 0.8vw;
    color: #666;
}
</style>