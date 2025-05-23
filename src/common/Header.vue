<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <div class="logo-image">
            <img alt="Logo" src="/logo.png" />
          </div>
        </router-link>
      </div>

      <nav class="main-nav">
        <ul class="nav-list px-1.5">
          <li class="nav-item">
            <router-link :class="{ 'router-link-active': isActive('/') }" class="truncate" to="/">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="{ 'router-link-active': isActive('/events') }" class="truncate" to="/events">공연/전시
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :class="{ 'router-link-active': isActive('/chat-list') }" class="truncate" to="/chat-list">채팅
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :class="{ 'router-link-active': isActive('/calendar_detail') }" class="truncate"
              to="/calendar_detail">캘린더
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- search-box-->
      <div class="search-box px-1.5 flex items-center gap-2">
        <input v-model="keyword" class="border px-2 py-1 rounded" placeholder="꽃의 비밀 🔍" type="text"
          @keyup.enter="SearchKeyword(keyword)" @keydown="handleKeyDown" />
        <button class="search-button" @click="SearchKeyword(keyword)">
          <div class="search-icon">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            </svg>
          </div>
        </button>
        <div v-if="showSuggestions && suggestions.length > 0"
          class="absolute top-full left-0 mt-1 w-64 bg-white border rounded shadow-lg z-50">
          <ul class="max-h-60 overflow-y-auto">
            <li v-for="(suggestion, index) in suggestions" :key="index" :class="['p-2 hover:bg-gray-100 cursor-pointer flex justify-between',
              { 'bg-purple-100': index === selectedIndex }]" @click="selectSuggestion(suggestion)">
              <span>{{ suggestion.title }}</span>

            </li>
          </ul>
        </div>
      </div>

      <!-- 로그인 상태별 UI -->
      <div class="flex items-center gap-2 px-1.5">
        <!-- ✅ 비로그인 -->
        <template v-if="!isLogin">
          <router-link :to="{ path: '/login', query: { redirect: $route.fullPath } }"
            class="text-sm text-gray-700 hover:underline truncate">
            로그인
          </router-link>
          <span class="text-gray-400">/</span>
          <router-link class="text-sm text-gray-700 hover:underline truncate" to="/signup">
            회원가입
          </router-link>
        </template>

        <!-- ✅ 로그인 -->
        <template v-else>
          <!-- 프로필 원형 버튼 -->
          <button class="w-8 h-8 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center">
            {{ userInitial }}
          </button>

          <!-- 알림 버튼 -->
          <div class="relative" @click="toggleDropdown">
            <button
              class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200">
              🔔
            </button>
            <span v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {{ unreadCount }}
            </span>

            <!-- 알림 목록 드롭다운 -->
            <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
              <div v-if="notifications.length === 0" class="p-4 text-sm text-gray-500 text-center">알림이 없습니다</div>
              <ul v-else class="max-h-80 overflow-y-auto"> <!-- 스크롤 가능하도록 최대 높이 설정 -->
                <li v-for="noti in notifications" :key="noti.idx"
                  class="p-3 border-b hover:bg-gray-50 cursor-pointer relative group">
                  <!-- 읽지 않은 알림 표시 -->
                  <div v-if="!noti.isRead"
                    class="absolute left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>

                  <!-- 휴지통 아이콘 (호버 시 표시) -->
                  <button
                    class="absolute right-2 pr-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    @click.stop="removeNotification(noti.idx)">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                  </button>

                  <!-- 알림 내용 (클릭 영역) -->
                  <div class="cursor-pointer" @click.stop="markAsRead(noti)">
                    <div :class="{ 'pl-4': !noti.isRead }" class="text-sm font-semibold">{{ noti.title }}</div>
                    <div :class="{ 'pl-4': !noti.isRead }" class="text-sm text-gray-700">{{ noti.message }}</div>
                    <div :class="{ 'pl-4': !noti.isRead }" class="text-xs text-gray-500 mt-1">{{ noti.formattedTime }}
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="notifications.length !== 0" class="p-2 border-t flex items-center justify-between">
                <button class="text-xs text-purple-600 hover:text-purple-800 ml-2" @click.stop="markAllAsRead">
                  모두 읽음으로 표시
                </button>
                <button class="text-xs text-red-400 hover:text-red-600 mr-2" @click.stop="removeAllNotifications">
                  (전체 삭제)
                </button>
              </div>
            </div>
          </div>

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
              <router-link class="text-gray-700 hover:underline whitespace-nowrap" to="/mypage">설정</router-link>
              <button class="text-red-500 hover:underline whitespace-nowrap" @click="logout">로그아웃</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import {ref, watch, onMounted, computed, onBeforeUnmount} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from '../stores/useUserStore'
