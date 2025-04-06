<template>
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-3xl font-bold text-zinc-800">공연 예매 캘린더</h1>
        <p class="text-base text-stone-500 mt-1">다양한 공연과 전시회의 예매 시작일을 한눈에 확인하세요</p>
      </div>
  
      <!-- 오른쪽: 월 이동 버튼 + 전체 -->
      <div class="flex items-center gap-2">
        <button @click="$emit('prev')" class="w-10 h-10 rounded-full bg-violet-50 text-purple-700 text-lg">◀</button>
        <span class="text-xl font-bold text-zinc-800">{{ year }}년 {{ month }}월</span>
        <button @click="$emit('next')" class="w-10 h-10 rounded-full bg-purple-700 text-white text-lg">▶</button>
  
        <!-- 전체 필터 버튼 -->
        <div class="ml-4 flex items-center bg-violet-50 px-4 py-1 rounded-md">
          <span class="text-sm font-bold text-purple-700">전체</span>
          <div class="ml-1 w-5 h-5 bg-violet-50 relative">
            <div class="absolute top-1 left-1 w-2.5 h-1 border-t-2 border-purple-700"></div>
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
  import CalendarLegend from './CalendarLegend.vue'
  
  defineProps(['year', 'month'])
  </script>
  