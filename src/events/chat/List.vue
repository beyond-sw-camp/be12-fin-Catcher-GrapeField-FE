<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useChatRoomListStore } from '../../stores/useChatRoomsListStore'

const store = useChatRoomListStore()
const searchQuery = ref('')
const activeTab = ref('all')
const router = useRouter()

// 탭 변경 시 API 호출
watch(activeTab, (newTab) => {
  store.fetchRooms(newTab)
})

// 필터링 로직
const filteredRooms = computed(() => {
  let result = [...store.rooms]
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(room =>
      room.roomName.toLowerCase().includes(query) ||
      room.eventDescription?.toLowerCase().includes(query)
    )
  }
  return result
})

const openChatRoom = async (roomId) => {
  try {
    // ✅ 채팅방 입장 요청 먼저 보내기
    await axios.post(`/api/chatroom/join/${roomId}`, null, {
      withCredentials: true // JWT 쿠키 전달 필수!
    })

    // 🔁 입장 완료되면 상세 페이지로 이동
    router.push(`/chat-room/${roomId}`)
  } catch (err) {
    console.error('채팅방 입장 실패:', err)
    alert('채팅방 입장에 실패했어요. 로그인 여부를 확인해보세요!')
  }
}

onMounted(async () => {
  await store.fetchRooms('all')
})

//NOTE: 이미지 링크 임의 설정
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

</script>


<template>
    <div class="chat-list-container">
        <div class="chat-header">
            <h1>실시간 채팅</h1>
            <p class="sub-title">공연과 전시의 생생한 현장을 실시간으로 소통하세요</p>
        </div>

        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="채팅방 검색..." class="search-input" />
        </div>

        <div class="tabs">
            <div class="tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">
                전체
            </div>
            <div class="tab" :class="{ active: activeTab === 'performances' }" @click="activeTab = 'performances'">
                공연
            </div>
            <div class="tab" :class="{ active: activeTab === 'exhibitions' }" @click="activeTab = 'exhibitions'">
                전시
            </div>
            <div class="tab" :class="{ active: activeTab === 'myPageRooms' }" @click="activeTab = 'myPageRooms'">
                내 채팅
            </div>
        </div>

        <div class="chat-rooms">
      <div
        v-for="room in filteredRooms"
        :key="room.roomIdx"
        class="chat-room-card"
        @click="openChatRoom(room.roomIdx)"
      >
        <div class="chat-room-image">
          <img :src="BASE_IMAGE_URL + room.posterImgUrl || '/default.jpg'" :alt="room.roomName" />
          <div class="active-badge">LIVE</div>
        </div>
        <div class="chat-room-info">
          <h3 class="chat-room-title">{{ room.roomName }}</h3>
          <div class="chat-room-details">
            <span class="chat-room-date">{{ room.eventStartDate.slice(0, 10) }} ~ {{ room.eventEndDate.slice(0, 10) }}</span>
            <span class="chat-room-participants">{{ room.participantCount }}명 참여중</span>
          </div>
          <p class="chat-room-preview">{{ room.eventDescription }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 더보기 버튼 -->
<div v-if="!store.isLast && !store.loading" class="chat-room-action">
  <button class="favorite-button" @click="store.loadMoreRooms(activeTab)">더 보기</button>
</div>
</template>

<style scoped>
.chat-list-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.chat-header {
    text-align: center;
    margin-bottom: 2rem;
}

.chat-header h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.sub-title {
    color: #666;
    font-size: 1rem;
}

.search-container {
    margin-bottom: 1.5rem;
}

.search-input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 50px;
    font-size: 1rem;
    background-image: url('../assets/icons/search.png');
    background-position: right 1rem center;
    background-repeat: no-repeat;
    background-size: 1.2rem;
}

.tabs {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 1.5rem;
}

.tab {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    color: #666;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
}

.tab.active {
    color: #6A0DAD;
    border-bottom: 2px solid #6A0DAD;
}

.chat-rooms {

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.chat-room-card {
    width: 22.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.chat-room-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.chat-room-image {
    position: relative;
    height: 160px;
    overflow: hidden;
}

.chat-room-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.active-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #FF4545;
    color: white;
    font-weight: bold;
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
    border-radius: 50px;
}

.chat-room-info {
    padding: 1rem;
    flex: 1;
}

.chat-room-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #333;
}

.chat-room-details {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.chat-room-preview {
    font-size: 0.9rem;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.chat-room-action {
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem 1rem;
}

.favorite-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}

.favorite-button img {
    width: 1.5rem;
    height: 1.5rem;
}

@media (max-width: 768px) {
    .chat-list-container {
        padding: 1rem;
    }

    .chat-header h1 {
        font-size: 1.5rem;
    }

    .tabs {
        overflow-x: auto;
        white-space: nowrap;
    }

    .tab {
        padding: 0.6rem 1rem;
    }

    .chat-rooms {
        grid-template-columns: 1fr;
    }
}
</style>