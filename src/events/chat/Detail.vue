<!-- events/chat/Detail.vue -->
<script setup>
import {ref, onMounted, nextTick, onBeforeUnmount, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useChatRoomStore} from '@/stores/useChatRoomStore'
import {useChatStore} from "@/stores/useChatStore.js";


// reactive 변수
const chatBody = ref(null)
const router = useRouter()
const chatRoomStore = useChatRoomStore()
const route = useRoute()
const roomId = computed(() => Number(route.params.id))
const chatStore = useChatStore()
const isHighlightCollapsed = ref(false)

// Tailwind 색상 클래스 - 보라~분홍 계열
const colorClasses = [
  'bg-purple-100',
  'bg-violet-100',
  'bg-fuchsia-100',
  'bg-pink-100',
  'bg-rose-100',
  'bg-purple-200',
  'bg-indigo-100'
];

// 시간 포맷 함수
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function onNewMessageClick() {
  // scrollToBottom()
  chatRoomStore.scrollToBottom(chatBody.value)
  chatRoomStore.onNewMessageClick()
}

function toggleHighlight() {
  isHighlightCollapsed.value = !isHighlightCollapsed.value;
}

function scrollToHighlight(hStartMessageIdx, highlight) {
  //console.log(hStartMessageIdx);
  const element = chatBody.value;
  const targetElement = element.children[0].children[hStartMessageIdx];
  if (!element || !targetElement) {
    console.error('Element not found');
    return;
  }
  nextTick(() => {
    const start = element.scrollTop;
    const end = targetElement.offsetTop - element.clientHeight / 2 + targetElement.clientHeight / 2;
    const duration = 600;
    const startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      element.scrollTop = start + (end - start) * ease;
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  });
}

function goBack() {
  router.push('/chat-list')
}

function sendMessage() {
  chatRoomStore.sendMessage(roomId.value)
}

function scrollToBottom() {
  if (!chatBody.value) return
  const element = chatBody.value
  const start = element.scrollTop
  const end = element.scrollHeight - element.clientHeight
  const duration = 600
  const startTime = performance.now()

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = easeInOutQuad(progress)
    element.scrollTop = start + (end - start) * ease
    if (progress < 1) requestAnimationFrame(animateScroll)
  }

  requestAnimationFrame(animateScroll)
}

