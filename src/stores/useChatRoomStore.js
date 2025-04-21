//useChatRoomStore.js
import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'
import { connect as createWebSocketConnection, stompClient } from '@/utils/webSocketClient'
import { Client } from '@stomp/stompjs'
const loginUser = JSON.parse(sessionStorage.getItem('user'))?.user
const currentUserIdx = loginUser?.userIdx

export const useChatRoomStore = defineStore('chatRoom', {
    state: () => ({
        roomData: null,
        messages: [],
        stompClient: null,
        // currentUserIdx: null,
        highlightedTimes: [],
        participantCount: 0,
        roomTitle: '',
        loading: false,
        error: null,
        showNewMessageButton: false,
        hearts: []
    }),

    getters: {
        formattedMessages: (state) => state.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
        })),
        highlightList: (state) => state.highlightedTimes.map(h => ({
            id: h.id,
            time: new Date(h.time)
        }))
    },

    actions: {
        async fetchChatRoom(roomIdx, token) {
            this.loading = true
            this.error = null
            try {
                const { data } = await axios.get(`/api/chat/${roomIdx}`, {
                    withCredentials: true,
                    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
                })
                this.roomData = data
                this.roomTitle = data.roomName
                this.participantCount = data.memberList.length
                this.messages = data.messageList.map(msg => ({
                    id: msg.messageIdx,
                    sender: msg.username,
                    avatar: msg.profileImageUrl,
                    content: msg.content,
                    timestamp: msg.createdAt,
                    isMe: msg.userIdx === currentUserIdx,
                    isHighlighted: msg.isHighlighted
                }))
                this.highlightedTimes = data.highlightList.map(h => ({ id: h.idx, time: h.startTime }))
                return data
            } catch (err) {
                this.error = err
                throw err
            } finally {
                this.loading = false
            }
        },
        // 채팅방 하트 로직
        sendHeart(roomId) {
            console.log('🧪 stompClient 상태 확인:', this.stompClient)
          
            if (!this.stompClient || !this.stompClient.connected) {
              console.warn('❗ stompClient 연결 안 됨');
              return
            }
          
            this.stompClient.publish({
              destination: `/app/chat.like.${roomId}`,
              body: JSON.stringify({
                roomIdx: roomId
              })
            })
          },
          
          
          
        /*
        async likeRoom(roomIdx) {
            this.loading = true
            this.error = null
            try {
                const { data } = await axios.post('/api/like', { roomIdx })
                return data
            } catch (err) {
                this.error = err
                throw err
            } finally {
                this.loading = false
            }
        }, */

        connectWebSocket(roomId, token) { // 리팩터링 필요. 실제로 쓸모가 없는 것 같음..
            createWebSocketConnection(client => {
                this.stompClient = client
            // createWebSocketConnection(client => {
                this._stompSubscription = client.subscribe(
                    `/topic/chat.room.${roomId}`,
                    this.handleIncomingMessage,

                );
                this._stompSubscription = client.subscribe(
                    `/topic/chat.room.${roomId}`,
                    frame => this.handleIncomingMessage(frame)
                );
                console.log(`[STOMP] 구독 완료 → /topic/chat.room.${roomId}`);
                // 하트 실시간 구독
    this._likeSubscription = client.subscribe(
        `/topic/chat.room.likes.${roomId}`,
        (frame) => {
          const heart = JSON.parse(frame.body)
          console.log("❤️ 하트 수신!", heart)
  
          // 하트 수 증가
          if (this.roomData) {
            this.roomData.heartCnt += 1
          }
  
          // 하트 애니메이션
          this.triggerHearts()
        }
      )
    
      console.log(`[STOMP] 하트 구독 완료 → /topic/chat.room.likes.${roomId}`)
            }, token)
        },

        disconnectWebSocket() {
            if (this._stompSubscription) {
                this._stompSubscription.unsubscribe()
                this._stompSubscription = null
            }
            if (this._likeSubscription) {
                this._likeSubscription.unsubscribe()
                this._likeSubscription = null
              }
        },

        handleIncomingMessage(frame) {
            const msg = JSON.parse(frame.body)
            const newMsg = {
                id: msg.messageIdx,
                sender: msg.username,
                avatar: msg.profileImageUrl,
                content: msg.content,
                timestamp: msg.createdAt,
                isMe: msg.userIdx === this.roomData.currentUserIdx,
                isHighlighted: msg.isHighlighted
            }
            this.messages.push(newMsg)
            if (!newMsg.isMe) this.showNewMessageButton = true
            else this.scrollToBottom()
        },

        scrollToBottom(chatBodyRef) {
            if (!chatBodyRef) return
            chatBodyRef.scrollTop = chatBodyRef.scrollHeight
        },

        triggerHearts() {
            for (let i = 0; i < 5; i++) {
                const id = Date.now() + Math.random()
                setTimeout(() => {
                    this.hearts.push({ id, x: 10 + Math.random() * 20, y: 0 })
                    setTimeout(() => {
                        this.hearts = this.hearts.filter(h => h.id !== id)
                    }, 10000)
                }, i * 150)
            }
        }
    }
})

// HMR for Vite
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useChatRoomStore, import.meta.hot))
}