<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div class="bg-white w-[700px] rounded-lg overflow-hidden">
        <!-- 상단 타이틀 -->
        <div class="bg-violet-700 text-white text-xl font-bold px-6 py-4 flex justify-between items-center">
          일정 추가
          <button @click="close">✕</button>
        </div>
  
        <!-- 폼 영역 -->
        <form class="p-6 space-y-4" @submit.prevent="submitForm">
          <div>
            <label class="font-bold">일정 제목 *</label>
            <input v-model="form.title" type="text" placeholder="제목을 입력하세요"
              class="w-full h-12 px-3 border border-neutral-200 rounded" />
          </div>
  
          <div>
            <label class="font-bold">일정 유형 *</label>
            <select v-model="form.category" class="w-full h-12 px-3 border border-neutral-200 rounded">
              <option value="">선택하세요</option>
              <option>뮤지컬</option>
              <option>연극</option>
              <option>콘서트</option>
              <option>전시</option>
              <option>박람회</option>
            </select>
          </div>
  
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="font-bold">날짜 선택 *</label>
              <input v-model="form.date" type="date" class="w-full h-12 px-3 border border-neutral-200 rounded" />
            </div>
            <div class="flex-1">
              <label class="font-bold">시간 선택 *</label>
              <input v-model="form.time" type="time" class="w-full h-12 px-3 border border-neutral-200 rounded" />
            </div>
          </div>
  
          <div>
            <label class="font-bold">장소</label>
            <input v-model="form.location" type="text" placeholder="장소를 입력하세요"
              class="w-full h-12 px-3 border border-neutral-200 rounded" />
          </div>
  
          <div>
            <label class="font-bold">메모</label>
            <textarea v-model="form.memo" placeholder="추가 정보를 입력하세요"
              class="w-full h-20 px-3 border border-neutral-200 rounded resize-none"></textarea>
          </div>
  
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="form.notify" />
            <label>일정 시작 전 알림 받기</label>
          </div>
  
          <div class="flex justify-between mt-4">
            <button type="submit" class="w-[48%] bg-violet-700 text-white font-bold h-12 rounded">저장</button>
            <button type="button" @click="close"
              class="w-[48%] border border-neutral-200 text-stone-500 font-bold h-12 rounded">취소</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  initialDate: String
})
const emit = defineEmits(['close', 'submit'])

const form = reactive({
  title: '',
  category: '',
  date: '',
  time: '',
  location: '',
  memo: '',
  notify: false,
})

// 👇 날짜 클릭 시 모달 열릴 때 form.date 초기화
watch(() => props.initialDate, (newVal) => {
  if (props.isOpen && newVal) {
    form.date = newVal
  }
})

function close() {
  emit('close')
}

function submitForm() {
  emit('submit', { ...form })
  close()
}
</script>
