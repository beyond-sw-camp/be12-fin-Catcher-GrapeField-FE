import { defineStore } from 'pinia'
import axios from 'axios'

export const useChatStore = defineStore('chat', {
  state: () => ({
    myRooms: []
  }),
  actions: {
    async fetchMyRooms() {
      const res = await axios.get('/api/chat/list/my-rooms', { withCredentials: true })
      this.myRooms = res.data
    },

    async joinRoom(roomId) {
      const alreadyJoined = this.myRooms.some(room => room.roomIdx === roomId)
      if (alreadyJoined) {
        console.log(`✅ 이미 참여중 (roomId: ${roomId}) → 백엔드 요청 생략`)
        return
      }

      try {
        await axios.post(`/api/chatroom/join/${roomId}`, null, {
          withCredentials: true
        })
        console.log(`🚪 백엔드 입장 요청 완료 (roomId: ${roomId})`)
        await this.fetchMyRooms()
      } catch (err) {
        console.error('❌ 채팅방 입장 실패:', err)
        throw err
      }
    },

    // 채팅방 퇴장 관리
    async leaveRoom(roomId) {
      try {
        const res = await axios.delete(`/api/chatroom/leave/${roomId}`, {
          withCredentials: true
        })
        console.log(`👋 퇴장 완료 (roomId: ${roomId})`)
        // 내 채팅방 목록에서 제거
        this.myRooms = this.myRooms.filter(room => room.roomIdx !== roomId)
        return res.data
      } catch (err) {
        console.error('❌ 채팅방 퇴장 실패:', err)
        throw err
      }
    }
  }
})
