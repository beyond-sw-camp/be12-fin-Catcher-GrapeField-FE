<script setup>
import { ref, onMounted, onUnmounted  } from 'vue'
const emit = defineEmits(['close'])

const currentPw = ref('')
const newPw = ref('')
const newPwConfirm = ref('')

// ESC 키로 닫기
const onKeyDown = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})

const closeOnBackground = (e) => {
  if (e.target === e.currentTarget) emit('close')
}

const changePassword = () => {
  if (newPw.value !== newPwConfirm.value) {
    alert('새 비밀번호가 일치하지 않습니다!')
    return
  }
  alert('비밀번호가 변경되었습니다!')
  emit('close')
}
</script>

<template>
    <!-- 배경 클릭 시 닫기 -->
    <div
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      @click="closeOnBackground"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
        <h3 class="text-lg font-semibold mb-4">비밀번호 변경</h3>
  
        <div class="space-y-3">
          <div>
            <label class="block mb-1 text-sm">현재 비밀번호</label>
            <input type="password" v-model="currentPw" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1 text-sm">새 비밀번호</label>
            <input type="password" v-model="newPw" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1 text-sm">새 비밀번호 확인</label>
            <input type="password" v-model="newPwConfirm" class="w-full border rounded px-3 py-2" />
          </div>
        </div>
  
        <div class="mt-6 flex justify-end gap-2">
          <button @click="emit('close')" class="px-4 py-2 rounded bg-gray-100">취소</button>
          <button @click="changePassword" class="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">
            변경
          </button>
        </div>
      </div>
    </div>
  </template>

<style scoped></style>