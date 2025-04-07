<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    modelValue: Boolean
})
const emit = defineEmits(['select', 'close'])

// 더미 기업 목록
const companies = ref([
  {
    id: 1,
    name: '네이버문화재단',
    logoUrl: 'https://placehold.co/80x80?text=NAVER',
    description: '문화 예술 후원 기업',
  },
  {
    id: 2,
    name: '카카오아트센터',
    logoUrl: 'https://placehold.co/80x80?text=KAKAO',
    description: '예술 공간 운영 기업',
  },
])


const keyword = ref('')

const filteredCompanies = computed(() => {
    if (!keyword.value.trim()) return companies.value
    return companies.value.filter(company => company.name.includes(keyword.value.trim()))
})
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white w-[400px] max-h-[80vh] rounded-lg p-6 overflow-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold">기업 찾기</h2>
                <button @click="emit('close')" class="text-gray-500 hover:text-black">닫기 ✕</button>
            </div>

            <input v-model="keyword" class="w-full border rounded px-3 py-2 mb-4" placeholder="기업명을 입력하세요" />

            <ul class="space-y-3">
                <li v-for="company in filteredCompanies" :key="company.id"
                    class="flex items-center gap-4 p-2 hover:bg-gray-100 rounded cursor-pointer"
                    @click="emit('select', company)">
                    <img :src="company.logoUrl" alt="로고" class="w-12 h-12 object-cover rounded border" />
                    <div>
                        <div class="font-semibold">{{ company.name }}</div>
                        <div class="text-sm text-gray-600">{{ company.description }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
