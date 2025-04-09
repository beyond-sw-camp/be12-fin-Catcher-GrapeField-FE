<script>
import chatRooms from '../assets/data/popular-chatroom.json'
export default {
  data() {
    return {
      chatRooms: [],
      activeFilter: 'all-time' // 기본값은 ALL-TIME BEST
    };
  },
  created() {
    this.chatRooms = chatRooms.chatRooms;
  },
  computed: {
    filteredRooms() {
      if (this.activeFilter === 'all-time') {
        // ALL-TIME BEST: 좋아요 기준 정렬
        return [...this.chatRooms].sort((a, b) => b.likes - a.likes);
      } else {
        // 지금 HOT: 댓글 기준 정렬
        return [...this.chatRooms].sort((a, b) => b.comments - a.comments);
      }
    }
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
    }
  }
};
</script>

<template>
    <div class="w-full p-4 bg-white shadow rounded-lg">
        <div class="chat-header">
            <h2 class="chat-title">인기 채팅방</h2>
            <div class="filter-buttons">
                <button
                    class="filter-btn all-time"
                    :class="{ active: activeFilter === 'all-time' }"
                    @click="setFilter('all-time')"
                >
                    ALL-TIME BEST
                </button>
                <button
                    class="filter-btn hot"
                    :class="{ active: activeFilter === 'hot' }"
                    @click="setFilter('hot')"
                >
                    지금 HOT 🔥
                </button>
            </div>
        </div>

        <div class="room-list">
            <div v-for="(room, index) in filteredRooms" :key="index" class="room-item text-sm px-4 py-2" :class="room.color">
                <!-- <div class="room-avatar">
                    <img v-if="room.imageUrl" :src="room.imageUrl" alt="채팅방 이미지" class="room-image">
                </div> -->
                <div class="room-info">
                    <div class="room-name sm:text-sm xl:text-xs truncate font-semibold">{{ room.name }}</div>
                    <div class="room-location xs:text-xs sm:text-sm xl:text-xs truncate">{{ room.location }} | {{ room.time }}</div>
                </div>
                <div class="room-stats">
                    <div class="stat-item">
                        <img src="../assets/icons/participant.png" alt="">
                        <div class="stat-count xs:text-xs sm:text-sm xl:text-xs">{{ room.comments }}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-item">
                            <img src="../assets/icons/heart.png" alt="">
                            <div class="stat-count xs:text-sm sm:text-sm xl:text-xs" >{{ room.likes }}</div>
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
  gap: 0.7rem;
}

.room-item {
  display: flex;
  align-items: center;
  flex-wrap: nowrap; /* ✅ 줄바꿈 방지 */
  gap: 0.1rem;
  width: 100%;
  border-radius: 1.5rem;
  background-color: #ddd6fe;
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