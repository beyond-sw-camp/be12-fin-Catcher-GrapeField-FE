import { defineStore } from 'pinia'
import axios from "axios";
export const usePostStore = defineStore('post', {
    state: () => ({
    }),
    actions: {
        async getPostList(idx, page, type) {
            try {
            const response = await axios.get(`/api/post/list/${idx}`, {
                params: { page: page, type:type}
            })
            return response.data;
            } catch (error) {
            console.error("게시글 목록 불러오기 에러:", error);
            return false;
            }
        },
        
        async getPinnedPostList(idx) {
            try {
                const response = await axios.get(`/api/post/list/${idx}`, {})
                console.log(response.data)
                return response.data;
            }catch (error) {
                console.error("게시글 목록 불러오기 에러:", error);
                return false;
            }
        },
    }
})