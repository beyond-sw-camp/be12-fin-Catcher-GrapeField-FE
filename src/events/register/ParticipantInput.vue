<script setup>
import { ref, watch } from 'vue'
import ParticipantSearchModal from './ParticipantSearchModal.vue'

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
            local.value.profileUrl = reader.result // 미리보기용
            local.value.profileFile = file // 서버 전송용
        }
        reader.readAsDataURL(file)
    }
}

function handleParticipantSelect(participant) {
    local.value.id = participant.id
    local.value.name = participant.name
    local.value.profileUrl = participant.profileUrl
    local.value.description = participant.description
    showModal.value = false
}
</script>

<template>
    <div class="mb-6 p-4 border rounded-lg bg-white relative flex gap-4 items-stretch">
        <!-- 이미지 박스 -->
        <div class="w-[130px] min-h-[160px] border rounded overflow-hidden flex items-center justify-center cursor-pointer bg-gray-100"
            @click="handleImageClick">
            <img v-if="local.profileUrl" :src="local.profileUrl" alt="프로필" class="object-cover w-full h-full" />
            <span v-else class="text-gray-400 text-sm">+ 이미지</span>
            <input ref="fileInput" type="file" class="hidden" @change="handleFileChange" accept="image/*" />
        </div>

        <!-- 오른쪽 입력란 -->
        <div class="flex-1 flex flex-col gap-2">
            <div class="flex gap-2 items-center">
                <input v-model="local.name" class="w-full border rounded px-3 py-2" placeholder="배우 이름 *" />
                <button @click="showModal = true" class="px-3 py-2 whitespace-nowrap border rounded text-sm">
                    찾기
                </button>
            </div>

            <input v-model="local.role" class="w-full border rounded px-3 py-2" placeholder="역할 이름" />

            <textarea v-if="!local.id" v-model="local.description" class="w-full border rounded px-3 py-2" rows="2"
                placeholder="배우 소개" />
        </div>

        <!-- 삭제 버튼 -->
        <button @click="$emit('remove')" class="absolute top-2 right-2 text-red-500 font-bold text-xl">–</button>

        <!-- 배우 검색 모달 -->
        <ParticipantSearchModal v-if="showModal" @select="handleParticipantSelect" @close="showModal = false" />
    </div>
</template>

<style scoped></style>