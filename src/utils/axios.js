import axios from 'axios'
import { toast } from 'vue3-toastify';

// 기본 axios 인스턴스
const axiosInstance = axios.create({
    withCredentials: true,
})

// 인터셉터 없는 인스턴스
export const axiosNoInterceptor = axios.create({
    withCredentials: true,
})

// 응답 인터셉터 추가
// axios.js
axiosInstance.interceptors.response.use(
    response => response,
        error => {
        if (error.response) {
            const errorCode = error.response.data?.code;
            
            if (errorCode === 'SESSION_EXPIRED' || errorCode === 'LOGIN_REQUIRED') {
            // 쿠키 정리
            document.cookie = "RTOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "ATOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
            // 현재 페이지가 로그인이나 회원가입 페이지가 아닐 때만 메시지 표시
            if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
                toast.info('로그인이 필요합니다.', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
                
                if (window.handleSessionExpired) {
                window.handleSessionExpired();
                }
            }
            }
        }
        return Promise.reject(error);
        }
    );

export default axiosInstance