import { defineStore } from 'pinia'
import axios from "axios";
export const useEventsStore = defineStore('events', {
    state: () => ({
        selectedTab: '상세 정보',
        eventVisits: [],
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
                // 이벤트 상세 정보를 성공적으로 가져왔을 때 방문 내역 저장
                if (response.data) {
                    // 이벤트 제목 가져오기
                    const eventTitle = response.data.title || `이벤트 #${idx}`;
                    // 방문 내역 저장 함수 호출
                    this.addEventVisit(idx, eventTitle);
                }
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

        //방문 기록
        loadEventVisits() {
            try {
                const storedVisits = localStorage.getItem('eventVisitHistory');
                if (storedVisits) {
                this.eventVisits = JSON.parse(storedVisits);
                }
            } catch (error) {
                console.error('방문 기록 불러오기 오류:', error);
                this.eventVisits = [];
            }
        },
        addEventVisit(eventIdx, eventTitle) {
            // 중복 제거
            this.eventVisits = this.eventVisits.filter(item => item.idx !== eventIdx);
            
            // 새 방문 추가
            this.eventVisits.unshift({
                idx: eventIdx,
                title: eventTitle,
                timestamp: new Date().toISOString()
            });
            
            // 최대 10개로 제한
            if (this.eventVisits.length > 10) {
                this.eventVisits = this.eventVisits.slice(0, 10);
            }
            
            // 로컬 스토리지에 저장
            localStorage.setItem('eventVisitHistory', JSON.stringify(this.eventVisits));
        },

        //방문 기록 삭제
        removeEventVisit(eventIdx) {
            this.eventVisits = this.eventVisits.filter(visit => visit.idx !== eventIdx);
            localStorage.setItem('eventVisitHistory', JSON.stringify(this.eventVisits));
        },
        clearEventVisits() {
            this.eventVisits = [];
            localStorage.removeItem('eventVisitHistory');
        }
    }
})