<script setup>
import { ref } from 'vue'
import { useLoadingStore } from '@/stores/useLoadingStore'
const loadingStore = useLoadingStore();
const currentPage = ref(1)

const props = defineProps({
    modelValue: {
        type: String,
        default: 'recommend'
    }
})
const emit = defineEmits(['update:modelValue'])

// 정렬 옵션 선택 시 상태 업데이트 및 데이터 불러오기
const selectOption = async (option) => {
    emit('update:modelValue', option) // 외부에도 반영
}
</script>

<template>
    <div class="mb-0 px-4 py-2 box-border w-full max-w-[70vw] mx-auto p-4 box-border">
        <div class="inline-flex rounded-md overflow-hidden">
            <label data-cy="showView"
                class="px-3 py-2 text-xs font-normal text-center cursor-pointer select-none bg-white text-gray-900 border border-gray-200 shadow-sm transition-all hover:bg-gray-100 first:rounded-l-md last:rounded-r-md"
                :class="{ 'font-bold border-purple-600': modelValue === 'recommend' }"
                @click="selectOption('recommend')">
                추천
            </label>
            <label data-cy="showLikes"
                class="px-3 py-2 text-xs font-normal text-center cursor-pointer select-none bg-white text-gray-900 border border-gray-200 shadow-sm transition-all hover:bg-gray-100 first:rounded-l-md last:rounded-r-md"
                :class="{ 'font-bold border-purple-600': modelValue === 'popular' }" @click="selectOption('popular')">
                인기
            </label>
            <label data-cy="showBookM"
                class="px-3 py-2 text-xs font-normal text-center cursor-pointer select-none bg-white text-gray-900 border border-gray-200 shadow-sm transition-all hover:bg-gray-100 first:rounded-l-md last:rounded-r-md"
                :class="{ 'font-bold border-purple-600': modelValue === 'new' }" @click="selectOption('new')">
                신규
            </label>
        </div>
    </div>
</template>
