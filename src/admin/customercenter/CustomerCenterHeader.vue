<script setup>
import { defineProps, defineEmits } from 'vue';
import Search from './Search.vue';

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
    <div class="w-[1320px] flex flex-col">
        <div class="w-full h-10 px-10 py-5 bg-violet-700 inline-flex items-center gap-2.5">
            <div class="justify-start text-white text-2xl font-bold font-['Inter']">고객센터</div>
        </div>

        <div class="inline-flex mt-2 justify-between items-center">
            <button class="w-64 h-10 font-bold rounded"
            :class="selected === 'notice' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('notice')">공지사항</button>
            <button class="w-64 h-10 font-bold rounded"
            :class="selected === 'faq' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('faq')">자주 묻는 질문</button>
            <button class="w-64 h-10 font-bold rounded"
            :class="selected === 'qna' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('qna')">1:1 문의</button>
            <button class="w-64 h-10 font-bold rounded"
            :class="selected === 'request' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('request')">공연/전시 신청</button>
            <button class="w-64 h-10 font-bold rounded"
            :class="selected === 'guide' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('guide')">이용 가이드</button>
        </div>
    </div>
    <Search v-if="selected==='notice' || selected ==='faq' || selected ==='qna' || selected==='reqeust'" />
    
</template>

<style scoped>
</style>