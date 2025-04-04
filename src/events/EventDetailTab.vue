<template>
    <div class="w-[1320px] bg-white flex relative mx-auto">
      <div
        v-for="tabName in tabs"  
        :key="tabName"
        class="w-28 h-14 bg-white cursor-pointer flex items-center justify-center"
        @click="$emit('update:tab', tabName)" 
      >
        <div
          :class="[ 
            'text-center text-xl font-[Inter]',
            tabName === tab  
              ? 'text-violet-600 font-extrabold'
              : tabName === '게시판'
              ? 'text-zinc-600 font-medium'
              : 'text-zinc-600 font-normal'
          ]"
        >
          {{ tabName }}
        </div>
      </div>
  
      <div
        class="absolute bottom-0 h-[3px] w-28 bg-violet-600 transition-all duration-300"
        :style="{ transform: `translateX(${tabIndex * 7}rem)` }"
      ></div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // props 이름 : tab
  const props = defineProps({
    tab: String,
  })
  
  const emit = defineEmits(['update:tab'])
  
  const tabs = ['상세 정보', '게시판', '한줄평', '추천']
  
  const tabIndex = computed(() => {
    const i = tabs.indexOf(props.tab) 
    return i >= 0 ? i : 0
  })
  </script>
  
  <style scoped>
  /* 추가 스타일 필요 시 여기에 작성 */
  </style>
  