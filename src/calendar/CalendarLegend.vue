<template>
    <div class="flex items-center gap-1">
      <div :class="['w-4 h-4 rounded-sm', color]"></div>
      <span class="text-sm text-zinc-800">{{ text }}</span>
    </div>
  </template>
  
  <script setup>
  defineProps({ color: String, text: String })
  </script>
  