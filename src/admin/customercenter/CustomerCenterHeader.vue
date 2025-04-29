<script setup>
import Search from './Search.vue';

const tabs = [
    { label: '공지사항', value: 'notice' },
    { label: '자주 묻는 질문', value: 'faq' },
    { label: '1:1 문의', value: 'qna' },
    { label: '공연/전시 신청', value: 'request' },
    { label: '이용 가이드', value: 'guide' }
]
const props = defineProps({
    selected: String
});

// 부모에게 전달할 이벤트 정의
const emit = defineEmits(['selectedType']);

// 버튼 클릭 시 전달할 함수
const selectType = (type) => {
    emit('selectedType', type);
};
</script>

<template>
    <div class="w-[100%] flex flex-col">
        <div class="w-full h-10 px-10 py-5 bg-violet-700 inline-flex items-center gap-2.5">
            <div class="justify-start text-white text-2xl font-bold font-['Inter']">고객센터</div>
        </div>

        <div class="inline-flex mt-2 justify-between items-center">
            <button v-for="tab in tabs" :key="tab.value" @click="selectType(tab.value)"
                class="w-64 h-10 font-bold rounded"
                :class="selected === tab.value ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'">
                {{ tab.label }}
            </button>
        </div>

    </div>
    <Search v-if="['notice', 'faq', 'qna', 'request'].includes(selected)" />

</template>

<style scoped></style>