// 애니메이션용 하트 리스트
const getRandomColor = () => {
  const colors = [
    '#FF4D4D', '#FF9900', '#FFD700',
    '#66CC66', '#00BFFF', '#8A2BE2', '#FF69B4'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const handleLike = async () => {
  chatRoomStore.sendHeart(roomId.value)
}

// 채팅방 퇴장

const leaveChatRoom = async () => {
  const res = chatStore.leaveRoom(roomId.value)

  alert(res.data || '채팅방을 퇴장했습니다.')
  await router.push('/chat-list')
}

onMounted(async () => {
  try {
    await chatRoomStore.fetchChatRoom(roomId.value, chatBody.value);
    await nextTick(() => {
      chatRoomStore.connectWebSocket(roomId.value)
      chatRoomStore.initialScroll(chatBody.value)
    })
  } catch (error) {
    router.push('/chat-list')
    alert('페이지 접근 권한이 없습니다.')
    console.error(error)
  }

})

onBeforeUnmount(() => {
  chatRoomStore.disconnectWebSocket()
})
</script>


<template>
  <div class="flex flex-col h-screen bg-gray-100 relative">
    <!-- chat-header -->
    <div class="bg-purple-700 text-white px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-4">
        <button class="text-white bg-transparent border-none flex items-center justify-center
                       w-8 h-8 sm:w-10 sm:h-10 text-lg sm:text-2xl"
                @click="goBack">
          ←
        </button>
        <h2 class="m-0 text-xl sm:text-2xl font-semibold">{{ chatRoomStore.roomTitle }}</h2>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm sm:text-base text-white/80">{{ chatRoomStore.participantCount }}명 참여중</span>
        <button class="px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border-2 border-white
                       bg-white text-purple-700 hover:bg-purple-700 hover:text-white transition"
                @click="leaveChatRoom">
          퇴장
        </button>
      </div>
    </div>

    <!-- highlight popup -->
    <transition name="fade">
      <div v-if="chatRoomStore.showHighlightEffect"
           class="fixed top-1/6 left-1/2 transform -translate-x-1/2
                  bg-yellow-400 text-gray-800 px-8 py-4 rounded-2xl text-lg sm:text-xl font-bold
                  shadow-lg animate-popUp z-50">
        🎯 하이라이트 발생!
      </div>
    </transition>

    <!-- highlight section -->
    <div v-if="chatRoomStore.highlightedTimes.length"
    class="relative" >
      <button class="absolute top-5 right-5 z-10 flex items-center gap-2 px-3 py-1 bg-white border rounded-full shadow hover:bg-purple-700 hover:text-white transition"
              @click="toggleHighlight">
        <span v-if="isHighlightCollapsed">🔻 하이라이트 보기</span>
        <span v-else>🔺 하이라이트 감추기</span>
      </button>

      <transition name="fade">
        <div v-if="!isHighlightCollapsed"
             class="bg-purple-50 p-4 sm:p-6 rounded-lg">
          <h3 class="text-purple-700 text-lg sm:text-xl font-semibold mb-2">🔥 하이라이트 시간대</h3>
          <div class="flex flex-wrap gap-2 sm:gap-4">
            <div v-for="(highlight, index) in chatRoomStore.highlightedTimes" :key="highlight.id"
                 class="cursor-pointer bg-white text-purple-700 px-3 py-1 sm:px-4 sm:py-2
                    rounded-full text-sm sm:text-base shadow hover:bg-purple-700 hover:text-white
                    transition"
                 @click="scrollToHighlight(highlight.messageIdx, highlight)">
              <div>{{ formatTime(highlight.time1) }}~{{ formatTime(highlight.time2) }}</div>
              <div>{{ highlight.summary }}</div>
            </div>
          </div>
        </div>

      </transition>


    </div>

    <!-- new message button -->
    <div v-if="chatRoomStore.showNewMessageButton"
         class="fixed bottom-24 left-1/2 transform -translate-x-1/2">
      <button class="bg-purple-700 text-white px-4 py-2 rounded-full text-base sm:text-lg
                     shadow hover:bg-purple-800 transition"
              @click="onNewMessageClick">
        ✨새로운 메시지가 왔어요!
      </button>
    </div>
    <!-- chat-body -->
    <div ref="chatBody" class="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col">
      <transition-group class="flex-1 mb-4" name="message" tag="div">
        <div v-for="(msg, idx) in chatRoomStore.formattedMessages" :key="idx"
             :class="['flex mb-4 gap-3', msg.isMe ? 'flex-row-reverse' : 'flex-row']">
          <div v-if="!msg.isMe"
               class="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <div v-if="!msg.avatar"
                 :class="['text-base sm:text-lg text-gray-800 h-full flex items-center justify-center font-semibold',
                colorClasses[msg.userIdx % colorClasses.length]]">
              {{ msg.sender.charAt(0).toUpperCase() }}
            </div>
            <img v-else :src="msg.avatar || '@/assets/icons/default-avatar.png'"
                 alt="프로필" class="text-sm w-full h-full object-cover"/>
          </div>

          <div class="flex flex-col max-w-2/3">
            <div v-if="!msg.isMe" class="text-sm sm:text-base text-gray-600 mb-1">
              {{ msg.sender }}
            </div>
            <div :class="['px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow','whitespace-pre-wrap break-words',
                          msg.isMe ? 'bg-purple-200 text-gray-800' : 'bg-white text-gray-800']"
                 class="text-base sm:text-lg">
              {{ msg.content }}
            </div>
            <div :class="msg.isMe ? 'self-start' : ''"
                 class="text-xs sm:text-sm text-gray-500 mt-1 self-end">
              {{ formatTime(msg.timestamp) }}
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- 하단 메세지 입력창 -->
    <div class="bg-white px-6 py-4 flex items-center gap-4 border-t border-gray-200">
      <button class="relative p-0 hover:scale-110 transform transition"
              @click="handleLike">
        <svg class="w-12 h-12 sm:w-14 sm:h-14 fill-current text-pink-500" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35c-.4-.35-1.6-1.45-2.9-2.7C5.2 15.1 2 11.95 2 8.2
                   2 5 4.5 2.8 7.5 2.8c1.7 0 3.2.8 4.5 2.2
                   1.3-1.4 2.8-2.2 4.5-2.2C19.5 2.8 22 5 22 8.2
                   c0 3.75-3.2 6.9-7.1 10.45-1.3 1.25-2.5 2.35-2.9 2.7z"/>
        </svg>
        <!-- 버튼 누르면 나오는 뿅뿅 하트들 -->
        <span
            v-for="heart in chatRoomStore.hearts"
            :key="heart.id"
            :style="{ left: `${heart.x}px`, top: `${heart.y}px` }"
            class="heart-pop">
          <svg
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg">
            <path
                :fill="getRandomColor()"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81
         4.5 2.09C13.09 3.81 14.76 3 16.5 3
         19.58 3 22 5.42 22 8.5c0 3.78-3.4
         6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </span>
      </button>
      <input v-model="chatRoomStore.newMessage"
             class="flex-1 border border-gray-300 rounded-full px-4 py-2
                    text-base sm:text-lg focus:outline-none focus:ring-2
                    focus:ring-purple-500"
             placeholder="메시지 입력..."
             type="text"
             @keyup.enter="sendMessage"/>
      <button class="bg-purple-700 text-white px-6 py-2 rounded-full text-base sm:text-lg
                     hover:bg-purple-800 transition"
              @click="sendMessage">
        전송
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 메시지 입장 애니메이션 */
.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.message-enter-active {
  transition: all 0.3s ease;
}

