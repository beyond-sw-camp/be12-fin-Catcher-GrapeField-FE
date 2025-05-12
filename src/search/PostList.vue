<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/useEventsStore';
import { usePostStore } from '@/stores/usePostStore';
defineProps({
  posts: Array,
})

const route = useRoute()
const router = useRouter()
const eventsStore = useEventsStore()

function goToPost(boardIdx, postIdx) {
  eventsStore.setTab('게시판')
  router.push(`/events/${boardIdx}/post/${postIdx}`)
  usePostStore.setViewCnt(postIdx)
}


const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}
</script>

<template>
  <div class="flex flex-col w-full">
    <!-- 헤더 (중간 이상 화면부터만 표시) -->
    <div class="hidden sm:grid grid-cols-12 h-12 bg-violet-50 rounded-t text-sm font-bold text-neutral-800">
      <div class="col-span-3 flex items-center justify-center">게시판</div>
      <div class="col-span-4 flex items-center justify-center">제목</div>
      <div class="col-span-2 flex items-center justify-center">작성자</div>
      <div class="col-span-2 flex items-center justify-center">작성일</div>
      <div class="col-span-1 flex items-center justify-center">조회</div>
    </div>

    <!-- 게시글 리스트 -->
    <div v-for="post in posts" :key="post.id"
      class="border-b bg-white text-sm text-neutral-800 hover:bg-gray-50 px-2 py-2">
      <!-- 모바일: 게시판 + 제목 수직 정렬 -->
      <!-- 모바일 화면 -->
      <div class="sm:hidden flex flex-col gap-1">
        <!-- 게시판 -->
        <div>
          <div class="text-xs text-gray-400">게시판</div>
          <router-link  :to="`/events/${post.boardIdx}`" class="text-purple-700 font-semibold truncate hover:underline">
            {{ post.boardTitle || '게시판' }}
          </router-link>
        </div>

        <!-- 제목 -->
        <div>
          <div class="text-xs text-gray-400">제목</div>
          <div @click="goToPost(post.boardIdx, post.idx)" class="font-medium truncate cursor-pointer hover:underline hover:text-black   ">
            {{ post.title }}
          </div>
        </div>

        <!-- 하단 메타 정보 -->
        <div class="text-xs text-gray-500 flex flex-wrap gap-x-3 gap-y-1 mt-1">
          <span>👤 {{ post.writer }}</span>
          <span>🗓 {{ formatDate(post.createdAt) }}</span>
          <span>👁 {{ post.viewCnt }}</span>
        </div>
      </div>

      <!-- PC: 가로 정렬 -->
      <div class="hidden sm:grid sm:grid-cols-12 sm:gap-2 sm:h-12 items-center">
        <router-link  :to="`/events/${post.boardIdx}`" class="col-span-3 truncate text-purple-700 font-medium hover:underline">
          {{ post.boardTitle || '게시판' }}
        </router-link>
        <div @click="goToPost(post.boardIdx, post.idx)" class="col-span-4 truncate cursor-pointer hover:underline hover:text-black transition">
          {{ post.title }}
        </div>
        <div class="col-span-2 truncate text-center">
          {{ post.writer }}
        </div>
        <div class="col-span-2 truncate text-center">
          {{ formatDate(post.createdAt) }}
        </div>
        <div class="col-span-1 truncate text-center">
          {{ post.viewCnt }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>