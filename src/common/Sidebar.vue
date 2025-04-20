<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'
import { useChatRoomListStore } from '@/stores/useChatRoomListStore'
import { useChatRoomStore } from '@/stores/useChatRoomStore'
import { stompClient } from "@/utils/webSocketClient.js"; // 메세지 송수신을 위한 stompClient 가져오기

const userStore = useUserStore()
const chatListStore = useChatRoomListStore()
const chatRoomStore = useChatRoomStore()
const route = useRoute()
const router = useRouter()
// 토큰 변수 설정
const token = ref(null)
const cookieToken = document.cookie.split('; ').find(row => row.startsWith('ATOKEN='))
if (cookieToken) token.value = cookieToken.split('=')[1]
// 세션 변수 설정
const loginUser = JSON.parse(sessionStorage.getItem('user'))?.user
const currentUserIdx = loginUser?.userIdx

// 로그인 상태 확인
const isLogin = computed(() => userStore.isLogin)

// 상태 정의
const state = reactive({
  activePanel: null,
  isSidebarCollapsed: false,
  activeChatRoom: null, // 채팅방 상세보기에서 선택된 채팅방
  activeChatRoomMessages: [], // 채팅방 상세보기에서 선택된 채팅방의 메세지 리스트
  activeRoomIdx: null,
  newMessage: ''
})

//사이드바 아이콘
const getIconUrl = (name) => {
  return new URL(`../assets/icons/${name}.png`, import.meta.url).href
}
//프로필 아이콘
const profileImgUrl = new URL('../assets/icons/profile.png', import.meta.url).href


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

      await chatRoomStore.fetchChatRoom(room.roomIdx, token);
  state.activeChatRoomMessages = chatRoomStore.formattedMessages;
  chatRoomStore.connectWebSocket(room.roomIdx, token); // 웹소켓 구독 연결
  nextTick(scrollToBottom); // 패널 채팅방 스크롤을 맨 아래로 이동

}

function backToChatList() {
  chatRoomStore.disconnectWebSocket(); // 웹소켓 연결 해제
  state.activeChatRoom = null;
  state.activeChatRoomMessages = [];
  state.newMessage = '';
}

function sendMessage() {
  if (!state.newMessage.trim() || !state.activeChatRoom || !stompClient?.connected) return;

  const payload = {
    roomIdx: state.activeRoomIdx,
    sendUserIdx: currentUserIdx,
    content: state.newMessage
  }
  try {
    if (typeof stompClient.publish === 'function') {
      stompClient.publish({
        destination: `/app/chat.send.${state.activeRoomIdx}`,
        body: JSON.stringify(payload)
      })
    } else {
      stompClient.send(`/app/chat.send.${state.activeRoomIdx}`, {}, JSON.stringify(payload))
    }
  } catch (error) {
    console.error('Error sending message:', error)
  }


  // state.activeChatRoomMessages.push(newMsg)
  state.newMessage = ''
  nextTick(scrollToBottom)
}

function scrollToBottom() {
  const el = document.querySelector('.chat-messages')
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}

