import { defineStore } from 'pinia'
import axiosInstance, { axiosNoInterceptor } from '@/utils/axios' // 커스텀 axios 인스턴스
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
        await axiosInstance.post("/logout");

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
      // try {
      //   const response = await axiosNoInterceptor.post("/api/auth/refresh-token");
    
      //   if (response.data) {
      //     this.user = {
      //       userIdx: response.data.userIdx,
      //       email: response.data.email,
      //       username: response.data.username,
      //     };
      //     this.role = response.data.role || 'user';
      //     return true;
      //   }
    
      //   return false;
      // } catch (error) {
      //   console.error("세션 갱신 실패:", error);
      //   this.resetUserState();
      //   return false;
      // }
      try {
        console.log('리프레시 토큰 갱신 시도...')
        const response = await axiosNoInterceptor.post("/api/auth/refresh-token")
        
        console.log('리프레시 응답:', response.data)
        
        if (response.data) {
          this.user = {
            userIdx: response.data.userIdx,
            email: response.data.email,
            username: response.data.username,
          }
          this.role = response.data.role || 'user'
          this.isLogin = true // isLogin 상태 업데이트 추가
          return true
        }
        
        return false
      } catch (error) {
        // 상세한 오류 정보 로깅
        console.error("세션 갱신 실패:", error.message)
        if (error.response) {
          console.error("응답 상태:", error.response.status)
          console.error("응답 데이터:", error.response.data)
        }
        
        // 401 오류인 경우 조용히 실패 처리
        if (error.response && error.response.status === 401) {
          console.log("리프레시 토큰이 만료되었거나 유효하지 않습니다.")
          this.resetUserState()
          return false
        }
        
        // 기타 오류 처리
        this.resetUserState()
        return false
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
        }else{
          console.log(`인증 실패 이유: ${response.data.reason || "unknown"}`);
          console.log(`메시지: ${response.data.message || ""}`);
        }

        if (response.data.reason === "no_authentication") {
          // toast.info('로그인이 필요합니다.');
        }
        
        this.resetUserState();
        return false;
      } catch (error) {
        this.resetUserState();
        return false;
      }
    }
    
  }
});
