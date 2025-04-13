import { defineStore } from 'pinia'
import axios from "axios";
export const useEventsStore = defineStore('events', {
    state: () => ({
    }),
        //추천(현재 진행중 or 진행 예정인 공연 중에서 즐겨찾기가 많은 이벤트)
        //인기(진행 여부와 상관 없이 즐겨찾기가 많은 이벤트)
        //신규(진행 예정인 공연)
    actions: {
        //메인페이지 전용, 최대 10개만 가져오기
        async getMainEvents(category) {
            try {
                const response = await axios.get("/api/events/contents/main", {
                    params: { category: category}})
                return response.data;
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        },

        //공연/전시 더보기 페이지에서 카테고리별로 무한 스크롤 형식
        async getMoreEventList(category, array, page, size){
            try {
                const response = await axios.get("/api/events/contents/list", {
                    params: {category: category, array:array, page:page, size:size}})
                return response.data;
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        },


        //오픈 예정(티켓팅 오픈이 7일 이내인 공연)
        //종료 예정(티켓팅 종료가 7일 이내인 공연)
        async getMainEventsTicketSchedule(category, page, size){
            try {
                const response = await axios.get("/api/events/ticket/main", {
                    params: {category: category, page:page, size:size}})
                return response.data;
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        },
        //오픈예정, 종료예정 더보기 페이지에서 무한 스크롤 형식
        async getMoreEventsTicketSchedule(type, page, size){
            try {
                const response = await axios.get("/api/events/ticket/list", {
                    params: {type: type, page:page, size:size}})
                return response.data;
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        },
    }
})