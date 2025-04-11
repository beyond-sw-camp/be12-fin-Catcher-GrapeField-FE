import { defineStore } from 'pinia'
import axios from "axios";
export const useEventsStore = defineStore('events', {
    state: () => ({
    }),

    //공연/전시 더보기 페이지에서 카테고리별로 무한 스크롤 형식으로 불러오기
    actions: {
        async getEventList(category, page, size) {
            try {
                const response = await axios.get("/api/events/contents/list", {
                    params: {category: category, page:page, size:size}})
                return response.data;
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        },

        async getRecommendEventList(category, page, size){
            try {
                const response = await axios.get("/api/events/contents/list", {
                    params: {category: category, page:page, size:size}})
                return response.data;
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        }
    }
})