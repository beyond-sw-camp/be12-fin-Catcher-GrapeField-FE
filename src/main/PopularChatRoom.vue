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
            <div v-for="(room, index) in filteredRooms" :key="index" class="room-item text-sm px-2 py-4" :class="room.color">
                <!-- <div class="room-avatar">
                    <img v-if="room.imageUrl" :src="room.imageUrl" alt="채팅방 이미지" class="room-image">
                </div> -->
                <div class="room-info">
                    <div class="room-name sm:text-sm xl:text-xs">{{ room.name }}</div>
                    <div class="room-location xs:text-xs sm:text-sm xl:text-xs">{{ room.location }} | {{ room.time }}</div>
                </div>
                <div class="room-stats">
                    <div class="stat-item">
                        <img src="../assets/icons/participant.png" alt="">
                        <div class="stat-count xs:text-xs sm:text-sm xl:text-xs">{{ room.comments }}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-item">
                            <img src="../assets/icons/heart.png" alt="">
                            <div class="stat-count xs:text-xs sm:text-sm xl:text-xs" >{{ room.likes }}</div>
                        </div>
                    </div>
                    <button class="enter-btn sm:text-sm xl:text-xs">입장하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-rooms {
    width: 35vw;
    /* 너비 고정 */
    min-width: 0;
    /* min-width 제거 */
    max-width: none;
    /* max-width 제한 제거 */
    padding-right: 0;
    /* 패딩 줄임 */
    margin-top: 4vw;
    margin-bottom: 4vw;
    position: relative;
    box-sizing: border-box;
    /* 박스 사이징 추가 */
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5vw;
}

.chat-title {

    font-weight: 700;
    color: #27272a;
}

.filter-buttons {
    display: flex;
    gap: 0.8vw;
}

.filter-btn {
    padding: 0.5vw 1vw;
    border-radius: 1.5vw;
    border: none;

    font-weight: 700;
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

/* 버튼 active 상태 스타일 */
.filter-btn.active {
    background-color: #6b21a8;
    color: #f5f0ff;
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.room-list {
    display: flex;
    flex-direction: column;
    gap: 0.8vw;
}

.room-item {
    position: relative;
    width: 100%;
    height: 4vw;
    border-radius: 1.5vw;
    display: flex;
    align-items: center;


}

/* 채팅방 색상 통일 */
.room-item {
    background-color: #ddd6fe;
}

.room-avatar {
    width: 3vw;
    height: 3vw;
    background-color: #f8fafc;
    border-radius: 50%;
    margin-right: 1vw;
}

.room-info {
    display: flex;
    flex-direction: column;
    width: 35%;
    /* 40%에서 줄임 */
}

.room-name {

    font-weight: 700;
    color: #27272a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.room-location {

    color: #27272a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.room-stats {
    display: flex;
    align-items: center;
    gap: 1.5vw;
    margin-left: auto;
    margin-right: 2vw;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 0.3vw;
}

img {
    width: 1.2vw;
    height: 1.2vw;
    position: relative;
}

.stat-count {

    color: #27272a;
}

.enter-btn {
    width: 6vw;
    height: 2.5vw;
    background-color: #6b21a8;
    border: none;
    border-radius: 1vw;
    color: white;

    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.3);
}

.room-avatar {
    width: 3vw;
    height: 3vw;
    background-color: #f8fafc;
    border-radius: 50%;
    margin-right: 1vw;
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

/* 반응형 스타일은 그대로 유지 */
@media (max-width: 768px) {
    .chat-title {

    }

    .filter-btn {

        padding: 1vw 2vw;
    }

    .room-item {
        height: 7vw;

    }

    .room-avatar {
        width: 5vw;
        height: 5vw;
    }

    .room-name {

    }

    .room-location {

    }

    .stat-icon {
        width: 2vw;
        height: 2vw;
    }

    .stat-count {

    }

    .enter-btn {
        width: 10vw;
        height: 4vw;

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