<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
/* // 더미데이터로 채팅데이터 가져오기
import chatData from '@/assets/data/chat.json'*/
import axios from 'axios';
import { connect, stompClient } from '@/utils/webSocketClient'

const props = defineProps({
  id: { type: [String, Number], required: true }
})
const router = useRouter();

// 토큰 변수 설정
const token = ref(null);
const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('ATOKEN='));
if (cookieToken) {
  token.value = cookieToken.split('=')[1];
}

// 세션 변수 설정
const loginUser = JSON.parse(sessionStorage.getItem('user'))?.user;
const currentUserIdx = loginUser?.userIdx;

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
  const roomIdx = Number(props.id)
  axios.get(`/api/chat/${roomIdx}`, {
    headers: token.value
        ? { Authorization: `Bearer ${token.value}` }
        : {}
  })
      .then(res => {
        const data = res.data
        // 방 정보
        roomTitle.value        = data.roomName
        participantCount.value = data.memberList.length

        // 메시지 매핑
        messages.value = data.messageList.map(msg => ({
          id:          msg.messageIdx,
          sender:      msg.username,
          avatar:      msg.profileImageUrl,
          content:     msg.content,
          timestamp:   new Date(msg.createdAt),
          isMe:        msg.userIdx === currentUserIdx,
          isHighlighted: msg.isHighlighted
        }))

        // 하이라이트 매핑
        highlightedTimes.value = data.highlightList.map(h => ({
          id:   h.idx,
          time: new Date(h.startTime)
        }))
        // 초기 로드 시 스크롤을 맨 아래로 이동
        nextTick(() => {
          if (chatBody.value) {
            chatBody.value.scrollTop = chatBody.value.scrollHeight
          }
        })

      })
      .catch(() => {
        router.push('/chat-list');
        alert('접근 권한이 없는 페이지입니다.');
        console.error(error); // 오류 내용을 콘솔에 출력하여 디버깅에 활용
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
    roomIdx: props.id,
    sendUserIdx: currentUserIdx,
    content: newMessage.value
  }
  // 메시지 전송
  if (stompClient.publish) {
    stompClient.publish({
      destination: `/app/chat.send.${props.id}`,
      body: JSON.stringify(messagePayload)
    })
  } else {
    stompClient.send(`/app/chat.send.${props.id}`, {}, JSON.stringify(messagePayload))
  }
  newMessage.value = ''
}

function scrollToBottom() {
  if (!chatBody.value) return;

  const element = chatBody.value;
  const start = element.scrollTop;
  const end = element.scrollHeight - element.clientHeight;
  const duration = 600; // 애니메이션 지속 시간 (밀리초)
  const startTime = performance.now();

  function easeInOutQuad(t) {
    return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
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
}

// 새 메시지 알림 버튼 클릭
function onNewMessageClick() {
  scrollToBottom()
  showNewMessageButton.value = false
}

function scrollToHighlight(highlightId) {
  alert('해당 하이라이트 시간대의 대화를 보여줍니다.')
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
  showNewMessageButton.value = true
}

onMounted(() => {
  loadChatRoomData()
  connect((client) => {
    subscription = client.subscribe(`/topic/chat.room.${props.id}`, handleIncomingMessage)
  }, token.value)
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
      </div>
    </div>

    <!-- 새 메시지 알림 버튼 -->
    <div v-if="showNewMessageButton" class="new-message-notification">
      <button class="new-message-button" @click="onNewMessageClick">✨새로운 메시지가 왔어요!</button>
    </div>

    <div class="chat-body" ref="chatBody">
      <transition-group name="message" tag="div" class="message-list">
        <div
            v-for="(message, index) in messages"
            :key="message.id"
            :class="['message-container', message.isMe ? 'my-message' : '']"
        >
          <div class="message-avatar" v-if="!message.isMe">
            <img :src="message.avatar || '../assets/icons/default-avatar.png'" alt="프로필" />
          </div>
          <div class="message-content">
            <div class="message-sender" v-if="!message.isMe">{{ message.sender }}</div>
            <div class="message-bubble">{{ message.content }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
      </transition-group>

      <div v-if="highlightedTimes.length > 0" class="highlight-section">
        <h3>🔥 하이라이트 시간대</h3>
        <div class="highlight-list">
          <div
              v-for="(highlight, index) in highlightedTimes"
              :key="highlight.id"
              class="highlight-item"
              @click="scrollToHighlight(highlight.id)"
          >
            {{ formatHighlightTime(highlight.time) }}
          </div>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <input type="text" v-model="newMessage" placeholder="메시지 입력..." @keyup.enter="sendMessage" />
      <button class="send-button" @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<style scoped>
/* 메시지 입장 애니메이션 */
.message-enter-from { opacity: 0; transform: translateY(10px); }
.message-enter-active { transition: all 0.3s ease; }
.message-enter-to { opacity: 1; transform: translateY(0); }
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

.new-message-notification{
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

  .chat-input input {
    font-size: 3.5vw;
  }

  .send-button {
    font-size: 3.5vw;
    padding: 1vh 3vw;
  }
}
</style>