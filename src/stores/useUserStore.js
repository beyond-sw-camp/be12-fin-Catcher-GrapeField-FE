import { defineStore } from 'pinia'
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    user: null, // 사용자 정보를 저장할 객체
    role: '', // 사용자 역할
    token: null, // JWT 토큰
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
  actions: {
    // 로그인
    async login(email, password) {
      try {
        const response = await axios.post("/api/login", {
          email,
          password,
        });
        
        // 백엔드에서 JWT 토큰을 받았다고 가정
        const token = response.data.token;
        this.token = token;
        
        // 토큰에서 사용자 정보 추출 (실제 구현 시)
        const decoded = jwtDecode(token);
        this.user = {
          userIdx: decoded.userIdx,
          email: decoded.email,
          username: decoded.username,
          // 기타 필요한 정보
        };
        this.role = decoded.role || 'user';
        
        // 토큰을 헤더에 자동 추가하도록 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return { success: true };
      } catch (error) {
        // 백엔드에서 보낸 메시지 추출
        const message = error.response?.data?.message || '로그인 실패';
        return { success: false, message };
      }
    },
    
    // 로그아웃
    async logout() {
      try {
        const response = await axios.post("/api/logout");
        
        // 로그인 상태 초기화
        this.resetUserState();
        
        // 인증 헤더 제거
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
        const response = await axios.post("/api/refresh-token", {
          token: this.token
        });
        
        const newToken = response.data.token;
        this.token = newToken;
        
        // 토큰 정보 갱신
        // const decoded = jwtDecode(newToken);
        // this.user = { ...this.user, ...필요한 정보 업데이트 };
        
        // 헤더 업데이트
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        return true;
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
        // 토큰 갱신 실패 시 로그아웃 처리
        this.resetUserState();
        return false;
      }
    },
    
    // 사용자 상태 초기화 (재사용 가능한 헬퍼 메서드)
    resetUserState() {
      this.isLogin = false;
      this.user = null;
      this.role = '';
      this.token = null;
    },
    
    // 사용자 정보 업데이트 (프로필 수정 등에 사용)
    updateUserInfo(updatedInfo) {
      this.user = { ...this.user, ...updatedInfo };
    }
  }
})