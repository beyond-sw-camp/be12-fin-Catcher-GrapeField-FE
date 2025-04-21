<!-- events/chat/Detail.vue -->
<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from 'axios'
import { useChatRoomStore } from '@/stores/useChatRoomStore'
import {connect, stompClient} from '@/utils/webSocketClient'

const router = useRouter()
const chatRoomStore = useChatRoomStore()

const route = useRoute()
const roomId = computed(() => Number(route.params.id))


/*
// 토큰 변수 설정
const token = ref(null)
const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('ATOKEN='))
if (cookieToken) token.value = cookieToken.split('=')[1]
*/
// 세션 변수 설정
const loginUser = JSON.parse(sessionStorage.getItem('user'))?.user
const currentUserIdx = loginUser?.userIdx

// reactive 변수들
const roomTitle = ref('')
const participantCount = ref(0)
const messages = ref([])
const highlightedTimes = ref([])
const newMessage = ref('')
const chatBody = ref(null)

// 새로운 메시지 알림 버튼 상태
const showNewMessageButton = ref(false)
let subscription = null

function loadChatRoomData() {
  const roomIdx = Number(roomId.value)
  chatRoomStore.fetchChatRoom(roomIdx /*, token */)
      .then(data => {
        roomTitle.value = data.roomName
        participantCount.value = data.memberList.length
        messages.value = data.messageList.map(msg => ({
          id: msg.messageIdx,
          sender: msg.username,
          avatar: msg.profileImageUrl,
          content: msg.content,
          timestamp: new Date(msg.createdAt),
          isMe: msg.userIdx === currentUserIdx,
          isHighlighted: msg.isHighlighted
        }))
        highlightedTimes.value = data.highlightList.map(h => ({
          id: h.idx,
          messageIdx: h.messageIdx,
          summary: h.description,
          time1: new Date(h.startTime),
          time2: new Date(h.endTime)
        }))
        nextTick(() => {
          if (chatBody.value) {
            chatBody.value.scrollTop = chatBody.value.scrollHeight
          }
        })
      })
      .catch(error => {
        router.push('/chat-list')
        alert('페이지 접근 권한이 없습니다.')
        console.error(error)
      })
}

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatHighlightTime(date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${(parseInt(minutes) + 10).toString().padStart(2, '0')}`
}

function sendMessage() {
  if (!newMessage.value.trim() || !stompClient?.connected) return
  const messagePayload = {
    roomIdx: roomId.value,
    // sendUserIdx: currentUserIdx,
    content: newMessage.value
  }
  if (stompClient.publish) {
    stompClient.publish({
      destination: `/app/chat.send.${roomId.value}`,
      body: JSON.stringify(messagePayload)
    })
  } else {
    stompClient.send(`/app/chat.send.${roomId.value}`, {}, JSON.stringify(messagePayload))
  }
  newMessage.value = ''
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

function onNewMessageClick() {
  scrollToBottom()
  showNewMessageButton.value = false
}


function scrollToHighlight(hStartMessageIdx, highlight) {
  console.log(hStartMessageIdx);
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

function handleIncomingMessage(frame) {
  const msg = JSON.parse(frame.body)
  const newMsg = {
    id: msg.messageIdx,
    sender: msg.username,
    avatar: msg.profileImageUrl,
    content: msg.content,
    timestamp: new Date(msg.createdAt),
    isMe: msg.userIdx === currentUserIdx,
    isHighlighted: msg.isHighlighted
  }
  messages.value.push(newMsg)
  if (!newMsg.isMe) showNewMessageButton.value = true
  else nextTick(scrollToBottom)
}

// 애니메이션용 하트 리스트
const hearts = ref([])
const getRandomColor = () => {
  const colors = [
    '#FF4D4D', '#FF9900', '#FFD700',
    '#66CC66', '#00BFFF', '#8A2BE2', '#FF69B4'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const handleLike = async () => {
  // try {
  //   await chatRoomStore.likeRoom(roomId.value)
  //   console.log('좋아요 완료!')
  // } catch (err) {
  //   console.error('API 오류:', err)
  // }
// 애니메이션용 하트 추가
  for (let i = 0; i < 5; i++) {
    const id = Date.now() + Math.random()
    setTimeout(() => {
      hearts.value.push({ id, x: 10 + Math.random() * 20, y: 0 })
      setTimeout(() => {
        hearts.value = hearts.value.filter(h => h.id !== id)
      }, 10000)
    }, i * 150)
  }
}

// 채팅방 퇴장

const leaveChatRoom = async () => {
  if (!confirm('채팅방을 퇴장하시겠습니까?')) return

  const res = await axios.delete(`/api/chatroom/leave/${roomId.value}`, {
    withCredentials: true
  })

  alert(res.data.message || '채팅방을 퇴장했습니다.')
  router.push('/chat-list')
}

onMounted(() => {
  loadChatRoomData()
  connect((client) => {
    subscription = client.subscribe(`/topic/chat.room.${roomId.value}`, handleIncomingMessage)
  }/*, token*/)
})

onBeforeUnmount(() => {
  if (subscription) subscription.unsubscribe()
})
</script>


<template>
  <div class="chat-room-container">
    <div class="chat-header">
      <div class="chat-title">
        <button class="back-button" @click="goBack">←</button>
        <h2 style="color: white">{{ roomTitle }}</h2>
      </div>
      <div class="chat-info">
        <span class="participant-count">{{ participantCount }}명 참여중</span>
        <button class="leave-button" @click="leaveChatRoom">퇴장</button>
      </div>
    </div>
    <div v-if="highlightedTimes.length > 0" class="highlight-section">
      <h3>🔥 하이라이트 시간대</h3>
      <div class="highlight-list">
        <div
            v-for="(highlight, index) in highlightedTimes"
            :key="highlight.id"
            class="highlight-item"
            @click="scrollToHighlight(highlight.messageIdx, highlight)"
        ><div>{{ formatHighlightTime(highlight.time1) }}~{{ formatHighlightTime(highlight.time2) }}</div>
          <div>{{ highlight.summary }}</div>

        </div>
      </div>
    </div>
    <!-- 새 메시지 알림 버튼 -->
    <div v-if="showNewMessageButton" class="new-message-notification">
      <button class="new-message-button" @click="onNewMessageClick">✨새로운 메시지가 왔어요!</button>
    </div>

    <div ref="chatBody" class="chat-body">
      <transition-group class="message-list" name="message" tag="div">
        <div
            v-for="(message, index) in messages"
            :key="message.id"
            :class="['message-container', message.isMe ? 'my-message' : '']"
        >
          <div v-if="!message.isMe" class="message-avatar">
            <img :src="message.avatar || '../assets/icons/default-avatar.png'" alt="프로필"/>
          </div>
          <div class="message-content">
            <div v-if="!message.isMe" class="message-sender">{{ message.sender }}</div>
            <div class="message-bubble">{{ message.content }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
      </transition-group>
    </div>

    <div class="chat-input">
      <button aria-label="좋아요" class="heart-button" @click="handleLike">
        <svg class="heart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
          <path
              d="M12 21.35c-.4-.35-1.6-1.45-2.9-2.7C5.2 15.1 2 11.95 2 8.2
       2 5 4.5 2.8 7.5 2.8c1.7 0 3.2.8 4.5 2.2
       1.3-1.4 2.8-2.2 4.5-2.2C19.5 2.8 22 5 22 8.2
       c0 3.75-3.2 6.9-7.1 10.45-1.3 1.25-2.5 2.35-2.9 2.7z"
              fill="#e1306c"
          />
        </svg>

        <!-- 버튼 누르면 나오는 뿅뿅 하트들 -->
        <span
            v-for="heart in hearts"
            :key="heart.id"
            :style="{ left: `${heart.x}px`, top: `${heart.y}px` }"
            class="heart-pop"
        >
  <svg
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
  >
    <path
        :fill="getRandomColor()"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81
         4.5 2.09C13.09 3.81 14.76 3 16.5 3
         19.58 3 22 5.42 22 8.5c0 3.78-3.4
         6.86-8.55 11.54L12 21.35z"
    />
  </svg>
</span>


      </button>
      <input v-model="newMessage" placeholder="메시지 입력..." type="text" @keyup.enter="sendMessage"/>
      <button class="send-button" @click="sendMessage">전송</button>
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

  /* 퇴장 버튼 */
  .leave-button {
  background-color: white;
  border: 2px solid #6A0DAD;
  border-radius: 9999px;
  color: #6A0DAD;
  padding: 0.5vh 1vw;
  font-size: 0.9vw;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.leave-button:hover {
  background-color: #6A0DAD;
  color: white;
}

.leave-button:active {
  transform: scale(0.95);
}
}
</style>