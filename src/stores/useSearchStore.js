import { defineStore } from "pinia";
import axios from "axios";

export const useSearchStore = defineStore("search", {
    state: () => ({
        selectedSearchTap: "통합 검색",
        keyword: "",
    }),
    actions: {
        setTab(tab) {
        this.selectedSearchTap = tab;
        },
        setKeyword(kw) {
        this.keyword = kw;
        },
        async getALLSearchList(keyword) {
        try {
            const response = await axios.get("/api/search/all", {
            params: { keyword: keyword },
            });
            return response.data;
        } catch (error) {
            console.error("전체 검색 불러오기 에러:", error);
            return false;
        }
        },
        async getEventsSearchList(keyword, page = 0, size = 12) {
        try {
            const response = await axios.get("/api/search/events", {
            params: { keyword, page, size },
            });
            return response.data;
        } catch (error) {
            console.error("공연/전시 검색 불러오기 에러:", error);
            return false;
        }
        },
        async getPostsSearchList(keyword, page = 0, size = 10) {
        try {
            const response = await axios.get("/api/search/posts", {
            params: { keyword, page, size },
            });
            return response.data;
        } catch (error) {
            console.error("한줄평 검색 불러오기 에러:", error);
            return false;
        }
        },
        async getReviewsSearchList(keyword, page = 0, size = 10) {
        try {
            const response = await axios.get("/api/search/reviews", {
            params: { keyword, page, size },
            });
            return response.data;
        } catch (error) {
            console.error("한줄평 검색 불러오기 에러:", error);
            return false;
        }
        },

        // 결과 내 재검색
        async getEventsRefineSearchList(keywords, page = 0, size = 12) {
        try {
            const response = await axios.get("/api/search/events/refine", {
            params: { keywords, page, size },
            paramsSerializer: (params) => {
                // 배열 파라미터 직렬화 (keywords=aaa&keywords=bbb 형태로 보내기 위해)
                return new URLSearchParams(params).toString();
            },
            });
            return response.data;
        } catch (error) {
            console.error("공연/전시 결과 내 재검색 에러:", error);
            return false;
        }
        },

        async getPostsRefineSearchList(keywords, page = 0, size = 12) {
            try {
                const response = await axios.get("/api/search/posts/refine", {
                params: { keywords, page, size },
                paramsSerializer: (params) => {
                    // 배열 파라미터 직렬화 (keywords=aaa&keywords=bbb 형태로 보내기 위해)
                    return new URLSearchParams(params).toString();
                },
                });
                return response.data;
            } catch (error) {
                console.error("게시글 결과 내 재검색 에러:", error);
                return false;
            }
        },

        async getReviewsRefineSearchList(keywords, page = 0, size = 12) {
            try {
                const response = await axios.get("/api/search/reviews/refine", {
                params: { keywords, page, size },
                paramsSerializer: (params) => {
                    // 배열 파라미터 직렬화 (keywords=aaa&keywords=bbb 형태로 보내기 위해)
                    return new URLSearchParams(params).toString();
                },
                });
                return response.data;
            } catch (error) {
                console.error("한줄평 결과 내 재검색 에러:", error);
                return false;
            }
        },
    },
});
