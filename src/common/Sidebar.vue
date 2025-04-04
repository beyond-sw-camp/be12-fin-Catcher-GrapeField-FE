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
                        <div class="panel-title">내 관심 채팅방</div>

                        <!-- 채팅방 목록 -->
                        <div class="chat-list">
                            <div v-if="favoriteChatRooms.length === 0" class="chat-empty">
                                <p>관심 등록된 채팅방이 없습니다.</p>
                                <p>채팅 목록에서 관심 채팅방을 추가해보세요!</p>
                            </div>

                            <div v-for="room in favoriteChatRooms" :key="room.id" class="chat-item"
                                @click="openChatRoomNewWindow(room.id)">
                                <div class="chat-item-top">
                                    <div class="chat-title">{{ room.title }}</div>
                                    <div v-if="room.isActive" class="chat-status active">LIVE</div>
                                    <div v-else class="chat-status inactive">대기</div>
                                </div>
                                <div class="chat-preview">{{ room.preview }}</div>
                                <div class="chat-item-footer">
                                    <div class="chat-participants">{{ room.participants }}명 참여중</div>
                                    <div class="chat-date">{{ room.date }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- 전체보기 버튼 -->
                        <div class="view-all-button" @click="viewAllChatRoomsNewWindow">
                            전체 채팅방 보기
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
// chat.json 데이터 import
import chatData from '../assets/data/chat.json'

export default {
    name: 'SidebarPanel',
    data() {
        return {
            activePanel: null,
            isSidebarCollapsed: false,
            chatRooms: [] // 채팅방 데이터
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
        },

        // 관심 등록된 채팅방만 필터링
        favoriteChatRooms() {
            if (!this.chatRooms || this.chatRooms.length === 0) {
                return [];
            }

            // chatData.userFavorites 배열에 있는 id를 가진 채팅방만 필터링
            return this.chatRooms
                .filter(room => chatData.userFavorites.includes(room.id))
                .slice(0, 5); // 최대 5개만 표시
        }
    },
    methods: {
        togglePanel(panelName) {
            if (this.activePanel === panelName) {
                this.activePanel = null;
            } else {
                this.activePanel = panelName;

                // 채팅 패널이 활성화되면 채팅방 데이터 로드
                if (panelName === 'chat') {
                    this.loadChatRooms();
                }
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

        // 채팅방 데이터 로드
        loadChatRooms() {
            // chat.json 데이터 사용
            if (chatData && chatData.chatRooms) {
                this.chatRooms = chatData.chatRooms.map(room => ({
                    ...room,
                    isFavorite: chatData.userFavorites.includes(room.id)
                }));
            }
        },

        // 새 창으로 채팅방 열기
        openChatRoomNewWindow(id) {
            const baseUrl = window.location.origin;
            const routeUrl = `${baseUrl}/chat-room/${id}`;

            // 새 창으로 열기
            window.open(routeUrl, '_blank');
        },

        // 전체 채팅방 목록도 새 창으로 열기
        viewAllChatRoomsNewWindow() {
            const baseUrl = window.location.origin;
            const routeUrl = `${baseUrl}/chat-list`;

            // 새 창으로 열기
            window.open(routeUrl, '_blank');
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
    width: 4vw;
    height: 5vw;
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
    width: 3vw;
    height: 3vw;
}

/* 슬라이드 트랜지션 추가 */
.sidebar-container {
    transition: transform 0.3s ease;
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
    height: 4vw;
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
    width: 3.2vw;
    height: 3.2vw;
}

.menu-icon img {
    width: 85%;
    height: 85%;
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
    padding: 1.2vh 1.2vw;
    border-bottom: 0.1vh solid #eee;
    background-color: #fff;
}

.panel-header h3 {
    margin: 0;
    color: #6A0DAD;
    font-size: 1.2vw;
    font-weight: 600;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.8vw;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.8vw;
    height: 1.8vw;
}

.close-btn:hover {
    color: #6A0DAD;
}

.panel-content {
    padding: 1.5vh 1.2vw;
    height: calc(100% - 4vh);
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
    width: 5vw;
    height: 5vw;
    border-radius: 50%;
    background-color: #F5F0FF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5vh;
    border: 0.1vh solid #6A0DAD;
    overflow: hidden;
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-name {
    font-size: 1.2vw;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.8vh;
}

.profile-email {
    font-size: 1vw;
    color: #666;
    margin-bottom: 2.5vh;
}

.menu-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.menu-button {
    background-color: #F5F0FF;
    padding: 1.2vh 1vw;
    border-radius: 0.4vw;
    cursor: pointer;
    font-size: 1.1vw;
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
.panel-title {
    font-size: 1.1vw;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.2vh;
    border-left: 3px solid #6A0DAD;
    padding-left: 0.8vw;
}

.chat-list {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    margin-bottom: 1.5vh;
}

.chat-empty {
    padding: 2vh 0;
    text-align: center;
    color: #888;
    font-size: 0.9vw;
}

.chat-empty p:first-child {
    margin-bottom: 0.5vh;
}

.chat-item {
    background-color: #F5F0FF;
    padding: 1.2vh 1vw;
    border-radius: 0.4vw;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.chat-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat-item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6vh;
}

.chat-title {
    font-size: 1.1vw;
    font-weight: 600;
    color: #333;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.chat-status {
    font-size: 0.7vw;
    padding: 0.2vh 0.4vw;
    border-radius: 2vw;
    font-weight: 600;
}

.chat-status.active {
    background-color: #FF4545;
    color: white;
}

.chat-status.inactive {
    background-color: #AAAAAA;
    color: white;
}

.chat-preview {
    font-size: 0.9vw;
    color: #666;
    margin-bottom: 0.8vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.chat-item-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.8vw;
    color: #888;
}

.view-all-button {
    background-color: #6A0DAD;
    color: white;
    text-align: center;
    padding: 1vh 0;
    border-radius: 0.4vw;
    cursor: pointer;
    font-size: 1vw;
    transition: background-color 0.2s;
}

.view-all-button:hover {
    background-color: #5A0C9D;
}

/* 캘린더 패널 스타일 */
.calendar-upcoming {
    margin-bottom: 2vh;
}

.calendar-upcoming h4 {
    font-size: 1.1vw;
    color: #333;
    margin-bottom: 1.2vh;
}

.calendar-event {
    background-color: #F5F0FF;
    padding: 1vh 0.8vw;
    border-radius: 0.3vw;
    margin-bottom: 0.8vh;
}

.event-date {
    font-size: 1vw;
    color: #6A0DAD;
    font-weight: 600;
}

.event-title {
    font-size: 1.1vw;
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
    padding: 0.8vh 1vw;
    border-radius: 0.4vw;
    background-color: #F0F0F0;
    font-size: 1vw;
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
    font-size: 1.1vw;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.8vh;
}

.interest-date {
    font-size: 1vw;
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
    font-size: 1.1vw;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.8vh;
}

.history-date {
    font-size: 1vw;
    color: #666;
}

/* 모바일 대응 추가 스타일 */
@media (max-width: 768px) {
    .sidebar-container {
        display: none;
    }

    .side-panel {
        right: 0;
        width: 70vw;
        top: 10vh;
        height: 70vh;
        border-radius: 0.5vw 0 0 0.5vw;
    }

    .panel-header h3 {
        font-size: 4vw;
    }

    .close-btn {
        font-size: 5vw;
        width: 5vw;
        height: 5vw;
    }

    .profile-avatar {
        width: 15vw;
        height: 15vw;
    }

    .profile-name {
        font-size: 4vw;
    }

    .profile-email {
        font-size: 3vw;
    }

    .menu-button {
        font-size: 3.5vw;
        padding: 2vh 3vw;
    }

    .chat-title,
    .interest-title,
    .history-title,
    .event-title {
        font-size: 3.5vw;
    }

    .chat-preview,
    .interest-date,
    .history-date,
    .event-date {
        font-size: 3vw;
    }

    .calendar-upcoming h4 {
        font-size: 4vw;
    }

    .category-tab {
        font-size: 3vw;
        padding: 1.5vh 2.5vw;
    }

    .expand-button {
        width: 10vw;
        height: 10vw;
        border-radius: 1vw 0 0 1vw;
    }

    .expand-button img {
        width: 6vw;
        height: 6vw;
    }

    .panel-title {
        font-size: 3.8vw;
        padding-left: 2vw;
    }

    .chat-empty {
        font-size: 3vw;
    }

    .chat-status {
        font-size: 2.5vw;
    }

    .view-all-button {
        font-size: 3.5vw;
        padding: 1.5vh 0;
    }
}
</style>
