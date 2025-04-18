<script setup>
const props = defineProps({
  event: Object
})

// NOTE: 임시 이미지 링크
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
</script>

<template>
  <div
    class="min-w-54 max-w-64 flex flex-row flex-wrap gap-x-3 bg-white rounded-lg border border-zinc-200 p-4 gap-2 shadow hover:shadow-md transition">
    <!-- 이미지 영역 -->
    <img :src="BASE_IMAGE_URL + event.posterImgUrl" alt="포스터" class="w-20 h-20 object-cover rounded" />
    <div class="flex flex-col gap-1">
      <!-- 텍스트 정보 -->
      <div class="flex flex-col mt-2 gap-0.5">
        <h3 class="text-sm font-bold text-neutral-800 truncate">
          {{ event.title }}
        </h3>
        <p class="text-xs text-zinc-600">
          공연기간
        </p>
        <p class="text-xs text-zinc-500 truncate">
          {{ event.venue }}
        </p>
      </div>
    </div>


  </div>
</template>
