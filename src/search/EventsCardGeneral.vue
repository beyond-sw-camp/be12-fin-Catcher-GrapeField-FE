<script setup>
defineProps({
  id: Number,
  title: String,
  period: String,
  location: String
})
</script>

<template>
  <div
      class="min-w-54 max-w-64 flex flex-row flex-wrap gap-x-3 bg-white rounded-lg border border-zinc-200 p-4 gap-2 shadow hover:shadow-md transition"
  >
    <!-- 이미지 영역 -->
    <div class="min-w-16 aspect-square bg-violet-100 rounded-md flex items-center justify-center text-violet-600 text-sm font-bold">
      이미지
    </div>
    <div class="flex flex-col gap-1">
      <!-- 텍스트 정보 -->
      <div class="flex flex-col mt-2 gap-0.5">
        <h3 class="text-sm font-bold text-neutral-800 truncate">
          {{ title }}
        </h3>
        <p class="text-xs text-zinc-600">
          {{ period }}
        </p>
        <p class="text-xs text-zinc-500 truncate">
          {{ location }}
        </p>
      </div>
      <!-- 버튼 그룹 -->
      <div class="flex gap-2 mt-auto">
        <button class="flex-1 text-xs text-white bg-violet-500 rounded-full py-1.5 font-semibold hover:bg-violet-600">
          <router-link :to="`/events/${id}`" >
          더보기</router-link>
        </button>
        <button class="flex-1 text-xs text-violet-500 border border-violet-500 rounded-full py-1.5 font-semibold hover:bg-violet-50">
          추가하기
        </button>
      </div>
    </div>


  </div>
</template>
