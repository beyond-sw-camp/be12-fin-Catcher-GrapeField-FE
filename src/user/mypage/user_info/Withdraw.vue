<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['close'])
const router = useRouter()

const password = ref('')
const showConfirmModal = ref(false)

const closeOnEscape = (e) => {
    if (e.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', closeOnEscape))
onUnmounted(() => window.removeEventListener('keydown', closeOnEscape))

const closeOnBackground = (e) => {
    if (e.target === e.currentTarget) emit('close')
}

// 1차 탈퇴 버튼 클릭 → 2차 확인 모달 열기
const onWithdrawClick = () => {
    if (!password.value) {
        alert('비밀번호를 입력해주세요!')
        return
    }
    showConfirmModal.value = true
}

// 2차 확인 모달 내 '확인' 클릭 → 실제 탈퇴 처리
const confirmWithdraw = () => {
    // 서버 요청 예시
    // await axios.post('/api/withdraw', { password: password.value })
    alert('회원 탈퇴가 완료되었습니다!')
    emit('close')
    router.push('/')
}
</script>

<template>
    <!-- 1차 비밀번호 입력 모달 -->
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" @click="closeOnBackground">
        <div class="bg-white rounded-lg p-6 w-full max-w-md relative z-10" @click.stop>
            <h3 class="text-lg font-bold mb-2">정말로 회원 탈퇴하시겠습니까?</h3>
            <p class="text-sm text-gray-600 mb-4">확인을 위해 비밀번호를 입력해주세요.</p>

            <input type="password" v-model="password" class="w-full border px-3 py-2 rounded mb-4"
                placeholder="비밀번호 입력" />

            <div class="flex justify-end gap-2">
                <button class="px-4 py-2 rounded bg-gray-100" @click="emit('close')">취소</button>
                <button class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" @click="onWithdrawClick">
                    탈퇴
                </button>
            </div>
        </div>

        <!-- 2차 확인 모달 (오버레이 내부에서 렌더링) -->
        <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
            <div class="bg-white rounded-lg p-6 w-full max-w-xs" @click.stop>
                <h4 class="text-base font-semibold mb-3">정말로 탈퇴하시겠어요?</h4>
                <p class="text-sm text-gray-600 mb-5">모든 정보가 삭제됩니다.</p>
                <div class="flex justify-end gap-2">
                    <button @click="showConfirmModal = false" class="px-4 py-2 rounded bg-gray-100">취소</button>
                    <button @click="confirmWithdraw" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
