<script setup>
import { ref, reactive, computed } from 'vue';
const category = ref({
    type: 'all'
});

const selectCategory = (type) => {
    category.value.type = type;
}

const inquiries = ref([
    {
        id: 5,
        title: '예매 취소 관련 문의드립니다',
        status: '답변완료',
        createdAt: '2024.04.01',
        answeredAt: '2024.04.02',
        content: '예매 취소가 가능한지 궁금합니다.',
        answer: '마이페이지 예매 내역에서 취소하실 수 있습니다.',
    },
    {
        id: 4,
        title: '공연장 좌석 변경이 가능한가요?',
        status: '답변완료',
        createdAt: '2024.03.31',
        answeredAt: '2024.04.01',
        content: '좌석이 마음에 안 들어요.',
        answer: '좌석 변경은 예매처를 통해 문의해 주세요.',
    },
    {
        id: 3,
        title: '채팅방 기능 오류 신고',
        status: '진행중',
        createdAt: '2024.03.30',
        answeredAt: '',
        content: '채팅방이 안 들어가져요!',
        answer: '',
    },
])

const openIndex = ref(null)

function toggle(index) {
    openIndex.value = openIndex.value === index ? null : index
}

const userRole = ref({
    // role: 'user',
    role: 'admin',
})
</script>

<template>
    <div class="w-full">
        <!-- 헤더 -->
        <div class="hidden md:grid grid-cols-5 bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-t">
            <div>번호</div>
            <div class="col-span-2">제목</div>
            <div class="text-center">상태</div>
            <div class="text-center">등록일</div>
        </div>

        <!-- 목록 -->
        <div v-for="(item, index) in inquiries" :key="item.id" @click="toggle(index)"
            class="cursor-pointer border-b hover:bg-gray-50 text-sm px-4 py-3 md:grid md:grid-cols-5 gap-4">
            <!-- 모바일용 제목 + 상태 묶음 -->
            <div class="md:hidden mb-2">
                <div class="text-sm font-bold text-zinc-800">{{ item.title }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ item.createdAt }}</div>
                <div class="mt-1 text-xs inline-block px-2 py-1 rounded-full" :class="{
                    'bg-blue-100 text-blue-600': item.status === '답변완료',
                    'bg-green-100 text-green-500': item.status === '진행중'
                }">
                    {{ item.status }}
                </div>
            </div>

            <!-- PC 전용 -->
            <div class="hidden md:block">{{ item.id }}</div>
            <div class="hidden md:block col-span-2 truncate">{{ item.title }}</div>
            <div class="hidden md:flex justify-center items-center">
                <span class="text-xs px-2 py-1 rounded-full" :class="{
                    'bg-blue-100 text-blue-600': item.status === '답변완료',
                    'bg-green-100 text-green-500': item.status === '진행중'
                }">
                    {{ item.status }}
                </span>
            </div>
            <div class="hidden md:block text-center">{{ item.createdAt }}</div>
        </div>

        <!-- 펼쳐지는 답변 -->
        <div v-if="openIndex === index" class="px-4 pb-6">
            <div class="rounded-lg border border-gray-300 p-4 text-sm text-gray-800 mt-2">
                <div class="font-bold text-lg text-gray-800 pb-2">{{ inquiries[openIndex].title }}</div>
                <div class="text-sm text-gray-500 mb-2">등록일: {{ inquiries[openIndex].createdAt }}</div>
                <div class="text-sm text-gray-700 mb-4">{{ inquiries[openIndex].content }}</div>

                <div class="bg-gray-100 rounded-md p-4 text-sm text-gray-800">
                    <div class="flex justify-between mb-2">
                        <div class="font-semibold text-gray-700">관리자 답변</div>
                        <div class="text-xs text-gray-500">{{ inquiries[openIndex].answeredAt }}</div>
                    </div>
                    <div>{{ inquiries[openIndex].answer }}</div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>