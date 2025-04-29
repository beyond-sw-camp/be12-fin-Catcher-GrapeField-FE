import { defineStore } from 'pinia'
import axios from "axios";

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: [],
    selectedCategories: ['뮤지컬', '연극', '콘서트', '전시회', '클래식'], // 모든 카테고리 선택됨
    allCategories: [
      { name: '뮤지컬', label: 'MUSICAL', color: 'purple-700' },
      { name: '연극', label: 'PLAY', color: 'green-500' },
      { name: '콘서트', label: 'CONCERT', color: 'amber-500' },
      { name: '전시회', label: 'EXHIBITION', color: 'blue-500' },
      { name: '클래식', label: 'CALSSIC', color: 'fuchsia-700' }
    ],
  }),

  getters: {
    filteredEvents: (state) => {
      if (!state.events.startEvents || state.selectedCategories.length === 0)
        return state.events;

      const selectedLabels = state.selectedCategories.map(name => {
        const category = state.allCategories.find(cat => cat.name === name);
        return category?.label || null;
      }).filter(Boolean);

      // 원본 이벤트 복사 후 필터링된 이벤트만 남김
      return {
        ...state.events,
        startEvents: state.events.startEvents.filter(event =>
          selectedLabels.includes(event.category)
        )
      };
    }
  },

  actions: {
    async mainList(year, month) {
      try {
        const firstDay = new Date(year, month - 1, 1);
        const formatted = firstDay.toISOString().split('.')[0];

        const response = await axios.get("/api/events/calendar", {
          params: { date: formatted },
        });

        this.events = response.data;
        return response.data;
      } catch (error) {
        console.error("캘린더 불러오기 에러:", error);
        return false;
      }
    },

    toggleCategory(name) {
      const i = this.selectedCategories.indexOf(name);
      if (i === -1) {
        this.selectedCategories.push(name);
      } else {
        this.selectedCategories.splice(i, 1);
      }
    },

    //마이페이지에서 개인 일정 등록
    async setPersonalSchedule(payload){
      await axios.post('/api/personal_calendar/register', payload)
    },

    //마이페이지에서 캘린더 전체 일정 불러오기
    async getAllSchedule(date){
      try{
        const reponse = await axios.get("/api/calendar/list", { params: { date:date } })
        return reponse.data;
      }catch (error) {
        console.error("사용자 전체 캘린더 불러오기 에러:", error);
        return false;
      }
      
    },

    //마이페이지에서 공연/전시 관련 일정만 불러오기
    async getInterestSchedule(date){
      try{
        const reponse = await axios.get("/api/calendar/interest", { params: { date:date } })
        return reponse.data;
      }catch (error) {
        console.error("사용자 즐겨찾기 캘린더 불러오기 에러:", error);
        return false;
      }
      
    },

    //마이페이지에서 개인 일정만 불러오기
    async getPersonalSchedule(date){
      try{
        const reponse = await axios.get("/api/personal_calendar/list", { params: { date:date } })
        return reponse.data;
      }catch (error) {
        console.error("사용자 개인 캘린더 불러오기 에러:", error);
        return false;
      }
      
    },
  }
},);