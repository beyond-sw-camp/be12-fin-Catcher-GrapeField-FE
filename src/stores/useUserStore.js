import { defineStore } from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin:false,
  }),
  persist: {
    storage: sessionStorage,
  },
  actions: {
    //로그인
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
    async signup(signupReq) {
      const formData = new FormData();
      formData.append("email", signupReq.email);
      formData.append("password", signupReq.password);
      formData.append("username", signupReq.username);
      formData.append("phone", signupReq.phone);
      if (signupReq.profileImg) {
        formData.append("profileImg", signupReq.profileImg);
      }
      const response = await axios.post("/api/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    setRole(newRole) {
      this.role = newRole
    },
    getRole() {
      return this.role
    }
  }
})
