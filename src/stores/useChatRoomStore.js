import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'
import { connect as createWebSocketConnection, stompClient } from '@/utils/webSocketClient'

export const useChatRoomStore = defineStore('chatRoom', {
    state: () => ({
        roomData: null,
        messages: [],
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
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
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
                    isMe: msg.userIdx === data.currentUserIdx,
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

        connectWebSocket(roomId, token) {
            createWebSocketConnection(client => {
                this._stompSubscription = client.subscribe(
                    `/topic/chat.room.${roomId}`,
                    this.handleIncomingMessage
                )
            }, token)
        },

        disconnectWebSocket() {
            if (this._stompSubscription) {
                this._stompSubscription.unsubscribe()
                this._stompSubscription = null
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