<template>
  <!-- 데이터 로드 완료 후 표시할 컴포넌트 -->
  <div class="wrapper" v-if="event">
    <!-- 상단 Header와 탭 부분 -->
    <EventHeaderInfo :event="event" />

    <div class="mb-8">
      <EventTabs v-model:tab="selectedTab" />
    </div>

    <!-- 상세 정보 탭 -->
    <div v-if="selectedTab === '상세 정보'">
      <EventDetail :event="event" :idx="eventIdx" />
    </div>
    <!--게시판 탭-->
    <div v-if="selectedTab === '게시판'">
      <router-view :eventIdx="eventIdx"></router-view>
    </div>
    <div v-if="selectedTab === '한줄평'" class="flex flex-col gap-y-3">
      <!-- 리뷰 카드 리스트 -->
      <EventReview :eventIdx="eventIdx"/>
    </div>
  </div>
  <!-- 데이터 로드 실패 또는 데이터 없음 (로딩 중이 아닐 때만 표시) -->
  <div v-else-if="!loadingStore.isLoading" class="error-container">
    <p>이벤트 정보를 불러올 수 없습니다.</p>
    <button @click="retryLoading" class="retry-button">다시 시도</button>
  </div>
</template>


<script setup>
import { useRoute, useRouter,onBeforeRouteLeave } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import EventHeaderInfo from './EventHeaderInfo.vue'
import EventTabs from './EventDetailTab.vue'
import EventDetail from './EventDetail.vue'
import EventReview from "./review/EventReview.vue";

import { useEventsStore } from '@/stores/useEventsStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
const loadingStore = useLoadingStore()

const eventStore = useEventsStore();

// 1. 라우터에서 id 가져오기
const route = useRoute()
const eventIdx = Number(route.params.eventIdx) //이벤트 idx

const event = ref(null)
const error = ref(null)

// 탭 상태 관리
const selectedTab = ref(eventStore.selectedTab);
watch(selectedTab, (newVal) => {
  eventStore.setTab(newVal);
});

// 라우트 파라미터 변경 감지
watch(() => route.params.eventIdx, () => {
  loadEventDetail();
});

// 초기 데이터 로드
onMounted(() => {
  loadEventDetail()
})

//이벤트 페이지를 떠나서 새로운 이벤트 페이지로 이동시 상세정보 탭으로 이동
onBeforeRouteLeave((to, from, next) => {
  eventStore.setTab('상세 정보');
  next();
});

const loadEventDetail = async () => {
  try {
    loadingStore.startLoading()
    error.value = null
    // 매번 최신 라우트 파라미터에서 eventIdx 계산
    const currentEventIdx = Number(route.params.eventIdx);
    const response = await eventStore.getEventDetail(currentEventIdx)
    event.value = response
  } catch (err) {
    console.error('상세 페이지 불러오기 실패', err)
    error.value = '데이터를 불러오는 중 오류가 발생했습니다.'
  }
  finally {
    loadingStore.stopLoading()
  }
}

// 다시 시도 함수
const retryLoading = () => {
  loadEventDetail()
}
</script>

<style scoped>
.wrapper {
  margin-bottom: 2vw;
  width: 95%;
  max-width: 95vw;
  margin: 2vh auto;
  padding: 0 5vw;
}
</style>