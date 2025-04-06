<template>
  <div class="wrapper max-w-screen-xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-10">
    <EventShowMoreCard
        v-for="event in events"
        :key="event.id"
        :id="event.id"
        :title="event.title"
        :venue="event.venue"
        :dateRange="event.dateRange"
        :color="event.color"
    />
  </div>
</template>

<script setup>
import EventShowMoreCard from './EventShowMoreCard.vue'

const events = [
  { id: 1, title: '알라딘', venue: '샤롯데씨어터', dateRange: '2024.11.22 ~ 2025.06.22', color: 'bg-violet-50' },
  { id: 2, title: '레미제라블', venue: '예술의전당', dateRange: '2025.01.01 ~ 2025.03.01', color: 'bg-purple-100' },
  { id: 3, title: '지킬앤하이드', venue: '블루스퀘어', dateRange: '2024.12.01 ~ 2025.02.15', color: 'bg-orange-100' },
  { id: 4, title: '캣츠', venue: '예술의전당', dateRange: '2025.03.10 ~ 2025.05.01', color: 'bg-violet-50' },
  { id: 5, title: '노트르담 드 파리', venue: 'LG아트센터', dateRange: '2024.10.20 ~ 2025.01.20', color: 'bg-purple-100' },
  { id: 6, title: '알라딘', venue: '샤롯데씨어터', dateRange: '2024.11.22 ~ 2025.06.22', color: 'bg-violet-50' },
  { id: 7, title: '레미제라블', venue: '예술의전당', dateRange: '2025.01.01 ~ 2025.03.01', color: 'bg-purple-100' },
  { id: 8, title: '지킬앤하이드', venue: '블루스퀘어', dateRange: '2024.12.01 ~ 2025.02.15', color: 'bg-orange-100' },
  { id: 9, title: '캣츠', venue: '예술의전당', dateRange: '2025.03.10 ~ 2025.05.01', color: 'bg-violet-50' },
  { id: 10, title: '노트르담 드 파리', venue: 'LG아트센터', dateRange: '2024.10.20 ~ 2025.01.20', color: 'bg-purple-100' },
  { id: 11, title: '알라딘', venue: '샤롯데씨어터', dateRange: '2024.11.22 ~ 2025.06.22', color: 'bg-violet-50' },
  { id: 12, title: '레미제라블', venue: '예술의전당', dateRange: '2025.01.01 ~ 2025.03.01', color: 'bg-purple-100' },
  { id: 13, title: '지킬앤하이드', venue: '블루스퀘어', dateRange: '2024.12.01 ~ 2025.02.15', color: 'bg-orange-100' },
  { id: 14, title: '캣츠', venue: '예술의전당', dateRange: '2025.03.10 ~ 2025.05.01', color: 'bg-violet-50' },
  { id: 15, title: '노트르담 드 파리', venue: 'LG아트센터', dateRange: '2024.10.20 ~ 2025.01.20', color: 'bg-purple-100' },
]
const filteredEvents = events // 나중에 필터 추가 가능
</script>\

<style scoped>
.wrapper {
  width: 95%;
  max-width: 95vw;
  margin: 2vh auto;
  padding: 0 5vw;
}
</style>