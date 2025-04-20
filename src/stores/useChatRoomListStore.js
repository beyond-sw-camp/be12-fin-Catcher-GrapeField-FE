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
    performances: '/api/chat/list/performance',
    exhibitions: '/api/chat/list/exhibition',
    myPageRooms: '/api/chat/list/my-page',
    myRooms: '/api/chat/list/my-rooms'
  }

  const fetchRooms = async (type = 'all') => {
    loading.value = true
    error.value = null
    page.value = 0
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

  const loadMoreRooms = async (type = 'all') => {
    if (loading.value || isLast.value) return
    loading.value = true
    try {
      const res = await axios.get(`${API_ENDPOINTS[type]}?page=${page.value + 1}&size=20`, {
        withCredentials: true
      })
      rooms.value.push(...res.data.content)
      isLast.value = res.data.last
      page.value++  // ✅ 꼭 필요함
      console.log('📦 loadMoreRooms 실행: page', page.value + 1)
      console.log('✅ 불러온 데이터:', res.data)
console.log('🛑 마지막 페이지인가?:', res.data.last)

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
      console.log('📦 [내 채팅 응답]', res.data) // 🔥 이거 꼭 찍어봐
      myPageRooms.value = res.data.content // ✅ 혹은 res.data?.content ?? []
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