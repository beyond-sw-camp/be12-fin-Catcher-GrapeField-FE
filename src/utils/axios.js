import axios from 'axios'

// 기본 axios 인스턴스
const axiosInstance = axios.create({
    withCredentials: true,
})

// 인터셉터 없는 인스턴스
export const axiosNoInterceptor = axios.create({
    withCredentials: true,
})

export default axiosInstance