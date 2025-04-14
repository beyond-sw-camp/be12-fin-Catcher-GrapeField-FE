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
    }
  }
  
})