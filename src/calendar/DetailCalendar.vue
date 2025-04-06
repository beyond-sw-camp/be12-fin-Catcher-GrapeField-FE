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

onMounted(() => {
    events.value = eventData
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