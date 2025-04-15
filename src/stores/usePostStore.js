import { defineStore } from 'pinia'
import axios from "axios";
export const usePostStore = defineStore('post', {
    state: () => ({
        currentBoardIdx: null,
    }),
    actions: {
        setCurrentBoardIdx(idx) {
            this.currentBoardIdx = idx;
        },
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
        //TODO : 상단 고정 게시글 목록 호출
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

        async getPostDetail(idx) {
            try {
            const response = await axios.get(`/api/post/${idx}`, {})
            return response.data;
            } catch (error) {
            console.error("게시글 상세 정보 불러오기 에러:", error);
            return false;
            }
        },

        async setPost(postData, files) {
            const formData = new FormData();
            formData.append('postType', postData.postType);
            formData.append('title', postData.title);
            formData.append('content', postData.content);
            formData.append('isVisible', postData.isVisible);
            // 파일이 있는 경우 추가
            if (files && files.length > 0) {
                files.forEach(file => {
                    formData.append('files', file);
                });
            }
            try {
                const response = await axios.post("/api/post/register", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                return response.data;
            } catch (error) {
                const message = error.response?.data?.message || '게시글 등록 실패';
                console.error(message);
                throw error; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있게 함
            }
        },
    }
})