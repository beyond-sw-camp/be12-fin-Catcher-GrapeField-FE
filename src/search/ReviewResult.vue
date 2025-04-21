<script setup>
import ReviewCard from './ReviewCard.vue'
import { ref, computed, onMounted } from 'vue'
import SearchHeader from './SearchHeader.vue'
import { useSearchStore } from '@/stores/useSearchStore'

const searchStore = useSearchStore()

const props = defineProps({ keyword: String })

const reviews = ref({
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  size: 10
})


const currentPage = ref(1)
const itemsPerPage = 10

const loadReviewsSearch = async () => {
  try {
    const response = await searchStore.getReviewsSearchList(props.keyword, currentPage.value - 1, itemsPerPage)
    reviews.value = response || {}
  } catch (e) {
    console.error(e)
  }
}

onMounted(loadReviewsSearch)

const totalPages = computed(() => reviews.value.totalPages || 0)
const paginatedReviews = computed(() => reviews.value.content || [])


function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadReviewsSearch()
  }
}

//재검색
const newKeyword = ref('')
const refinedKeywords = ref([props.keyword])

function onRefineSearch() {
  if (!newKeyword.value.trim()) return
  refinedKeywords.value.push(newKeyword.value.trim())
  newKeyword.value = ''
  currentPage.value = 1
  loadRefinedSearch()
}

async function loadRefinedSearch() {
  const response = await searchStore.getReviewsRefineSearchList(refinedKeywords.value, currentPage.value - 1, itemsPerPage)
  reviews.value = response || {}
}
</script>

<template>
  <div class="wrapper mt-4 flex flex-col gap-12">
    <!-- 제목 & 탭 -->
    <SearchHeader />

    <section class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-neutral-800"> 공연/전시 ({{ reviews.totalElements }})</h2>
        <div class="flex items-center px-4 py-1 border border-zinc-300 rounded-full w-80 bg-white">
          <input v-model="newKeyword" type="text" placeholder="결과 내 재검색"
            class="flex-1 text-sm text-neutral-800 bg-transparent outline-none" />
          <button @click="onRefineSearch"
            class="px-2 py-1 bg-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
            검색
          </button>
        </div>
      </div>
    </section>
    <!-- 리뷰 카드 리스트 -->
    <section class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <ReviewCard v-for="review in paginatedReviews" :key="review.idx" :review="review" />
      </div>
    </section>
    <!-- 페이지네이션 -->
    <section class="flex justify-center">
      <div class="w-[1200px] h-10 flex justify-center items-center gap-2.5">
        <!-- 이전 버튼 -->
        <button @click="goToPage(currentPage - 1)">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37 0.936035H5C2.79086 0.936035 1 2.7269 1 4.93604V36.936C1 39.1452 2.79086 40.936 5 40.936H37C39.2091 40.936 41 39.1452 41 36.936V4.93604C41 2.7269 39.2091 0.936035 37 0.936035Z"
              fill="white" stroke="#DEE2E6" />
            <path d="M26 10.936L16 20.936L26 30.936" stroke="#495057" stroke-width="2" />
          </svg>
        </button>

        <!-- 페이지 번호들 -->
        <button v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative w-10 h-10">
          <div class="absolute top-0 left-0 w-full h-full">
            <svg :width="page === currentPage ? 40 : 42" :height="page === currentPage ? 41 : 42" viewBox="0 0 42 42"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M37 0.936035H5C2.79086 0.936035 1 2.7269 1 4.93604V36.936C1 39.1452 2.79086 40.936 5 40.936H37C39.2091 40.936 41 39.1452 41 36.936V4.93604C41 2.7269 39.2091 0.936035 37 0.936035Z"
                :fill="page === currentPage ? '#7048E8' : 'white'"
                :stroke="page === currentPage ? '#7048E8' : '#DEE2E6'" />
            </svg>
          </div>
          <div class="absolute left-[15px] top-[10px] text-center text-base" :class="{
            'text-white font-bold': page === currentPage,
            'text-zinc-600 font-normal': page !== currentPage
          }">
            {{ page }}
          </div>
        </button>

        <!-- 다음 버튼 -->
        <button @click="goToPage(currentPage + 1)">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37 0.936035H5C2.79086 0.936035 1 2.7269 1 4.93604V36.936C1 39.1452 2.79086 40.936 5 40.936H37C39.2091 40.936 41 39.1452 41 36.936V4.93604C41 2.7269 39.2091 0.936035 37 0.936035Z"
              fill="white" stroke="#DEE2E6" />
            <path d="M16 10.936L26 20.936L16 30.936" stroke="#495057" stroke-width="2" />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>

<style>
.wrapper {
  width: 95%;
  max-width: 95vw;
  margin: 5vh auto;
  padding: 0 5vw;
}

.tab {
  @apply w-48 h-14 px-7 py-4 bg-white text-base text-zinc-600 flex items-center justify-center rounded;
}

.tab-active {
  @apply w-48 h-14 px-7 py-4 bg-white text-base text-violet-600 font-bold flex items-center justify-center rounded;
}
</style>
