<template>
  <div class="w-full min-h-screen bg-white px-4 sm:px-10 md:px-20 pt-10">
    <div class="max-w-screen-xl mx-auto">
      <CalendarHeader :year="year" :month="month" :filter="filter" title="나의 캘린더"
        subtitle="예매한 공연과 관심 있는 일정을 한눈에 확인하세요." :showLegend="false" @prev="prevMonth" @next="nextMonth"
        @filter-change="handleFilterChange" />

      <!-- 캘린더 바에 표시될 events (flat 구조) -->
      <CalendarGrid :year="year" :month="month" :events="events" @date-click="handleDateClick" />

      <!-- 날짜 클릭 시 하단 카드 표시 (nested 구조) -->
      <BookingInfoSection :selectedData="selectedBooking" :isMyCalendar="true" />
      <div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CalendarHeader from '../../../calendar/CalendarHeader.vue'
import CalendarGrid from '../../../calendar/CalendarGrid.vue'
import BookingInfoSection from '../../../calendar/BookingInfoSection.vue'
import { useCalendarStore } from '@/stores/uesCalendarStore'

const calendarStore = useCalendarStore()

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth() + 1)

const events = ref([])         // flat 구조로 상단 캘린더 바에서 사용
const bookingInfo = ref([])    // nested 구조로 하단 카드에서 사용
const selectedBooking = ref(null) // 클릭된 날짜 정보 저장

const selectedDate = ref(null)

const targetDate = new Date(year.value, month.value, 1);

const fetchEvents = async () => {
  const targetDate = new Date(year.value, month.value, 1)
  const isoDateString = targetDate.toISOString().slice(0, 19)

  try {
    let result
    if (filter.value === 'all') {
      result = await calendarStore.getAllSchedule(isoDateString) 
    } else if (filter.value === 'event') {
      const data = await calendarStore.getInterestSchedule(isoDateString)
      result = { startEvents: data }
    } else if (filter.value === 'personal') {
      const data = await calendarStore.getPersonalSchedule(isoDateString)
      result = { startEvents: data }
    }

    events.value = result
    bookingInfo.value = result
    selectedBooking.value = null
  } catch (error) {
    console.error("캘린더 데이터 로딩 오류:", error)
  }
}


const filter = ref('all') // 초기값은 전체
async function handleFilterChange(selectedFilter) {
  filter.value = selectedFilter
  await fetchEvents() // 필터가 바뀌면 데이터를 다시 불러오거나 필터링
}

function handleDateClick(date) {
  const mergedEvents = [
    ...(bookingInfo.value.personal || []),
    ...(bookingInfo.value.event || []),
    ...(bookingInfo.value.startEvents || [])
  ]

  const matchingEvents = mergedEvents.filter(event => {
    const eventDate = event.startDate.split('T')[0]
    return eventDate === date
  })

  if (matchingEvents.length > 0) {
    selectedBooking.value = {
      date: date,
      items: matchingEvents.map(event => ({
        idx: event.idx,
        category: event.category,
        title: event.title,
        time: formatTime(event.saleStart || event.startDate), // 개인 일정엔 saleStart가 없으므로
        vendor: event.ticketVendor,
        link: event.ticketLink,
        period: event.endDate
          ? `${formatDate(event.startDate)} ~ ${formatDate(event.endDate)}`
          : formatDate(event.startDate), // 개인일정은 기간 없음
        location: event.venue,
        description: event.description // 개인일정용
      }))
    }
  } else {
    selectedBooking.value = null
  }
}

// 날짜/시간 포맷팅 함수
function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

function formatTime(dateString) {
  const date = new Date(dateString)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

function prevMonth() {
  if (month.value === 1) {
    month.value = 12
    year.value--
  } else {
    month.value--
  }
  // 이전 달로 변경 후 데이터 다시 불러오기
  fetchEvents()
}

function nextMonth() {
  if (month.value === 12) {
    month.value = 1
    year.value++
  } else {
    month.value++
  }
  // 다음 달로 변경 후 데이터 다시 불러오기
  fetchEvents()
}

onMounted(() => {
  // 컴포넌트 마운트 시 초기 데이터 로딩
  fetchEvents()
})
</script>
