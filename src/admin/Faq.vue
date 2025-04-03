<script setup>
import { ref, reactive, computed } from 'vue';

const category = ref({
    type: 'all'
});

const selectCategory = (type) => {
    category.value.type = type;
}

const faqList = [
    {
        question: '[기타] 환불 정책은 어떻게 되나요?',
        answer: '환불 정책은 마이페이지 > 예매내역에서 확인 가능합니다.',
    },
    {
        question: '[기타] 모바일 티켓은 어디서 확인할 수 있나요?',
        answer: '저희 사이트는 예매처가 아니므로 티켓을 예매했던 사이트를 확인해주세요.',
    },
    {
        question: '[서비스 이용] 실시간 채팅 기능은 어떻게 사용하나요?',
        answer: '이용안내 페이지를 참고해주세요.',
    },
]

const openIndex = ref(null)

function toggle(index) {
    openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
    <div class="w-[1320px] mt-2">
        <div class="w-[1320px] h-12 bg-stone-50 flex items-center">
            <div class="flex items-center gap-4 text-zinc-800 text-base font-bold font-['Inter'] pl-5">
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-lg flex items-center justify-center"
                    :class="category.type === 'all' ? 'outline-2' : 'outline-1'" @click="selectCategory('all')">
                    전체</button>
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-lg flex items-center justify-center"
                    :class="category.type === 'user' ? 'outline-2' : 'outline-1'" @click="selectCategory('user')">
                    회원</button>
                <button
                    class="w-28 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-lg flex items-center justify-center"
                    :class="category.type === 'service' ? 'outline-2' : 'outline-1'" @click="selectCategory('service')">
                    서비스 이용</button>
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-lg flex items-center justify-center"
                    :class="category.type === 'comunity' ? 'outline-2' : 'outline-1'" @click="selectCategory('comunity')">
                    커뮤니티</button>
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-lg flex items-center justify-center"
                    :class="category.type === 'others' ? 'outline-2' : 'outline-1'" @click="selectCategory('others')">
                    기타</button>
            </div>
        </div>
        <div>
            <div class="space-y-2 mt-2 text-sm text-gray-700 font-normal leading-relaxed">
                <div v-for="(item, index) in faqList" :key="index" class="border rounded-lg overflow-hidden">
                    <button
                        class="w-full text-left px-4 py-3 bg-white hover:bg-gray-100 flex justify-between items-center"
                        @click="toggle(index)">
                        <span>{{ item.question }}</span>
                        <span>
                            <span v-if="openIndex === index">➖</span>
                            <span v-else>➕</span>
                        </span>
                    </button>
                    <div v-if="openIndex === index" class="bg-violet-50 text-gray-700 px-4 py-3 transition-all">
                        {{ item.answer }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>