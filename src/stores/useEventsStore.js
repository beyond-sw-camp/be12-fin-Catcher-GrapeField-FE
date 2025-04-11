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

        //추천(현재 진행중 or 진행 예정인 공연 중에서 즐겨찾기가 많은 이벤트)
        //인기(진행 여부와 상관 없이 즐겨찾기가 많은 이벤트)
        //신규(진행 예정인 공연)
        async getRecommendEventList(category){
            try {
                const response = await axios.get("/api/events/contents/recommend", {
                    params: {category: category, page:page, size:size}})
                return response.data;
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        },

        //오픈 예정(티켓팅 오픈이 7일 이내인 공
        // //종료 예정(티켓팅 종료가 3일 이내인 공연)연)
        async getOpenAndCloseEventList(category, page, size){
            try {
                const response = await axios.get("/api/events/contents/open", {
                    params: {category: category, page:page, size:size}})
                return response.data;
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        },
    }
})