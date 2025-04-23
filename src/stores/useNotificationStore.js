import { defineStore } from "pinia";
import axios from "axios";

export const useNotificationStore = defineStore("notification", {
    state: () => ({
        notifications: []
    }),
    actions: {
        //시간 상관없이 모든 알림(미래 알림까지)
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

        //현재 시간에 맞춘 선택적 알림
        async fetchAvailableNotifications() {
            try {
                // withCredentials: true를 설정하여 쿠키를 요청에 포함
                const response = await axios.get("/api/notify/noti", {
                    withCredentials: true
                });
                console.log("시간에 맞춘춘 알림 API 응답:", response.data);
                return response.data;
            } catch (error) {
                console.error("알림 목록 조회 실패:", error);
                return [];
            }
        },
        
        async markAsRead(notificationIdx) {
            try {
                const response = await axios.put(`/api/notify/${notificationIdx}/read`, {}, {
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

        async togglePersonalNotify(scheduleIdx) {
            try {
                await axios.post(`/api/notify/personal/${scheduleIdx}/toggle`, {}, { withCredentials: true })
                return true
            } catch (e) {
                console.error("개인 일정 알림 변경 실패", e)
                return false
            }
        }
    },
});