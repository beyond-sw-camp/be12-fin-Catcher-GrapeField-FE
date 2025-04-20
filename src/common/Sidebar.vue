<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'
import { useChatRoomListStore } from '@/stores/useChatRoomListStore'

const userStore = useUserStore()
const chatListStore = useChatRoomListStore()
const route = useRoute()
const router = useRouter()

// 로그인 상태 확인
const isLogin = computed(() => userStore.isLogin)

// 상태 정의
const state = reactive({
  activePanel: null,
  isSidebarCollapsed: false,
  // chatRooms: [],
  activeChatRoom: null,
  activeChatRoomMessages: [],
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
      return state.activeChatRoom ? state.activeChatRoom.title : '채팅'
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
  if (state.isSidebarCollapsed) {
    state.activePanel = null
    state.activeChatRoom = null
  }
  localStorage.setItem('sidebarCollapsed', state.isSidebarCollapsed)
}



function showChatRoom(room) {
  state.activeChatRoom = room
  state.activeChatRoomMessages = room.messages.map(msg => ({
    ...msg,
    timestamp: new Date(msg.timestamp)
  }))
  nextTick(scrollToBottom)
}

function backToChatList() {
  state.activeChatRoom = null
  state.activeChatRoomMessages = []
  state.newMessage = ''
}

function sendMessage() {
  if (!state.newMessage.trim() || !state.activeChatRoom) return

  const newMsg = {
    id: Date.now(),
    sender: '나',
    content: state.newMessage,
    timestamp: new Date(),
    isMe: true
  }

  state.activeChatRoomMessages.push(newMsg)
  state.newMessage = ''

  nextTick(scrollToBottom)

  setTimeout(() => {
    const autoResponse = {
      id: Date.now() + 1,
      sender: '관람객' + (Math.floor(Math.random() * 10) + 1),
      content: getRandomResponse(),
      timestamp: new Date(),
      avatar: `../assets/icons/profile.png`,
      isMe: false
    }
    state.activeChatRoomMessages.push(autoResponse)
    nextTick(scrollToBottom)
  }, 1000)
}

function scrollToBottom() {
  const el = document.querySelector('.chat-messages')
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}

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
}

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
  <div class="relative w-full h-full">
    <!-- 사이드 패널 -->
    <transition name="slide">
      <div v-if="state.activePanel"
           class="fixed top-[20vh] right-[4vw] h-[60vh] w-[22vw] bg-white shadow-lg z-40 rounded-l-xl flex flex-col overflow-hidden max-md:hidden">

        <!-- 로그인 상태일 때 -->
        <div v-if="isLogin">

          <!-- 헤더 영역 -->
          <div class="flex justify-between items-center px-[1.2vw] py-[1.2vh] border-b border-gray-200 bg-white">
            <h3 class="text-[1.2vw] font-semibold text-purple-700 truncate">
              {{ getPanelTitle }}
            </h3>
            <button
                class="text-[1.8vw] text-gray-600 hover:text-purple-700 w-[1.8vw] h-[1.8vw] flex items-center justify-center"
                @click="closePanel">
              ×
            </button>
          </div>

          <!-- 본문 콘텐츠 영역 -->
          <div class="flex flex-col px-[1.2vw] py-[1.5vh] h-full overflow-y-auto">

            <!-- 🔹 프로필 패널 -->
            <div v-if="state.activePanel === 'profile'" class="flex flex-col items-center">
              <!-- 프로필 사진 -->
              <div
                  class="w-[5vw] h-[5vw] rounded-full bg-purple-100 border border-purple-700 overflow-hidden mb-[1.5vh] flex justify-center items-center">
                <img :src="profileImgUrl" alt="사용자 프로필" class="w-full h-full object-contain" />
              </div>
              <div class="text-[1.2vw] font-semibold text-gray-800 mb-[0.8vh]">사용자</div>
              <div class="text-[1vw] text-gray-600 mb-[2.5vh]">grapefield@example.com</div>

              <!-- 프로필 메뉴 -->
              <div class="flex flex-col gap-[1vh] w-full">
                <router-link to="/mypage"
                             class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-[1vw] py-[1.2vh] rounded-md text-[1.1vw]">
                  내 정보 수정
                </router-link>
                <div
                    class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-[1vw] py-[1.2vh] rounded-md text-[1.1vw] cursor-pointer">
                  나의 예약 내역
                </div>
                <div
                    class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-[1vw] py-[1.2vh] rounded-md text-[1.1vw] cursor-pointer">
                  관심 이벤트
                </div>
                <div
                    class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-[1vw] py-[1.2vh] rounded-md text-[1.1vw] cursor-pointer">
                  알림 설정
                </div>
                <button @click="logout"
                        class="border border-purple-700 mt-[1vh] text-purple-700 px-[1vw] py-[1.2vh] rounded-md text-[1.1vw] cursor-pointer hover:bg-purple-100">
                  로그아웃
                </button>
              </div>
            </div>

            <!-- 채팅 패널 -->
            <div v-if="state.activePanel === 'chat'" class="flex flex-col h-full">

              <!-- 채팅방 목록 보기 -->
              <div v-if="!state.activeChatRoom" class="flex flex-col h-full">
                <div
                    class="text-[1.1vw] font-semibold text-gray-800 mb-[1.2vh] border-l-4 border-purple-700 pl-[0.8vw]">
                  내 관심 채팅방
                </div>

                <!-- 채팅방 리스트 -->
                <div class="flex flex-col gap-[1vh] mb-[1.5vh] flex-1 overflow-y-auto">
                  <div v-if="favoriteChatRooms.length === 0" class="text-center text-gray-500 text-[0.9vw]">
                    <p>관심 등록된 채팅방이 없습니다.</p>
                    <p>채팅 목록에서 관심 채팅방을 추가해보세요!</p>
                  </div>

                  <!-- 채팅방 카드 -->
                  <div
                      v-for="room in chatListStore.myRooms"
                      :key="room.roomIdx"
                      class="bg-purple-100 px-[1vw] py-[1.2vh] rounded-md cursor-pointer hover:shadow-md transition-all"
                      @click="showChatRoom(room)"
                  >
                    <div class="flex justify-between items-center mb-[0.6vh]">
                      <div
                          class="text-[1.1vw] font-semibold text-gray-800 truncate"
                      >
                        {{ room.roomName }}
                      </div>
                      <div
                          :class="
                          isLive(room.eventStartDate, room.eventEndDate)
                            ? 'bg-red-500'
                            : 'bg-gray-400'
                        "
                          class="text-white text-[0.7vw] px-[0.4vw] py-[0.2vh] rounded-full font-semibold"
                      >
                        {{
                          isLive(room.eventStartDate, room.eventEndDate)
                              ? "LIVE"
                              : "대기"
                        }}
                      </div>
                    </div>

                    <div class="text-[0.9vw] text-gray-600 truncate mb-[0.8vh]">
                      {{ room.lastMessage || "최근 메시지가 없습니다." }}
                    </div>

                    <div
                        class="flex justify-between text-[0.8vw] text-gray-500"
                    >
                      <div>{{ room.participantCount }}명 참여중</div>
                      <div>
                        {{
                          formatDateRange(
                              room.eventStartDate,
                              room.eventEndDate
                          )
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 전체 채팅방 보기 버튼 -->
                <div
                    class="mt-auto bg-purple-700 text-white text-center py-[1vh] rounded-md text-[1vw] cursor-pointer hover:bg-purple-800"
                    @click="viewAllChatRoomsNewWindow">
                  전체 채팅방 보기
                </div>
              </div>

              <!-- 채팅방 상세 보기 -->
              <div v-else class="flex flex-col h-full">
                <!-- 채팅방 헤더 -->
                <div class="flex items-center gap-[0.8vw] mb-[1vh] pb-[1vh] border-b border-gray-300">
                  <button class="text-[1.3vw] text-purple-700 hover:bg-purple-100 px-[0.6vw] py-[0.4vh] rounded"
                          @click="backToChatList">←
                  </button>
                  <div class="flex-1 text-[1.1vw] font-semibold text-gray-800 truncate">
                    {{ state.activeChatRoom.title }}
                  </div>
                  <button class="hover:bg-purple-100 px-[0.6vw] py-[0.4vh] rounded"
                          @click="openChatRoomNewWindow(state.activeChatRoom.roomIdx)">
                    <img src="../assets/icons/expand.png" alt="전체화면" class="w-[1.2vw] h-[1.2vw] opacity-70" />
                  </button>
                </div>

                <!-- 채팅 메시지 목록 -->
                <div class="flex-1 overflow-y-auto space-y-[1vh] mb-[1vh]">
                  <div v-for="(message, index) in state.activeChatRoomMessages" :key="index"
                       :class="['flex gap-[0.6vw]', message.isMe ? 'flex-row-reverse' : '']">
                    <div v-if="!message.isMe"
                         class="w-[2vw] h-[2vw] rounded-full bg-purple-100 overflow-hidden flex-shrink-0">
                      <img src="/src/assets/icons/participant.png" alt="프로필" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex flex-col max-w-[80%]">
                      <div v-if="!message.isMe" class="text-[0.8vw] text-gray-600 mb-[0.2vh]">{{ message.sender }}</div>
                      <div :class="message.isMe ? 'bg-purple-700 text-white' : 'bg-purple-100 text-gray-800'"
                           class="px-[1vw] py-[0.8vh] rounded-lg text-[0.95vw]">
                        {{ message.content }}
                      </div>
                      <div class="text-[0.7vw] text-gray-400 mt-[0.3vh]"
                           :class="message.isMe ? 'self-start' : 'self-end'">
                        {{ formatTime(message.timestamp) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 메시지 입력 영역 -->
                <div class="flex gap-[0.8vw] mt-auto">
                  <input type="text" v-model="state.newMessage" placeholder="메시지 입력..."
                         class="flex-1 px-[1vw] py-[0.8vh] border border-gray-300 rounded-full text-[0.9vw] focus:outline-none focus:border-purple-700"
                         @keyup.enter="sendMessage" />
                  <button
                      class="bg-purple-700 text-white px-[1.2vw] py-[0.8vh] rounded-full text-[0.9vw] hover:bg-purple-800"
                      @click="sendMessage">전송
                  </button>
                </div>
              </div>
            </div>

            <!-- 🔹 캘린더 패널 -->
            <div v-if="state.activePanel === 'calendar'" class="flex flex-col gap-[1vh]">
              <h4 class="text-[1.1vw] text-gray-800 mb-[1.2vh]">다가오는 일정</h4>
              <div class="bg-purple-100 px-[0.8vw] py-[1vh] rounded-md">
                <div class="text-[1vw] text-purple-700 font-semibold">4월 15일</div>
                <div class="text-[1.1vw] text-gray-800">뮤지컬 '햄릿' 예매 오픈</div>
              </div>
              <div class="bg-purple-100 px-[0.8vw] py-[1vh] rounded-md">
                <div class="text-[1vw] text-purple-700 font-semibold">4월 20일</div>
                <div class="text-[1.1vw] text-gray-800">콘서트 티켓 예매</div>
              </div>
              <div
                  class="bg-purple-700 text-white text-center py-[1vh] rounded-md text-[0.9vw] cursor-pointer mt-2 hover:bg-purple-800"
                  @click="goToMyCalendar">
                전체 일정 보기
              </div>
            </div>

            <!-- 🔹 관심목록 패널 -->
            <div v-if="state.activePanel === 'interest'" class="flex flex-col gap-[1.5vh]">
              <div class="flex gap-[0.6vw]">
                <div class="bg-purple-700 text-white px-[1vw] py-[0.8vh] rounded-md text-[1vw]">공연</div>
                <div class="bg-gray-100 text-gray-800 px-[1vw] py-[0.8vh] rounded-md text-[1vw]">전시</div>
                <div class="bg-gray-100 text-gray-800 px-[1vw] py-[0.8vh] rounded-md text-[1vw]">콘서트</div>
              </div>
              <div class="flex flex-col gap-[1vh]">
                <div class="bg-purple-100 px-[0.8vw] py-[1vh] rounded-md cursor-pointer">
                  <div class="text-[1.1vw] font-semibold text-gray-800 mb-[0.8vh]">뮤지컬 '햄릿'</div>
                  <div class="text-[1vw] text-gray-600">2025.05.01 - 2025.06.30</div>
                </div>
                <div class="bg-purple-100 px-[0.8vw] py-[1vh] rounded-md cursor-pointer">
                  <div class="text-[1.1vw] font-semibold text-gray-800 mb-[0.8vh]">전시 '봄의 풍경'</div>
                  <div class="text-[1vw] text-gray-600">2025.04.10 - 2025.05.15</div>
                </div>
                <div class="bg-purple-100 px-[0.8vw] py-[1vh] rounded-md cursor-pointer">
                  <div class="text-[1.1vw] font-semibold text-gray-800 mb-[0.8vh]">콘서트 '사계'</div>
                  <div class="text-[1vw] text-gray-600">2025.04.25</div>
                </div>
              </div>
            </div>

            <!-- 🔹 관람 이력 패널 -->
            <div v-if="state.activePanel === 'history'" class="flex flex-col gap-[1vh]">
              <div class="bg-purple-100 px-[0.8vw] py-[1vh] rounded-md cursor-pointer">
                <div class="text-[1.1vw] font-semibold text-gray-800 mb-[0.8vh]">전시 '현대미술전'</div>
                <div class="text-[1vw] text-gray-600">방문일: 2025.03.15</div>
              </div>
              <div class="bg-purple-100 px-[0.8vw] py-[1vh] rounded-md cursor-pointer">
                <div class="text-[1.1vw] font-semibold text-gray-800 mb-[0.8vh]">뮤지컬 '레미제라블'</div>
                <div class="text-[1vw] text-gray-600">관람일: 2025.02.28</div>
              </div>
              <div class="bg-purple-100 px-[0.8vw] py-[1vh] rounded-md cursor-pointer">
                <div class="text-[1.1vw] font-semibold text-gray-800 mb-[0.8vh]">콘서트 '봄의 소리'</div>
                <div class="text-[1vw] text-gray-600">관람일: 2025.02.10</div>
              </div>
            </div>
          </div>

        </div>

        <!-- 🔹 비로그인 상태일 때 -->
        <div v-else class="flex flex-col gap-2 justify-center items-center h-full text-center">
          <div>로그인 후 사용해주세요.</div>
          <router-link :to="{ path: '/login', query: { redirect: $route.fullPath } }"
                       class="border border-purple-700 mt-[1vh] text-purple-700 px-[1vw] py-[1.2vh] rounded-md text-[1.1vw] cursor-pointer hover:bg-purple-100">
            로그인
          </router-link>
        </div>
      </div>
    </transition>


    <!-- 사이드바 접힘 버튼 -->
    <div v-if="state.isSidebarCollapsed"
         class="fixed top-[45vh] right-0 w-[4vw] h-[5vw] bg-purple-100 rounded-l-xl flex justify-center items-center cursor-pointer shadow-md hover:bg-purple-200 z-50 max-md:hidden"
         @click="toggleSidebar">
      <img src="../assets/icons/open.png" alt="사이드바 펼치기" class="w-[3vw] h-[3vw]" />
    </div>

    <!-- 사이드바 -->
    <div v-show="!state.isSidebarCollapsed" class="fixed top-[20vh] right-0 z-40 transition-transform max-md:hidden">
      <div class="w-[4vw] min-w-[55px] h-[60vh] bg-purple-100 flex flex-col rounded-l-xl shadow-md">
        <div class="flex flex-col gap-[1.5vh] py-[1vh] flex-1">
          <div v-for="panel in ['profile', 'chat', 'calendar', 'interest', 'history']" :key="panel"
               @click="togglePanel(panel)"
               :class="['flex justify-center items-center h-[4vw] cursor-pointer',
              state.activePanel === panel ? 'bg-purple-700 text-white' : 'hover:bg-purple-200 text-gray-600']">
            <div class="w-[3.2vw] h-[3.2vw] flex justify-center items-center">
              <img :src="getIconUrl(panel)" :alt="panel" class="w-[85%] h-[85%] object-contain" />
            </div>
          </div>
        </div>
        <div class="h-[1px] bg-gray-200 mx-[0.4vw] my-[0.5vh]"></div>
        <div class="flex flex-col gap-[1.5vh] py-[1vh]">
          <div @click="toggleSidebar"
               class="flex justify-center items-center h-[4vw] cursor-pointer hover:bg-purple-200 text-gray-600">
            <div class="w-[3.2vw] h-[3.2vw] flex justify-center items-center">
              <img src="../assets/icons/close.png" alt="사이드바 접기" class="w-[85%] h-[85%] object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>