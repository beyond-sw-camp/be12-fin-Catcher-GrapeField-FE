// /src/utils/jwtHelper.js
export function getUserIdFromToken() {
    const cookieString = document.cookie;
    const tokenMatch = cookieString.match(/ATOKEN=([^;]+)/); // ⚠️ 쿠키 이름이 ATOKEN일 경우

    if (!tokenMatch) {
        console.warn("ATOKEN 쿠키를 찾을 수 없습니다.");
        return null;
    }

    const token = tokenMatch[1];
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(decodeURIComponent(escape(window.atob(base64))));

        return payload.userId || payload.sub || null; // ⚠️ 서버 JWT 구조에 따라 조정
    } catch (e) {
        console.error("JWT 파싱 실패", e);
        return null;
    }
}

/*
// 사용 예시
import { getUserIdFromToken } from '/src/utils/jwtHelper.js';

onMounted(() => {
    const currentUserId = getUserIdFromToken(); // 현재 로그인한 유저 ID

    connect((client) => {
        client.subscribe(topicPath, (message) => {
            const payload = JSON.parse(message.body);

            messages.value.push({
                ...payload,
                timestamp: new Date(),
                isMe: payload.sendUserIdx === currentUserId // ✅ ID 비교로 본인 메시지 판단
            });

            nextTick(() => scrollToBottom());
        });

        console.log('✅ 구독 경로:', topicPath);
    });
});

*/
