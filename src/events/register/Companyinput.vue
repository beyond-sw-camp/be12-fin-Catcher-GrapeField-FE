<script setup>
import { ref, watch } from 'vue'
import CompanySearchModal from './CompanySearchModal.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'remove'])

const local = ref({ ...props.modelValue })
watch(local, () => {
  emit('update:modelValue', local.value)
}, { deep: true })

const fileInput = ref()
const showModal = ref(false)

function handleImageClick() {
  if (!local.value.id) {
    fileInput.value?.click()
  }
}

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      local.value.logoUrl = reader.result
      local.value.logoFile = file
    }
    reader.readAsDataURL(file)
  }
}

function handleCompanySelect(company) {
  local.value.id = company.id
  local.value.name = company.name
  local.value.logoUrl = company.logoUrl
  local.value.description = company.description
  showModal.value = false
}
</script>

<template>
  <div class="mb-6 p-4 border rounded-lg bg-white relative flex gap-4 items-stretch">
    <!-- 로고 이미지 -->
    <div
      class="w-[130px] min-h-[160px] border rounded overflow-hidden flex items-center justify-center cursor-pointer bg-gray-100"
      @click="handleImageClick">
      <img v-if="local.logoUrl" :src="local.logoUrl" alt="로고" class="object-cover w-full h-full" />
      <span v-else class="text-gray-400 text-sm">+ 로고</span>
      <input ref="fileInput" type="file" class="hidden" @change="handleFileChange" accept="image/*" />
    </div>

    <!-- 오른쪽 입력란 -->
    <div class="flex-1 flex flex-col gap-2">
      <!-- 참여 유형 -->
      <div class="flex gap-4 items-center">
        <label class="text-sm text-gray-700">참여 유형 *</label>
        <select class="border rounded px-3 py-2 text-sm" v-model="local.type">
          <option disabled value="">선택</option>
          <option>주최</option>
          <option>주관</option>
          <option>후원</option>
          <option>참가</option>
        </select>
      </div>

      <!-- 기업명 + 찾기 버튼 -->
      <div class="flex gap-2 items-center">
        <input class="w-full border rounded px-3 py-2" placeholder="기업명 *" v-model="local.name" />
        <button @click="showModal = true" class="px-3 py-2 border rounded whitespace-nowrap text-sm">
          찾기
        </button>
      </div>

      <!-- 기업 소개 -->
      <textarea class="w-full border rounded px-3 py-2" rows="3" placeholder="기업 소개"
        v-model="local.description"></textarea>
    </div>

    <!-- 삭제 버튼 -->
    <button @click="$emit('remove')" class="absolute top-2 right-2 text-red-500 font-bold text-xl">–</button>

    <!-- 기업 검색 모달 -->
    <CompanySearchModal v-if="showModal" @select="handleCompanySelect" @close="showModal = false" />
  </div>
</template>
