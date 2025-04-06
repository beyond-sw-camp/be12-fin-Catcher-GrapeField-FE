<template>
    <div class="flex justify-between items-start mb-8">
        <div>
            <h1 class="text-3xl font-bold text-zinc-800">공연 예매 캘린더</h1>
            <p class="text-base text-stone-500 mt-1">다양한 공연과 전시회의 예매 시작일을 한눈에 확인하세요</p>
        </div>

        <!-- 오른쪽: 월 이동 버튼 + 전체 -->
        <div class="flex items-center gap-2">
            <button @click="$emit('prev')"
                class="w-10 h-10 rounded-full bg-violet-50 text-purple-700 text-lg">◀</button>
            <span class="text-xl font-bold text-zinc-800">{{ year }}년 {{ month }}월</span>
            <button @click="$emit('next')" class="w-10 h-10 rounded-full bg-purple-700 text-white text-lg">▶</button>

            <!-- 전체 버튼 -->
            <div class="ml-4 relative">
                <button @click="toggleDropdown" class="flex items-center bg-violet-50 px-4 py-2 rounded-full">
                    <span class="text-sm font-bold text-purple-700">{{ selectedFilter }}</span>
                    <svg :class="['w-4 h-4 ml-1 transition-transform', showDropdown ? 'rotate-180' : '']" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <!-- 드롭다운 -->
                <div v-if="showDropdown" class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow z-10">
                    <ul class="text-sm text-zinc-800 divide-y">
                        <li v-for="option in ['전체', '뮤지컬', '연극', '콘서트', '전시회', '박람회']" :key="option"
                            @click="selectFilter(option)" class="hover:bg-violet-100 px-4 py-2 cursor-pointer"
                            :class="{ 'bg-violet-100 font-bold text-purple-700': selectedFilter === option }">
                            {{ option }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 카테고리 색상 레전드 -->
    <div class="flex items-center gap-4 mb-4">
        <span class="text-base font-bold text-zinc-800">카테고리 색상:</span>
        <Legend color="bg-purple-700" text="공연" />
        <Legend color="bg-green-500" text="전시" />
        <Legend color="bg-amber-500" text="연극" />
        <Legend color="bg-blue-500" text="팬미팅" />
        <Legend color="bg-fuchsia-700" text="콘서트" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarLegend from './CalendarLegend.vue'

defineProps(['year', 'month'])

const showDropdown = ref(false)
const selectedFilter = ref('전체')

function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

function selectFilter(option) {
    selectedFilter.value = option
    showDropdown.value = false
    // 필터 적용 로직 필요시 여기서 emit 가능
}
</script>