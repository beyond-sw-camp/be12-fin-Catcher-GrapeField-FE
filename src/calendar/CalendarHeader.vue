<template>
    <div class="flex justify-between items-start mb-8">
        <div>
            <h1 class="text-3xl font-bold text-zinc-800">{{ title }}</h1>
            <p class="text-base text-stone-500 mt-1">{{ subtitle }}</p>
        </div>
    </div>
    <!-- 오른쪽: 월 이동 버튼 + 전체 -->
    <div class="flex items-center gap-2 mb-6 justify-center">
        <button @click="$emit('prev')" class="w-10 h-10 rounded-full bg-violet-50 text-purple-700 text-lg">◀</button>
        <span class="text-xl font-bold text-zinc-800">{{ year }}년 {{ month }}월</span>
        <button @click="$emit('next')" class="w-10 h-10 rounded-full bg-purple-700 text-white text-lg">▶</button>
    </div>

    <!-- 👇 카테고리 색상 레전드 -->
    <div class="flex items-center gap-4 mb-4">
        <span class="text-base font-bold text-zinc-800">카테고리 색상:</span>
        <Legend v-for="cat in allCategories" :key="cat.name" :text="cat.name" :color="cat.color"
            :isActive="selectedCategories.includes(cat.name)" @toggle="toggleCategory(cat.name)" />
    </div>

</template>

<script setup>
import { ref } from 'vue'
import Legend from './CalendarLegend.vue'

defineProps({
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
    }
})

const showDropdown = ref(false)
const selectedFilter = ref('전체')

const allCategories = [
    { name: '뮤지컬', color: 'purple-700' },
    { name: '연극', color: 'green-500' },
    { name: '콘서트', color: 'amber-500' },
    { name: '전시회', color: 'blue-500' },
    { name: '박람회', color: 'fuchsia-700' }
]

// ✅ 전부 선택된 상태로 초기화
const selectedCategories = ref(allCategories.map(cat => cat.name))

function toggleCategory(name) {
    const i = selectedCategories.value.indexOf(name)
    if (i === -1) {
        selectedCategories.value.push(name)
    } else {
        selectedCategories.value.splice(i, 1)
    }
}
</script>