<script setup>
import { ref, computed, onMounted } from 'vue'
import reviews from '@/assets/data/review'

const currentPage = ref(1)
const itemsPerPage = 10

// 페이지네이션 계산
const totalPages = computed(() =>
  Math.ceil(reviews.length / itemsPerPage)
)

const paginatedReviews = computed(() =>
  reviews.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
)

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <section class="flex flex-col gap-8">
    <h3 class="text-xl font-bold text-neutral-800">한줄평 ({{ reviews.length }})</h3>

    <!-- 리뷰 카드 리스트 -->
    <div class="flex flex-col gap-4">
      <div
        v-for="review in paginatedReviews"
        :key="review.idx"
        class="self-stretch px-6 py-5 bg-white rounded-[10px] outline outline-1 outline-offset-[-0.5px] outline-violet-50 flex flex-col justify-start items-start gap-2.5"
      >
        <div class="inline-flex justify-start items-center gap-4">
          <div class="w-9 h-10 px-3.5 py-3 bg-violet-50 rounded-[20px] inline-flex justify-center items-center">
            <div class="text-center text-violet-600 text-xs font-bold">별</div>
          </div>
          <div class="w-full inline-flex flex-col gap-1">
            <div class="flex justify-between items-center">
              <div class="flex items-end gap-3">
                <div class="text-neutral-800 text-base font-bold">{{ review.writer }}</div>
                <div class="text-yellow-400 text-base">★★★★★</div>
              </div>
              <div class="text-neutral-400 text-xs">{{ review.date }}</div>
            </div>
            <div class="text-neutral-800 text-sm">{{ review.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <section class="flex justify-center">
      <div class="h-10 flex justify-center items-center gap-2.5">
        <!-- 이전 버튼 -->
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M37 1H5C2.8 1 1 2.8 1 5v32c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V5c0-2.2-1.8-4-4-4Z" fill="white" stroke="#DEE2E6"/>
            <path d="M26 11L16 21l10 10" stroke="#495057" stroke-width="2"/>
          </svg>
        </button>

        <!-- 번호 버튼 -->
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="relative w-10 h-10"
        >
          <svg :width="42" :height="42" viewBox="0 0 42 42" fill="none">
            <path
              d="M37 1H5C2.8 1 1 2.8 1 5v32c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V5c0-2.2-1.8-4-4-4Z"
              :fill="page === currentPage ? '#7048E8' : 'white'"
              :stroke="page === currentPage ? '#7048E8' : '#DEE2E6'"
            />
          </svg>
          <div
            class="absolute left-[15px] top-[10px] text-base text-center"
            :class="page === currentPage ? 'text-white font-bold' : 'text-zinc-600 font-normal'"
          >
            {{ page }}
          </div>
        </button>

        <!-- 다음 버튼 -->
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M37 1H5C2.8 1 1 2.8 1 5v32c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V5c0-2.2-1.8-4-4-4Z" fill="white" stroke="#DEE2E6"/>
            <path d="M16 11l10 10-10 10" stroke="#495057" stroke-width="2"/>
          </svg>
        </button>
      </div>
    </section>
  </section>
</template>