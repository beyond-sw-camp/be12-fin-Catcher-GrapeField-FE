<script setup>
import { ref, computed } from 'vue'
import { useReviewStore } from '@/stores/useReviewStore'
import {useUserStore} from "@/stores/useUserStore.js";

const reviewStore = useReviewStore()
const userStore = useUserStore()
const username = computed(() => userStore.username)
const props = defineProps({
    eventIdx: Number
})

const emit = defineEmits(['close', 'review-added'])

// 별점 상태
const rating = ref(0)
const reviewContent = ref('')
const isRobotCheckConfirmed = ref(false)

// 별점 선택 메서드
const selectRating = (selectedRating) => {
    rating.value = selectedRating
}

// 후기 등록 메서드
const submitReview = async () => {
    // 유효성 검사
    if (rating.value === 0) {
        alert('별점을 선택해주세요.')
        return
    }

    if (!isRobotCheckConfirmed.value) {
        alert('로봇 방지 확인을 해주세요.')
        return
    }

    try {
        const requestData = {
            eventIdx: props.eventIdx,
            rating: rating.value,
            content: reviewContent.value
        }

        // 리뷰 등록 API 호출
        await reviewStore.setReview(requestData)

        // 성공 시 이벤트 발생
        emit('review-added')

        // 모달 닫기
        emit('close')
    } catch (error) {
        console.error('리뷰 등록 중 오류:', error)
        alert(error.response?.data?.message || '리뷰 등록 중 오류가 발생했습니다.')
    }
}
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg w-[480px] p-6 relative">
            <!-- 닫기 버튼 -->
            <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- 모달 제목 -->
            <h2 class="text-xl font-bold mb-6 text-center">한줄평 작성</h2>

            <!-- 프로필 섹션 -->
            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span class="text-gray-600 font-bold">{{username.charAt(0).toUpperCase()}}</span>
                </div>
                <span class="text-neutral-800 font-medium">{{username}}</span>
            </div>

            <!-- 별점 선택 -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">별점 <span
                        class="text-red-500">*</span></label>
                <div class="flex gap-2">
                    <button v-for="star in 5" :key="star" @click="selectRating(star)" class="text-3xl transition-colors"
                        :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'">
                        ★
                    </button>
                </div>
                <div v-if="rating > 0" class="mt-2 text-sm text-neutral-600">
                    {{ rating }}.0
                </div>
            </div>

            <!-- 한줄평 입력 -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">한줄평</label>
                <textarea v-model="reviewContent" placeholder="간단한 후기를 남겨주세요. (최대 100자)" maxlength="100"
                    class="w-full h-24 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
                <div class="text-right text-xs text-gray-500 mt-1">
                    {{ reviewContent.length }}/100
                </div>
            </div>

            <!-- 로봇 확인 체크박스 -->
            <div class="mb-6 flex items-center">
                <input type="checkbox" id="robot-check" v-model="isRobotCheckConfirmed"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded">
                <label for="robot-check" class="ml-2 block text-sm text-gray-900">
                    자동 등록 방지를 위해 로봇이 아님을 확인합니다.
                </label>
            </div>

            <!-- 액션 버튼 -->
            <div class="flex gap-2">
                <button @click="$emit('close')"
                    class="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    취소
                </button>
                <button @click="submitReview"
                    class="flex-1 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    :disabled="rating === 0">
                    등록하기
                </button>
            </div>
        </div>
    </div>
</template>