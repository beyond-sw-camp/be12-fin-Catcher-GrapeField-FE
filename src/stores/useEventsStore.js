import { defineStore } from 'pinia'
import axios from "axios";
export const useEventsStore = defineStore('events', {
    state: () => ({
        selectedTab: '상세 정보',
    }),
        //추천(현재 진행중 or 진행 예정인 공연 중에서 즐겨찾기가 많은 이벤트)
        //인기(진행 여부와 상관 없이 즐겨찾기가 많은 이벤트)
        //신규(진행 예정인 공연)
    actions: {
        setTab(tab) {
            this.selectedTab = tab;
        },
        //메인페이지 전용, 최대 10개만 가져오기
        async getMainEvents(category) {
            try {
                const response = await axios.get("/api/events/contents/main", {
                    params: { category: category}})
                //console.log(response.data)
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
        async getMainEventsTicketSchedule(){
            try {
                const response = await axios.get("/api/events/ticket/main", {})
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

        async getEventDetail(idx) {
            try {
                const response = await axios.get(`/api/events/${idx}`, {})
                //console.log(response.data)
                return response.data;
            }catch (error) {
                console.error("상세 정보 불러오기 에러:", error);
                return false;
            }
        },

        async getParticipantDetail(idx) {
            try {
                const response = await axios.get(`/api/participant/${idx}`, {});
                return response.data;
            }catch (error) {
                console.error("출연진, 기업 정보 불러오기 에러:", error);
                return false;
            }
        },

        async getEventDetailImages(idx) {
            try {
                const response = await axios.get(`/api/events/images/${idx}`, {});
                return response.data;
            }catch (error) {
                console.error("출연진, 기업 정보 불러오기 에러:", error);
                return false;
            }
        },

        //공연/전시 즐겨찾기 등록 및 해제(토글식)
        async setEventInterst(idx){
            try{
                const response = await axios.patch("/api/interest/toggle", null, { params: { idx: idx }} )
                return response.data;
            }catch (error) {
                console.error("즐겨찾기 등록 에러:", error);
                return false;
            }
        },

        //공연전시 알림 등록 및 해제(토글식)
        async setNotify(idx){
            try{
                const response = await axios.patch("/api/notify/event/toggle", null, { params: { idx: idx }} )
                return response.data;
            }catch (error) {
                console.error("알림림 등록 에러:", error);
                return false;
            }
        },

        async setViewCnt(postIdx){
            try{
                await axios.get("/api/post/view", {params:{postIdx:postIdx}})
            }catch(err){
                console.error("조회수 증가 에러",err);
            }
        }
    }
})