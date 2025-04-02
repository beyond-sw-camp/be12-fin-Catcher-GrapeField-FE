<script setup>
import { defineProps, ref, reactive, computed, defineEmits } from 'vue';

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
    <div class="w-[1320px] h-56 flex flex-col">
        <div class="w-full h-15 px-10 py-5 bg-violet-700 inline-flex items-center gap-2.5">
            <div class="justify-start text-white text-3xl font-bold font-['Inter']">고객센터</div>
        </div>

        <div class="mt-6 inline-flex justify-start items-center gap-4 px-10">
            <button class="w-64 h-14 font-bold"
            :class="selected === 'notice' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('notice')">공지사항</button>
            <button class="w-64 h-14 font-bold"
            :class="selected === 'faq' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('faq')">자주 묻는 질문</button>
            <button class="w-64 h-14 font-bold"
            :class="selected === 'inquiry' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('inquiry')">1:1 문의</button>
            <button class="w-64 h-14 font-bold"
            :class="selected === 'apply' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('apply')">공연/전시 신청</button>
            <button class="w-64 h-14 font-bold"
            :class="selected === 'guide' ? 'bg-violet-700 text-white' : 'bg-stone-50 text-black'"
            @click="selectType('guide')">이용 가이드</button>
        </div>

        <div class="mt-6 px-10">
            <input
            type="text"
            placeholder="검색어를 입력하세요."
            class="bg-zinc-100 w-full h-12 px-4 rounded border border-zinc-300"
            />
        </div>
    </div>
</template>

<style scoped>
</style>