<template>
  <div v-if="!queryType">
    <!-- 추천 콘텐츠 섹션 -->
    <div class="mt-6 w-[100%]">
      <!-- <Card title="추천" :cards="combinedCards" :showMoreButton="false" /> -->
      <!-- <Card :title="computedTitle" :cards="sortedCards" /> -->
    </div>

    <!-- 카테고리: category와 v-model로 연결 -->
    <Category v-model="category" />

    <!--콘텐츠 정렬 기준-->
    <Array v-model="array" />

    <!-- 이벤트 카드 리스트: category를 prop으로 전달 -->
    <EventShowMoreList :category="category" :array="array" />
  </div>
  <div v-else class="w-full max-w-[1200px] mx-auto my-8 px-4">
    <!-- 타입 뷰 (오픈 예정/종료 예정) -->
    <TypeEventList :type="queryType" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Card from '../main/Card.vue'
import Category from '../main/Category.vue'
import EventShowMoreList from './EventShowMoreList.vue'
import Array from './Array.vue'
import TypeEventList from './TypeEventList.vue'

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

const route = useRoute()

// route.query.type을 직접 참조하는 ref 생성
const queryType = computed(() => route.query.type || '')

// 타입에 따른 타이틀 계산
const currentType = computed(() => route.query.type || '')
// 카테고리 선택 상태
const category = ref('ALL')
// 추천, 인기, 신규 선택
const array = ref('recommend')
onMounted(() => {
  const validSorts = ['recommend', 'popular', 'new']
  const q = route.query.sort
  if (validSorts.includes(q)) {
    array.value = q
  }
})
</script>
