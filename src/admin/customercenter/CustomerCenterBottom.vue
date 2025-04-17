<script setup>
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
    <div class="w-[100%] h-44 bg-purple-50 rounded-md px-10 py-6 mt-8">
        <!-- 상단 텍스트 -->
        <div class="mb-4">
            <h2 class="text-violet-700 text-l font-bold">무엇을 도와드릴까요?</h2>
            <p class="text-neutral-600 text-sm mt-1">
                원하는 답변을 찾지 못하셨나요? 1:1 문의로 빠른 답변을 받아보세요.
            </p>
        </div>

        <!-- 버튼 영역 -->
        <div class="flex gap-12">
            <button class="flex-1 h-14 bg-white border border-violet-200 rounded-md text-violet-700 text-base font-medium flex items-center justify-center
            hover:bg-violet-200 transition-colors duration-200"
            @click="selectType('notice')">
                공지사항 확인하기
            </button>
            <button class="flex-1 h-14 bg-white border border-violet-200 rounded-md text-violet-700 text-base font-medium flex items-center justify-center
            hover:bg-violet-200 transition-colors duration-200"
            @click="selectType('qna')">
                1:1 문의하기
            </button>
            <button class="flex-1 h-14 bg-white border border-violet-200 rounded-md text-violet-700 text-base font-medium flex items-center justify-center
            hover:bg-violet-200 transition-colors duration-200"
            @click="selectType('guide')">
                이용가이드 보기
            </button>
        </div>

    </div>

</template>

<style scoped></style>