import { defineStore } from 'pinia'
import axiosInstance, { axiosNoInterceptor } from '@/utils/axios' // 커스텀 axios 인스턴스
import router from '@/router';
import { toast } from 'vue3-toastify';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    user: null,
    role: '',
    userDetail: null, // 마이페이지용 상세 정보 저장
  }),
  //추후 운영 환경에서는 persist 삭제 
  persist: {
    storage: sessionStorage,
  },
  getters: {
    userIdx: (state) => state.user?.userIdx,
    email: (state) => state.user?.email,
    username: (state) => state.user?.username,
    profileImg: (state) => state.userDetail?.profileImg || '/images/default/profile.png',
  },
  actions: {
    async login(email, password) {
      try {
        // 로그인 시도 전 기존 만료된 토큰 정리 
        document.cookie = "RTOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "ATOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
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
        console.error('로그인 오류:', error);
        
        // 오류 응답 상세 분석
        if (error.response) {
          const statusCode = error.response.status;
          const errorData = error.response.data;
          
          // 특정 오류 코드에 따른 맞춤형 메시지
          if (statusCode === 403) {
            return { 
              success: false, 
              message: errorData.message || '이메일 인증이 필요합니다.',
              code: 'EMAIL_VERIFICATION_REQUIRED'
            };
          } else if (statusCode === 401) {
            return { 
              success: false, 
              message: errorData.message || '이메일 또는 비밀번호가 일치하지 않습니다.',
              code: 'INVALID_CREDENTIALS'
            };
          } else if (statusCode === 429) {
            return {
              success: false,
              message: '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
              code: 'TOO_MANY_ATTEMPTS'
            };
          }
          
          return { 
            success: false, 
            message: errorData.message || '로그인 실패',
            code: errorData.code
          };
        }
        
        // 네트워크 오류 등 기타 예외 처리
        return { 
          success: false, 
          message: '서버 연결에 실패했습니다. 네트워크 연결을 확인해주세요.',
          code: 'NETWORK_ERROR'
        };
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
          this.isLogin = true
          return true
        }
        
        return false
      } catch (error) {
        // 상세한 오류 정보 로깅
        console.error("세션 갱신 실패:", error.message)
        if (error.response) {
          console.error("응답 상태:", error.response.status)
          console.error("응답 데이터:", error.response.data)
          
          // 특정 오류 코드 처리
          if (error.response.data?.code === 'SESSION_EXPIRED') {
            console.log("저장된 리프레시 토큰이 없습니다. 쿠키 삭제 필요");
            this.handleAuthError();
            return false;
          }
        }
        
        // 401 오류인 경우
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
    async fetchUserDetail() {
      try {
        const res = await axiosInstance.get("/api/user/mypage", { withCredentials: true });
        this.userDetail = res.data;
      } catch (e) {
        console.error("유저 정보 조회 실패", e);
        this.userDetail = null;
      }
    },
    
    resetUserState() {
      this.isLogin = false;
      this.user = null;
      this.role = '';
      sessionStorage.removeItem('user');
      
      // 쿠키 삭제 (선택적)
      document.cookie = "RTOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "ATOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
        } else {
          console.log(`인증 실패 이유: ${response.data.reason || "unknown"}`);
          console.log(`메시지: ${response.data.message || ""}`);
          
          // 특정 오류 이유에 따른 처리
          if (response.data.reason === "no_authentication") {
            console.log('인증 정보가 없습니다.');
          } else if (response.data.reason === "refresh_failed") {
            console.log('리프레시 토큰 갱신 실패');
            // 세션 만료 시 쿠키 정리
            document.cookie = "RTOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "ATOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        }
        
        this.resetUserState();
        return false;
      } catch (error) {
        console.error('인증 상태 확인 중 오류:', error);
        this.resetUserState();
        return false;
      }
    },
  }

});
