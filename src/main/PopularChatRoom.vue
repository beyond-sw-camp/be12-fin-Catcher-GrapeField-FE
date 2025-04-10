<script setup>
import { ref, computed } from 'vue';
import chatRooms from '../assets/data/popular-chatroom.json';

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
  // 사용 가능한 색상 목록 (이전 색상 제외)
  const availableColors = colorClasses.filter(color => color !== previousColor);
  // 랜덤 인덱스 생성
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  // 선택된 색상 반환
  return availableColors[randomIndex];
};

// 초기 데이터 설정 - 랜덤 색상 할당하되 인접 색상 중복 방지
let previousColor = null;

// 초기 데이터 설정
rooms.value = chatRooms.chatRooms.map(room => {
  // 랜덤하게 색상 선택 (이전 색상 제외)
  const colorClass = getRandomColorExcept(previousColor);
  // 선택된 색상을 다음 반복에서 제외하기 위해 저장
  previousColor = colorClass;
  
  return {
    ...room,
    colorClass
  };
});

// computed 속성
const filteredRooms = computed(() => {
  // 필터링 및 정렬된 방 목록 생성
  let sortedRooms;
  if (activeFilter.value === 'all-time') {
    // ALL-TIME BEST: 좋아요 기준 정렬
    sortedRooms = [...rooms.value].sort((a, b) => b.likes - a.likes);
  } else {
    // 지금 HOT: 댓글 기준 정렬
    sortedRooms = [...rooms.value].sort((a, b) => b.comments - a.comments);
  }
  
  // 정렬 후 색상 재할당 (인접 항목이 같은 색상을 가지지 않도록)
  let prevColor = null;
  
  return sortedRooms.map(room => {
    // 이전 정렬 상태의 색상 저장
    const originalColor = room.colorClass;
    
    // 이전 색상과 같다면 새 색상 할당
    if (originalColor === prevColor) {
      room.colorClass = getRandomColorExcept(prevColor);
    }
    
    // 현재 색상을 다음 반복에서 제외하기 위해 저장
    prevColor = room.colorClass;
    
    return room;
  });
});

// 메소드
const setFilter = (filter) => {
  activeFilter.value = filter;
};
</script>

<template>
  <div class="w-full p-4 bg-white shadow rounded-lg">
    <div class="chat-header">
      <h2 class="chat-title">인기 채팅방</h2>
      <div class="filter-buttons">
        <button class="filter-btn all-time" :class="{ active: activeFilter === 'all-time' }"
          @click="setFilter('all-time')">
          ALL-TIME BEST
        </button>
        <button class="filter-btn hot" :class="{ active: activeFilter === 'hot' }" @click="setFilter('hot')">
          지금 HOT 🔥
        </button>
      </div>
    </div>

    <div class="room-list">
      <div v-for="(room, index) in filteredRooms" :key="index" class="room-item text-sm px-4 py-2 rounded-3xl"
        :class="room.colorClass">
        <div class="room-info">
          <div class="room-name sm:text-sm xl:text-sm truncate font-semibold">{{ room.name }}</div>
          <div class="room-location xs:text-xs sm:text-sm xl:text-xs truncate">{{ room.location }} | {{ room.time }}
          </div>
        </div>
        <div class="room-stats">
          <div class="stat-item">
            <img src="../assets/icons/participant.png" alt="">
            <div class="stat-count xs:text-xs sm:text-sm xl:text-xs">{{ room.comments }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-item">
              <img src="../assets/icons/heart.png" alt="">
              <div class="stat-count xs:text-sm sm:text-sm xl:text-xs">{{ room.likes }}</div>
            </div>
          </div>
        </div>
        <button class="enter-btn text-xs ml-2 min-w-[3rem]">입장</button>
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
  transform: scale(1.05);
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