import {useSearchStore} from '@/stores/useSearchStore'
import {disconnect, connect, subscribeToNotifications} from '@/utils/webSocketClient_notify'
import {useNotificationStore} from '@/stores/useNotificationStore';
import {useChatStore} from "@/stores/useChatStore.js";

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()
const notificationStore = useNotificationStore()
const chatStore = useChatStore() // 이거 추가!

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
  userStore.logout();
  router.push('/')
}

watch(isLogin, (loggedIn, prev) => {
      if (loggedIn) {
        // 로그인 시 알림 웹소켓 연결
        const username = getCurrentUsername();
        if (username) {
          connect(() => {
            notificationSubscription.value = subscribeToNotifications(username, onNotificationReceived);
            fetchNotifications();
          });
        } else {
          console.error('사용자 이름을 찾을 수 없습니다.');
        }
        chatStore.preloadJoinedRooms() // 이거 추가!
      } else {
        if (notificationSubscription.value) {
          notificationSubscription.value.unsubscribe();
        }
        // 로그아웃 시 웹소켓 연결 해제
        disconnect();
        chatStore.joinedRoomIds = [] // 이거 추가! x
      }
    },
    {
      immediate: false
    }
)


// 초기 경로 설정, 알림 웹소켓 연결
onMounted(() => {
  currentPath.value = route.path;
  // 로그인 상태인 경우에만 웹소켓 연결 시도
  if (userStore.isLogin) {
    const username = getCurrentUsername();
    if (username) {
      // 사용자 이름이 존재할 때만 웹소켓 연결
      connect(() => {
        // 알림 구독
        notificationSubscription.value = subscribeToNotifications(username, onNotificationReceived);
        // 기존 알림 목록 조회
        fetchNotifications();
      });
    } else {
      console.error('사용자 이름을 찾을 수 없습니다.');
    }
  }
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

const keyword = ref('')
const suggestions = ref([]);
const showSuggestions = ref(false);
const debounceTimeout = ref(null);
const isSelectingWithArrows = ref(false);

// 키워드 변경 감지하여 자동완성 호출
watch(keyword, (newKeyword) => {
  // 디바운스 처리 (타이핑 중 과도한 요청 방지)
  clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => {
    autocomple(newKeyword);
  }, 10); // 10ms 대기
});

const autocomple = async (input) => {
  console.log("자동완성 호출됨:", input);
  if (input && input.trim() !== '') {
    try {
      const response = await fetch(`/api/search/autocomplete?prefix=${encodeURIComponent(input)}`);
      const data = await response.json();
      console.log("자동완성 결과:", data);
      suggestions.value = data;
      showSuggestions.value = true;
    } catch (error) {
      console.error('자동완성 검색 오류:', error);
      suggestions.value = [];
    }
  } else {
    suggestions.value = [];
    showSuggestions.value = false;
    isSelectingWithArrows.value = false;
  }
}

// 선택한 제안으로 검색어 설정
const selectSuggestion = (suggestion) => {
  keyword.value = suggestion.title;
  // 선택 후 바로 검색 실행
  SearchKeyword(suggestion.title);
  showSuggestions.value = false;
  isSelectingWithArrows.value = false;
}

// 검색창 외부 클릭 시 제안 목록 닫기
const closeSuggestions = () => {
  showSuggestions.value = false;
  isSelectingWithArrows.value = false;
}


const SearchKeyword = (keyword) => {
  if (!keyword || keyword.trim() === '') {
    router.push({ path: '/community' })
  } else {
    searchStore.setTab("통합 검색")
    router.push({ path: '/search', query: { keyword } })
    // 검색 후 자동완성 닫기
    showSuggestions.value = false;
    isSelectingWithArrows.value = false;
  }
}

// 또는 handleKeyDown 함수 수정
const handleKeyDown = (e) => {
  if (!showSuggestions.value || suggestions.value.length === 0) return;

  if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isSelectingWithArrows.value) {
    isSelectingWithArrows.value = true;
    e.preventDefault();
    selectedIndex.value = e.key === 'ArrowDown' ? 0 : suggestions.value.length - 1;
    return;
  }

  if (isSelectingWithArrows.value) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex.value = (selectedIndex.value + 1) % suggestions.value.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        selectedIndex.value = selectedIndex.value <= 0 ? suggestions.value.length - 1 : selectedIndex.value - 1;
        break;
      case 'Enter':
        if (selectedIndex.value >= 0) {
          keyword.value = suggestions.value[selectedIndex.value].title;
          SearchKeyword(suggestions.value[selectedIndex.value].title);
          showSuggestions.value = false;
          isSelectingWithArrows.value = false;
        }
        break;
      case 'Escape':
        showSuggestions.value = false;
        isSelectingWithArrows.value = false;
        break;
    }
  }
};

//알림 관련 설정
const notifications = ref([]);
const unreadCount = ref(0);
const dropdownOpen = ref(false);
const notificationSubscription = ref(null);

