<template>
  <router-link :to="`/events/${id}`" class="block">
    <div class="w-48 h-54 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
      <div class="w-full h-56 bg-gray-100">
        <img :src="posterUrl" alt="포스터" class="w-full h-full object-cover" />
      </div>
      <div class="px-3 py-2">
        <p class="text-purple-800 text-base font-semibold truncate">{{ title }}</p>
        <p class="text-neutral-500 text-sm truncate">{{ venue }}</p>
        <p class="text-neutral-500 text-sm">{{ period }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  id: Number,
  title: String,
  venue: String,
  period: String,
  posterUrl: String
})
</script>
