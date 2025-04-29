<template>
    <div class="overflow-x-auto">
        <div class="min-w-[560px]">
            <div class="flex justify-between items-start mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-zinc-800">{{ title }}</h1>
                    <p class="text-base text-stone-500 mt-1">{{ subtitle }}</p>
                </div>
            </div>
            <div class="flex items-center gap-2 mb-6 justify-center">
                <button @click="$emit('prev')"
                    class="w-10 h-10 rounded-full bg-violet-50 text-purple-700 text-lg">◀</button>
                <span class="text-xl font-bold text-zinc-800">{{ year }}년 {{ month }}월</span>
                <button @click="$emit('next')"
                    class="w-10 h-10 rounded-full bg-purple-700 text-white text-lg">▶</button>
            </div>

            <div v-if="!isMyPage" class="flex items-center gap-4 mb-4">
                <span class="text-base font-bold text-zinc-800">카테고리 색상:</span>
                <Legend v-for="cat in allCategories" :key="cat.name" :text="cat.name" :color="cat.color"
                    :isActive="selectedCategories.includes(cat.name)" @toggle="toggleCategory(cat.name)" />
            </div>

            <div v-else class="flex items-center gap-4 mb-4">
                <!-- 'all' 버튼 -->
                <button @click="$emit('filter-change', 'all')"
                    :class="props.filter === 'all' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-zinc-800'"
                    class="px-4 py-1 rounded-lg">전체</button>

                <!-- 'event' 버튼 -->
                <button @click="$emit('filter-change', 'event')"
                    :class="props.filter === 'event' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-zinc-800'"
                    class="px-4 py-1 rounded-lg">공연/전시 일정</button>

                <!-- 'personal' 버튼 -->
                <button @click="$emit('filter-change', 'personal')"
                    :class="props.filter === 'personal' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-zinc-800'"
                    class="px-4 py-1 rounded-lg">내 일정</button>
                <button @click="addSchedule" class="ml-auto px-4 py-1 rounded-lg bg-green-500 text-white">+ 내 일정
                    추가</button>
                <AddSchedule :isOpen="isModalOpen" @close="isModalOpen = false" />
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCalendarStore } from '../stores/useCalendarStore'

import Legend from './CalendarLegend.vue'
import AddSchedule from '@/user/mypage/calendar/AddSchedule.vue'

defineEmits(['prev', 'next', 'addPersonalSchedule', 'filter-change'])

const calendarStore = useCalendarStore();

const props = defineProps({
    title: {
        type: String,
        default: '공연 예매 캘린더'
    },
    subtitle: {
        type: String,
        default: '다양한 공연과 전시회의 예매 시작일을 한눈에 확인하세요'
    },
    year: Number,
    month: Number,
    showLegend: {
        type: Boolean,
        default: true
    },
    filter: {
        type: String,
        default: 'all'
    }
})

const route = useRoute()

// URL을 기준으로 판단하여 mypage 여부 결정
const isMyPage = computed(() => route.path.includes('mypage'))

const filter = ref('all')

const allCategories = [
    { name: '뮤지컬', color: 'purple-700' },
    { name: '연극', color: 'green-500' },
    { name: '콘서트', color: 'amber-500' },
    { name: '전시회', color: 'blue-500' },
    { name: '클래식', color: 'fuchsia-700' }
]

const selectedCategories = ref(allCategories.map(cat => cat.name))

function toggleCategory(name) {
    const i = selectedCategories.value.indexOf(name)
    if (i === -1) {
        selectedCategories.value.push(name)
    } else {
        selectedCategories.value.splice(i, 1)
    }
}

// 모달 상태 관리
const isModalOpen = ref(false)

function addSchedule() {
    isModalOpen.value = true
}

const showDropdown = ref(false)
const selectedFilter = ref('전체')
</script>
