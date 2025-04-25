<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
// 반응형 상태 정의
const activeFilter = ref('all-time');
const rooms = ref([]);

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

// 랜덤하게 색상을 선택하되, 이전 색상은 피하는 함수
const getRandomColorExcept = (previousColor) => {
  const available = colorClasses.filter(c => c !== previousColor);
  return available[Math.floor(Math.random() * available.length)];
};

let previousColor = null;

// 서버에서 받은 DTO를 UI에 맞게 매핑
function mapRoomDto(dto) {
  const color = getRandomColorExcept(previousColor);
  previousColor = color;
  return {
    id: dto.roomIdx,
    name: dto.roomName,
    location: dto.venue,
    comments: dto.memberCount,
    likes: dto.heartCount,
    colorClass: color
  };
}

// 필터에 따라 API 호출 및 데이터 설정
async function fetchRooms() {
  try {
    // Vite proxy 설정을 고려해 /api 프리픽스를 사용
    const url = activeFilter.value === 'all-time'
        ? '/api/chat/list/all-time-best'
        : '/api/chat/list/hot-now';
    const resp = await axios.get(url);
    // 초기 할당: 매핑 및 색상 부여
    previousColor = null;
    rooms.value = resp.data.map(mapRoomDto);
  } catch (err) {
    console.error('채팅방 목록 불러오기 실패', err);
  }
}

onMounted(() => {
  fetchRooms();
});

const filteredRooms = computed(() => {
  // 이미 서버에서 필터링/정렬 완료, 추가 로직 불필요
  return rooms.value;
});

const setFilter = (filter) => {
  if (activeFilter.value !== filter) {
    activeFilter.value = filter;
    fetchRooms();
  }
};
</script>

<template>
  <div class="w-full p-4 bg-white shadow rounded-lg">
    <div class="chat-header">
      <h2 class="chat-title">인기 채팅방</h2>
      <div class="filter-buttons">
        <button class="filter-btn all-time hover:scale-110 transition duration-500" :class="{ active: activeFilter === 'all-time' }"
          @click="setFilter('all-time')">
          ALL-TIME BEST
        </button>
        <button class="filter-btn hot hover:scale-110 transition duration-500" :class="{ active: activeFilter === 'hot' }" @click="setFilter('hot')">
          지금 HOT 🔥
        </button>
      </div>
    </div>

    <div class="room-list">
      <div v-for="(room, index) in filteredRooms" :key="index" class="room-item text-sm px-4 py-2 rounded-3xl transform hover:scale-105 transition duration-500"
        :class="room.colorClass">
        <div class="room-info">
          <div class="room-name sm:text-sm xl:text-sm truncate font-semibold">{{ room.name }}</div>
          <div class="room-location xs:text-xs sm:text-sm xl:text-xs truncate">{{ room.location }} <!-- | {{ room.time }} -->
          </div>
        </div>
        <div class="room-stats">
          <div class="stat-item">
            <img src="@/assets/icons/participant.png" alt="">
            <div class="stat-count xs:text-xs sm:text-sm xl:text-xs">{{ room.comments }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-item">
              <img src="@/assets/icons/heart.png" alt="">
              <div class="stat-count xs:text-sm sm:text-sm xl:text-xs">{{ room.likes }}</div>
            </div>
          </div>
        </div>
        <button class="enter-btn text-xs ml-2 min-w-[3rem] hover:opacity-50 " @click="router.push(`/chat-room/${room.id}`)">입장</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-rooms {
  width: 100%;
  margin: 2rem 0;
  padding-right: 0;
  box-sizing: border-box;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chat-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #27272a;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5em 1.25em;
  border-radius: 2em;
  border: none;
  font-weight: 700;
  font-size: 0.625rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.all-time {
  background-color: #e9d5ff;
  color: #6b21a8;
}

.hot {
  background-color: #f9a8d4;
  color: #831843;
  display: flex;
  align-items: center;
}

.filter-btn.active {
  background-color: #6b21a8;
  color: #f5f0ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.room-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.room-item {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  /* ✅ 줄바꿈 방지 */
  gap: 0.1rem;
  width: 100%;
  border-radius: 1.5rem;
}

.room-avatar {
  width: 3.5rem;
  height: 3.5rem;
  background-color: #f8fafc;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}



.room-info {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
}

.room-stats {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-left: auto;
  white-space: nowrap;
}


.room-location {
  font-size: 0.875rem;
  color: #27272a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

img {
  width: 1rem;
  height: 1rem;
}

.stat-count {
  font-size: 0.75rem;
  color: #27272a;
}

.enter-btn {
  font-size: 0.875rem;
  padding: 0.25em 0.25em;
  background-color: #6b21a8;
  border: none;
  border-radius: 1.5rem;
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.3);
}

/* 반응형 - 태블릿 이하 */
@media (max-width: 768px) {
  .chat-title {
    font-size: 0.85rem;
  }

  .filter-btn {
    font-size: 0.75rem;
    padding: 0.5em 1em;
  }

  .room-name,
  .room-location,
  .stat-count,
  .enter-btn {
    font-size: 0.75rem;
  }

  .room-avatar {
    width: 3rem;
    height: 3rem;
  }

  .enter-btn {
    padding: 0.25em 0.25em;
  }
}


/*
@media (max-width: 640px) {
    .chat-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1vw;
    }

    .chat-title {

    }

    .filter-btn {

        padding: 1.5vw 3vw;
    }

    .room-item {
        height: 12vw;
        padding: 1vw 2vw;
        flex-wrap: wrap;
    }

    .room-avatar {
        width: 8vw;
        height: 8vw;
    }

    .room-info {
        width: 60%;
    }

    .room-name {

    }

    .room-location {

    }

    .room-stats {
        width: 40%;
        order: 3;
    }

    .stat-icon {
        width: 3vw;
        height: 3vw;
    }

    .stat-count {

    }

    .enter-btn {
        width: 100%;
        height: 6vw;
        margin-top: 1vw;

        order: 4;
    }
}*/
</style>