<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import EventCard from './EventsCardGeneral.vue'
import PostRow from './PostRow.vue'
import ReviewCard from './ReviewCard.vue'
import { useSearchStore } from '@/stores/useSearchStore'
import SearchHeader from './SearchHeader.vue'

const route = useRoute()
const searchStore = useSearchStore()

const keyword = computed(() => route.query.keyword)

const events = ref([])
const posts = ref([])
const reviews = ref([])

const loadSearch = async () => {
  try {
    const response = await searchStore.getALLSearchList(keyword.value);
    console.log(response)
    events.value = response.events || [];
    posts.value = response.posts || [];
    reviews.value = response.reviews || [];

  } catch (error) {
    console.error("검색 결과 로드 실패:", error);
  }
}

onMounted(loadSearch)
watch(() => route.query.keyword, async (newKeyword, oldKeyword) => {
  if (newKeyword && newKeyword !== oldKeyword) {
    await loadSearch()
  }
})

</script>

<template>
  <div class="wrapper flex flex-col gap-10 mt-8">
    <SearchHeader :keyword="keyword" />
    <!-- 공연/전시 카드 -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">공연/전시 ({{ events.length }})</h3>
        <router-link to="/search/events" class="text-violet-500 text-sm">더보기</router-link>
      </div>
      <EventCard v-for="event in events.slice(0, 3)" :key="event.idx" :event="event" />
    </section>

    <!-- 게시판 테이블 -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">게시글 ({{ posts.length }})</h3>
        <router-link to="/search/post" class="text-violet-500 text-sm">더보기</router-link>
      </div>
      <div class="flex flex-col">
        <!-- 헤더 -->
        <div
          class="grid grid-cols-[12rem_1fr_8rem_7rem_6rem_6rem] h-12 bg-violet-50 rounded-t text-sm font-bold text-neutral-800">
          <div class="flex items-center justify-center">게시판</div>
          <div class="flex items-center justify-center">제목</div>
          <div class="flex items-center justify-center">작성자</div>
          <div class="flex items-center justify-center">작성일</div>
          <div class="flex items-center justify-center">조회</div>
          <div class="flex items-center justify-center">추천</div>
        </div>

        <!-- 게시글 리스트 -->
        <PostRow v-for="post in posts.slice(0, 5)" :key="post.id" :post="post" />
      </div>
    </section>

    <!-- 한줄평 -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">한줄평 ({{ reviews.length }})</h3>
        <router-link to="/search/review" class="text-violet-500 text-sm">더보기</router-link>
      </div>
      <div class="flex flex-col gap-4">
        <ReviewCard v-for="review in reviews.slice(0, 3)" :key="review.id" :username="review.username"
          :rating="review.rating" :date="review.date" :comment="review.comment" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  width: 95%;
  max-width: 95vw;
  margin: 5vh auto;
  padding: 0 5vw;
}
</style>
