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
    }
  }
})