.message-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.chat-room-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.chat-header {
  background-color: #6A0DAD;
  color: white;
  padding: 1.2vh 1.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 1vw;
}

.back-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2vw;
  height: 2vw;
}

.chat-title h2 {
  margin: 0;
  font-size: 1.3vw;
  font-weight: 600;
}

.participant-count {
  font-size: 0.9vw;
  color: rgba(255, 255, 255, 0.8);
}

.new-message-notification {
  position: fixed;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
  background-color: #6A0DAD;
  color: white;
  padding: 0vw;
  border-radius: 16rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.new-message-button {
  background-color: #6A0DAD;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 16rem;
  font-size: medium;
  cursor: pointer;
  transition: all 0.2s ease;
}

.new-message-button:hover {
  background-color: #5A0C9D;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5vh 1.5vw;
  display: flex;
  flex-direction: column;
}

.message-list {
  flex: 1;
  margin-bottom: 2vh;
}

.message-container {
  display: flex;
  margin-bottom: 1.5vh;
  gap: 0.8vw;
}

.my-message {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0e0e0;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message-sender {
  font-size: 0.9vw;
  color: #555;
  margin-bottom: 0.3vh;
}

.message-bubble {
  background-color: white;
  padding: 1vh 1vw;
  border-radius: 1vw;
  font-size: 1vw;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.my-message .message-bubble {
  background-color: #E6D8FF;
  color: #333;
}

.message-time {
  font-size: 0.7vw;
  color: #888;
  margin-top: 0.3vh;
  align-self: flex-end;
}

.my-message .message-time {
  align-self: flex-start;
}

.highlight-section {
  background-color: #F5F0FF;
  padding: 1.2vh 1vw;
  border-radius: 0.5vw;
  margin-top: 1vh;
}

.highlight-section h3 {
  font-size: 1vw;
  color: #6A0DAD;
  margin: 0 0 1vh 0;
}

.highlight-list {
  display: flex;
  gap: 0.8vw;
  flex-wrap: wrap;
}

.highlight-item {
  background-color: white;
  color: #6A0DAD;
  padding: 0.5vh 0.8vw;
  border-radius: 2vw;
  font-size: 0.9vw;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(106, 13, 173, 0.1);
  transition: all 0.2s ease;
}

.highlight-item:hover {
  background-color: #6A0DAD;
  color: white;
}

.heart-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.heart-button:hover {
  transform: scale(1.2);
}

.heart-icon {
  width: 48px;
  height: 48px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.heart-pop {
  position: absolute;
  animation: floatUp 1s ease-out forwards;
  font-size: 16px;
  color: #e1306c;
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(1.5);
  }
}

.chat-input {
  background-color: white;
  padding: 1.2vh 1.5vw;
  display: flex;
  gap: 1vw;
  border-top: 1px solid #e0e0e0;
}

.chat-input input {
  flex: 1;
  padding: 1vh 1vw;
  border: 1px solid #e0e0e0;
  border-radius: 2vw;
  font-size: 1vw;
  outline: none;
}

.chat-input input:focus {
  border-color: #6A0DAD;
}

.send-button {
  background-color: #6A0DAD;
  color: white;
  border: none;
  border-radius: 2vw;
  padding: 0.8vh 1.5vw;
  font-size: 1vw;
  cursor: pointer;
  transition: all 0.2s ease;
}

.send-button:hover {
  background-color: #5A0C9D;
}

.chat-info {
  display: flex;
  align-items: center;
  gap: 1vw;
}

/* 퇴장 버튼 */
.leave-button {
  margin-left: 0.8vw;
  padding: 0.3vh 1vw;
  font-size: 0.8vw;
  border-radius: 9999px;
  border: 2px solid white;
  background-color: white;
  color: #6A0DAD;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.leave-button:hover {
  background-color: #6A0DAD;
  color: white;
  border-color: white;
}

.highlight-popup {
  position: fixed;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #FFD700;
  color: #333;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 9999;
  animation: popUp 0.5s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@keyframes popUp {
  0% {
    transform: translateX(-50%) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


/* 모바일 대응 */
@media (max-width: 768px) {
  .chat-title h2 {
    font-size: 4vw;
  }

  .back-button {
    font-size: 5vw;
    width: 6vw;
    height: 6vw;
  }

  .participant-count {
    font-size: 3vw;
  }

  .message-avatar {
    width: 8vw;
    height: 8vw;
  }

  .message-sender {
    font-size: 3vw;
  }

  .message-bubble {
    font-size: 3.5vw;
    padding: 1.5vh 2vw;
  }

  .message-time {
    font-size: 2.5vw;
  }

  .highlight-section h3 {
    font-size: 3.5vw;
  }

  .highlight-item {
    font-size: 3vw;
    padding: 1vh 2vw;
  }

  .heart-icon {
    width: 6vw;
    height: 6vw;
  }

  .chat-input input {
    font-size: 3.5vw;
  }

  .send-button {
    font-size: 3.5vw;
    padding: 1vh 3vw;
  }
}
</style>