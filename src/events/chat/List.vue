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
            <div class="tab" :class="{ active: activeTab === 'favorites' }" @click="activeTab = 'favorites'">
                관심 채팅
            </div>
        </div>

        <div class="chat-rooms">
            <div v-for="room in filteredRooms" :key="room.id" class="chat-room-card" @click="openChatRoom(room.id)">
                <div class="chat-room-image">
                    <img :src="room.imageUrl" :alt="room.title" />
                    <div class="active-badge" v-if="room.isActive">LIVE</div>
                </div>
                <div class="chat-room-info">
                    <h3 class="chat-room-title">{{ room.title }}</h3>
                    <div class="chat-room-details">
                        <span class="chat-room-date">{{ room.date }}</span>
                        <span class="chat-room-participants">{{ room.participants }}명 참여중</span>
                    </div>
                    <p class="chat-room-preview">{{ room.preview }}</p>
                </div>
                <div class="chat-room-action">
                    <button class="favorite-button" @click.stop="toggleFavorite(room.id)">
                        <img :src="room.isFavorite ? '../assets/icons/heart-filled.png' : '../assets/icons/heart-outline.png'"
                            alt="관심 채팅" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import chatData from '../../assets/data/chat.json'
export default {
    
    data() {
        return {
            chatRooms: [],
            searchQuery: '',
            activeTab: 'all',
        };
    },
    created() {
        console.log('원본 데이터:', chatData); // 디버깅용
        this.loadChatRooms();
        console.log('처리된 데이터:', this.chatRooms); // 디버깅용
    },
    computed: {
        filteredRooms() {
            let result = this.chatRooms;

            // 탭 필터링
            if (this.activeTab === 'performances') {
                result = result.filter(room => room.category === 'performances');
            } else if (this.activeTab === 'exhibitions') {
                result = result.filter(room => room.category === 'exhibitions');
            } else if (this.activeTab === 'favorites') {
                result = result.filter(room => room.isFavorite);
            }

            // 검색어 필터링
            if (this.searchQuery.trim() !== '') {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(room =>
                    room.title.toLowerCase().includes(query) ||
                    room.preview.toLowerCase().includes(query)
                );
            }

            return result;
        }
    },
    methods: {
        loadChatRooms() {
            try {
                // 로컬 JSON 파일에서 직접 데이터 로드
                if (!chatData || !chatData.chatRooms) {
                    console.error('채팅 데이터가 올바른 형식이 아닙니다:', chatData);
                    return;
                }

                const allRooms = chatData.chatRooms.map(room => ({
                    ...room,
                    isFavorite: chatData.userFavorites.includes(room.id)
                }));

                // 필터링 적용
                let result = [...allRooms];

                // 카테고리 필터링
                if (this.activeTab === 'performances') {
                    result = result.filter(room => room.category === 'performances');
                } else if (this.activeTab === 'exhibitions') {
                    result = result.filter(room => room.category === 'exhibitions');
                } else if (this.activeTab === 'favorites') {
                    result = result.filter(room => chatData.userFavorites.includes(room.id));
                }

                // 검색어 필터링
                if (this.searchQuery.trim() !== '') {
                    const query = this.searchQuery.toLowerCase();
                    result = result.filter(room =>
                        room.title.toLowerCase().includes(query) ||
                        room.preview.toLowerCase().includes(query)
                    );
                }

                this.chatRooms = result;
            } catch (error) {
                console.error('채팅방 목록 로드 중 오류 발생:', error);
            }
        },
        openChatRoom(id) {
            // 현재 창에서 채팅방으로 이동
            this.$router.push(`/chat-room/${id}`);
        },
        toggleFavorite(id) {
            const room = this.chatRooms.find(room => room.id === id);
            if (room) {
                room.isFavorite = !room.isFavorite;
            }
        }
    }
};
</script>

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