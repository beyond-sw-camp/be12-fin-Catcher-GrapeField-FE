<script setup>
import { ref, computed } from 'vue'
import eventData from '/public/sample/search/events.js'
import postData from "../../public/sample/search/posts.js";

const currentPage = ref(1)
const itemsPerPage = 15

const totalPages = computed(() => Math.ceil(eventData.length / itemsPerPage))
const paginatedData = computed(() =>
    eventData.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
)

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="wrapper mt-8 flex flex-col gap-10">
    <!-- 제목 & 탭 -->
    <section class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold text-neutral-800">'햄릿' 검색 결과</h2>
      <nav class="flex gap-2">
        <router-link
            to="/search"
            class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-zinc-600 flex items-center justify-center rounded"
        >
          통합검색
        </router-link>
        <router-link
            to="/search/events"
            class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-violet-600 font-bold underline flex items-center justify-center rounded"
        >
          공연/전시
        </router-link>
        <router-link
            to="/search/post"
            class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-zinc-600 flex items-center justify-center rounded"
        >
          게시판
        </router-link>
        <router-link
            to="/search/review"
            class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-zinc-600 flex items-center justify-center rounded"
        >
          한줄평
        </router-link>
      </nav>
    </section>

    <!-- 검색 + 개수 -->
    <section class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-neutral-800">게시글 ({{ postData.length }})</h2>
        <div class="flex items-center px-4 py-1 border border-zinc-300 rounded-full w-80 bg-white">
          <input
              type="text"
              placeholder="게시글 내 재검색"
              class="flex-1 text-sm text-neutral-800 bg-transparent outline-none"
          />
          <div class="w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs">
            🔍
          </div>
        </div>
      </div>
    </section>
    <!-- 검색 결과 목록 -->
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <router-link
          v-for="event in paginatedData"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      >
        <div class="h-56 bg-purple-100"></div>
        <div class="flex flex-col gap-1 p-4">
          <h3 class="text-lg font-bold text-neutral-800">{{ event.title }}</h3>
          <p class="text-sm text-zinc-600">{{ event.dateRange }}</p>
          <p class="text-xs text-zinc-500">{{ event.location }}</p>
          <p class="text-base font-bold text-zinc-800">{{ event.price }}</p>
          <span class="px-2 py-1 text-xs font-medium text-amber-500 bg-yellow-50 rounded-full w-fit">
      {{ event.status }}
    </span>
        </div>
      </router-link>
    </section>

    <!-- 페이지네이션 -->
    <section class="flex justify-center gap-2 mt-6">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
              class="w-10 h-10 border border-zinc-300 rounded hover:bg-zinc-100">
        ‹
      </button>
      <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="w-10 h-10 rounded flex items-center justify-center font-bold text-base"
          :class="page === currentPage ? 'bg-violet-600 text-white' : 'bg-white border border-zinc-300 text-zinc-600'"
      >
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
