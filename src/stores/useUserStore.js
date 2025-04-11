import { defineStore } from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    user: null, // 사용자 정보를 저장할 객체
    role: '', // 사용자 역할
  }),
  persist: {
    storage: sessionStorage,
  },
  getters: {
    // 필요한 사용자 정보를 쉽게 접근할 수 있는 getter 추가
    userIdx: (state) => state.user?.userIdx,
    email: (state) => state.user?.email,
    username: (state) => state.user?.username,
  },
  actions: {  // actions 객체 추가
    // 로그인
    async login(email, password) {
      try {
        const response = await axios.post("/api/login", {
          email,
          password,
        }, {
          withCredentials: true // 쿠키를 요청/응답에 포함시킵니다
        });
        
        // 로그인 응답에서 사용자 정보 가져오기
        if (response.data && response.data.authenticated) {
          this.user = {
            userIdx: response.data.userIdx,
            email: response.data.email,
            username: response.data.username,
          };
          this.role = response.data.role || 'user';
          this.isLogin = true;
          
          // axios의 모든 요청에 쿠키 포함 설정
          axios.defaults.withCredentials = true;
          
          return { success: true };
        }
        
        return { success: false, message: '로그인 실패' };
      } catch (error) {
        const message = error.response?.data?.message || '로그인 실패';
        return { success: false, message };
      }
    },
    
    // 로그아웃
    async logout() {
      try {
        // 로그아웃 URL을 SecurityConfig와 일치시킴
        const response = await axios.post("/api/logout", {}, {
          withCredentials: true  // 쿠키 포함하여 요청
        });
        
        // 로그인 상태 초기화
        this.resetUserState();
        
        // axios 기본 설정 초기화
        delete axios.defaults.headers.common['Authorization'];
        
        return true;
      } catch (error) {
        console.error("로그아웃 에러:", error);
        // 에러가 발생해도 사용자 상태는 초기화
        this.resetUserState();
        return false;
      }
    },
    
    // 회원가입
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
        const response = await axios.post("/api/user/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true  // CSRF 토큰이 필요한 경우를 위해 추가
        });
        return { success: true, data: response.data };
      } catch (error) {
        const message = error.response?.data?.message || '회원가입 실패';
        return { success: false, message };
      }
    },
    
    // 토큰 갱신 (필요시)
    async refreshToken() {
      try {
        const response = await axios.post("/api/refresh-token", {}, {
          withCredentials: true  // 쿠키 기반 인증을 위해 추가
        });
        
        // 쿠키 기반 인증에서는 토큰 관리가 필요 없음
        // 세션 정보만 업데이트
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
        // 갱신 실패 시 로그아웃 처리
        this.resetUserState();
        return false;
      }
    },
    
    // 사용자 상태 초기화 (로그아웃시 사용, 재사용 가능한 헬퍼 메서드)
    resetUserState() {
      this.isLogin = false;
      this.user = null;
      this.role = '';
      sessionStorage.removeItem('user');
    },
    
    // 사용자 정보 업데이트 (프로필 수정 등에 사용)
    updateUserInfo(updatedInfo) {
      this.user = { ...this.user, ...updatedInfo };
    }
  }
})