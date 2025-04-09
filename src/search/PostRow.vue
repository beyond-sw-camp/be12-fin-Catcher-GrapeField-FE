<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="grid grid-cols-[12rem_1fr_8rem_7rem_6rem_6rem] h-12 bg-white border-b text-sm text-neutral-800">
    <div class="flex items-center justify-center truncate">{{ post.category }}</div>
    <div class="flex items-center justify-center truncate">{{ post.title }}</div>
    <div class="flex items-center justify-center truncate">{{ post.author }}</div>
    <div class="flex items-center justify-center truncate">{{ post.date }}</div>
    <div class="flex items-center justify-center truncate">{{ post.views }}</div>
    <div class="flex items-center justify-center truncate">{{ post.likes }}</div>
  </div>
</template>

<style scoped>
</style>
