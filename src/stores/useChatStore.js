import { defineStore } from 'pinia'
import axios from 'axios'
import { useChatRoomListStore } from './useChatRoomListStore'

export const useChatStore = defineStore('chat', {
  state: () => ({
    myRooms: [] // 예비용, 현재 사용 안 함
  }),
  actions: {
    async fetchMyRooms() {
      const chatRoomListStore = useChatRoomListStore()
      await chatRoomListStore.fetchMyRooms()
      await chatRoomListStore.fetchMyPageRooms()
    },

    async joinRoom(roomId) {
      const chatRoomListStore = useChatRoomListStore()
      const alreadyJoined = chatRoomListStore.myRooms.some(room => room.roomIdx === roomId)
      if (alreadyJoined) {
        console.log(`✅ 이미 참여중 (roomId: ${roomId}) → 백엔드 요청 생략`)
        return
      }

      try {
        await axios.post(`/api/chatroom/join/${roomId}`, null, {
          withCredentials: true
        })
        console.log(`🚪 입장 요청 완료 (roomId: ${roomId})`)
        await chatRoomListStore.fetchMyRooms()
        await chatRoomListStore.fetchMyPageRooms()
      } catch (err) {
        console.error('❌ 입장 실패:', err)
        throw err
      }
    },

    async leaveRoom(roomId) {
      const chatRoomListStore = useChatRoomListStore()
      try {
        const res = await axios.delete(`/api/chatroom/leave/${roomId}`, {
          withCredentials: true
        })
        chatRoomListStore.myRooms = chatRoomListStore.myRooms.filter(r => r.roomIdx !== roomId)
        chatRoomListStore.myPageRooms = chatRoomListStore.myPageRooms.filter(r => r.roomIdx !== roomId)
        chatRoomListStore.updateParticipantCount(roomId, res.data.participantCount)
        return res.data
      } catch (err) {
        console.error('❌ 퇴장 실패:', err)
        throw new Error('퇴장 중 문제가 발생했습니다.')
      }
    }
  }
})