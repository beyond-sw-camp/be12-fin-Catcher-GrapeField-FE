import {defineStore} from 'pinia'
import axios from 'axios'

export const useChatStore = defineStore('chat', {
  state: () => ({
    joinedRoomIds: [] // 🔥 참여 채팅방 ID 캐시
  }),

  actions: {
    async preloadJoinedRooms() {
      try {
        const res = await axios.get('/api/chat/list/my-rooms', { withCredentials: true })
        const list = Array.isArray(res.data) ? res.data : []
        this.joinedRoomIds = list.map(room => Number(room.roomIdx))
        console.log('[chatStore] 캐시된 참여 채팅방 ID 목록:', this.joinedRoomIds)
      } catch (err) {
        console.error('❌ 참여 채팅방 로딩 실패:', err)
        this.joinedRoomIds = []
      }
    },

    async joinRoom(roomId) {
      if (this.joinedRoomIds.length === 0) {
        console.log('[💡 캐시 비었음 → preload 호출]')
        await this.preloadJoinedRooms()
      }

      console.log('[DEBUG] 현재 캐시:', this.joinedRoomIds)
      console.log('[DEBUG] 클릭된 roomId:', roomId)

      if (this.joinedRoomIds.includes(Number(roomId))) {
        console.log(`✅ 이미 참여중 (roomId: ${roomId}) → 백엔드 요청 생략`)
        return
      }

      try {
        await axios.post(`/api/chatroom/join/${roomId}`, null, {
          withCredentials: true
        })
        console.log(`🚪 입장 요청 완료 (roomId: ${roomId})`)

        this.joinedRoomIds.push(Number(roomId))
      } catch (err) {
        console.error('❌ 입장 실패:', err)
        throw err
      }
    },


    async leaveRoom(roomId) {
      try {
        return await axios.delete(`/api/chatroom/leave/${roomId}`, {
          withCredentials: true
        })
      } catch (err) {
        console.error('❌ 퇴장 실패:', err)
        throw new Error('퇴장 중 문제가 발생했습니다.')
      }
    }
  }
})