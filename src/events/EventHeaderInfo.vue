<template>
  <div class="flex flex-col md:flex-row gap-4 md:gap-8 bg-violet-50 rounded-xl mx-auto p-4 md:p-10">
    <!-- 포스터 박스 -->
    <div class="w-full md:w-1/4 lg:w-1/5 xl:w-1/6 rounded-[10px] overflow-hidden shadow-md mx-auto md:mx-0"
      style="max-width: 250px; min-width: 150px;">
      <div class="aspect-[3/4]">
        <img :src="BASE_IMAGE_URL + encodeURI(event.posterImgUrl)" alt="포스터" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- 공연 정보 텍스트 -->
    <div class="w-full md:flex-1">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xl md:text-2xl font-bold text-neutral-800">
          [{{ event.category }}]
        </span>
        <span class="text-xl md:text-2xl font-bold text-neutral-800">
          {{ event.title }}
        </span>
      </div>

      <!-- 날짜 & 상태 -->
      <div class="flex flex-wrap items-center gap-2 mt-2">
        <span class="text-sm text-zinc-600">{{ event.period }}</span>
        <span v-if="event.isOngoing" class="px-2 py-0.5 text-sm text-white bg-violet-400 rounded-full">진행중</span>
        <span v-if="event.score" class="flex items-center text-yellow-500 text-sm font-semibold">
          ⭐ {{ event.score }}
        </span>
        <span class="text-purple-500">❤️</span>
        <span class="text-purple-500">🔔</span>
      </div>

      <!-- 공연 메타 정보 -->
      <div class="mt-4 md:mt-6 p-3 md:p-4 bg-white rounded-xl shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-2 text-sm">
          <div class="flex">
            <span class="w-24 font-bold text-neutral-800 truncate">공연 시간</span>
            <span class="text-zinc-600">{{ event.duration || '정보 없음' }}</span>
          </div>
          <div class="flex">
            <span class="w-24 font-bold text-neutral-800 truncate">관람 연령</span>
            <span class="text-zinc-600">{{ event.ageLimit || '정보 없음' }}</span>
          </div>
          <!-- 장소 -->
          <div class="flex">
            <span class="w-24 font-bold text-neutral-800 truncate">장 소</span>
            <span class="text-zinc-600">{{ event.venue || '정보 없음' }}</span>
          </div>
          <div class="flex"></div>
          <!-- 선 예매 -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:gap-2">
            <span class="w-full sm:w-24 font-bold text-neutral-800 truncate mb-1 sm:mb-0">선 예매</span>
            <div class="flex flex-wrap gap-1">
              <template v-if="presaleTickets.length > 0">
                <span v-for="(ticket, i) in presaleTickets" :key="i" class="px-2 py-0.5 rounded text-xs text-white"
                  :class="getVendorClass(ticket.ticketVendor.toUpperCase())">
                  <a :href="ticket.ticketLink" target="_blank" class="underline">
                    {{ ticket.ticketVendor }}
                  </a>
                </span>
              </template>
              <template v-else>
                <span class="text-zinc-600">정보 없음</span>
              </template>
            </div>
          </div>
          <!-- 일반 예매 -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:gap-2 mt-2">
            <span class="w-full sm:w-24 font-bold text-neutral-800 truncate mb-1 sm:mb-0">일반 예매</span>
            <div class="flex flex-wrap gap-1">
              <template v-if="normalTickets.length > 0">
                <span v-for="(ticket, i) in normalTickets" :key="i" class="px-2 py-0.5 rounded text-xs text-white"
                  :class="getVendorClass(ticket.ticketVendor.toUpperCase())">
                  <a :href="ticket.ticketLink" target="_blank" class="underline">
                    {{ ticket.ticketVendor }}
                  </a>
                </span>
              </template>
              <template v-else>
                <span class="text-zinc-600">정보 없음</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const { event } = defineProps({
  event: Object,
});

//NOTE: 이미지 링크 임의 설정
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

const getVendorClass = (vendor) => {
  switch (vendor) {
    case "INTERPARK": return "bg-red-400"
    case "YES24": return "bg-blue-500"
    case "MELON": return "bg-green-500"
    case "TICKETLINK": return "bg-orange-500"
    case "TICKETBAY": return "bg-gray-200"
    case "OFFICIAL": case "공식홈페이지": return "bg-black"
    default: return "bg-gray-400"
  }
}

const presaleTickets = computed(() =>
  event.ticketInfoList?.filter(t => t.isPresale) || []
)

const normalTickets = computed(() =>
  event.ticketInfoList?.filter(t => !t.isPresale) || []
)
</script>