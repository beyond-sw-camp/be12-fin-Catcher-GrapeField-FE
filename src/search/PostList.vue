<script setup>
import PostRow from './PostRow.vue'

defineProps({
  posts: Array
})
</script>

<template>
  <div class="flex flex-col">
    <!-- 헤더 -->
    <div class="grid grid-cols-[12rem_1fr_8rem_7rem_6rem_6rem] h-12 bg-violet-50 rounded-t text-sm font-bold text-neutral-800">
      <div class="flex items-center justify-center">게시판</div>
      <div class="flex items-center justify-center">제목</div>
      <div class="flex items-center justify-center">작성자</div>
      <div class="flex items-center justify-center">작성일</div>
      <div class="flex items-center justify-center">조회</div>
      <div class="flex items-center justify-center">추천</div>
    </div>

    <!-- 게시글 리스트 -->
    <PostRow
        v-for="post in posts"
        :key="post.id"
        :post="post"
    />
  </div>
</template>

<style scoped>
</style>
