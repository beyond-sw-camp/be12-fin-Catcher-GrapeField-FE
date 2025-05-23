// src/utils/webSocketClient.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

// baseUrl: 환경변수가 없으면 상대경로 사용
const baseUrl = import.meta.env.VITE_BASE_URL || '';
// const socketUrl = `${baseUrl}/ws`; // 상대경로도 가능하게 설정
const socketUrl = '/ws';
const isProd = import.meta.env.PROD; // true이면 프로덕션, false이면 개발 환경
console.log(`현재 환경: ${isProd ? '배포 환경' : '개발 환경'}`);

export function connect(onConnectCallback /*, token */) {
    const socket = new SockJS(socketUrl, null, {
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        // transports: ['websocket'], // 웹소켓만 사용하고 싶다면 이 줄을 사용
        withCredentials: true // 쿠키 전송 시 필수! 쿠키 포함시키는 설정
    });

    stompClient = new Client({
        webSocketFactory: () => socket,
        // connectHeaders: token.value ? { Authorization: `Bearer ${token.value}` } : {},
        connectHeaders: {},
        reconnectDelay: 5000,
        onConnect: (frame) => {
            console.log('WebSocket 연결 성공');
            // console.log(`{TOKEN ${token.value}}`);
            if (onConnectCallback) onConnectCallback(stompClient);
        },
        onStompError: (frame) => {
            console.error('STOMP 오류 발생:', frame);
        },
    });

    stompClient.activate();
}
export { stompClient }; // 외부에서 구독을 직접 연결할 수 있도록 내보내기