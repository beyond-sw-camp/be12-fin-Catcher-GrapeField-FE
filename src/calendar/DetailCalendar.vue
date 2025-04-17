<template>
    <div class="w-full min-h-screen bg-white px-4 sm:px-10 md:px-20 pt-28">
        <div class="max-w-screen-xl mx-auto">
            <CalendarHeader :year="year" :month="month" @prev="prevMonth" @next="nextMonth" />
            <CalendarGrid :year="year" :month="month" :events="events" @date-click="handleDateClick" />
            <BookingInfoSection :selectedData="selectedBooking" />
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CalendarHeader from './CalendarHeader.vue'
import CalendarGrid from './CalendarGrid.vue'
import BookingInfoSection from './BookingInfoSection.vue'
import eventData from '../assets/data/calendarData.json'
import bookingInfoData from '../assets/data/bookinginfo.json'

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth() + 1)

const events = ref([])
const bookingInfo = ref([])
const selectedBooking = ref(null)


const targetDate = new Date(year.value, month.value, 1);
const isoDateString = targetDate.toISOString().slice(0, 19);

const fetchEvents = async () => {
    // 월을 변경할 때마다 호출되는 함수
    const targetDate = new Date(year.value, month.value, 1) // month는 0부터 시작하므로 -1
    const isoDateString = targetDate.toISOString().slice(0, 19)

    try {
        console.log(`${year.value}년 ${month.value}월 데이터 요청중...`)
        const result = await axios.get("/api/events/calendar_detail", {
            params: { date: isoDateString }
        })

        console.log("API 응답 데이터:", result.data)
        events.value = result.data
        bookingInfo.value = result.data

        // 페이지 이동 시 선택된 날짜 정보 초기화
        selectedBooking.value = null
    } catch (error) {
        console.error("이벤트 데이터 로딩 실패:", error)
        // 에러 처리 (선택 사항: 폴백 데이터 사용)
        // events.value = [] 
    }
}

function handleDateClick(date) {
    // 해당 날짜에 해당하는 모든 이벤트 찾기
    const matchingEvents = bookingInfo.value.startEvents.filter(event => {
        const eventDate = event.startDate.split('T')[0] // "2025-04-01T00:00:00" → "2025-04-01"
        return eventDate === date
    })

    // BookingInfoSection에 맞는 형식으로 데이터 변환
    if (matchingEvents.length > 0) {
        selectedBooking.value = {
            date: date, // 날짜 문자열 (YYYY-MM-DD)
            items: matchingEvents.map(event => ({
                idx: event.idx,
                category: event.category,
                title: event.title,
                time: formatTime(event.saleStart),
                vendor: event.ticketVendor,
                link: event.ticketLink,
                period: `${formatDate(event.startDate)} ~ ${formatDate(event.endDate)}`,
                location: event.venue
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