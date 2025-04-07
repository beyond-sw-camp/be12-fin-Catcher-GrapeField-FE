import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin:false,
    user: null,
    role: '',
  }),
  persist: {
    storage: sessionStorage,
  },
  actions: {
    async login(email, password) {
      // 백엔드 연동해야 함! (현재는 mock)
      if (email === 'test@test.com' && password === '1234') {
        this.isLogin=true,
        this.user = { email }
        this.role= 'user'
        return true
      }
      else if (email === 'admin@test.com' && password === '1234') {
        this.isLogin=true,
        this.user = { email }
        this.role= 'admin'
        return true
      }
      return false
    },
    setRole(newRole) {
      this.role = newRole
    },
    getRole() {
      return this.role
    }
  }
})
