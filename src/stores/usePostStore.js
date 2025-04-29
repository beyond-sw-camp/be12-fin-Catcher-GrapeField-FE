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
                //console.log(response.data)
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

        async setPost(formData) {
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
                throw error;
            }
        },

        //게시글 조회수 증가
        async setViewCnt(postIdx){
            try{
                await axios.get("/api/post/view", {params:{postIdx:postIdx}})
            }catch(err){
                console.error("조회수 증가 에러",err);
            }
        },
    }
})