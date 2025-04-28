// src/utils/webSocketClient_notify.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// 상태 관리 변수
let stompClient = null;
let activeSubscriptions = []; // 활성 구독 관리 배열
let connectPromise = null; // 연결 상태를 추적하기 위한 Promise
let loadingStore = null; // 로딩 스토어 참조

// baseUrl: 환경변수가 없으면 상대경로 사용
const baseUrl = import.meta.env.VITE_BASE_URL || '';

//개발 환경용 웹소켓
const socketUrl = `${baseUrl}/ws`;
//배포 환경용 웹소켓
// const socketUrl = '/ws'; 

// 초기화 함수를 통해 스토어 주입받기
export function initNotificationClient(store) {
  loadingStore = store;
  console.log('알림 웹소켓 클라이언트 초기화됨');
}

// 웹소켓 연결 함수
export function connect(onConnectCallback, options = {}) {
  // 로딩 시작 (스토어가 있는 경우)
  if (loadingStore) {
    loadingStore.startLoading('notification-websocket');
  }

  // 이미 연결 중이거나 연결된 경우
  if (connectPromise) {
    return connectPromise.then(() => {
      if (onConnectCallback) onConnectCallback(stompClient);
      return stompClient;
    });
  }

  // 이미 연결된 경우
  if (stompClient && stompClient.connected) {
    console.log('이미 알림 WebSocket 연결됨');
    if (onConnectCallback) onConnectCallback(stompClient);
    
    if (loadingStore) {
      loadingStore.stopLoading('notification-websocket');
    }
    
    return Promise.resolve(stompClient);
  }

  // 연결이 완료되면 resolve되는 Promise 생성
  connectPromise = new Promise((resolve, reject) => {
    const socket = new SockJS(socketUrl, null, {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      withCredentials: true // 쿠키 전송 시 필수
    });
    
    // 인증 헤더 설정
    const headers = {};
    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: headers,
      reconnectDelay: 3000, // 3초로 설정
      heartbeatIncoming: 15000, // 15초로 설정
      heartbeatOutgoing: 15000,
      debug: function(str) {
        if (options.debug) {
          console.log(`알림 STOMP: ${str}`);
        }
      },
      onConnect: (frame) => {
        console.log('알림 WebSocket 연결 성공');
        
        // 재연결 시 이전 구독 복원
        if (activeSubscriptions.length > 0) {
          restoreSubscriptions();
        }
        
        // 초기 알림 데이터 로드 (있는 경우)
        if (options.loadInitialData) {
          if (loadingStore) loadingStore.startLoading('notification-data');
          Promise.resolve(options.loadInitialData())
            .finally(() => {
              if (loadingStore) loadingStore.stopLoading('notification-data');
            });
        }
        
        // 로딩 상태 해제
        if (loadingStore) {
          loadingStore.stopLoading('notification-websocket');
        }
        
        if (onConnectCallback) onConnectCallback(stompClient);
        resolve(stompClient);
      },
      onStompError: (frame) => {
        console.error('알림 STOMP 오류 발생:', frame);
        if (loadingStore) loadingStore.stopLoading('notification-websocket');
        reject(frame);
      },
      onWebSocketClose: () => {
        console.log('알림 WebSocket 연결 종료');
        if (loadingStore) loadingStore.stopLoading('notification-websocket');
        connectPromise = null;
      }
    });

    stompClient.activate();
  });

  return connectPromise;
}

// 연결 해제 함수
export function disconnect() {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
    console.log('알림 WebSocket 연결 해제됨');
  }
  connectPromise = null;
  activeSubscriptions = [];
  
  // 로딩 상태 해제
  if (loadingStore) {
    loadingStore.stopLoading('notification-websocket');
    loadingStore.stopLoading('notification-data');
  }
}

// 구독 함수
export function subscribe(destination, callback) {
  if (!stompClient || !stompClient.connected) {
    console.error('알림 WebSocket이 연결되지 않았습니다. 먼저 connect()를 호출하세요.');
    return null;
  }
  
  // 실제 destination과 callback 사용
  const subscription = stompClient.subscribe(destination, callback);
  
  // 구독 정보 저장
  activeSubscriptions.push({
    id: subscription.id,
    destination: destination,
    callback: callback
  });
  
  console.log(`알림 구독 성공: ${destination}`);
  return subscription;
}

// 알림 구독을 위한 헬퍼 함수
export function subscribeToNotifications(username, callback) {
  if (!username) {
    console.error('사용자 이름이 필요합니다.');
    return null;
  }
  
  const destination = `/user/${username}/queue/notifications`;
  console.log(`알림 구독 주소: ${destination}`);
  return subscribe(destination, (message) => {
    try {
      const notification = JSON.parse(message.body);
      callback(notification);
    } catch (error) {
      console.error('알림 메시지 파싱 오류:', error);
    }
  });
}

// 구독 해제 함수
export function unsubscribe(subscription) {
  if (subscription) {
    subscription.unsubscribe();
    
    // 구독 목록에서 제거
    activeSubscriptions = activeSubscriptions.filter(sub => sub.id !== subscription.id);
    console.log('알림 구독 해제됨');
  }
}

// 재연결 시 구독 복원
function restoreSubscriptions() {
  console.log(`${activeSubscriptions.length}개의 알림 구독 복원 중...`);
  
  activeSubscriptions.forEach(sub => {
    const newSubscription = stompClient.subscribe(sub.destination, sub.callback);
    // 구독 ID 업데이트
    sub.id = newSubscription.id;
  });
}

// 연결 상태 확인
export function isConnected() {
  return stompClient && stompClient.connected;
}

// stompClient 외부 노출 (필요시)
export { stompClient };