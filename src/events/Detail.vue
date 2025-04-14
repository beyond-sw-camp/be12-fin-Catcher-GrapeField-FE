<template>
  <!-- 데이터 로드 완료 후 표시할 컴포넌트 -->
  <div class="wrapper" v-if="event">
    <!-- 상단 Header와 탭 부분 -->
    <EventHeaderInfo :event="event" />

    <div class="mb-8">
      <EventTabs v-model:tab="selectedTab" />
    </div>

    <!-- 상세 정보 탭 -->
    <div v-if="selectedTab === '상세 정보'">
      <EventDetail :event="event" :idx="idx" />
    </div>
    <div v-if="selectedTab === '게시판'">
      <EventPost :idx="idx"></EventPost>
      <!--        나중에 데이터 직접 넣을 때 아래코드로 변경해야됨-->
      <!--        <EventPost :event="event" />-->
    </div>
    <div v-if="selectedTab === '한줄평'" class="flex flex-col gap-y-3">
      <!-- 리뷰 카드 리스트 -->
      <section class="flex flex-col gap-8">
        <h3 class="text-xl font-bold text-neutral-800">한줄평 ({{ reviews.length }})</h3>
        <div class="flex flex-col gap-4">
          <ReviewCard v-for="review in paginatedReviews" :key="review.idx" v-bind="review" />
        </div>
      </section>

      <!-- 페이지네이션 -->
      <section class="flex justify-center">
        <div class="h-10 flex justify-center items-center gap-2.5">
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
  
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted, computed } from 'vue'
  import EventHeaderInfo from './EventHeaderInfo.vue'
  import EventTabs from './EventDetailTab.vue'
  import EventDetail from './EventDetail.vue'
  import eventsData from '../assets/data/events.json'
  import EventPost from './EventPost.vue'
  import EventReview from "./EventReview.vue";

  import reviews from '/src/assets/data/search/reviews.js'
  import ReviewCard from '/src/search/ReviewCard.vue'
  
  // 1. 라우터에서 id 가져오기
  const route = useRoute()
  const id = Number(route.params.id)
  
  // 2. JSON에서 이벤트 찾기
  const event = ref(null)
  onMounted(() => {
  const found = eventsData.events.find(e => e.id === id)
  event.value = found
})

const loadEventDetail = async () => {
  try {
    loadingStore.startLoading()
    error.value = null
    const response = await eventStore.getEventDetail(idx)
    event.value = response
    console.log(response)
  } catch (err) {
    console.error('상세 페이지 불러오기 실패', err)
    error.value = '데이터를 불러오는 중 오류가 발생했습니다.'
  }
  finally {
    loadingStore.stopLoading()
  }
}

// 다시 시도 함수
const retryLoading = () => {
  loadEventDetail()
}

// 3. 탭 상태 관리
const selectedTab = ref('상세 정보')


const currentPage = ref(1)
const itemsPerPage = 5

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

<style scoped>
.wrapper {
  margin-bottom: 2vw;
  width: 95%;
  max-width: 95vw;
  margin: 2vh auto;
  padding: 0 5vw;
}
</style>