<script setup>
import { useRoute, useRouter } from 'vue-router';
const props = defineProps({
  event: Object
})

const router = useRouter()

// NOTE: 임시 이미지 링크
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

const formatDate = (dateString) => {  
  const date = new Date(dateString)
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}

const goToEvent = (idx)=>{
  router.push(`/events/${idx}`)
}
</script>

<template>
  <!-- 카드 전체 -->
  <div class="w-64 h-60 flex flex-col justify-between bg-white rounded-lg border border-zinc-200 p-4 shadow hover:shadow-md transition">
    <!-- 이미지 영역 - 크기 확장 -->
    <div class="w-full h-32 overflow-hidden rounded">
      <img @click="goToEvent(event.idx)" :src="BASE_IMAGE_URL + event.posterImgUrl" alt="포스터" class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col gap-1">
      <!-- 텍스트 정보 -->
      <div class="flex flex-col mt-2 gap-0.5">
        <h3 class="text-sm font-bold text-neutral-800 truncate">
          {{ event.title }}
        </h3>
        <p class="text-xs text-zinc-600">
          {{ formatDate(event.startDate) }} ~ {{ formatDate(event.endDate) }}
        </p>
        <p class="text-xs text-zinc-500 truncate">
          {{ event.venue }}
        </p>
      </div>
    </div>
  </div>
</template>
