<script setup>
import { ref, computed, watch, onMounted, nextTick, watchEffect } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useChatRoomListStore } from '@/stores/useChatRoomListStore'
import { useChatStore } from '@/stores/useChatStore'
import { useSearchStore } from '@/stores/useSearchStore'

const chatListStore = useChatRoomListStore()
const chatStore = useChatStore()
const searchQuery = ref('')
const activeTab = ref('musical')
const router = useRouter()
const scrollTrigger = ref(null)

const loginUser = JSON.parse(sessionStorage.getItem('user'))?.user
const isLogin = computed(() => !!loginUser)

watchEffect(() => {
  if (activeTab.value === 'myPageRooms' && isLogin.value) {
    chatListStore.fetchMyPageRooms()
  }
})

const handleMyChatClick = () => {
  if (!isLogin.value) {
    alert('로그인이 필요한 기능입니다.')
    return
  }
  activeTab.value = 'myPageRooms'
}


// 💡 필터 탭 변경 감지 → API 호출
watch(activeTab, async (newTab) => {
  console.log('🧭 watch(activeTab) 실행됨', newTab)
  chatListStore.page = 0
  chatListStore.rooms = []
  chatListStore.isLast = false

  if (newTab === 'myPageRooms') {
    await chatListStore.fetchMyPageRooms()
  } else {
    await chatListStore.fetchRooms(newTab)
  }
}, { immediate: true })


// 🔍 필터링된 채팅방 목록 계산
const filteredRooms = computed(() => {
  const source = activeTab.value === 'myPageRooms'
    ? chatListStore.myPageRooms ?? []
    : chatListStore.rooms ?? []  // 꼭 여기서 ref 안 푸는 방식으로

  let result = [...source]

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(room =>
      room.roomName.toLowerCase().includes(query) ||
      room.eventDescription?.toLowerCase().includes(query)
    )
  }
  return result
})





// 채팅방 입장요청 로직(이미 참여중인 채팅방이라면 백엔드에 요청 x)
const openChatRoom = async (roomId) => {
  try {
    await chatStore.joinRoom(roomId) // 이미 참여중이면 백엔드 요청 생략됨
  } catch (err) {
    alert('채팅방 입장 실패. 로그인 상태를 확인하세요.')
  }
  await chatListStore.fetchMyRooms() // useChatStore의 joinRoom함수 내부로부터 이동
  await chatListStore.fetchMyPageRooms() // useChatStore의 joinRoom함수 호출 내부로부터 이동
  await router.push(`/chat-room/${roomId}`)
}

// 채팅방 목록 무한스크롤
onMounted(() => {
  nextTick(() => {
    console.log('🌀 nextTick 진입')
    if (scrollTrigger.value) {
      console.log('📍 scrollTrigger.value 존재 → observer 등록 시작')

      const observer = new IntersectionObserver(
        async ([entry]) => {
          console.log('👀 intersection observed', entry.isIntersecting)
          if (
            entry.isIntersecting &&
            !chatListStore.loading &&
            !chatListStore.isLast &&
            activeTab.value !== 'myPageRooms'
          ) {
            console.log('📦 loadMoreRooms 실행: page', chatListStore.page + 1)
            await chatListStore.loadMoreRooms(activeTab.value)
          }
        },
        { threshold: 1.0 }
      )

      observer.observe(scrollTrigger.value)
      console.log('📌 observer.observe 실행 완료')
    }
  })
})



// onMounted(async () => {
//   await chatListStore.fetchRooms(activeTab.value)
//   await chatStore.fetchMyRooms()
// })

//NOTE: 이미지 링크 임의 설정
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;


//검색 관련
const searchStore = useSearchStore();
const searchResults = ref([]);
const loading = ref(false);

// 디바운스 함수 직접 구현
//사용자가 입력을 중단한 후 300ms가 지나야 실제 검색 함수가 실행
let debounceTimeout = null;
const debounceSearch = (callback, delay) => {
  return function(query) {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      callback(query);
    }, delay);
  };
};

