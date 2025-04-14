<script setup>
import EventCard from './EventsCardGeneral.vue'
import PostRow from './PostRow.vue'
import ReviewCard from './ReviewCard.vue'

import events from '/src/assets/data/search/events.js'
import posts from '/src/assets/data/search/posts.js'
import reviews from '/src/assets/data/search/reviews.js'
</script>

<template>
  <div class="wrapper flex flex-col gap-10 mt-8">
    <!-- 제목 & 탭 -->
    <section class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold text-neutral-800">'햄릿' 검색 결과</h2>
      <nav class="flex gap-2">
        <router-link
            to="/search"
            class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-violet-600 font-bold underline flex items-center justify-center rounded"
        >
          통합검색
        </router-link>
        <router-link
            to="/search/events"
            class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-zinc-600 flex items-center justify-center rounded"
        >
          공연/전시
        </router-link>
        <router-link
            to="/search/post"
            class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-zinc-600  flex items-center justify-center rounded"
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

    <!-- 공연/전시 카드 -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">공연/전시 ({{ events.length }})</h3>
        <router-link to="/search/events" class="text-violet-500 text-sm">더보기</router-link>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <EventCard
            v-for="event in events.slice(0, 3)"
            :key="event.id"
            :id="event.id"
            :title="event.title"
            :period="event.period"
            :location="event.location"
        />
      </div>
    </section>

    <!-- 게시판 테이블 -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">게시글 ({{ posts.length }})</h3>
        <router-link to="/search/post" class="text-violet-500 text-sm">더보기</router-link>
      </div>
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
        <ReviewCard
            v-for="review in reviews.slice(0, 3)"
            :key="review.id"
            :username="review.username"
            :rating="review.rating"
            :date="review.date"
            :comment="review.comment"
        />
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
