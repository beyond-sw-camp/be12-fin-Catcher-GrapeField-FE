<script setup>
defineProps({
  username: String,
  rating: Number,
  date: String,
  comment: String
})
</script>

<template>
  <div class="flex gap-4 p-5 bg-white rounded-xl border border-violet-50">
    <!-- 아이콘 -->
    <div class="w-9 h-10 flex items-center justify-center bg-violet-50 rounded-full">
      <span class="text-xs font-bold text-violet-600">별</span>
    </div>

    <!-- 내용 -->
    <div class="flex-1 flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <div class="flex items-end gap-3">
          <span class="font-bold text-base text-neutral-800">{{ username }}</span>
          <span class="text-yellow-400 text-base">
            {{ '★'.repeat(rating) }}
          </span>
        </div>
        <span class="text-xs text-neutral-400">{{ date }}</span>
      </div>
      <p class="text-sm text-neutral-800">{{ comment }}</p>
    </div>
  </div>
</template>
