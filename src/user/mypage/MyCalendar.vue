<template>
  <div class="w-full min-h-screen bg-white px-4 sm:px-10 md:px-20 pt-28">
    <div class="max-w-screen-xl mx-auto">
      <CalendarHeader
        :year="year"
        :month="month"
        title="나의 캘린더"
        subtitle="예매한 공연과 관심 있는 일정을 한눈에 확인하세요."
        :showLegend="false"
        @prev="prevMonth"
        @next="nextMonth"
      />

      <!-- 캘린더 바에 표시될 events (flat 구조) -->
      <CalendarGrid
        :year="year"
        :month="month"
        :events="events"
        @date-click="handleDateClick"
      />

      <!-- 날짜 클릭 시 하단 카드 표시 (nested 구조) -->
      <BookingInfoSection
        :selectedData="selectedBooking"
        :isMyCalendar="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CalendarHeader from '../../calendar/CalendarHeader.vue'
import CalendarGrid from '../../calendar/CalendarGrid.vue'
import BookingInfoSection from '../../calendar/BookingInfoSection.vue'
import bookingInfoData from '../../assets/data/mybookinginfo.json' // ✅ nested 구조 JSON

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth() + 1)

const events = ref([])         // flat 구조로 상단 캘린더 바에서 사용
const bookingInfo = ref([])    // nested 구조로 하단 카드에서 사용
const selectedBooking = ref(null) // 클릭된 날짜 정보 저장

onMounted(() => {
  // ✅ 상단 바에 표시될 평탄화된 events 데이터 변환
  events.value = bookingInfoData.flatMap(item =>
    item.items.map(i => ({
      ...i,
      category: i.category.trim(),
      date: item.date
    }))
  )

  // ✅ 하단 카드에 표시할 nested 데이터 유지
  bookingInfo.value = bookingInfoData
})

function handleDateClick(date) {
  selectedBooking.value = bookingInfo.value.find(item => item.date === date) || null
}

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
