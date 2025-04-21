<script setup>
defineProps({
  review: Object,
})

//TODO : 유저 이미지 경로 설정
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}
</script>

<template>
  <div class="flex gap-4 p-5 bg-white rounded-xl border border-violet-50 items-start">
    <!-- 아이콘 -->
    <div class="mt-1 w-16 h-16 flex-shrink-0 flex items-center justify-center bg-violet-50 rounded-full">
      <span class="text-xs font-bold text-violet-600"><span class="text-xs font-bold text-violet-600">
          {{ review?.profileImg || '🙂' }}
        </span>
      </span>
    </div>

    <!-- 내용 -->
    <div class="flex-1 flex flex-col gap-1">
      <!-- 공연/전시 이름 -->
      <div class="text-xs text-violet-600 font-semibold">
        {{ review.boardTitle }}
      </div>

      <!-- 작성자 + 평점 + 날짜 -->
      <div class="flex justify-between items-center">
        <div class="flex items-end gap-3">
          <span class="font-bold text-base text-neutral-800">{{ review.writer }}</span>
          <span class="text-yellow-400 text-base">
            {{ '★'.repeat(review.rating) }}
          </span>
        </div>
        <span class="text-xs text-neutral-400">{{ formatDate(review.createdAt) }}</span>
      </div>

      <!-- 본문 -->
      <p class="text-sm text-neutral-800">{{ review.content }}</p>
    </div>
  </div>
</template>
