<script setup>
import { ref } from 'vue'

const tabs = ['전체', '게시판', '채팅', '한줄평']
const selectedTab = ref('전체')
const page = ref(1)

const reports = [
    {
        id: '000123',
        type: '게시글',
        event: '웃는 남자',
        target: '악플러123',
        reason: '욕설/비방',
        reporter: '문화매니아',
        date: '2025-04-20 14:23',
        status: '미처리',
        content: '이 작품은 정말 최악이었습니다. 배우들의 연기는 형편없었고...'
    },
    {
        id: '000122',
        type: '채팅',
        event: '헬릿',
        target: '스팸계정55',
        reason: '홍보/광고',
        reporter: '배우팬84',
        date: '2025-04-19 18:45',
        status: '미처리',
        content: '여러분 지금 가입하면 무료 티켓 증정! 지금 바로 www.ticket-scam.com 가입!'
    },
    {
        id: '000121',
        type: '한줄평',
        event: '뮤지컬 헬릿',
        target: '스포일러킹',
        reason: '스포일러',
        reporter: '덕후99',
        date: '2025-04-18 21:12',
        status: '처리완료',
        content: '헬릿이 죽는 장면이 너무 감동적이었어요...'
    },
    {
        id: '000120',
        type: '댓글',
        event: '웃는 남자',
        target: '악플러123',
        reason: '욕설/비방',
        reporter: '문화매니아',
        date: '2025-04-20 14:23',
        status: '미처리',
        content: '이런 쓰레기 공연은 없어져야 합니다.'
    }
]
</script>

<template>
    <div class="w-full p-6">
        <!-- 헤더 -->
        <h2 class="text-xl font-bold text-violet-700 mb-4">신고 관리</h2>

        <!-- 탭 메뉴 -->
        <div class="flex space-x-6 border-b border-gray-200 mb-6">
            <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" class="pb-2 text-sm font-medium"
                :class="selectedTab === tab ? 'text-violet-700 border-b-2 border-violet-700' : 'text-gray-500'">
                {{ tab }}
            </button>
        </div>

        <!-- 필터 영역 -->
        <div class="flex justify-between whitespace-nowrap items-center mb-4">
            <!-- 왼쪽 필터 영역 -->
            <div class="flex items-center gap-4">
                <select class="border px-3 py-2 text-sm rounded">
                    <option>처리상태</option>
                    <option>미처리</option>
                    <option>처리완료</option>
                </select>
                <select class="border px-3 py-2 text-sm rounded">
                    <option>신고사유</option>
                    <option>욕설/비방</option>
                    <option>홍보/광고</option>
                </select>
                <input type="text" placeholder="사용자명 또는 게시글 검색" class="border px-3 py-2 text-sm rounded w-64" />
                <button class="text-white px-2 py-2 text-sm rounded">⚔️</button>
            </div>

            <!-- 오른쪽 조치 버튼 영역 -->
            <div class="flex gap-2">
                <button class="border bg-violet-700 text-white px-4 py-2 text-sm rounded">일괄 조치</button>
                <button class="border bg-gray-200 px-4 py-2 text-sm rounded">일괄 무시</button>
            </div>
        </div>


        <!-- 테이블 -->
        <table class="w-full border text-sm">
            <thead class="bg-gray-100 text-gray-600">
                <tr>
                    <th class="p-2 text-center"><input type="checkbox" /></th>
                    <th class="p-2">신고번호</th>
                    <th class="p-2">구분</th>
                    <th class="p-2">공연/전시</th>
                    <th class="p-2">신고대상</th>
                    <th class="p-2">신고사유</th>
                    <th class="p-2">신고자</th>
                    <th class="p-2">신고일시</th>
                    <th class="p-2">처리상태</th>
                    <th class="p-2">관리</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item, index) in reports" :key="item.id">
                    <!-- 신고 목록 행 -->
                    <tr class="border-t text-center">
                        <td class="p-2"><input type="checkbox" /></td>
                        <td class="p-2">{{ item.id }}</td>
                        <td class="p-2">
                            <span class="text-white whitespace-nowrap text-xs px-2 py-1 rounded-full"
                                :class="item.type === '게시글' ? 'bg-violet-500' : item.type === '채팅' ? 'bg-blue-500' : item.type === '한줄평' ? 'bg-green-500' : 'bg-yellow-500'">
                                {{ item.type }}
                            </span>
                        </td>
                        <td class="p-2">{{ item.event }}</td>
                        <td class="p-2">{{ item.target }}</td>
                        <td class="p-2">{{ item.reason }}</td>
                        <td class="p-2">{{ item.reporter }}</td>
                        <td class="p-2">{{ item.date }}</td>
                        <td class="p-2">
                            <span class="px-2 py-1 whitespace-nowrap rounded-full text-xs text-white"
                                :class="item.status === '미처리' ? 'bg-red-500' : 'bg-green-500'">
                                {{ item.status }}
                            </span>
                        </td>
                        <td class="p-2 whitespace-nowrap space-x-2">
                            <button class="bg-violet-700 text-white text-xs px-2 py-1 rounded">조치</button>
                            <button class="bg-gray-200 text-xs px-2 py-1 rounded">무시</button>
                        </td>
                    </tr>

                    <!-- 신고 상세 내용 행 -->
                    <tr>
                        <td></td>
                        <td colspan="9">
                            <div class="m-2 p-4 text-sm text-gray-700 bg-gray-50 rounded">
                                <strong>신고 내용:</strong> {{ item.content }}
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>


        </table>

        <!-- 페이징 -->
        <div class="flex justify-center mt-6 space-x-2">
            <button v-for="n in 3" :key="n" class="w-8 h-8 border rounded text-sm"
                :class="page === n ? 'bg-violet-700 text-white' : 'bg-white text-gray-700'" @click="page = n">
                {{ n }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>