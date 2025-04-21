<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchHeader from './SearchHeader.vue'
import { useSearchStore } from '@/stores/useSearchStore'
const searchStore = useSearchStore()

const props = defineProps({ keyword: String })

const currentPage = ref(1)
const itemsPerPage = 12

// events 전체 응답 객체로 초기화
const events = ref({
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  size: 0
})

// 이벤트 검색
const loadEvents = async () => {
  try {
    searchStore.setTab('공연/전시')
    const response = await searchStore.getEventsSearchList(props.keyword, currentPage.value - 1, itemsPerPage)
    events.value = response || {}
    console.log('검색 결과:', response)
  } catch (error) {
    console.error("검색 결과 로드 실패:", error)
  }
}

onMounted(loadEvents)

const totalPages = computed(() => events.value.totalPages || 0)
const paginatedEvents = computed(() => events.value.content || [])

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadEvents()
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}

// 재검색
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
  const response = await searchStore.getEventsRefineSearchList(refinedKeywords.value, currentPage.value - 1, itemsPerPage)
  events.value = response || {}
}
</script>

<template>
  <div class="wrapper mt-8 flex flex-col gap-10">
    <SearchHeader />
    <!-- 검색 + 개수 -->
    <section class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-neutral-800"> 공연/전시 ({{ events.totalElements }})</h2>
        <div class="flex items-center px-4 py-1 border border-zinc-300 rounded-full w-80 bg-white">
          <input v-model="newKeyword" type="text" placeholder="결과 내 재검색"
            class="flex-1 text-sm text-neutral-800 bg-transparent outline-none" />
          <button @click="onRefineSearch" class="px-2 py-1 bg-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
            검색
          </button>
        </div>
      </div>
    </section>
    <!-- 검색 결과 목록 -->
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <router-link v-for="event in paginatedEvents" :key="event.id" :to="`/events/${event.idx}`"
        class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
        <div class="h-56 bg-purple-100"></div>
        <div class="flex flex-col gap-1 p-4">
          <h3 class="text-lg font-bold text-neutral-800">{{ event.title }}</h3>
          <p class="text-sm text-zinc-600">{{ event.dateRange }}</p>
          <p class="text-xs text-zinc-500">{{ event.venue }}</p>
          <p class="text-base font-bold text-zinc-800">{{ formatDate(event.startDate) }}</p>
        </div>
      </router-link>
    </section>
    <!-- 페이지네이션 -->
    <section class="flex justify-center gap-2 mt-6">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        class="w-10 h-10 border border-zinc-300 rounded hover:bg-zinc-100">
        ‹
      </button>
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
        class="w-10 h-10 rounded flex items-center justify-center font-bold text-base"
        :class="page === currentPage ? 'bg-violet-600 text-white' : 'bg-white border border-zinc-300 text-zinc-600'">
        {{ page }}
      </button>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="w-10 h-10 border border-zinc-300 rounded hover:bg-zinc-100">
        ›
      </button>
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
