<template>
    <router-link :to="`/event/${id}`" class="block">
    <div class="w-56 h-80 bg-white rounded-2xl shadow-md flex flex-col">
      <!-- 상단 색 배경 -->
      <div :class="['w-full h-64 rounded-2xl', color]"></div>
  
      <!-- 텍스트 영역 -->
      <div class="px-3 mt-3">
        <p class="text-purple-800 text-base font-semibold truncate">{{ title }}</p>
        <p class="text-neutral-500 text-sm mt-0.5 truncate">{{ venue }}</p>
        <p class="text-neutral-500 text-sm mt-0.5">{{ dateRange }}</p>
      </div>
    </div>
    </router-link>
  </template>
  
  <script setup>
  defineProps({
  id: Number, // 상세정보에 사용
  title: String,
  venue: String,
  dateRange: String,
  color: String
})
  </script>