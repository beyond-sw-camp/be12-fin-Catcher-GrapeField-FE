import { defineStore } from 'pinia'
import axios from "axios";

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
  }),
  actions: {
    async mainList(year, month) {
      try {
        // 1. 날짜 객체 생성
        const firstDay = new Date(year, month - 1, 1);
        const formatted = firstDay.toISOString().split('.')[0]; // '2025-03-31T15:00:00'
  
        // 2. 백엔드로 요청
        const response = await axios.get("/api/events/calendar", {
          params: {
            date: formatted,
          },
        });
  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("캘린더 불러오기 에러:", error);
        return false;
      }
    },

    //마이페이지에서 개인 일정 등록
    async setPersonalSchedule(payload){
      await axios.post('/api/personal_calendar/register', payload)
      console.log('일정 추가 완료:', payload)
    },

    //마이페이지에서 캘린더 전체 일정 불러오기
    async getAllSchedule(date){
      try{
        const reponse = await axios.get("/api/calendar/list", { params: { date:date } })
        console.log(reponse.data);
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
        console.log(reponse.data);
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
        console.log(reponse.data);
        return reponse.data;
      }catch (error) {
        console.error("사용자 개인 캘린더 불러오기 에러:", error);
        return false;
      }
      
    },
  }
})