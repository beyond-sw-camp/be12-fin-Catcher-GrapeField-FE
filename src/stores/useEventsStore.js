import { defineStore } from 'pinia'
import axios from "axios";
export const useEventsStore = defineStore('events', {
    state: () => ({
    }),
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
        }
    }
})