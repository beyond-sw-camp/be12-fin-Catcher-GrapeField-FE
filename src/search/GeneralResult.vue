<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventsCardGeneral from './EventsCardGeneral.vue'
import PostList from './PostList.vue'
import ReviewCard from './ReviewCard.vue'
import { useSearchStore } from '@/stores/useSearchStore'
import SearchHeader from './SearchHeader.vue'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()

const keyword = computed(() => route.query.keyword)

const events = ref([])
const posts = ref([])
const reviews = ref([])

const loadSearch = async () => {
  try {
    searchStore.setTab('통합 검색') // 진입 시 기본 탭 설정
    const response = await searchStore.getALLSearchList(keyword.value);
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

function goToTab(label) {
  if (keyword.value) {
    searchStore.setTab(label)
    router.push({ path: getPathFromLabel(label), query: { keyword: keyword.value }
    })
  }
}

function getPathFromLabel(label) {
  switch (label) {
    case '통합 검색': return '/search'
    case '공연/전시': return '/search/events'
    case '게시판': return '/search/post'
    case '한줄평': return '/search/review'
    default: return '/search'
  }
}
</script>

<template>
  <div class="wrapper flex flex-col gap-10 mt-8">
    <SearchHeader :keyword="keyword" />

    <!-- 공연/전시 카드 -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">공연/전시 ({{ events.length }})</h3>
        <button @click="goToTab('공연/전시')" class="text-violet-500 text-sm">더보기</button>
      </div>
      <EventsCardGeneral v-for="event in events" :key="event.idx" :event="event" />
    </section>

    <!-- 게시판 테이블 -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">게시글 ({{ posts.length }})</h3>
        <button @click="goToTab('게시판')" class="text-violet-500 text-sm">더보기</button>
      </div>
      <div class="flex flex-col">
        <PostList :posts="posts" />
      </div>
    </section>

    <!-- 한줄평 -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">한줄평 ({{ reviews.length }})</h3>
        <button @click="goToTab('한줄평')" class="text-violet-500 text-sm">더보기</button>
      </div>
      <div class="flex flex-col gap-4">
        <ReviewCard v-for="review in reviews" :key="review.idx" :review="review" />
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
