// src/utils/webSocketClient.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;
let activeSubscriptions = []; // 추가: 활성 구독 관리 배열

// baseUrl: 환경변수가 없으면 상대경로 사용
const baseUrl = import.meta.env.VITE_BASE_URL || '';  // 예: '' 또는 'http://localhost:8080'
const socketUrl = `${baseUrl}/ws`; // 상대경로도 가능하게 설정

// 웹소켓 연결 함수 -  매개변수에 options 추가
export function connect(onConnectCallback /*, token */, options = {}) {
     // 이미 연결된 경우 중복 연결 방지
    if (stompClient && stompClient.connected) {
        console.log('이미 WebSocket 연결됨');
        if (onConnectCallback) onConnectCallback(stompClient);
        return;
    }

    const socket = new SockJS(socketUrl, null, {
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        // transports: ['websocket'], // 웹소켓만 사용하고 싶다면 이 줄을 사용
        withCredentials: true // 쿠키 전송 시 필수! 쿠키 포함시키는 설정
    });
    
    // 인증 헤더 설정
    const headers = {};
    if (options.token) {
        headers.Authorization = `Bearer ${options.token}`;
    }


    stompClient = new Client({
        webSocketFactory: () => socket,
        // connectHeaders: token.value ? { Authorization: `Bearer ${token.value}` } : {},
        connectHeaders: {},
        reconnectDelay: 5000,
        heartbeatIncoming: 20000, // 하트비트 설정 추가
        heartbeatOutgoing: 20000,
        onConnect: (frame) => {
            console.log('WebSocket 연결 성공');
            // console.log(`{TOKEN ${token.value}}`);
            // 재연결 시 이전 구독 복원
            if (activeSubscriptions.length > 0) {
                restoreSubscriptions();
            }
            if (onConnectCallback) onConnectCallback(stompClient);
        },
        onStompError: (frame) => {
            console.error('STOMP 오류 발생:', frame);
        },
        onWebSocketClose: () => {
            console.log('WebSocket 연결 종료');
        },
        // 디버깅 활성화 (필요시)
        // debug: (str) => {
        //     console.log(`STOMP: ${str}`);
        // }

    });

    stompClient.activate();
    return stompClient;
}

// 연결 해제 함수
export function disconnect() {
    if (stompClient && stompClient.connected) {
        stompClient.deactivate();
        console.log('WebSocket 연결 해제됨');
    }
}

// 구독 함수 - 구독 관리를 위한 래퍼
export function subscribe(destination, callback) {
    if (!stompClient || !stompClient.connected) {
        console.error('WebSocket이 연결되지 않았습니다. 먼저 connect()를 호출하세요.');
        return null;
    }
    
    const subscription = stompClient.subscribe(destination, callback);
    
    // 구독 정보 저장
    activeSubscriptions.push({
        id: subscription.id,
        destination: destination,
        callback: callback
    });
    
    return subscription;
}

// 구독 해제 함수
export function unsubscribe(subscription) {
    if (subscription) {
        subscription.unsubscribe();
        
        // 구독 목록에서 제거
        activeSubscriptions = activeSubscriptions.filter(sub => sub.id !== subscription.id);
    }
}

// 재연결 시 구독 복원
function restoreSubscriptions() {
    console.log(`${activeSubscriptions.length}개의 구독 복원 중...`);
    
    activeSubscriptions.forEach(sub => {
        const newSubscription = stompClient.subscribe(sub.destination, sub.callback);
        // 구독 ID 업데이트
        sub.id = newSubscription.id;
    });
}

// 알림 구독을 위한 헬퍼 함수
export function subscribeToNotifications(username, callback) {
    return subscribe(`/user/${username}/queue/notifications`, callback);
}

// 연결 상태 확인
export function isConnected() {
    return stompClient && stompClient.connected;
}

export { stompClient }; // 외부에서 구독을 직접 연결할 수 있도록 내보내기