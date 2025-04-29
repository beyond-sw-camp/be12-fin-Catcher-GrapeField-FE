<script setup>
import { ref, computed } from 'vue'
import EventReviewRegister from './EventReviewRegister.vue'
import EventReviewList from './EventReviewList.vue'
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();

const isLogin = computed(() => userStore.isLogin);
const props = defineProps({ eventIdx: Number });

// 후기 작성 모달 상태
const isReviewModalOpen = ref(false)
const reviewCount = ref(0)

// 후기 작성 모달 열기/닫기
const openReviewModal = () => {
  isReviewModalOpen.value = true
}

const closeReviewModal = () => {
  isReviewModalOpen.value = false
}

// 리뷰 목록 컴포넌트 참조
const reviewListRef = ref(null)

// 후기 등록 후 목록 새로고침
const refreshReviewList = () => {
  if (reviewListRef.value) {
    reviewListRef.value.loadReviewList()
  }
}

// 총 리뷰 개수 업데이트
const updateReviewCount = (count) => {
  reviewCount.value = count
}
</script>

<template>
  <section class="flex flex-col gap-8">
    <!-- 헤더 섹션 -->
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-bold text-neutral-800">
        한줄평 ({{ reviewCount }})
      </h3>

      <!-- 후기 작성 버튼 -->
      <button v-if="isLogin" @click="openReviewModal"
        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd" />
        </svg>
        후기 작성
      </button>

      <!-- 후기 작성 모달 -->
      <EventReviewRegister v-if="isReviewModalOpen" :eventIdx="props.eventIdx" @close="closeReviewModal"
        @review-added="refreshReviewList" />
    </div>

    <!-- 리뷰 목록 -->
    <EventReviewList ref="reviewListRef" :eventIdx="props.eventIdx" @update-total-count="updateReviewCount" />
  </section>
</template>