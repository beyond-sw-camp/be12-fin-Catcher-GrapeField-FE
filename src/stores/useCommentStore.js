import { defineStore } from 'pinia'
import axios from "axios";
export const useCommentStore = defineStore('comment', {
    state: () => ({
    }),
    actions: {
        async getCommentList(idx, page) {
            try {
            const response = await axios.get(`/api/comment/${idx}`, {
                params: { page: page}
            })
            return response.data;
            } catch (error) {
            console.error("댓글 불러오기 에러:", error);
            return false;
            }
        },
        async setComment(formData) {
            try {
                const response = await axios.post("/api/comment/register", formData, {
                    // 필요하다면 헤더 추가
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                return response.data;
            } catch (error) {
                const message = error.response?.data?.message || '댓글 등록 실패';
                console.error(message);
                throw error; // 에러를 다시 throw하여 호출자가 처리할 수 있게 함
            }
        },
    }
})