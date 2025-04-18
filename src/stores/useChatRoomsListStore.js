import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useChatRoomListStore = defineStore('chatRoomList', () => {
  const rooms = ref([])
  const loading = ref(false)
  const error = ref(null)
  const page = ref(0)
  const isLast = ref(false)

  const API_ENDPOINTS = {
    all: '/api/chat/list/all',
    performances: '/api/chat/list/performance',
    exhibitions: '/api/chat/list/exhibition',
    myPageRooms: '/api/chat/list/my-page',
  }
  
    // 채팅방 퇴장

    const leaveRoom = async (roomId) => {
      try {
        const res = await axios.delete(`/api/chatroom/leave/${roomId}`, {
          withCredentials: true
        })
    
        // ✅ 현재 rooms 목록 내에서 participantCount 갱신
        updateParticipantCount(roomId, res.data.participantCount)
    
        // ✅ 👉 여기서 chatStore도 같이 업데이트
        const chatStore = useChatStore()
        chatStore.removeRoom(roomId)
    
        return res.data.message || '채팅방을 퇴장했습니다.'
      } catch (err) {
        console.error('채팅방 퇴장 실패:', err)
        throw new Error('퇴장 중 오류가 발생했어요.')
      }
    }
    const updateParticipantCount = (roomId, count) => {
      const room = rooms.value.find(r => r.roomIdx === roomId)
      if (room) room.participantCount = count
    }
    
    
  // 🧹 초기화 + 첫 페이지 불러오기
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

  // ➕ 다음 페이지 불러오기 (무한 스크롤 또는 더보기 버튼용)
  const loadMoreRooms = async (type = 'all') => {
    if (loading.value || isLast.value) return

    loading.value = true
    error.value = null

    try {
      const res = await axios.get(`${API_ENDPOINTS[type]}?page=${page.value + 1}&size=20`, { withCredentials: true })
      rooms.value.push(...res.data.content)
      isLast.value = res.data.last
      page.value++
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    rooms,
    loading,
    error,
    page,
    isLast,
    fetchRooms,
    loadMoreRooms,
    updateParticipantCount  // ✅ 이거 export 꼭 해야 함!
  }
})
