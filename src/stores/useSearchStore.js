import { defineStore } from 'pinia'
import axios from "axios";

export const useSearchStore = defineStore('search', {
    state: () => ({
    }),
    actions: {
        async getALLSearchList(keyword) {
            try {
            const response = await axios.get("/api/search/all", {
                params: { keyword: keyword}
            })
            return response.data;
            } catch (error) {
            console.error("전체 검색 결과 불러오기 에러:", error);
            return false;
            }
        },
        
    }
})