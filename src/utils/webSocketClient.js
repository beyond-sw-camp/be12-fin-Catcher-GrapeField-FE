// src/utils/webSocketClient.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

// baseUrl: 환경변수가 없으면 상대경로 사용
const baseUrl = import.meta.env.VITE_BASE_URL || '';  // 예: '' 또는 'http://localhost:8080'
const socketUrl = `${baseUrl}/ws`; // 상대경로도 가능하게 설정

export function connect(onConnectCallback) {
    const socket = new SockJS(socketUrl);
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('WebSocket 연결 성공');
            if (onConnectCallback) onConnectCallback(stompClient);
        },
        onStompError: (frame) => {
            console.error('STOMP 오류 발생:', frame);
        },
    });

    stompClient.activate();
}

export { stompClient }; // 외부에서 구독을 직접 연결할 수 있도록 내보내기