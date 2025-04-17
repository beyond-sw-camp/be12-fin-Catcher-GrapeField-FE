import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';

const axiosInstance = axios.create({
    withCredentials: true,
});

// 401 오류 → Refresh Token 재발급 시도
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const userStore = useUserStore();
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const success = await userStore.refreshToken();

            if (success) {
                return axiosInstance(originalRequest);
            } else {
                userStore.handleAuthError(); //로그아웃 처리
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
