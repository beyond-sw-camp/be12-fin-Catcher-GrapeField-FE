<script setup>
defineProps({
  pages: Number,
  current: Number
})
</script>

<template>
  <div class="flex items-center gap-2.5">
    <button class="pagination-btn">&lt;</button>

    <template v-for="page in pages" :key="page">
      <button
          class="pagination-btn"
          :class="{ 'bg-violet-600 text-white font-bold': page === current }"
      >
        {{ page }}
      </button>
    </template>

    <button class="pagination-btn">&gt;</button>
  </div>
</template>


<style scoped>
.pagination-btn {
  @apply w-10 h-10 flex items-center justify-center border border-neutral-300 text-zinc-600 text-base rounded;
}
</style>
