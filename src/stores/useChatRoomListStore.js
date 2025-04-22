import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useChatRoomListStore = defineStore('chatRoomList', () => {
  const rooms = ref([])             // 전체 채팅방 목록
  const myRooms = ref([])           // 사이드바에서 쓰는 참여 채팅방 목록
  const myPageRooms = ref([])       // 전체 채팅방 탭 중 '내 채팅' 목록
  const loading = ref(false)
  const error = ref(null)
  const page = ref(0)
  const isLast = ref(false)

  const API_ENDPOINTS = {
    all: '/api/chat/list/all',
    popular: '/api/chat/list/popular',
    // performances: '/api/chat/list/performance',
    // exhibitions: '/api/chat/list/exhibition',
    myPageRooms: '/api/chat/list/my-page',
    myRooms: '/api/chat/list/my-rooms'
  }

  const fetchRooms = async (type = 'all') => {
    loading.value = true
    error.value = null
  
    // 🔥 반드시 try 밖에서 초기화해야 함
    page.value = 0
    isLast.value = false
    rooms.value = []
  
    try {
      const res = await axios.get(`${API_ENDPOINTS[type]}?page=0&size=20`, { withCredentials: true })
      rooms.value = res.data.content
      isLast.value = res.data.last
    } catch (err) {
      error.value = err
      rooms.value = []
    } finally {
      loading.value = false
    }
  }
  

  // 📍 loadMoreRooms
const loadMoreRooms = async (type = 'all') => {
  if (loading.value || isLast.value) return
  loading.value = true

  try {
    const nextPage = page.value + 1
    const res = await axios.get(`${API_ENDPOINTS[type]}?page=${nextPage}&size=20`, {
      withCredentials: true
    })

    // 🔁 교체 방식으로 반응성 보장
    rooms.value = [...rooms.value, ...res.data.content]
    isLast.value = res.data.last
    page.value = nextPage
  } catch (err) {
    console.error('❌ loadMoreRooms 실패:', err)
  } finally {
    loading.value = false
  }
}

  
  

  const fetchMyRooms = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.myRooms, { withCredentials: true })
      myRooms.value = res.data
    } catch (err) {
      console.error('❌ myRooms 불러오기 실패:', err)
      myRooms.value = []
    }
  }

  const fetchMyPageRooms = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.myPageRooms, { withCredentials: true })
      console.log('📦 [내 채팅 응답]', res.data)
      myPageRooms.value = res.data.content
    } catch (err) {
      console.error('❌ myPageRooms 불러오기 실패:', err)
      myPageRooms.value = []
    }
  }
  

  const updateParticipantCount = (roomId, count) => {
    const all = [...rooms.value, ...myPageRooms.value, ...myRooms.value]
    for (const room of all) {
      if (room.roomIdx === roomId) room.participantCount = count
    }
  }

  return {
    rooms,
    myRooms,
    myPageRooms,
    loading,
    error,
    page,
    isLast,
    fetchRooms,
    fetchMyRooms,
    fetchMyPageRooms,
    loadMoreRooms,
    updateParticipantCount
  }
})