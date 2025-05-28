//useChatRoomStore.js
import {acceptHMRUpdate, defineStore} from 'pinia'
import axios from 'axios'
import {connect as createWebSocketConnection} from '@/utils/webSocketClient'
import {computed, nextTick} from "vue";
import {useUserStore} from "@/stores/useUserStore";

export const useChatRoomStore = defineStore('chatRoom', {
        state: () => ({
        roomData: null,
        stompClient: null,
        highlightedTimes: [],
        showHighlightEffect: false,
        participantCount: 0,
        roomTitle: '',
        messages: [],
        page: 0,
        size: 100,
        hasNext: true,
        loading: false,
        error: null,
        showNewMessageButton: false,
        hearts: [],
        newMessage: '',
        chatBodyElement: null,
    }),
    getters: {
        formattedMessages: (state) => {
            const currentUserIdx = useUserStore().userIdx
            return state.messages.map(msg => ({
                ...msg,
                timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp),
                isMe: msg.hasOwnProperty('isMe')
                    ? msg.isMe
                    : msg.userIdx === currentUserIdx
            }))

        },
        highlightList: (state) => state.highlightedTimes.map(h => ({
            id: h.id,
            time: new Date(h.time)
        }))
    },

    actions: {
        getSubscriptionCount() {
            // if(this._stompSubscription) {console.log("[Store] _stompSubscription 존재:");}
            // if(this._likeSubscription) {console.log("[Store] _likeSubscription 존재:");}
            // if(this._highlightSubscription) {console.log("[Store] _highlightSubscription 존재:");}
            return [
                this._stompSubscription,
                this._likeSubscription,
                this._highlightSubscription
            ].filter(sub => !!sub).length
        }
        ,
        async fetchChatRoom(roomIdx, chatBody) {
            const chatBodyElement = chatBody.value
            this.loading = true
            this.error = null
            this.chatBodyElement = chatBodyElement
            try {
                const {data} = await axios.get(`/api/chat/${roomIdx}`, {withCredentials: true, headers: {}})
                this.roomData = data
                this.roomTitle = data.roomName
                this.participantCount = data.memberList.length
                this.highlightedTimes = data.highlightList.map(h => ({
                    id: h.idx,
                    messageIdx: h.messageIdx,
                    summary: h.description,
                    time1: new Date(h.startTime),
                    time2: new Date(h.endTime)
                }))
                this.messages = [];
                this.page = 0;
                this.hasNext = true;
                await this.loadInitialMessagesInPages(roomIdx);
                return data
            } catch (err) {
                console.log('🔴 채팅방 데이터 가져오기 실패:', err)
                this.error = err
                throw err
            } finally {
                this.loading = false
            }
        },
        async loadInitialMessagesInPages(roomIdx) {
            if (!this.hasNext) return;
            this.loading = true;
            try {
                const {data} = await axios.get(`/api/chat/${roomIdx}/messages`, {
                    params: {
                        page: this.page,
                        size: this.size
                    },
                    withCredentials: true,
                    headers: {}
                });
                console.log('📜 페이지네이션 메시지 응답:', data);
                this.messages = data.content.map(msg => ({
                    id: msg.messageIdx,
                    userIdx: msg.userIdx,
                    sender: msg.username,
                    avatar: msg.profileImageUrl,
                    content: msg.content,
                    timestamp: new Date(msg.createdAt),
                    isHighlighted: msg.isHighlighted
                })).reverse();
                this.hasNext = data.hasNext;
                this.page++;
            } catch(err){
                console.error('🔴 메시지 초기페이지 가져오기 실패:', err)
            } finally {
                this.loading = false;
            }
        },
        async loadOlderMessagesInPages(roomIdx) {
            if (this.loading || !this.hasNext) return;
            this.loading = true;
            // 1) 스크롤 컨테이너
            const container = this.chatBodyElement;
            // 2) prepend 전 높이 저장
            const prevHeight = container.scrollHeight;
            try {
                const {data} = await axios.get(`/api/chat/${roomIdx}/messages`, {
                    params: {
                        page: this.page,
                        size: this.size
                    },
                    withCredentials: true,
                    headers: {}
                });
                console.log('📜 loadmore 페이지네이션 메시지 응답:', data);
                const olderMessages = data.content.map(msg => ({
                    id: msg.messageIdx,
                    userIdx: msg.userIdx,
                    sender: msg.username,
                    avatar: msg.profileImageUrl,
                    content: msg.content,
                    timestamp: new Date(msg.createdAt),
                    isHighlighted: msg.isHighlighted
                })).reverse();
                this.messages = [...olderMessages, ...this.messages];
                this.hasNext = data.hasNext;
                this.page++;
                // // DOM 업데이트 후 스크롤 위치 보정
                // await this.scrollUpdate(container, prevHeight);
            } catch(err){
                console.error('🔴 메시지 더 많은 페이지 가져오기 실패:', err)
            } finally {
                this.loading = false;
            }
        },
        async scrollUpdate(container, prevHeight) {
            await nextTick();
            const newHeight = container.scrollHeight;
            container.scrollTop = newHeight - prevHeight;
        },
        addHighlightRealtime(highlightResp) {
            //('🟡 실시간 하이라이트 수신:', highlightResp)
            this.highlightedTimes.push({
                id: highlightResp.idx,
                messageIdx: highlightResp.messageIdx,
                summary: highlightResp.description,
                time1: new Date(highlightResp.startTime),
                time2: new Date(highlightResp.endTime)
            })
            this.triggerHighlightPopup()
        },

        triggerHighlightPopup() {
            this.showHighlightEffect = true
            setTimeout(() => {this.showHighlightEffect = false}, 2000)
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

        connectWebSocket(roomId) {
            //console.log(this.getSubscriptionCount())
            if (this._stompSubscription) {
                this._stompSubscription.unsubscribe()
                this._stompSubscription = null
                //console.log('[Store] stompSubscription 기존 구독 해제 완료')
            }
            if (this._likeSubscription) {
                this._likeSubscription.unsubscribe()
                this._likeSubscription = null
                //console.log('[Store] likeSubscription 기존 구독 해제 완료')
            }
            if (this._highlightSubscription) {
                this._highlightSubscription.unsubscribe()
                this._highlightSubscription = null
                //console.log('[Store] highlightSubscription 기존 구독 해제 완료')
            }
            if (this._participantSubscription) {
                this._participantSubscription.unsubscribe()
                this._participantSubscription = null
            }
            if (this.stompClient) {
                this.stompClient.deactivate?.()
                this.stompClient = null
                //console.log('[Store] stompClient deactivate 완료')
            }

            createWebSocketConnection(client => {
                //console.log('[Store] onConnect 콜백, client.connected:', client.connected);
                this.stompClient = client;
                // 채팅 메시지 수신
                this._stompSubscription = client.subscribe(
                    `/topic/chat.room.${roomId}`,
                    frame => {
                        //console.log('[Store] 🔔 message arrived');
                        this.handleIncomingMessage(frame)
                        // this.scrollToBottom(this.chatBodyElement) // 스크롤을 아래로 내리는 함수 호출
                    })
                //console.log(`[STOMP] 구독 완료 → /topic/chat.room.${roomId}`);
                // 하트 실시간 구독
                this._likeSubscription = client.subscribe(
                    `/topic/chat.room.likes.${roomId}`,
                    (frame) => {
                        const heart = JSON.parse(frame.body)
                        //console.log("❤️ 하트 수신!", heart)

                        // 하트 수 증가
                        if (this.roomData) {
                            this.roomData.heartCnt += 1
                        }

                        // 하트 애니메이션
                        this.triggerHearts()
                    }
                )

                //console.log(`[STOMP] 하트 구독 완료 → /topic/chat.room.likes.${roomId}`);
                // ✅ 하이라이트 실시간 구독
                this._highlightSubscription = client.subscribe(
                    `/topic/chat.room.highlight.${roomId}`,
                    (frame) => {
                        const highlight = JSON.parse(frame.body);
                        //console.log("📡 하이라이트 수신!", highlight);
                        this.addHighlightRealtime(highlight);
                    }
                );

                this._participantSubscription = client.subscribe(
                    `/topic/chat/room/${roomId}/participants`,
                    (frame) => {
                        const count = JSON.parse(frame.body)
                        console.log(`🔄 [참여자 수 업데이트] ${count}명`)
                        this.participantCount = count
                    }
                );
                
                console.log(`[STOMP] 참여자 수 구독 완료 → /topic/chat/room/${roomId}/participants`);
                //console.log(`[STOMP] 하이라이트 구독 완료 → /topic/chat.room.highlight.${roomId}`);
            }/*, token*/)
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
            if (this._highlightSubscription) {
                this._highlightSubscription.unsubscribe();
                this._highlightSubscription = null;
            }
            if (this._participantSubscription) {
                this._participantSubscription.unsubscribe();
                this._participantSubscription = null;
            }
        },

        sendMessage(roomId) {
            //console.log('[Store] sendMessage 진입:', this.newMessage, this.stompClient);
            if (!this.newMessage.trim() || !this.stompClient?.connected) {
                console.warn('[Store] 메시지 전송 조건 불충족', {
                    empty: !this.newMessage.trim(),
                    connected: this.stompClient?.connected
                });
                return;
            }

            const messagePayload = {
                roomIdx: roomId,
                content: this.newMessage
            }

            if (this.stompClient.publish) {
                this.stompClient.publish({
                    destination: `/app/chat.send.${roomId}`,
                    body: JSON.stringify(messagePayload)
                })
            } else {
                this.stompClient.send(
                    `/app/chat.send.${roomId}`,
                    {},
                    JSON.stringify(messagePayload)
                )
            }

            // 로컬 메시지 초기화
            this.newMessage = ''
        },

        handleIncomingMessage(frame) {
            //console.log('[Store] 현재 구독 개수:', this.getSubscriptionCount());
            //console.log('chatBodyElement:', this.chatBodyElement)
            const msg = JSON.parse(frame.body)
            const userStore = useUserStore()
            const currentUserIdx = userStore.userIdx
            console.log("currentUserIdx = userStore.userIdx:", currentUserIdx)

            const newMsg = {
                id: msg.messageIdx,
                sender: msg.username,
                avatar: msg.profileImageUrl,
                content: msg.content,
                timestamp: msg.createdAt,
                isMe: msg.userIdx === userStore.userIdx,
                isHighlighted: msg.isHighlighted
            }
            console.log("newMsg.isMe:", newMsg.isMe)
            this.messages.push(newMsg)
            nextTick(() => {
                if(!this.chatBodyElement) {
                    //console.log("chatBodyElement 없음");
                    return}
                this.scrollToBottom(this.chatBodyElement)
            })
        },
        onNewMessageClick() {
            this.showNewMessageButton = false
        },

        initialScroll(chatBodyElement) {
            if (chatBodyElement) {
                chatBodyElement.scrollTop = chatBodyElement.scrollHeight
            }
        },


        scrollToBottom(chatBodyElement) {
            if (!chatBodyElement) return
            const element = chatBodyElement
            const start = element.scrollTop
            const end = element.scrollHeight - element.clientHeight
            const duration = 600
            const startTime = performance.now()

            const easeInOutQuad = t =>
                t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

            const animateScroll = currentTime => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                element.scrollTop = start + (end - start) * easeInOutQuad(progress)
                if (progress < 1) {
                    requestAnimationFrame(animateScroll)
                }
            }

            requestAnimationFrame(animateScroll)
        },

        triggerHearts() {
            //('useChatRoomStore.js triggerHearts() ❤️ 하트 애니메이션 시작');
            for (let i = 0; i < 5; i++) {
                const id = Date.now() + Math.random()
                setTimeout(() => {
                    this.hearts.push({id, x: 10 + Math.random() * 20, y: 0})
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