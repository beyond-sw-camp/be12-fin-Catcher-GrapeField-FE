<template>
  <div class="wrapper grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-10">
    <EventShowMoreCard
      v-for="event in events"
      :key="event.id"
      :id="event.id"
      :title="event.title"
      :venue="event.venue"
      :startDate="event.startDate"
      :endDate="event.endDate"
      :posterUrl="event.posterUrl"
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

const props = defineProps({
  category: {
    type: String,
    default: '',
  },
});

const eventsStore = useEventsStore();
const events = ref([]);
const slice = ref({
  category: props.category,
  page: 0,
  size: 30,
  hasNext: true,
});

const loadEvents = async ($state) => {
  try {
    const response = await eventsStore.getEventList(
      slice.value.category,
      slice.value.page,
      slice.value.size
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
  }
};

// 카테고리 변경 시 초기화 + 무한스크롤 reset
const infiniteKey = ref(0)

watch(() => props.category, (newCategory) => {
  slice.value.category = newCategory
  slice.value.page = 0
  events.value = []

  // InfiniteLoading을 강제로 재실행
  infiniteKey.value++
})

</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 70vw;
  margin: 0 auto;
}
</style>
