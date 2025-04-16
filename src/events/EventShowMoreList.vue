<template>
  <div class="wrapper grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-10">
    <EventShowMoreCard
      v-for="event in events"
      :idx="event.idx"
      :title="event.title"
      :venue="event.venue"
      :startDate="event.startDate"
      :endDate="event.endDate"
      :posterUrl="BASE_IMAGE_URL + encodeURIComponent(event.posterImgUrl)"
    />
  </div>
  <InfiniteLoading :key="infiniteKey" @infinite="loadEvents">
  <template #complete>
    <div></div>
  </template>
</InfiniteLoading>

</template>

<script setup>
import { ref, watch } from 'vue';
import EventShowMoreCard from './EventShowMoreCard.vue';
import { useEventsStore } from '@/stores/useEventsStore';
import { useLoadingStore } from '@/stores/useLoadingStore'
const loadingStore = useLoadingStore()

const props = defineProps({
  category: {
    type: String,
    default: 'ALL',
  },
  array: {
    type: String,
    default: 'recommend',
  },
});


const eventsStore = useEventsStore();
const events = ref([]);
const slice = ref({
  category: props.category,
  array: props.array,
  page: 0,
  size: 30,
  hasNext: true,
});

const loadEvents = async ($state) => {
  try {
    loadingStore.startLoading()
    const response = await eventsStore.getMoreEventList(
      slice.value.category,
      slice.value.array,
      slice.value.page,
      slice.value.size,
    );
    const content = response.content || [];

    if (content.length < 1) {
      console.log('더 이상 불러올 데이터 없음.');
      $state.complete();
    } else {
      events.value.push(...content);
      $state.loaded();
    }
    slice.value.page++;
  } catch (error) {
    console.error('공연/전시 목록 불러오기 실패:', error);
    $state.error();
  } finally {
    loadingStore.stopLoading()
  }
};

// 카테고리 변경 시 초기화 + 무한스크롤 reset
const infiniteKey = ref(0)

// category or array 변경될 때 모두 반응
watch([() => props.category, () => props.array], ([newCategory, newArray]) => {
  slice.value.category = newCategory
  slice.value.array = newArray
  slice.value.page = 0
  events.value = []
  infiniteKey.value++
})

//NOTE: 이미지 링크 임의 설정
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 70vw;
  margin: 0 auto;
}
</style>
