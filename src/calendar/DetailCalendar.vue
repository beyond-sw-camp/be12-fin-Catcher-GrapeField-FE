<template>
    <div class="w-full min-h-screen bg-stone-50 px-4 sm:px-10 md:px-20 pt-28">
      <div class="max-w-screen-xl mx-auto">
        <CalendarHeader :year="year" :month="month" @prev="prevMonth" @next="nextMonth" />
        <CalendarGrid :year="year" :month="month" :events="events" />
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import CalendarHeader from './CalendarHeader.vue'
  import CalendarGrid from './CalendarGrid.vue'
  import eventData from '../assets/data/calendarData.json'
  
  const today = new Date()
  const year = ref(today.getFullYear())
  const month = ref(today.getMonth() + 1)
  
  const events = ref([])
  
  onMounted(() => {
    events.value = eventData
  })
  
  function prevMonth() {
    if (month.value === 1) {
      month.value = 12
      year.value--
    } else {
      month.value--
    }
  }
  
  function nextMonth() {
    if (month.value === 12) {
      month.value = 1
      year.value++
    } else {
      month.value++
    }
  }
  </script>
  