function handleIncomingMessage(frame) {
  const message = JSON.parse(frame.body);
  const newMsg = {
    roomIdx: message.roomIdx,
    sender: message.userIdx,
    avatar: message.profileImageUrl,
    content: message.content,
    timestamp: new Date(message.createdAt),
    isMe: message.userIdx === currentUserIdx
  };
  if (message.roomIdx === state.activeRoomIdx) {
    state.activeChatRoomMessages.push(newMsg);
    nextTick(scrollToBottom);
  }
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



onMounted(() => {
  if (chatListStore.myRooms.length === 0) {
    chatListStore.fetchMyRooms()
  }
})
</script>

<template>
  <!-- 사이드 패널-->
  <transition name="slide">
    <div v-if="state.activePanel" class="hidden md:flex fixed top-[20%] right-[4%] h-2/3 w-80 bg-white shadow-lg z-40 rounded-l-xl flex flex-col overflow-hidden">
      <!-- 로그인 상태일 때 -->
      <div v-if="isLogin" class="flex flex-col h-full">
        <!-- 헤더 영역 -->
        <div class="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-purple-700 truncate">{{ getPanelTitle }}</h3>
          <button @click="closePanel" class="text-2xl text-gray-600 hover:text-purple-700 w-6 h-6 flex items-center justify-center">×</button>
        </div>
        <!-- 본문 - 콘텐츠 영역 -->
        <div class="flex-1 px-4 py-3 overflow-y-auto">
          <!-- 프로필(내정보) 패널 -->
          <div v-if="state.activePanel==='profile'" class="flex flex-col items-center">
            <!-- 프로필 사진-->
            <div class="w-16 h-16 rounded-full bg-purple-100 border border-purple-700 overflow-hidden mb-6 flex items-center justify-center">
              <img :src="profileImgUrl" alt="프로필" class="w-full h-full object-contain" />
            </div>
            <div class="text-lg font-semibold text-gray-800 mb-2">사용자</div>
            <div class="text-sm text-gray-600 mb-6">grapefield@example.com</div>
            <div class="flex flex-col gap-2 w-full">
              <!-- 프로필 (내정보) 메뉴 -->
              <router-link to="/mypage" class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded text-sm">내 정보 수정</router-link>
              <div class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded text-sm cursor-pointer">나의 예약 내역</div>
              <div class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded text-sm cursor-pointer">관심 이벤트</div>
              <div class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded text-sm cursor-pointer">알림 설정</div>
              <button @click="logout" class="border border-purple-700 text-purple-700 px-4 py-2 rounded text-sm hover:bg-purple-100 mt-4">로그아웃</button>
            </div>
          </div>
          <!-- 채팅 패널 -->
          <div v-else-if="state.activePanel==='chat'" class="flex flex-col h-full">
            <!-- 채팅방 목록 보기 -->
            <div v-if="!state.activeChatRoom" class="flex flex-col h-full">
              <!-- 채팅방 목록 -->
              <div class="text-sm font-semibold text-gray-800 mb-3 border-l-4 border-purple-700 pl-2">내 관심 채팅방</div>
              <div class="flex-1 overflow-y-auto space-y-2 mb-4">
                <div v-if="!favoriteChatRooms.length" class="text-center text-gray-500 text-sm">관심 등록된 채팅방이 없습니다.<br/>채팅 목록에서 관심 등록해보세요!</div>
                <!-- 채팅방 카드 -->
                <div v-for="room in chatListStore.myRooms" :key="room.roomIdx" @click="showChatRoom(room)" class="p-3 bg-purple-100 rounded hover:shadow cursor-pointer">
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-semibold text-gray-800 truncate w-2/3">{{ room.roomName }}</span>
                    <span :class="isLive(room.eventStartDate,room.eventEndDate)?'bg-red-500':'bg-gray-400'" class="text-xs text-white px-2 py-0.5 rounded-full">
                      {{ isLive(room.eventStartDate,room.eventEndDate)?'LIVE':'대기' }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-600 mb-1 truncate">{{ room.lastMessage || '최근 메시지가 없습니다.' }}</div>
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>{{ room.participantCount }}명 참여중</span>
                    <span>{{ formatDateRange(room.eventStartDate,room.eventEndDate) }}</span>
                  </div>
                </div>
              </div>
              <!-- 전체 채팅방 보기 버튼 -->
              <button @click="viewAllChatRoomsNewWindow" class="bg-purple-700 text-white py-2 rounded text-sm">전체 채팅방 보기</button>
            </div>
            <!-- 채팅방 상세 보기 (채팅화면) -->
            <div v-else class="flex flex-col h-full">
              <!-- 상세보기 헤더 -->
              <div class="flex items-center mb-2 pb-2 border-b">
                <!-- 뒤로가기 버튼 -->
                <button @click="backToChatList" class="text-purple-700 hover:bg-purple-100 px-2 py-1 rounded">←</button>
                <!-- 채팅방 제목 -->
                <div class="flex-1 text-sm font-semibold text-gray-800 text-center truncate">{{ chatRoomStore.roomTitle }}</div>
                <!-- 전체화면 버튼 (큰화면 링크) -->
                <button @click="openChatRoomNewWindow(state.activeChatRoom.roomIdx)" class="px-2 py-1 hover:bg-purple-100 rounded">
                  <img src="../assets/icons/expand.png" alt="전체화면" class="w-5 h-5 opacity-70" />
                </button>
              </div>
              <!-- 채팅 메세지 목록 -->
              <div class="flex-1 overflow-y-auto chat-messages space-y-3 mb-3">
                <div v-for="(msg,index) in state.activeChatRoomMessages" :key="index" :class="['flex', msg.isMe?'justify-end':'justify-start']">
                  <div v-if="!msg.isMe" class="w-8 h-8 rounded-full bg-purple-100 overflow-hidden mr-2">
                    <img :src="msg.avatar" alt="프로필" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex flex-col max-w-[70%]">
                    <div :class="msg.isMe? 'bg-purple-700 text-white':'bg-purple-100 text-gray-800'" class="px-3 py-2 rounded-lg text-sm break-words">{{ msg.content }}</div>
                    <div class="text-xs text-gray-400 mt-1" :class="msg.isMe?'text-left':'text-right'">{{ formatTime(msg.timestamp) }}</div>
                  </div>
                </div>
              </div>
              <!-- 메시지 입력 영역-->
              <div class="flex gap-2">
                <input v-model="state.newMessage" @keyup.enter="sendMessage" type="text" placeholder="메시지 입력..." class="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:border-purple-700" />
                <button @click="sendMessage" class="bg-purple-700 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-800">전송</button>
              </div>
            </div>
          </div>
          <!-- 캘린더 패널 -->
          <div v-else-if="state.activePanel==='calendar'" class="flex flex-col gap-2">
            <!-- 예시 일정 -->
            <div class="bg-purple-100 px-3 py-2 rounded text-sm">
              <div class="font-semibold text-purple-700">4월 15일</div>
              <div class="text-gray-800">뮤지컬 '햄릿' 예매 오픈</div>
            </div>
            <!-- 전체 일정 보기 버튼 -->
            <button @click="viewAllChatRoomsNewWindow" class="mt-2 bg-purple-700 text-white py-2 rounded text-sm hover:bg-purple-800">전체 일정 보기</button>
          </div>
          <!-- 관심(즐겨찾기) 패널 -->
          <div v-else-if="state.activePanel==='interest'" class="flex flex-col gap-2">
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
          <div v-else-if="state.activePanel==='history'" class="flex flex-col gap-2">
            <!-- 이력 항목 예시 -->
            <div class="bg-purple-100 px-3 py-2 rounded text-sm">
              <div class="font-semibold text-gray-800">전시 '현대미술전'</div>
              <div class="text-gray-600">방문일: 2025.03.15</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center h-full px-4 text-center">
        <p class="text-sm">로그인 후 사용해주세요.</p>
        <router-link :to="{ path:'/login', query:{ redirect:$route.fullPath }}" class="mt-4 border border-purple-700 text-purple-700 px-4 py-2 rounded hover:bg-purple-100 text-sm">로그인</router-link>
      </div>
    </div>
  </transition>

  <!-- 사이드바 접힘 버튼 -->
  <div v-if="state.isSidebarCollapsed" class="hidden md:flex fixed top-[45%] right-0 w-16 h-20 bg-purple-100 rounded-l-xl flex justify-center items-center cursor-pointer shadow-md hover:bg-purple-200 z-50" @click="toggleSidebar">
    <img src="../assets/icons/open.png" alt="열기" class="w-12 h-12" />
  </div>
  <!-- 사이드바 (세로 버튼메뉴 모음) -->
  <div v-show="!state.isSidebarCollapsed" class="hidden md:flex fixed top-[20%] right-0 z-40 h-2/3">
    <div class="w-16 min-w-[55px] bg-purple-100 flex flex-col rounded-l-xl shadow-md">
      <div class="flex flex-col gap-6 py-4 flex-1">
        <button v-for="panel in ['profile','chat','calendar','interest','history']" :key="panel" @click="togglePanel(panel)" :class="['flex justify-center items-center h-16 w-full', state.activePanel===panel?'bg-purple-700 text-white':'hover:bg-purple-200 text-gray-600']">
          <img :src="getIconUrl(panel)" :alt="panel" class="w-10 h-10" />
        </button>
      </div>
      <div class="h-px bg-gray-200 mx-2 my-2"></div>
      <button @click="toggleSidebar" class="flex justify-center items-center h-16 w-full hover:bg-purple-200 text-gray-600">
        <img src="../assets/icons/close.png" alt="닫기" class="w-10 h-10" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>