// src/utils/webSocketClient.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

// baseUrl: 환경변수 값을 사용하거나 기본값은 빈 문자열
const baseUrl = import.meta.env.VITE_BASE_URL || '';

// SockJS는 http:// 또는 https:// 프로토콜을 사용해야 함
// 배포 환경: 환경변수가 "/api"로 설정된 경우 -> "/api/ws" 사용 (상대 경로)
// 개발 환경: 환경변수가 없거나 다른 값인 경우 -> "http://localhost:8080/ws" 사용
const socketUrl = baseUrl === '/api' 
  ? `${baseUrl}/ws`  // 배포 환경: "/api/ws" (상대 경로)
  : 'http://localhost:8080/ws';  // 개발 환경: http 프로토콜로 변경

console.log('현재 환경:', baseUrl ? '배포 환경' : '개발 환경');
console.log('Socket URL:', socketUrl);

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