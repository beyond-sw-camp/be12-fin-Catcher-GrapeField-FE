<template>
  <div>
    <!-- 추천 콘텐츠 섹션 -->
    <div class="mt-6 w-[100%]">
      <Card title="추천" :cards="combinedCards" :showMoreButton="false" />
    </div>

    <!-- 카테고리: category와 v-model로 연결 -->
    <Category v-model="category" />

    <!-- 이벤트 카드 리스트: category를 prop으로 전달 -->
    <EventShowMoreList :category="category" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../main/Card.vue'
import Category from '../main/Category.vue'
import EventShowMoreList from './EventShowMoreList.vue'
import cardData from '../assets/data/card.json'

// 카테고리 선택 상태
const category = ref('')

// 추천 카드 데이터
const combinedCards = [
  ...cardData.recommendedCards,
  ...cardData.popularCards,
  ...cardData.newCards,
]
</script>
