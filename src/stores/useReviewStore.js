import { defineStore } from 'pinia'
import axios from "axios";
export const useReviewStore = defineStore('review', {
    state: () => ({
    }),
    actions: {
        async getReviewList(idx, page, rating = null) {
            try {
                const params = { page: page }
                                
                // rating이 있을 경우에만 파라미터 추가
                if (rating !== null && rating !== 0) {
                    params.rating = rating
                }
        
                const response = await axios.get(`/api/review/${idx}`, { params })
                return response.data;
            } catch (error) {
                console.error("한줄평 불러오기 에러:", error);
                return false;
            }
        },
        async setReview(formData) {
            try {
                const response = await axios.post("/api/review/register", formData, {
                    // 필요하다면 헤더 추가
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                return response.data;
            } catch (error) {
                const message = error.response?.data?.message || '한줄평 등록 실패';
                console.error(message);
                throw error; // 에러를 다시 throw하여 호출자가 처리할 수 있게 함
            }
        },
    }
})