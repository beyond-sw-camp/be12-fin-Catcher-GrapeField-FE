<script setup>
defineProps({
  color: String,      // 'purple-700' 같은 Tailwind 색 이름만
  text: String,
  isActive: Boolean
})
defineEmits(['toggle'])
</script>

<template>
  <button
    class="flex items-center gap-1 px-2 py-1 rounded text-sm transition-all"
    @click="$emit('toggle')"
  >
    <div
      class="w-4 h-4 rounded-sm"
      :class="[
        isActive
          ? 'bg-' + color
          : 'border border-' + color
      ]"
      :style="!isActive ? 'background-color: white;' : ''"
    ></div>
    <span class="text-zinc-800">{{ text }}</span>
  </button>
</template>
