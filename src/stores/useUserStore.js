import { defineStore } from 'pinia'
import axiosInstance from "@/utils/axios"; // 커스텀 axios 인스턴스
import router from '@/router';
import { toast } from 'vue3-toastify';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    user: null,
    role: '',
  }),
  //추후 운영 환경에서는 persist 삭제 
  persist: {
    storage: sessionStorage,
  },
  getters: {
    userIdx: (state) => state.user?.userIdx,
    email: (state) => state.user?.email,
    username: (state) => state.user?.username,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axiosInstance.post("/api/login", {
          email,
          password,
        });

        if (response.data && response.data.authenticated) {
          this.user = {
            userIdx: response.data.userIdx,
            email: response.data.email,
            username: response.data.username,
          };
          this.role = response.data.role || 'user';
          this.isLogin = true;

          return { success: true };
        }

        return { success: false, message: '로그인 실패' };
      } catch (error) {
        const message = error.response?.data?.message || '로그인 실패';
        return { success: false, message };
      }
    },

    async logout() {
      try {
        await axiosInstance.post("/api/logout");

        this.resetUserState();
        return true;
      } catch (error) {
        console.error("로그아웃 에러:", error);
        this.resetUserState();
        return false;
      }
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

      try {
        const response = await axiosInstance.post("/api/user/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || '회원가입 실패';
        console.log(error);
      }
    },

    async refreshToken() {
      try {
        const response = await axiosInstance.post("/api/auth/refresh-token");
        if (response.data) {
          this.user = {
            userIdx: response.data.userIdx,
            email: response.data.email,
            username: response.data.username,
          };
          this.role = response.data.role || 'user';
        }
        return true;
      } catch (error) {
        console.error("세션 갱신 실패:", error);
        this.resetUserState();
        return false;
      }
    },

    resetUserState() {
      this.isLogin = false;
      this.user = null;
      this.role = '';
      sessionStorage.removeItem('user');
    },

    updateUserInfo(updatedInfo) {
      this.user = { ...this.user, ...updatedInfo };
    },

    handleAuthError() {
      this.resetUserState();
      router.push('/login');
      toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
    },

    async checkAuthStatus() {
      try {
        const response = await axiosInstance.get("/api/auth/status");
    
        if (response.data && response.data.authenticated) {
          this.user = {
            userIdx: response.data.userIdx,
            email: response.data.email,
            username: response.data.username,
          };
          this.role = response.data.role || 'user';
          this.isLogin = true;
          return true;
        }
    
        // ATOKEN은 없지만 RTOKEN은 있을 수 있으므로 Refresh 시도
        const refreshed = await this.refreshToken();
        return refreshed;
    
      } catch (error) {
        this.resetUserState();
        return false;
      }
    }
    
  }
});
