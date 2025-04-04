<template>
    <div class="w-[1320px] h-80 relative bg-violet-50 rounded-xl mx-auto">
      <!-- 포스터 이미지 박스 -->
      <div class="w-44 h-56 absolute left-[48px] top-[67px] bg-amber-300 rounded-[10px] flex items-center justify-center">
        <img :src="event.posterUrl" alt="포스터" class="w-24 h-36 object-cover" />
      </div>
  
      <!-- 공연 정보 텍스트 -->
      <div class="absolute left-[255px] top-[72px]">
        <div class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-neutral-800">{{ event.genre }}</span>
          <span class="text-2xl font-bold text-neutral-800">{{ event.title }}</span>
        </div>
  
        <!-- 날짜 & 상태 -->
        <div class="flex items-center space-x-2 mt-2">
          <span class="text-sm text-zinc-600">{{ event.period }}</span>
          <span v-if="event.isOngoing" class="px-2 py-0.5 text-sm text-white bg-violet-400 rounded-full">진행중</span>
          <span v-if="event.score" class="flex items-center text-yellow-500 text-sm font-semibold">
            ⭐ {{ event.score }}
          </span>
          <span class="text-purple-500">❤️</span>
          <span class="text-purple-500">🔔</span>
        </div>
  
        <!-- 공연 메타 정보 -->
        <div class="mt-6 p-4 bg-white rounded-xl w-[1024px] shadow-sm">
          <div class="grid grid-cols-2 gap-y-2 gap-x-10 text-sm">
            <div class="flex">
              <span class="w-24 font-bold text-neutral-800">공연 시간</span>
              <span class="text-zinc-600">{{ event.duration }}</span>
            </div>
            <div class="flex">
              <span class="w-24 font-bold text-neutral-800">가 격</span>
              <span class="text-zinc-600">{{ event.price }}</span>
            </div>
            <div class="flex">
              <span class="w-24 font-bold text-neutral-800">관람 연령</span>
              <span class="text-zinc-600">{{ event.ageLimit }}</span>
            </div>
            <div class="flex">
              <span class="w-24 font-bold text-neutral-800">선 예매</span>
              <span class="text-zinc-600">{{ event.bookingEarly?.period }}</span>
            </div>
            <div class="flex">
              <span class="w-24 font-bold text-neutral-800">장 소</span>
              <span class="text-zinc-600">{{ event.venue }}</span>
            </div>
            <div class="flex">
              <span class="w-24 font-bold text-neutral-800">일반 예매</span>
              <span class="text-zinc-600">{{ event.bookingNormal?.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    event: Object
  })
  </script>
  
  <style scoped>
  /* 필요시 추가 스타일 */
  </style>
  