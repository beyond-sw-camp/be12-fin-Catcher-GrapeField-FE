<template>
    <div class="wrapper" v-if="event">
      <!-- 상단 Header와 탭 부분 -->
      <EventHeaderInfo :event="event" />
  
      <div class="mb-8">
        <EventTabs v-model:tab="selectedTab" />
      </div>
  
      <!-- 상세 정보 탭 -->
      <div v-if="selectedTab === '상세 정보'">
        <EventDetail :event="event" />
      </div>
      <div v-if="selectedTab === '게시판'">
        <EventPost></EventPost>
<!--        나중에 데이터 직접 넣을 때 아래코드로 변경해야됨-->
<!--        <EventPost :event="event" />-->
      </div>
      <div v-if="selectedTab === '한줄평'">
        <EventReview></EventReview>
        <!--        나중에 데이터 직접 넣을 때 아래코드로 변경해야됨-->
        <!--        <EventReview :event="event" />-->
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
  import EventPost from './EventPost.vue'
  import EventReview from "./EventReview.vue";
  
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
.wrapper{
  margin-bottom: 2vw;
  width: 95%;
  max-width: 95vw;
  margin: 2vh auto;
  padding: 0 5vw;
}
  </style>
  