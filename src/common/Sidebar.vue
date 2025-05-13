<script setup>
import { ref, reactive, computed, onMounted, nextTick, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'
import { useChatRoomListStore } from '@/stores/useChatRoomListStore'
import { useChatRoomStore } from '@/stores/useChatRoomStore'
import { useCalendarStore } from '@/stores/useCalendarStore'
import { useEventsStore } from '@/stores/useEventsStore'
import { connectSocket, subscribeTopic, unsubscribeTopic } from '@/utils/socketService'
// import {connect, stompClient} from "@/utils/webSocketClient.js"; // 메세지 송수신을 위한 stompClient 가져오기

const userStore = useUserStore()
const chatListStore = useChatRoomListStore()
const chatRoomStore = useChatRoomStore()
const calendarStore = useCalendarStore();
const eventsStore = useEventsStore();
let userListSubscription = null

const route = useRoute()
const router = useRouter()
const chatBody = ref(null)
// let subscription = null

// 세션 변수 설정
const currentUserIdx = computed(() => userStore.userDetail?.userIdx)

// 로그인 상태 확인
const isLogin = computed(() => userStore.isLogin)

// 상태 정의
const state = reactive({
  activePanel: null,
  isSidebarCollapsed: false,
  activeChatRoom: null, // 채팅방 상세보기에서 선택된 채팅방
  activeChatRoomMessages: [], // 채팅방 상세보기에서 선택된 채팅방의 메세지 리스트
  activeRoomIdx: null,
  // newMessage: ''
})

//사이드바 아이콘
// const getIconUrl = (name) => {
//   return new URL(`/assets/icons/${name}.png`, import.meta.url).href
// }
const getIconUrl = (name) => `/assets/icons/${name}.png`

//프로필 아이콘
const profileImgUrl = new URL('/assets/icons/profile.png', import.meta.url).href


// 패널 제목 계산
const getPanelTitle = computed(() => {
  switch (state.activePanel) {
    case 'profile':
      return '프로필'
    case 'chat':
      return state.activeChatRoom ? state.activeChatRoom.roomName : '채팅'
    case 'calendar':
      return '캘린더'
    case 'interest':
      return '관심목록'
    case 'history':
      return '히스토리'
    default:
      return ''
  }
})

// 내가 참여한 채팅방
const favoriteChatRooms = computed(() => {
  return chatListStore.myRooms.slice(0, 5)
})


// 패널 토글
function togglePanel(panelName) {
  if (state.activePanel === panelName) {
    state.activePanel = null
    state.activeChatRoom = null
  } else {
    state.activePanel = panelName
    state.activeChatRoom = null
  }
}

function closePanel() {
  state.activePanel = null
  state.activeChatRoom = null
}

function toggleSidebar() {
  state.isSidebarCollapsed = !state.isSidebarCollapsed
  if (state.isSidebarCollapsed) closePanel()
  localStorage.setItem('sidebarCollapsed', state.isSidebarCollapsed)
}

async function showChatRoom(room) {
  state.activeChatRoom = room;
  state.activeChatRoomMessages = [];
  state.activePanel = 'chat';
  state.activeRoomIdx = room.roomIdx;

  await chatRoomStore.connectWebSocket(room.roomIdx);
  await chatRoomStore.fetchChatRoom(room.roomIdx, chatBody);
  state.activeChatRoomMessages = chatRoomStore.formattedMessages;
  await nextTick(() => {
    chatRoomStore.initialScroll(chatBody.value)
  }); // 패널 채팅방 스크롤을 맨 아래로 이동

}

function backToChatList() {
  chatRoomStore.disconnectWebSocket(); // 웹소켓 연결 해제
  state.activeChatRoom = null;
}

function sendMessage() {
  chatRoomStore.sendMessage(state.activeRoomIdx);
}

/*
function getRandomResponse() {
  const responses = [
    '네, 지금 공연장 분위기가 정말 좋습니다!',
    '메인 홀 우측이 잘 보이는 것 같아요.',
    '인터미션 시간에는 카페에서 특별 음료도 판매한대요.',
    '주차는 B2층이 비교적 자리가 많이 남아있습니다.',
    '오늘 특별 게스트도 온다는 소문이 있어요!',
    '프로그램 북을 꼭 받아가세요, 배우들 인터뷰가 실려있습니다.',
    '공연 후 사인회는 로비에서 진행된다고 합니다.'
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}*/

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function openChatRoomNewWindow(id) {
  const baseUrl = window.location.origin
  const routeUrl = `${baseUrl}/chat-room/${id}`
  window.open(routeUrl, '_blank')
}

function viewAllChatRoomsNewWindow() {
  const baseUrl = window.location.origin
  const routeUrl = `${baseUrl}/chat-list`
  window.open(routeUrl, '_blank')
}

//캘린더 목록
const calendarInfo = ref();
const loadPlan = async () => {
  const today = new Date();
  const year = ref(today.getFullYear())
  const month = ref(today.getMonth() + 1)
  const targetDate = new Date(year.value, month.value, 1)
  const isoDateString = targetDate.toISOString().slice(0, 19)

  try {
    const result = await calendarStore.getAllSchedule(isoDateString)
    calendarInfo.value = result;
  } catch (error) {
    console.error("캘린더 데이터 로딩 오류:", error)
  }
};

//방문기록
const eventVisits = computed(() => eventsStore.eventVisits);
// 개별 항목 삭제
function removeEventVisit(eventIdx) {
  eventsStore.removeEventVisit(eventIdx);
}

// 모든 항목 삭제
function clearEventVisits() {
  if (confirm('모든 방문 기록을 삭제하시겠습니까?')) {
    eventsStore.clearEventVisits();
  }
}

function formatDate(timestamp) {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

// 로그아웃 처리
const logout = () => {
  userStore.user = null
  userStore.isLogin = false
  showMenu.value = false
  router.push('/')
}

// live:대기중 함수
function isLive(start, end) {
  if (!start || !end) return false;
  const now = new Date();
  return new Date(start) <= now && now <= new Date(end);
}

// 포맷 데이터 함수 추가
function formatDateRange(start, end) {
  if (!start || !end) return ''
  const s = new Date(start)
  const e = new Date(end)
  return `${s.getFullYear()}.${(s.getMonth() + 1).toString().padStart(2, '0')}.${s.getDate().toString().padStart(2, '0')} - ${e.getFullYear()}.${(e.getMonth() + 1).toString().padStart(2, '0')}.${e.getDate().toString().padStart(2, '0')}`
}


onMounted(async() => {
  if (userStore.isLogin === true) {
    loadPlan();
    eventsStore.loadEventVisits();
  }
  // 내가 참여 중인 채팅방 리스트 (로그인 상태에서만 호출)
  if (userStore.isLogin && chatListStore.myRooms.length === 0) {
    chatListStore.fetchMyRooms()
  }
  // 로그인한 사용자 상세정보 (사이드바용)
  if (userStore.isLogin && !userStore.userDetail) {
    userStore.fetchUserDetail()
  }
  if (userStore.isLogin && currentUserIdx.value) {
    try {
      await connectSocket()
      
      // 사용자별 채팅방 리스트 업데이트 구독
      userListSubscription = subscribeTopic(
        `/topic/user/${currentUserIdx.value}/chatlist`,
        (message) => {
          const data = JSON.parse(message.body)
          console.log('📋 채팅방 리스트 업데이트:', data)
          
          if (data.action === 'JOIN' || data.action === 'LEAVE') {
            // 채팅방 목록 새로고침
            chatListStore.fetchMyRooms()
          }
        }
      )
      console.log('✅ 사이드바 웹소켓 구독 완료')
    } catch (error) {
      console.error('❌ 사이드바 웹소켓 연결 실패:', error)
    }
  }
})

watch(() => userStore.isLogin, async (newValue) => {
  if (newValue === true) { // 로그인 상태가 true로 변경되었을 때
    loadPlan();
    eventsStore.loadEventVisits();

    if (chatListStore.myRooms.length === 0) {
      chatListStore.fetchMyRooms();
    }

    if (!userStore.userDetail) {
      userStore.fetchUserDetail();
    }
    if (currentUserIdx.value) {
      try {
        await connectSocket()
        
        userListSubscription = subscribeTopic(
          `/topic/user/${currentUserIdx.value}/chatlist`,
          (message) => {
            const data = JSON.parse(message.body)
            console.log('📋 채팅방 리스트 업데이트:', data)
            
            if (data.action === 'JOIN' || data.action === 'LEAVE') {
              chatListStore.fetchMyRooms()
            }
          }
        )
        console.log('✅ 사이드바 웹소켓 구독 완료 (watch)')
      } catch (error) {
        console.error('❌ 사이드바 웹소켓 연결 실패 (watch):', error)
      }
    }
  } else {
    // ✅ 로그아웃 시 구독 해제
    if (userListSubscription) {
      unsubscribeTopic(userListSubscription)
      userListSubscription = null
    }
  }
})
onBeforeUnmount(() => {
  // 구독 해제
  if (userListSubscription) {
    unsubscribeTopic(userListSubscription)
    userListSubscription = null
  }
})


</script>

<template>
  <!-- 사이드 패널-->
  <transition name="slide">
    <div v-if="state.activePanel"
      class="hidden md:flex fixed top-[20%] right-[4%] h-2/3 w-80 bg-white shadow-lg z-40 rounded-l-xl flex flex-col overflow-hidden">
      <!-- 로그인 상태일 때 -->
      <div v-if="isLogin" class="flex flex-col h-full">
        <!-- 헤더 영역 -->
        <div class="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-purple-700 truncate">{{ getPanelTitle }}</h3>
          <button class="text-2xl text-gray-600 hover:text-purple-700 w-6 h-6 flex items-center justify-center"
            @click="closePanel">×
          </button>
        </div>
        <!-- 본문 - 콘텐츠 영역 -->
        <div class="flex-1 px-4 py-3 overflow-y-auto">
          <!-- 프로필(내정보) 패널 -->
          <div v-if="state.activePanel === 'profile'" class="flex flex-col items-center">
            <!-- 프로필 사진-->
            <div
              class="w-16 h-16 rounded-full bg-purple-100 border border-purple-700 overflow-hidden mb-6 flex items-center justify-center">
              <img :src="profileImgUrl" @click="$router.push('/mypage')" alt="프로필"
                class="w-full h-full object-contain" />
            </div>
            <div class="text-lg font-semibold text-gray-800 mb-2">{{ userStore.username }}</div>
            <div class="text-sm text-gray-600 mb-6">{{ userStore.email }}</div>
            <div class="flex flex-col gap-2 w-full">
              <!-- 프로필 (내정보) 메뉴 -->
              <router-link class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded text-sm"
                to="/mypage">내 정보
              </router-link>
              <router-link :to="{ path: '/mypage', query: { menu: 'contents' } }"
                class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded text-sm">
                게시글 관리
              </router-link>
              <router-link :to="{ path: '/mypage', query: { menu: 'calender' } }"
                class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded text-sm">
                캘린더
              </router-link>
              <router-link :to="{ path: '/mypage', query: { menu: 'favorite' } }"
                class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded text-sm">
                즐겨찾기
              </router-link>
              <button
                class="border border-purple-700 text-purple-700 px-4 py-2 rounded text-sm hover:bg-purple-100 mt-4"
                @click="logout">
                로그아웃
              </button>
            </div>
          </div>
          <!-- 채팅 패널 -->
          <div v-else-if="state.activePanel === 'chat'" class="flex flex-col h-full">
            <!-- 채팅방 목록 보기 -->
            <div v-if="!state.activeChatRoom" class="flex flex-col h-full">
              <!-- 채팅방 목록 -->
              <div class="text-sm font-semibold text-gray-800 mb-3 border-l-4 border-purple-700 pl-2">내 관심 채팅방</div>
              <div class="flex-1 overflow-y-auto space-y-2 mb-4">
                <div v-if="!favoriteChatRooms.length" class="text-center text-gray-500 text-sm">관심 등록된 채팅방이
                  없습니다.<br />채팅
                  목록에서 관심 등록해보세요!
                </div>
                <!-- 채팅방 카드 -->
                <div v-for="room in chatListStore.myRooms" :key="room.roomIdx"
                  class="p-3 bg-purple-100 rounded hover:shadow cursor-pointer" @click="showChatRoom(room)">
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-semibold text-gray-800 truncate w-2/3">{{ room.roomName }}</span>
                    <span :class="isLive(room.eventStartDate, room.eventEndDate) ? 'bg-red-500' : 'bg-gray-400'"
                      class="text-xs text-white px-2 py-0.5 rounded-full">
                      {{ isLive(room.eventStartDate, room.eventEndDate) ? 'LIVE' : '대기' }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-600 mb-1 truncate">{{ room.lastMessage || '최근 메시지가 없습니다.' }}</div>
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>{{ room.participantCount }}명 참여중</span>
                    <span>{{ formatDateRange(room.eventStartDate, room.eventEndDate) }}</span>
                  </div>
                </div>
              </div>
              <!-- 전체 채팅방 보기 버튼 -->
              <button class="bg-purple-700 text-white py-2 rounded text-sm" @click="viewAllChatRoomsNewWindow">전체 채팅방
                보기
              </button>
            </div>
            <!-- 채팅방 상세 보기 (채팅화면) -->
            <div v-else class="flex flex-col h-full">
              <!-- 상세보기 헤더 -->
              <div class="flex items-center mb-2 pb-2 border-b">
                <!-- 뒤로가기 버튼 -->
                <button class="text-purple-700 hover:bg-purple-100 px-2 py-1 rounded" @click="backToChatList">←</button>
                <!-- 채팅방 제목 -->
                <div class="flex-1 text-sm font-semibold text-gray-800 text-center truncate">{{
                  chatRoomStore.roomTitle
                  }}
                </div>
                <!-- 전체화면 버튼 (큰화면 링크) -->
                <button class="px-2 py-1 hover:bg-purple-100 rounded"
                  @click="openChatRoomNewWindow(state.activeChatRoom.roomIdx)">
                  <img alt="전체화면" class="w-5 h-5 opacity-70" src="/assets/icons/expand.png" />
                </button>
              </div>
              <!-- 채팅 메세지 목록 -->
              <div ref="chatBody" class="flex-1 overflow-y-auto space-y-3 mb-3">
                <transition-group>
                  <div v-for="(msg, idx) in chatRoomStore.formattedMessages" :key="msg.idx"
                    :class="['flex', msg.isMe ? 'justify-end' : 'justify-start']">
                    <div v-if="!msg.isMe" class="w-8 h-8 rounded-full bg-purple-100 overflow-hidden mr-2">
                      <img :src="msg.avatar" alt="프로필" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex flex-col max-w-[70%]">
                      <div :class="msg.isMe ? 'bg-purple-700 text-white' : 'bg-purple-100 text-gray-800'"
                        class="px-3 py-2 rounded-lg text-sm break-words">{{ msg.content }}
                      </div>
                      <div :class="msg.isMe ? 'text-left' : 'text-right'" class="text-xs text-gray-400 mt-1">
                        {{ formatTime(msg.timestamp) }}
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
              <!-- 메시지 입력 영역-->
              <div class="flex gap-2">
                <input v-model="chatRoomStore.newMessage"
                  class="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:border-purple-700"
                  placeholder="메시지 입력..." type="text" @keyup.enter="sendMessage" />
                <button class="bg-purple-700 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-800"
                  @click="sendMessage">전송
                </button>
              </div>
            </div>
          </div>
          <!-- 캘린더 패널 -->
          <div v-else-if="state.activePanel === 'calendar'" class="flex flex-col gap-2">
            <!-- 일정 목록 -->
            <router-link :to="{ path: '/mypage', query: { menu: 'calender' } }">
              <div v-if="calendarInfo">
                <!-- 이벤트 일정 -->
                <div v-for="item in calendarInfo.event" :key="'event-' + item.idx"
                  class="bg-purple-100 px-3 py-2 rounded text-sm mb-2">
                  <div class="font-semibold text-purple-700">{{ item.startDate }}</div>
                  <div class="text-gray-800">{{ item.title }}</div>
                </div>

                <!-- 개인 일정 -->
                <div v-for="item in calendarInfo.personal" :key="'personal-' + item.idx"
                  class="bg-blue-100 px-3 py-2 rounded text-sm mb-2">
                  <div class="font-semibold text-blue-700">{{ item.startDate }}</div>
                  <div class="text-gray-800">{{ item.title }}</div>
                  <div class="text-gray-600">{{ item.description }}</div>
                </div>
              </div>
            </router-link>
            <!-- 전체 일정 보기 버튼 -->
            <button class="mt-2 bg-purple-700 text-white py-2 rounded text-sm hover:bg-purple-800">
              <router-link :to="{ path: '/mypage', query: { menu: 'calender' } }">전체 일정 보기</router-link>
            </button>
          </div>
          <!-- 관심(즐겨찾기) 패널 -->
          <div v-else-if="state.activePanel === 'interest'" class="flex flex-col gap-2">
            <div class="flex gap-2">
              <button class="bg-purple-700 text-white px-3 py-2 rounded text-sm">공연</button>
              <button class="bg-gray-100 text-gray-800 px-3 py-2 rounded text-sm">전시</button>
              <button class="bg-gray-100 text-gray-800 px-3 py-2 rounded text-sm">콘서트</button>
            </div>
            <div class="flex flex-col gap-2">
              <!-- 관심 항목 예시 -->
              <div class="bg-purple-100 px-3 py-2 rounded text-sm">
                <div class="font-semibold text-gray-800">뮤지컬 '햄릿'</div>
                <div class="text-gray-600">2025.05.01 - 2025.06.30</div>
              </div>
            </div>
          </div>
          <!-- History Panel -->
          <div v-else-if="state.activePanel === 'history'" class="flex flex-col gap-2">
            <!-- 방문 기록이 있는 경우 -->
            <div v-if="eventVisits.length > 0">
              <div v-for="visit in eventVisits" :key="visit.idx"
                class="bg-purple-100 px-3 py-2 rounded text-sm mb-2 flex justify-between items-start">
                <div>
                  <router-link :to="`/events/${visit.idx}`" :key="visit.idx"
                    class="font-semibold text-gray-800 hover:text-purple-700">
                    {{ visit.title }}
                  </router-link>
                  <div class="text-gray-600">방문일: {{ formatDate(visit.timestamp) }}</div>
                </div>

                <!-- 개별 삭제 버튼 -->
                <button @click.prevent="removeEventVisit(visit.idx)" class="text-gray-500 hover:text-red-500 p-1"
                  title="방문 기록 삭제">
                  <span class="text-sm">×</span>
                </button>
              </div>
            </div>

            <!-- 방문 기록이 없는 경우 -->
            <div v-else class="text-gray-500 text-center py-4">
              방문 기록이 없습니다.
            </div>

            <!-- 방문 기록 모두 지우기 버튼 -->
            <button v-if="eventVisits.length > 0" @click="clearEventVisits"
              class="mt-2 bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm hover:bg-gray-300">
              모든 방문 기록 지우기
            </button>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center h-full px-4 text-center">
        <p class="text-sm">로그인 후 사용해주세요.</p>
        <router-link :to="{ path: '/login', query: { redirect: $route.fullPath } }"
          class="mt-4 border border-purple-700 text-purple-700 px-4 py-2 rounded hover:bg-purple-100 text-sm">
          로그인
        </router-link>
      </div>
    </div>
  </transition>

  <!-- 사이드바 접힘 버튼 -->
  <div v-if="state.isSidebarCollapsed"
    class="hidden md:flex fixed top-[45%] right-0 w-16 h-20 bg-purple-100 rounded-l-xl flex justify-center items-center cursor-pointer shadow-md hover:bg-purple-200 z-50"
    @click="toggleSidebar">
    <img alt="열기" class="w-12 h-12" src="/assets/icons/open.png" />
  </div>
  <!-- 사이드바 (세로 버튼메뉴 모음) -->
  <div v-show="!state.isSidebarCollapsed" class="hidden md:flex fixed top-[20%] right-0 z-40 h-2/3">
    <div class="w-16 min-w-[55px] bg-purple-100 flex flex-col rounded-l-xl shadow-md">
      <div class="flex flex-col gap-6 py-4 flex-1">
        <button v-for="panel in ['profile', 'chat', 'calendar', 'interest', 'history']" :key="panel"
          :class="['flex justify-center items-center h-16 w-full', state.activePanel === panel ? 'bg-purple-700 text-white' : 'hover:bg-purple-200 text-gray-600']"
          @click="togglePanel(panel)">
          <img :alt="panel" :src="getIconUrl(panel)" class="w-10 h-10" />
        </button>
      </div>
      <div class="h-px bg-gray-200 mx-2 my-2"></div>
      <button class="flex justify-center items-center h-16 w-full hover:bg-purple-200 text-gray-600"
        @click="toggleSidebar">
        <img alt="닫기" class="w-10 h-10" src="/assets/icons/close.png" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>