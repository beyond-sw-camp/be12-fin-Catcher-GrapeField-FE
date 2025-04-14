<template>
  <div class="wrapper grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-10">
    <EventShowMoreCard v-for="event in events" 
    :key="event.idx" 
    :id="event.idx" 
    :title="event.title"
    :venue="event.venue" 
    :period="formatPeriod(event.startDate, event.endDate)"
    :poster-url="event.posterUrl || defaultPoster" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import EventShowMoreCard from './EventShowMoreCard.vue'
import eventsData from '../assets/data/events.json'

const events = ref([])
const defaultPoster = '/assets/default-poster.jpg' // 기본 포스터 경로 (없을 경우)

function formatPeriod(start, end) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
  }
  return `${formatDate(start)} - ${formatDate(end)}`
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/events/list')
    events.value = response.data.instances
    console.log("이벤트 데이터 로드 완료:", response.data)
  } catch (error) {
    console.error('이벤트 데이터를 불러오는데 실패했습니다:', error)
  }
})

</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 70vw;
  margin: 0 auto;
}
</style>