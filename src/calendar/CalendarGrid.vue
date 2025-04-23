<template>
    <div class="overflow-x-auto">
        <div class="bg-white rounded-xl border border-gray-200 mx-auto p-2 shadow-sm min-w-[560px]">
            <!-- 요일 헤더 -->
            <div class="grid grid-cols-7 border-b border-neutral-200 text-base font-bold overflow-hidden">
                <div class="text-red-500 text-center py-2">일</div>
                <div class="text-center py-2">월</div>
                <div class="text-center py-2">화</div>
                <div class="text-center py-2">수</div>
                <div class="text-center py-2">목</div>
                <div class="text-center py-2">금</div>
                <div class="text-blue-500 text-center py-2">토</div>
            </div>

            <!-- 날짜 셀 -->
            <div class="grid grid-cols-7 border-neutral-200">
                <!-- 날짜 셀 클릭 이벤트 추가 -->
                <div v-for="(date, index) in calendarDates" :key="index"
                    class="min-w-[80px] h-32 border border-neutral-200 relative px-2 py-1 cursor-pointer"
                    :class="{ 'bg-violet-50 opacity-50': date.today, 'text-zinc-400': date.monthOffset !== 0 }"
                    @click="$emit('date-click', date.fullDate)">
                    <!-- 날짜 (이벤트 2개 이상이면 동그라미 표시) -->

                    <div class="h-6">
                        <span v-if="getEventsForDate(date.fullDate).length > 1"
                            class="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-zinc-800 bg-violet-100 rounded-full">
                            {{ date.day }}
                        </span>
                        <span v-else class="text-sm text-zinc-800">
                            {{ date.day }}
                        </span>
                    </div>


                    <!-- 이벤트 바 -->
                    <div v-for="event in getEventsForDate(date.fullDate).slice(0, 2)" :key="event.title + '-' + (event.startDate || event.saleStart || '')"
                        class="mt-1">
                        <div :class="[
                            'flex items-center min-w-0 h-6 px-1 rounded-md text-xs font-bold text-zinc-800 truncate',
                            categoryStyleMap[categoryTranslation[event.category]]?.bg
                        ]">
                            <div :class="['flex-shrink-0 w-1 h-4 mr-1', categoryStyleMap[categoryStyleMap[categoryTranslation[event.category]]?.bg
                            ]?.border]"></div>
                            {{ event.title }}
                        </div>

                    </div>
                    <div v-if="getEventsForDate(date.fullDate).length > 2" class="flex justify-center items-center h-6">
                        <div class="text-xs font-bold text-zinc-800 cursor-pointer hover:underline">
                            ...

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['year', 'month', 'events'])
const emit = defineEmits(['date-click'])

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

    // 이전 달
    for (let i = startDay - 1; i >= 0; i--) {
        const d = prevMonthDays - i
        dates.push({ day: d, monthOffset: -1, fullDate: formatDate(y, m - 1, d) })
    }

    // 현재 달
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = y === today.getFullYear() && m === today.getMonth() + 1 && i === today.getDate()
        dates.push({ day: i, monthOffset: 0, fullDate: formatDate(y, m, i), today: isToday })
    }

    // 다음 달
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
    const allEvents = [...(props.events.personal || []), ...(props.events.event || []), ...(props.events.startEvents || [])]
    return allEvents.filter(e => {
        const eventDate = e.startDate?.split('T')[0]
        return eventDate === date
    })
}


const categoryTranslation = {
    'MUSICAL': '뮤지컬',
    'EXHIBITION': '전시',
    'PLAY': '연극',
    'CONCERT': '콘서트',
    'CLASSIC': '클래식'
};

const categoryStyleMap = {
    뮤지컬: { bg: 'bg-purple-100', border: 'bg-purple-700' },
    전시: { bg: 'bg-green-100', border: 'bg-green-500' },
    연극: { bg: 'bg-orange-100', border: 'bg-orange-500' },
    콘서트: { bg: 'bg-fuchsia-100', border: 'bg-fuchsia-700' },
    박람회: { bg: 'bg-amber-100', border: 'bg-amber-500' }
}
</script>