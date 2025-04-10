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
      try {
        const response = await axios.post("/api/login", {
          email,
          password,
        });
    
        this.isLogin = true;
        this.user = { email };
        this.role = 'user';
        return { success: true };
      } catch (error) {
        // 백엔드에서 보낸 메시지 추출
        const message = error.response?.data?.message || '로그인 실패';
        return { success: false, message };
      }
    },
  //회원가입
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
