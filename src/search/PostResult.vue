<script setup>
import { ref, computed, onMounted } from 'vue'
import PostCard from './PostList.vue'
import SearchHeader from './SearchHeader.vue'
import { useSearchStore } from '@/stores/useSearchStore'
const searchStore = useSearchStore()

const props = defineProps({ keyword: String })

// 페이지네이션 상태
const currentPage = ref(1)
const itemsPerPage = 10

const posts = ref({
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  size: 10
})

const loadPosts = async () => {
  try {
    searchStore.setTab('게시판')
    const response = await searchStore.getPostsSearchList(props.keyword, currentPage.value - 1, itemsPerPage)
    posts.value = response || {}
  } catch (error) {
    console.error("검색 결과 로드 실패:", error)
  }
}

onMounted(loadPosts)

const totalPages = computed(() => posts.value.totalPages || 0)
const paginatedPosts = computed(() => posts.value.content || [])

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadPosts()
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
  const response = await searchStore.getPostsRefineSearchList(refinedKeywords.value, currentPage.value - 1, itemsPerPage)
  posts.value = response || {}
}

</script>

<template>
  <div class="wrapper mt-4 flex flex-col gap-10">
    <SearchHeader />
    <!-- 검색 + 개수 -->
    <section class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-neutral-800">게시글 ({{ posts.totalElements }})</h2>
        <div class="flex items-center px-4 py-1 border border-zinc-300 rounded-full w-80 bg-white">
          <input type="text" placeholder="게시글 내 재검색"
            class="flex-1 text-sm text-neutral-800 bg-transparent outline-none" />
          <button @click="onRefineSearch" class="px-2 py-1 bg-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
            검색
          </button>
        </div>
      </div>
    </section>

    <!-- 리스트 -->
    <section>
      <PostCard :posts="paginatedPosts" />
    </section>

    <!-- 페이지네이션 -->
    <section class="flex justify-center">
      <div class="flex justify-center items-center gap-2.5">
        <!-- 이전 버튼 -->
        <button @click="goToPage(currentPage - 1)">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z"
              fill="white" stroke="#DEE2E6" />
            <path d="M26 11L16 21L26 31" stroke="#495057" stroke-width="2" />
          </svg>
        </button>

        <!-- 페이지 숫자들 -->
        <button v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative w-10 h-10">
          <div class="absolute inset-0">
            <svg :width="40" :height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M36 0H4C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0Z"
                :fill="page === currentPage ? '#7048E8' : 'white'"
                :stroke="page === currentPage ? '#7048E8' : '#DEE2E6'" />
            </svg>
          </div>
          <span class="absolute left-[15px] top-[10px] text-center text-base" :class="{
            'text-white font-bold': page === currentPage,
            'text-zinc-600 font-normal': page !== currentPage
          }">
            {{ page }}
          </span>
        </button>

        <!-- 다음 버튼 -->
        <button @click="goToPage(currentPage + 1)">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z"
              fill="white" stroke="#DEE2E6" />
            <path d="M16 11L26 21L16 31" stroke="#495057" stroke-width="2" />
          </svg>
        </button>
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
