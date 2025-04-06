<template>
    <div class="bg-white">
      <div class="grid grid-cols-7 border-b border-neutral-200 text-base font-bold">
        <div class="text-red-500 text-center py-2">일</div>
        <div class="text-center py-2">월</div>
        <div class="text-center py-2">화</div>
        <div class="text-center py-2">수</div>
        <div class="text-center py-2">목</div>
        <div class="text-center py-2">금</div>
        <div class="text-blue-500 text-center py-2">토</div>
      </div>
      <div class="grid grid-cols-7 border-neutral-200">
        <div
          v-for="(date, index) in calendarDates"
          :key="index"
          class="h-32 border border-neutral-200 relative px-2 py-1"
          :class="{ 'bg-violet-50 opacity-50': date.today, 'text-zinc-400': date.monthOffset !== 0 }"
        >
          <div class="text-sm">{{ date.day }}</div>
          <div
            v-for="event in getEventsForDate(date.fullDate)"
            :key="event.title"
            class="mt-1 text-xs font-bold text-zinc-800 truncate"
          >
            <div :class="['flex items-center w-full h-6 px-1', event.bg]">
              <div :class="['w-1 h-6 mr-1', event.border]"></div>
              {{ event.title }} ({{ event.time }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  const props = defineProps(['year', 'month', 'events'])
  
  const today = new Date()
  
  function formatDate(y, m, d) {
    const date = new Date(y, m - 1, d)
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }
  
  function getCalendarDates(y, m) {
    const dates = []
    const firstDay = new Date(y, m - 1, 1)
    const startDay = firstDay.getDay()
    const daysInMonth = new Date(y, m, 0).getDate()
    const prevMonthDays = new Date(y, m - 1, 0).getDate()
  
    for (let i = startDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i
      dates.push({ day: d, monthOffset: -1, fullDate: formatDate(y, m - 1, d) })
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = y === today.getFullYear() && m === today.getMonth() + 1 && i === today.getDate()
      dates.push({ day: i, monthOffset: 0, fullDate: formatDate(y, m, i), today: isToday })
    }
    const remain = dates.length % 7
    if (remain !== 0) {
      for (let i = 1; i <= 7 - remain; i++) {
        dates.push({ day: i, monthOffset: 1, fullDate: formatDate(y, m + 1, i) })
      }
    }
    return dates
  }
  
  const calendarDates = computed(() => getCalendarDates(props.year, props.month))
  
  function getEventsForDate(date) {
    return props.events.filter(e => e.date === date)
  }
  </script>
  