<template>
  <router-link :to="`/events/${idx}`" class="block">
    <div class="w-48 h-54 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
      <div class="w-full h-56 bg-gray-100">
        <img :src="posterUrl" alt="포스터" class="w-full h-full object-cover" />
      </div>
      <div class="px-3 py-2">
        <p class="text-purple-800 text-base font-semibold truncate">{{ title }}</p>
        <p class="text-neutral-500 text-sm truncate">{{ venue }}</p>
        <p class="text-neutral-500 text-sm">{{ formattedStartDate }}~{{ formattedEndDate }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  idx: Number,
  title: String,
  venue: String,
  startDate: String,
  endDate: String,
  posterUrl: String
})

// 날짜만 추출
const formatDate = (dateStr) => {
  return dateStr?.split('T')[0].replace(/-/g, '.') ?? ''
}
const formattedStartDate = computed(() => formatDate(props.startDate))
const formattedEndDate = computed(() => formatDate(props.endDate))
</script>
