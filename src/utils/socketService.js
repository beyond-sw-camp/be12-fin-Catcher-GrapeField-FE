// src/utils/socketService.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;
const subscriptions = []; // 구독 관리 배열

export function connectSocket({ endpoint = '/ws', headers = {} } = {}) {
    if (stompClient && stompClient.connected) return Promise.resolve(stompClient);
    
    // 현재 모드 확인 (개발 환경 vs 배포 환경)
    const isProd = import.meta.env.PROD; // true이면 프로덕션, false이면 개발 환경
    
    console.log(`현재 환경: ${isProd ? '배포 환경' : '개발 환경'}`);
    
    let socket;
    
    if (isProd) {
        // 배포 환경용 코드
        socket = new SockJS(endpoint, null, {
            transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
            withCredentials: true // 쿠키 전송 활성화
        });
    } else {
        // 개발 환경용 코드
        socket = new SockJS(endpoint);
    }
    
    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: headers,
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('WebSocket 연결 성공');
        }
    });
    
    stompClient.activate();
    return new Promise((resolve, reject) => {
        stompClient.onConnect = () => resolve(stompClient);
        stompClient.onStompError = err => reject(err);
    });
}

//배포 환경용
// export function connectSocket({ endpoint = '/ws', headers = {} } = {}) {
//     if (stompClient && stompClient.connected) return Promise.resolve(stompClient);
    
//     // 상대 경로 사용
//     const socket = new SockJS(endpoint, null, {
//         transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
//         withCredentials: true // 쿠키 전송 활성화
//     });
    
//     stompClient = new Client({
//         webSocketFactory: () => socket,
//         connectHeaders: headers,
//         reconnectDelay: 5000,
//         onConnect: () => {
//             console.log('WebSocket 연결 성공');
//         }
//     });
    
//     stompClient.activate();
//     return new Promise((resolve, reject) => {
//         stompClient.onConnect = () => resolve(stompClient);
//         stompClient.onStompError = err => reject(err);
//     });
// }

// 개발 환경용
// export function connectSocket({ endpoint = '/ws', headers ={}}={}) {
//     if (stompClient && stompClient.connected) return Promise.resolve(stompClient);
//     const socket = new SockJS(endpoint);
//     stompClient = new Client({
//         webSocketFactory: () => socket,
//         connectHeaders: headers,
//         reconnectDelay: 5000,
//         onConnect: () => {
//             console.log('WebSocket 연결 성공');
//         }
//     })
//     stompClient.activate()
//     return new Promise((resolve, reject) => {
//         stompClient.onConnect = () => resolve(stompClient)
//         stompClient.onStompError = err => reject(err)
//     })
// }

export function disconnectSocket() {
    if (stompClient) {
        subscriptions.forEach(sub=>sub.unsubscribe());
        subscriptions.length = 0;
        stompClient.deactivate();
        stompClient = null;
    }
}


export function subscribeTopic(destination, handler) {
    if (!stompClient || !stompClient.connected) {
        console.error('WebSocket 연결 후 구독하세요.');
        return null;
    }
    const sub =  stompClient.subscribe(destination, handler)
    subscriptions.push(sub);
    return sub;
}

export function unsubscribeTopic(sub) {
    sub?.unsubscribe();
    const idx = subscriptions.indexOf(sub);
    if(idx !== -1) {
        subscriptions.splice(idx, 1);
    }
}