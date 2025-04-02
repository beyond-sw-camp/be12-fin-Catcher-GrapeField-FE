import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async login(email, password) {
      // 백엔드 연동해야 함! (현재는 mock)
      if (email === 'test@test.com' && password === '1234') {
        this.user = { email }
        return true
      }
      return false
    }
  }
})