// 검색 실행 함수
// 추후 백엔드에 부하가 많이 간다면 키워드 형식으로 바꾸는 것도 좋다고 생각(현재는 검색어 입력이 변경될 때마다 디바운스된 검색 함수 호출)
const performSearch = async (query) => {
  if (query.trim() === '') {
    searchResults.value = [];
    return;
  }
  
  loading.value = true;
  try {
    const results = await searchStore.getEventsSearchList(query);
    searchResults.value = results;
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
  } finally {
    loading.value = false;
  }
};

// 디바운스된 검색 함수 생성
const debouncedSearch = debounceSearch(performSearch, 300);

// 검색어가 변경될 때마다 디바운스된 검색 함수 호출
watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});
</script>


<template>
  <div class="chat-list-container">
    <div class="chat-header">
      <h1>실시간 채팅</h1>
      <p class="sub-title">공연과 전시의 생생한 현장을 실시간으로 소통하세요</p>
    </div>

    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="채팅방 검색..." class="search-input" />
      <!-- 검색 결과 표시 영역 -->
      <div v-if="searchResults.length > 0" class="search-results">
        <!-- 검색 결과 렌더링 -->
      </div>
    </div>

    <div class="tabs">
      <!-- <div class="tab" :class="{ active: activeTab === 'popular' }" @click="activeTab = 'popular'">
        인기 채팅방
      </div> -->
      <div class="tab" :class="{ active: activeTab === 'musical' }" @click="activeTab = 'musical'">
        뮤지컬
      </div>
      <div class="tab" :class="{ active: activeTab === 'concert' }" @click="activeTab = 'concert'">
        콘서트
      </div>
      <div class="tab" :class="{ active: activeTab === 'play' }" @click="activeTab = 'play'">
        연극
      </div>
      <div class="tab" :class="{ active: activeTab === 'exhibitions' }" @click="activeTab = 'exhibitions'">
                전시회
            </div>
      <div class="tab" :class="{ active: activeTab === 'classic' }" @click="activeTab = 'classic'">
                클래식
            </div>
      <div class="tab" :class="{ active: activeTab === 'myPageRooms' }" @click="handleMyChatClick">
        내 채팅
      </div>
    </div>

    <div class="chat-rooms">
      <div v-for="room in filteredRooms" :key="room.roomIdx" class="chat-room-card" @click="openChatRoom(room.roomIdx)">
        <div class="chat-room-image">
          <img :src="BASE_IMAGE_URL + room.posterImgUrl || '/default.jpg'" :alt="room.roomName" />
          <div class="active-badge">LIVE</div>
        </div>
        <div class="chat-room-info">
          <h3 class="chat-room-title">{{ room.roomName }}</h3>
          <div class="chat-room-details">
            <span class="chat-room-date">
  {{ room.eventStartDate ? room.eventStartDate.slice(0, 10) : '시작일 미정' }} ~
  {{ room.eventEndDate ? room.eventEndDate.slice(0, 10) : '종료일 미정' }}
</span>
            <span class="chat-room-participants">{{ room.participantCount }}명 참여중</span>
          </div>
          <p class="chat-room-preview">{{ room.eventDescription }}</p>
        </div>
      </div>
    </div>
    <div class="text-sm text-gray-500 mt-2">
      🔄 로딩 중: {{ chatListStore.loading ? 'Y' : 'N' }} /
      ✅ 마지막 페이지: {{ chatListStore.isLast ? 'Y' : 'N' }} /
      📦 방 개수: {{ filteredRooms.length }}개
    </div>
    <!-- ✅ 무한 스크롤 트리거용 -->
    <div ref="scrollTrigger" class="h-4"></div>
  </div>
  <!-- 더보기 버튼 -->
  <!-- <div v-if="!chatListStore.isLast && !chatListStore.loading" class="chat-room-action">
  <button class="favorite-button" @click="chatListStore.loadMoreRooms(activeTab)">더 보기</button>
</div> -->

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