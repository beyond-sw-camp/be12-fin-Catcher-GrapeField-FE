import { defineStore } from "pinia";
import axios from "axios";

export const useNotificationStore = defineStore("notification", {
    state: () => ({
        notifications: []
    }),
    actions: {
        async fetchNotifications() {
            try {
                // withCredentials: true를 설정하여 쿠키를 요청에 포함
                const response = await axios.get("/api/notify/all", {
                    withCredentials: true
                });
                console.log("모든 알림 API 응답:", response.data);
                return response.data;
            } catch (error) {
                console.error("알림 목록 조회 실패:", error);
                return [];
            }
        },
        
        async markAsRead(notificationIdx) {
            try {
                const response = await axios.post(`/api/notify/${notificationIdx}/read`, {}, {
                    withCredentials: true
                });

                return true;
            } catch (error) {
                console.error("알림 읽음 처리 실패:", error);
                return false;
            }
        },
        
        async markAllAsRead() {
            try {
                const response = await axios.post("/api/notify/read-all", {}, {
                    withCredentials: true
                });

                return true;
            } catch (error) {
                console.error("모든 알림 읽음 처리 실패:", error);
                return false;
            }
        },

        //읽지 않은 알림 가져오기
        async fetchUnreadNotifications() {
            try {
                const response = await axios.get("/api/notify/unread", {
                    withCredentials: true
                });
            
                console.log("읽지 않은 알림 API 응답:", response.data);
                return response.data;
                } catch (error) {
                console.error("읽지 않은 알림 목록 조회 실패:", error);
                return [];
                }
        },


        //알림 삭제
        async removeNotification(notificationIdx) {
            try {
                const response = await axios.delete(`/api//notify/delete/${notificationIdx}`, {
                    withCredentials: true
                });
                return response.status === 200  || response.status === 204;
                } catch (error) {
                console.error("알림 삭제 실패:", error);
                return false;
                }
        },
    },
});