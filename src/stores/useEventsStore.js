import { defineStore } from 'pinia'
import axios from "axios";
export const useEventsStore = defineStore('events', {
    state: () => ({
    }),
    actions: {
        async eventList(type) {
            try {
                const response = await axios.get("/api/events/list", {
                    // params: {
                    // date: formatted,
                    // },
                });
            }catch (error) {
                console.error("공연/전시 목록 불러오기 에러:", error);
                return false;
            }
        }
    }
})