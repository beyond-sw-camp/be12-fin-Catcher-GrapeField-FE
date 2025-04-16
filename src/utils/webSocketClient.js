// src/utils/webSocketClient.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

// baseUrl: 환경변수가 없으면 상대경로 사용
const baseUrl = import.meta.env.VITE_BASE_URL || '';  // 예: '' 또는 'http://localhost:8080'
const socketUrl = `${baseUrl}/ws`; // 상대경로도 가능하게 설정

export function connect(onConnectCallback /*, token */) {
    const socket = new SockJS(socketUrl, null, {
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        // transports: ['websocket'], // 웹소켓만 사용하고 싶다면 이 줄을 사용
        withCredentials: true // 쿠키 전송 시 필수!!!! 쿠키를 포함시키는 설정
    });
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('STOMP 연결 성공 (쿠키 + Interceptor 사용)');
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