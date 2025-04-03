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
</script>

<template>
    <div class="w-[1320px] mt-2">
        <div class="w-[1320px] mb-4 h-14 flex items-end justify-between mt-8">
            <div class="ml-4">
                <div class="text-zinc-800 text-xl font-bold font-['Inter']">1:1 문의</div>
                <div class="text-stone-500 text-sm font-normal font-['Inter']">
                    GrapeField 서비스 이용 중 궁금한 점을 문의해 주세요. <br>최대한 빠르게 답변 드리겠습니다.
                </div>
            </div>
            <div>
                <button
                    class="w-20 h-8 mr-4 bg-violet-700 text-white text-sm font-bold rounded flex items-center justify-center">
                    문의하기</button>
            </div>
        </div>
        <div class="w-[1320px] h-12 bg-stone-50 flex items-center mb-4">
            <div class="flex items-center gap-4 text-zinc-800 text-base font-bold font-['Inter'] pl-5">
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
                    :class="category.type === 'all' ? 'outline-2' : 'outline-1'" @click="selectCategory('all')">
                    전체</button>
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
                    :class="category.type === 'user' ? 'outline-2' : 'outline-1'" @click="selectCategory('user')">
                    진행중</button>
                <button
                    class="w-28 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
                    :class="category.type === 'service' ? 'outline-2' : 'outline-1'" @click="selectCategory('service')">
                    답변 완료</button>
            </div>
        </div>
        <div class="w-full">
            <table class="w-full text-sm">
                <thead class="bg-gray-100 text-gray-600">
                    <tr>
                        <th class="text-left px-4 py-2 w-[5%]">번호</th>
                        <th class="text-left px-4 py-2">제목</th>
                        <th class="text-center px-4 py-2 w-[10%]">상태</th>
                        <th class="text-center px-4 py-2 w-[12%]">등록일</th>
                        <th class="text-center px-4 py-2 w-[12%]">답변일</th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="(item, index) in inquiries" :key="item.id">
                        <!-- 목록 행 -->
                        <tr class="cursor-pointer hover:bg-gray-50" @click="toggle(index)">
                            <td class="px-4 py-3 text-center">{{ item.id }}</td>
                            <td class="px-4 py-3">{{ item.title }}</td>
                            <td class="text-center">
                                <div class="flex justify-center">
                                    <span
                                        class="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium w-fit"
                                        :class="{
                                            'bg-blue-100 text-blue-600': item.status === '답변완료',
                                            'bg-green-100 text-green-500': item.status === '진행중',
                                        }">
                                        {{ item.status }}
                                    </span>
                                </div>
                            </td>
                            <td class="text-center">{{ item.createdAt }}</td>
                            <td class="text-center">{{ item.answeredAt || '-' }}</td>
                        </tr>
                    

                        <!-- 펼쳐지는 답변 영역 -->
                        <tr v-if="openIndex === index">
                            <td colspan="5" class="px-6 pb-6">
                                <div class="rounded-lg border border-gray-300 p-4 text-sm text-gray-800">

                                    <div class="font-bold text-lg text-gray-800 py-3">
                                        {{ item.title }}
                                    </div>
    
                                    <div class="text-sm text-gray-500 mb-4">
                                        등록일: {{ item.createdAt }}
                                    </div>
    
                                    <div class="text-sm text-gray-700 mb-6">
                                        {{ item.content }}
                                    </div>
    
                                    <div class="bg-gray-100 rounded-md p-4 text-sm text-gray-800">
                                        <div class="flex mb-2">
                                            <div class="font-semibold text-gray-700">관리자 답변</div>
                                            <div class="text-xs ml-2 text-gray-500">{{ item.answeredAt }}</div>
                                        </div>
                                        <div class="text-gray-700">{{ item.answer }}</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>

            </table>
        </div>
    </div>
</template>

<style scoped></style>