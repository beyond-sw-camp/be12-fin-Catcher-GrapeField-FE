<script setup>
import {ref, onMounted, onBeforeMount, nextTick, onBeforeUnmount} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { connect, stompClient} from "/src/utils/webSocketClient.js";
import chatData from '../../assets/data/chat.json';

const router = useRouter();
const route = useRoute();
const id = ref(route.params.id); // or defineProps()

const roomTitle = ref('');
const participantCount = ref(0);
const messages = ref([]);
const highlightedTimes = ref([]);
const newMessage = ref('');
const room = ref(null);
const chatBody = ref(null); // for scrolling

const topicPath = `/topic/chat.room.${id.value}`;
const sendPath = `/app/chat.send.${id.value}`;

/*
function loadChatRoomData() {
  const roomId = Number(id.value);
  const foundRoom = chatData.chatRooms.find(room => room.id === roomId);

  if (foundRoom) {
    room.value = foundRoom;
    roomTitle.value = foundRoom.title;
    participantCount.value = foundRoom.participants;

    messages.value = foundRoom.messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));

    highlightedTimes.value = foundRoom.highlights.map(highlight => ({
      ...highlight,
      time: new Date(highlight.time)
    }));
  } else {
    console.error(`채팅방 ID ${id.value}를 찾을 수 없습니다.`);
    router.push('/chat-list');
  }
}
*/
// 1. 채팅방 데이터 불러오기 (더미)
function loadChatRoomData() {
  const roomId = Number(id.value);
  const foundRoom = chatData.chatRooms.find(room => room.id === roomId);
  if (!foundRoom) {
    console.error(`채팅방 ID ${id.value}를 찾을 수 없습니다.`);
    router.push('/chat-list');
    return;
  }

  room.value = foundRoom;
  roomTitle.value = foundRoom.title;
  participantCount.value = foundRoom.participants;

  messages.value = foundRoom.messages.map(msg => ({
    ...msg,
    timestamp: new Date(msg.timestamp)
  }));

  highlightedTimes.value = foundRoom.highlights.map(highlight => ({
    ...highlight,
    time: new Date(highlight.time)
  }));
}

/*
function sendMessage() {
  if (!newMessage.value.trim()) return;

  const newMsg = {
    id: Date.now(),
    sender: '나',
    content: newMessage.value,
    timestamp: new Date(),
    isMe: true
  };

  messages.value.push(newMsg);
  newMessage.value = '';

  nextTick(() => scrollToBottom());

  setTimeout(() => {
    const autoResponse = {
      id: Date.now() + 1,
      sender: '관람객' + (Math.floor(Math.random() * 10) + 1),
      content: getRandomResponse(),
      timestamp: new Date(),
      avatar: `/assets/icons/avatar${Math.floor(Math.random() * 6) + 1}.png`,
      isMe: false
    };

    messages.value.push(autoResponse);
    nextTick(() => scrollToBottom());
  }, 1000);
}
*/
// 2. 메시지 전송
function sendMessage() {
  if (!newMessage.value.trim()) return;

  const payload = {
    roomIdx: Number(id.value),
    sendUserIdx: 5, // 더미 userIdx
    // 추후 JWT 로그인 구현하면 토큰 비교해서 로그인 유저 입력하는 로직으로 바꾸기
    content: newMessage.value
  };

  stompClient.publish({
    destination: sendPath, //const sendPath = `/app/chat.send.${id.value}`;
    body: JSON.stringify(payload)
  });

  newMessage.value = '';
}

/*
function scrollToBottom() {
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }
}
*/
// 3. 수신 메시지 스크롤 처리
function scrollToBottom() {
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }
}

// 4. 웹소켓 연결 및 구독
function connectAndSubscribe() {
  if (stompClient.active) {
    console.warn('[STOMP] 이미 활성화된 클라이언트입니다. 중복 activate 방지');
    return;
  }

  stompClient.onConnect = () => {
    console.log('[✅ 연결 성공]');
    stompClient.subscribe(topicPath, (message) => {
      const payload = JSON.parse(message.body);
      messages.value.push({ ...payload });
    });
  };

  stompClient.activate(); // 너무 일찍 실행되지 않도록 조심
}



// 5. 언마운트 시 연결 종료
onBeforeUnmount(() => {
  if (stompClient.connected) {
    stompClient.deactivate(); // 끊기
  }
});

/*
onBeforeMount(() => {
  loadChatRoomData();
});
*/
onBeforeMount(loadChatRoomData);
/*
onMounted(() => {
  scrollToBottom();
});
*/

onMounted(() => {
  console.log('✅ 마운트 성공 /src/events/chat/Detail.vue mounted');

  connect((client) => {
    client.subscribe(topicPath, (message) => {
      const payload = JSON.parse(message.body);
      messages.value.push({
        ...payload,
        timestamp: new Date(), // 서버에서 timestamp 없으면 현재 시간으로
        isMe: payload.sendUserIdx === 5 // 더미 userIdx
        // isMe: payload.sendUserIdx === ... 추후에 JWT로그인 기능 완성하면 토큰비교하는 로직 추가해야됨
      });
      nextTick(() => scrollToBottom());
    });
    console.log('✅ 구독 경로:', topicPath);
  });

});

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatHighlightTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} ~ ${hours}:${(parseInt(minutes) + 10).toString().padStart(2, '0')}`;
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
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function scrollToHighlight(highlightId) {
  alert('해당 하이라이트 시간대의 대화를 보여줍니다.');
}

function goBack() {
  router.push('/chat-list');
}
</script>

<template>
  <div class="chat-room-container">
    <div class="chat-header">
      <div class="chat-title">
        <button class="back-button" @click="goBack">
          <span>&larr;</span>
        </button>
        <h2 style="color: white">{{ roomTitle }}</h2>
      </div>
      <div class="chat-info">
        <span class="participant-count">{{ participantCount }}명 참여중</span>
      </div>
    </div>

    <div class="chat-body" ref="chatBody">
      <div class="message-list">
        <div
            v-for="(message, index) in messages"
            :key="index"
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
      </div>

      <div v-if="highlightedTimes.length > 0" class="highlight-section">
        <h3>🔥 하이라이트 시간대</h3>
        <div class="highlight-list">
          <div
              v-for="(highlight, index) in highlightedTimes"
              :key="index"
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