<template>
    <div class="w-full min-h-screen bg-white px-4 sm:px-10 md:px-20 pt-10">
        <div class="max-w-screen-xl mx-auto">
            <CalendarHeader :year="year" :month="month" @prev="prevMonth" @next="nextMonth" />
            <CalendarGrid :year="year" :month="month" :events="calendarStore.filteredEvents"
                @date-click="handleDateClick" />
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
import { useCalendarStore } from '../stores/useCalendarStore'

const calendarStore = useCalendarStore();
console.log("\n\n\n calendar Store " + calendarStore);  

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth() + 1)

const events = ref([])
const bookingInfo = ref([])
const selectedBooking = ref(null)

const targetDate = new Date(year.value, month.value, 1);
const isoDateString = targetDate.toISOString().slice(0, 19);

const fetchEvents = async () => {
    try {
        console.log(`${year.value}년 ${month.value}월 데이터 요청중...`)
        // result는 이미 response.data 값임
        const result = await calendarStore.mainList(year.value, month.value + 1);

        // API에서 반환된 데이터가 직접 사용됨
        bookingInfo.value = result;
        selectedBooking.value = null;
    } catch (error) {
        console.error("이벤트 데이터 로딩 실패:", error);
    }
}

function handleDateClick(date) {
    console.log("필터링된 이벤트:", calendarStore.filteredEvents);
    // calendarStore의 filteredEvents 사용
    const matchingEvents = calendarStore.filteredEvents.startEvents?.filter(event => {
        const eventDate = event.saleStart.split('T')[0];
        return eventDate === date;
    }) || [];

    if (matchingEvents.length > 0) {
        selectedBooking.value = {
            date: date,
            items: matchingEvents.map(event => ({
                idx: event.idx,
                category: event.category,
                title: event.title,
                time: formatTime(event.saleStart),
                vendor: event.ticketVendor,
                link: event.ticketLink || "#",
                period: `${formatDate(event.saleStart)} ~ ${formatDate(event.saleEnd)}`,
                location: event.venue || "정보 없음"
            }))
        }
    } else {
        selectedBooking.value = null;
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