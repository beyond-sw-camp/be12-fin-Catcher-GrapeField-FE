<template>
    <div class="pt-10 px-20" v-if="event">
      <!-- 상단 Header와 탭 부분 -->
      <EventHeaderInfo :event="event" />
  
      <div class="mb-8">
        <EventTabs v-model:tab="selectedTab" />
      </div>
  
      <!-- 상세 정보 탭 -->
      <div v-if="selectedTab === '상세 정보'">
        <EventDetail :event="event" />
      </div>
    </div>
  
    <div v-else class="text-center text-gray-500 pt-20">
      로딩 중입니다...
    </div>
  </template>
  
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import EventHeaderInfo from './EventHeaderInfo.vue'
  import EventTabs from './EventDetailTab.vue'
  import EventDetail from './EventDetail.vue'
  import eventsData from '../assets/data/events.json'
  
  // 1. 라우터에서 id 가져오기
  const route = useRoute()
  const id = Number(route.params.id)
  
  // 2. JSON에서 이벤트 찾기
  const event = ref(null)
  onMounted(() => {
  const found = eventsData.events.find(e => e.id === id)
  event.value = found
})
  
  // 3. 탭 상태 관리
  const selectedTab = ref('상세 정보')
  </script>
  
  <style scoped>
  /* 필요시 추가 스타일 */
  .pt-10 {
    padding-top: 2.5rem; /* 상단 여백 */
  }
  .px-20 {
    padding-left: 5rem;
    padding-right: 5rem;
  }
  </style>
  