// 현재 사용자 이름 가져오기
const getCurrentUsername = () => {
  //console.log('현재 사용자 userStore.username:', userStore.username);
  //console.log('현재 사용자 userStore.user:', userStore.user);
  //console.log('현재 사용자 이메일 userStore.user?.email:', userStore.user?.email);
  return userStore.user?.username || userStore.user?.email;
};

// 알림 수신 핸들러
const onNotificationReceived = (payload) => {
  const notification = JSON.parse(payload.body);

  // 알림 목록에 추가
  notifications.value.unshift(notification);

  // 읽지 않은 알림 카운트 증가
  unreadCount.value += 1;
};

// 알림 데이터 매핑 함수 추가
const mapNotification = (noti) => {
  return {
    id: noti.idx, // idx를 id로 매핑
    title: getNotificationTitle(noti),
    message: getNotificationMessage(noti),
    notificationTime: noti.notificationTime,
    isRead: noti.isRead
  };
};

// 알림 제목 생성
const getNotificationTitle = (noti) => {
  if (noti.scheduleType === 'EVENTS_INTEREST') {
    return '공연/전시 알림';
  } else if (noti.scheduleType === 'PERSONAL_SCHEDULE') {
    return '개인 일정 알림';
  }
  return '알림';
};

// 알림 메시지 생성
const getNotificationMessage = (noti) => {
  if (noti.notificationType === 'BEFORE_10MIN') {
    return '10분 후 일정이 있습니다.';
  } else if (noti.notificationType === 'BEFORE_1HOUR') {
    return '1시간 후 일정이 있습니다.';
  } else if (noti.notificationType === 'DAY_9AM') {
    return '오늘 일정이 있습니다.';
  }
  return '새 알림이 있습니다.';
};

// 기존 알림 목록 조회
const fetchNotifications = async () => {
  try {
    //모든 알림 가져오기
    const response = await notificationStore.fetchAvailableNotifications();
    if (response && Array.isArray(response)) {
      notifications.value = response;

      //읽지 않은 알림만 필터링
      unreadCount.value = response.filter(noti => !noti.isRead).length;
    } else {
      notifications.value = [];
      unreadCount.value = 0;
    }
  } catch (error) {
    console.error("알림 목록 조회 오류:", error);
    notifications.value = [];
    unreadCount.value = 0;
  }
};

// 알림 읽음 처리
const markAsRead = async (notification) => {
  if (!notification.isRead) {
    const response = await notificationStore.markAsRead(notification.idx);
    if (response) {
      notification.isRead = true;
      unreadCount.value = Math.max(0, unreadCount.value - 1);
    }
  }
};

// 모든 알림 읽음 처리
const markAllAsRead = async () => {
  try {
    const response = await notificationStore.markAllAsRead();
    if (response) {
      // 알림이 있을 때만 처리
      if (notifications.value && notifications.value.length > 0) {
        notifications.value.forEach((noti) => {
          noti.isRead = true;
        });
        unreadCount.value = 0;
      }
    }
  } catch (error) {
    console.error('모든 알림 읽음 처리 중 오류 발생:', error);
  }
};

// 알림 삭제(소프트)
const removeNotification = async (notificationIdx) => {
  try {
    const response = await notificationStore.removeNotification(notificationIdx);
    if (response) {
      // 삭제 성공 시 화면에서도 해당 알림 제거
      const removedNotification = notifications.value.find(noti => noti.idx === notificationIdx);

      // 배열에서 해당 알림 제거
      notifications.value = notifications.value.filter(noti => noti.idx !== notificationIdx);

      // 읽지 않은 알림이었다면 카운트도 감소
      if (removedNotification && !removedNotification.isRead) {
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
    }
  } catch (error) {
    console.error("알림 삭제 실패", error);
  }
}

const removeAllNotifications = async () => {
  try {
    const response = await notificationStore.removeAll();
    if (response) {
      notifications.value = []
      unreadCount.value = 0
    }
  } catch (e) {
    console.error('전체 삭제 실패:', e)
  }
}
// 드롭다운 토글
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// 날짜/시간 포맷팅
const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

// 컴포넌트 언마운트 시 구독 해제
onBeforeUnmount(() => {
  if (notificationSubscription.value) {
    notificationSubscription.value.unsubscribe();
  }
  disconnect();

});

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

/* search-box 관련 스타일 수정 */
.search-box {
  margin-right: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
}

.search-box input {
  padding: 0.5rem 1rem;
  padding-right: 2.5rem;
  /* 검색 버튼을 위한 여백 추가 */
  border: 0.07rem solid #e0e0e0;
  border-radius: 1.5rem;
  background-color: #f5f0ff;
  width: 20rem;
  font-size: 0.9rem;
}

/* 새로 추가된 검색 버튼 스타일 */
.search-button {
  position: absolute;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #7c4dff;
  /* 보라색 배경 */
  cursor: pointer;
  text-decoration: none;
}

.search-icon {
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon svg {
  width: 100%;
  height: 100%;
  stroke: #ffffff;
  /* 흰색 아이콘 */
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