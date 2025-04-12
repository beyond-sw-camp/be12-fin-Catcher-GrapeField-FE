<template>
  <div>
    <!-- 추천 콘텐츠 섹션 -->
    <div class="mt-6 w-[100%]">
      <!-- <Card title="추천" :cards="combinedCards" :showMoreButton="false" /> -->
      <!-- <Card :title="computedTitle" :cards="sortedCards" /> -->
    </div>

    <!-- 카테고리: category와 v-model로 연결 -->
    <Category v-model="category" />

    <!--콘텐츠 정렬 기준-->
    <Array v-model="array"/>

    <!-- 이벤트 카드 리스트: category를 prop으로 전달 -->
    <EventShowMoreList :category="category" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Card from '../main/Card.vue'
import Category from '../main/Category.vue'
import EventShowMoreList from './EventShowMoreList.vue'
import Array from './Array.vue'
import cardData from '../assets/data/card.json'

const route = useRoute()

// 카테고리 선택 상태
const category = ref('')
// 추천, 인기, 신규 선택
const array=ref('recommend')
onMounted(() => {
  const validSorts = ['recommend', 'popular', 'new']
  const q = route.query.sort
  if (validSorts.includes(q)) {
    array.value = q
  }
})

// 추천 카드 데이터
const combinedCards = [
  ...cardData.recommendedCards,
  ...cardData.popularCards,
  ...cardData.newCards,
]
</script>
