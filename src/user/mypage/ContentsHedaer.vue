<script setup>
import { ref } from 'vue'

const tabs = [
    { label: '스크랩 보기', value: 'scraps' },
    { label: '작성 글 보기', value: 'posts' },
    { label: '작성 댓글 보기', value: 'comments' },
    { label: '작성 한줄평 보기', value: 'reviews' },
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
    <div class="flex border-b border-gray-200 text-sm font-medium">
        <button v-for="tab in tabs" :key="tab.value" @click="selectType(tab.value)" :class="[
            'px-4 py-2 whitespace-nowrap',
            selected === tab.value
                ? 'border-b-2 border-violet-600 text-violet-800 font-semibold'
                : 'text-gray-500 hover:text-violet-600 hover:border-b-2 hover:border-violet-300',
        ]">
            {{ tab.label }}
        </button>
    </div>
</template>

<style scoped></style>