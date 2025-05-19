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

// 한 번에 보여줄 페이지 버튼 개수
const pagesPerGroup = 10

// 현재 표시되는 페이지 그룹 계산
const visiblePages = computed(() => {
  if (totalPages.value === 0) return []
  
  // 현재 페이지가 속한 그룹의 시작 페이지 계산
  const startPage = Math.floor((currentPage.value - 1) / pagesPerGroup) * pagesPerGroup + 1
  
  // 현재 그룹의 마지막 페이지 계산 (총 페이지 수를 초과하지 않도록)
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages.value)
  
  // 시작 페이지부터 끝 페이지까지의 배열 생성
  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

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

// 이전 페이지 그룹으로 이동
function goToPrevGroup() {
  const firstVisiblePage = visiblePages.value[0]
  if (firstVisiblePage <= 1) return
  
  goToPage(firstVisiblePage - 1)
}

// 다음 페이지 그룹으로 이동
function goToNextGroup() {
  const lastVisiblePage = visiblePages.value[visiblePages.value.length - 1]
  if (lastVisiblePage >= totalPages.value) return
  
  goToPage(lastVisiblePage + 1)
}

// 첫 페이지로 이동
function goToFirstPage() {
  goToPage(1)
}

// 마지막 페이지로 이동
function goToLastPage() {
  goToPage(totalPages.value)
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
          <input type="text" placeholder="게시글 내 재검색" v-model="newKeyword"
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
    <section class="flex flex-col items-center">
      <div class="flex justify-center items-center gap-2.5">
        <!-- 첫 페이지로 이동 버튼 -->
        <button @click="goToFirstPage" :disabled="currentPage === 1" class="disabled:opacity-50">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" 
              fill="white" stroke="#DEE2E6" 
            />
            <path d="M29 11L19 21L29 31" stroke="#495057" stroke-width="2" />
            <path d="M19 11L9 21L19 31" stroke="#495057" stroke-width="2" />
          </svg>
        </button>
        
        <!-- 이전 페이지 그룹으로 이동 버튼 -->
        <button @click="goToPrevGroup" :disabled="visiblePages[0] <= 1" class="disabled:opacity-50">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z"
              fill="white" stroke="#DEE2E6" />
            <path d="M26 11L16 21L26 31" stroke="#495057" stroke-width="2" />
          </svg>
        </button>

        <!-- 페이지 숫자들 -->
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" class="relative w-10 h-10">
          <div class="absolute inset-0">
            <svg :width="40" :height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M36 0H4C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0Z"
                :fill="page === currentPage ? '#7048E8' : 'white'"
                :stroke="page === currentPage ? '#7048E8' : '#DEE2E6'" />
            </svg>
          </div>
          <span class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-base" :class="{
            'text-white font-bold': page === currentPage,
            'text-zinc-600 font-normal': page !== currentPage
          }">
            {{ page }}
          </span>
        </button>

        <!-- 다음 페이지 그룹으로 이동 버튼 -->
        <button @click="goToNextGroup" :disabled="visiblePages[visiblePages.length - 1] >= totalPages" class="disabled:opacity-50">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z"
              fill="white" stroke="#DEE2E6" />
            <path d="M16 11L26 21L16 31" stroke="#495057" stroke-width="2" />
          </svg>
        </button>
        
        <!-- 마지막 페이지로 이동 버튼 -->
        <button @click="goToLastPage" :disabled="currentPage === totalPages" class="disabled:opacity-50">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" 
              fill="white" stroke="#DEE2E6" 
            />
            <path d="M13 11L23 21L13 31" stroke="#495057" stroke-width="2" />
            <path d="M23 11L33 21L23 31" stroke="#495057" stroke-width="2" />
          </svg>
        </button>
      </div>
      
      <!-- 현재 상태 표시 (선택 사항) -->
      <div class="mt-4 text-sm text-gray-500 text-center">
        페이지 {{ currentPage }} / {{ totalPages }}
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

/* 비활성화된 버튼 스타일 */
button:disabled {
  cursor: not-allowed;
}
</style>