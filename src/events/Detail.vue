<!-- src/events/Detail.vue -->
<template>
    <div class="pt-10 px-20">
      <EventHeaderInfo v-bind="event" />
      <EventTabs v-model:tab="selectedTab" />
      <!-- <EventDetailContent v-if="selectedTab === '상세 정보'" /> -->
      <!-- 추가: 추천, 게시판, 한줄평 영역도 나중에 연결 가능 -->
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, computed } from 'vue'
  import EventHeaderInfo from './EventHeaderInfo.vue'
  import EventTabs from './EventDetailTab.vue'
  
  // 1. 라우터에서 id 가져오기
  const route = useRoute()
  const id = Number(route.params.id)
  
  // 2. 임시 데이터 (추후 API 대체 가능)
  const eventList = [
    {
      id: 1,
      title: '알라딘',
      genre: '뮤지컬',
      posterUrl: '/images/aladdin.jpg',
      period: '2025.02.08 ~ 2025.05.11',
      isOngoing: true,
      score: 9.5,
      duration: '150분',
      ageLimit: '8세 이상',
      venue: '샤롯데씨어터',
      price: 'VIP석 110,000원 | R석 99,000원 | S석 77,000원',
      bookingEarly: '2024.12.22 ~ 2025.01.10',
      bookingNormal: '2025.01.11 ~ 2025.05.10'
    },
    // ... 다른 이벤트들
  ]
  
  const event = computed(() => eventList.find(e => e.id === id))
  const selectedTab = ref('상세 정보')
  </script>
  