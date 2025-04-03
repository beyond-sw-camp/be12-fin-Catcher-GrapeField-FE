<template>
    <div class="chat-rooms">
        <div class="chat-header">
            <h2 class="chat-title">인기 채팅방</h2>
            <div class="filter-buttons">
                <button class="filter-btn all-time">ALL-TIME BEST</button>
                <button class="filter-btn hot">지금 HOT 🔥</button>
            </div>
        </div>

        <div class="room-list">
            <div v-for="(room, index) in chatRooms" :key="index" class="room-item" :class="room.color">
                <div class="room-avatar">
                    <img v-if="room.imageUrl" :src="room.imageUrl" alt="채팅방 이미지" class="room-image">
                </div>
                <div class="room-info">
                    <div class="room-name">{{ room.name }}</div>
                    <div class="room-location">{{ room.location }} | {{ room.time }}</div>
                </div>
                <div class="room-stats">
                    <div class="stat-item">
                        <img src="../assets/icons/participant.png" alt="">
                        <div class="stat-count">{{ room.comments }}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-count">
                            <img src="../assets/icons/heart.png" alt="">
                            <div>{{ room.likes }}</div>
                        </div>
                    </div>
                    <button class="enter-btn">입장하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import chatRooms from '../assets/data/popular-chatroom.json'
export default {
    data() {
        return {
            chatRooms: []
        };
    },
    created() {
        this.chatRooms = chatRooms.chatRooms;
    }
};
</script>

<style scoped>
.chat-rooms {
    width: 43%;
    min-width: 35vw;
    max-width: 45vw;
    padding-right: 7 vw;
    margin-top: 4vw;
    margin-bottom: 4vw;
    position: relative;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5vw;
}

.chat-title {
    font-size: 1.2vw;
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
    font-size: 0.7vw;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
}

.all-time {
    background-color: #6b21a8;
    color: #f5f0ff;
}

.hot {
    background-color: #f9a8d4;
    color: #831843;
    display: flex;
    align-items: center;
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
    padding: 0 0.8vw;
}

.pink {
    background-color: #f9a8d4;
}

.purple-light {
    background-color: #e9d5ff;
}

.violet {
    background-color: #ddd6fe;
}

.fuchsia {
    background-color: #fbcfe8;
}

.purple-dark {
    background-color: #d8b4fe;
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
    width: 40%;
}

.room-name {
    font-size: 0.9vw;
    font-weight: 700;
    color: #27272a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.room-location {
    font-size: 0.7vw;
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

.comment-icon:before {
    content: "";
    position: absolute;
    width: 0.8vw;
    height: 0.8vw;
    border-radius: 50%;
    background-color: white;
    left: 0.2vw;
    top: 0.2vw;
}

.like-icon:before {
    content: "";
    position: absolute;
    width: 1vw;
    height: 0.8vw;
    background-color: #6b21a8;
    left: 0.1vw;
    top: 0.2vw;
}

.stat-count {
    font-size: 0.8vw;
    color: #27272a;
}

.enter-btn {
    width: 6vw;
    height: 2.5vw;
    background-color: #6b21a8;
    border: none;
    border-radius: 1vw;
    color: white;
    font-size: 0.8vw;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
    .chat-title {
        font-size: 3vw;
    }

    .filter-btn {
        font-size: 1.5vw;
        padding: 1vw 2vw;
    }

    .room-item {
        height: 7vw;
        padding: 0 1.5vw;
    }

    .room-avatar {
        width: 5vw;
        height: 5vw;
    }

    .room-name {
        font-size: 1.8vw;
    }

    .room-location {
        font-size: 1.5vw;
    }

    .stat-icon {
        width: 2vw;
        height: 2vw;
    }

    .stat-count {
        font-size: 1.5vw;
    }

    .enter-btn {
        width: 10vw;
        height: 4vw;
        font-size: 1.5vw;
    }
}

@media (max-width: 480px) {
    .chat-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1vw;
    }

    .chat-title {
        font-size: 4vw;
    }

    .filter-btn {
        font-size: 2.5vw;
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
        font-size: 3vw;
    }

    .room-location {
        font-size: 2.2vw;
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
        font-size: 2.5vw;
    }

    .enter-btn {
        width: 100%;
        height: 6vw;
        margin-top: 1vw;
        font-size: 2.5vw;
        order: 4;
    }
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

@media (max-width: 768px) {
    .room-avatar {
        width: 5vw;
        height: 5vw;
    }
}

@media (max-width: 480px) {
    .room-avatar {
        width: 8vw;
        height: 8vw;
    }
}
</style>