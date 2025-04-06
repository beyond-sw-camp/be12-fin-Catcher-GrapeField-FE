<script setup>
import { ref } from 'vue'
import PasswordChangeModal from './PasswordChange.vue'
import Withdraw from './Withdraw.vue'

// 상태 변수
const isEditMode = ref(false)
const isPasswordConfirming = ref(false)
const password = ref('')
const isPasswordModalOpen = ref(false)
const isWithdrawModalOpen = ref(false)

//유저 정보
const user = ref({
    name: '김포도',
    email: 'example@grapefield.co.kr',
    phone: '010-1234-5678',
    profileImg: '' // or 이미지 URL
})

// 프로필 이미지 변경
const onProfileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            user.value.profileImg = e.target.result //미리보기
        }
        reader.readAsDataURL(file)
    }
}

// 비밀번호 확인 후 수정 모드 전환
const confirmPassword = () => {
    if (password.value === '1234') {
        // 실제 구현 시엔 서버에 인증 요청!
        isPasswordConfirming.value = false
        isEditMode.value = true
        password.value = ''
    } else {
        alert('비밀번호가 일치하지 않습니다!')
    }
}

// 저장 후 보기 모드로 되돌리기
const saveChanges = () => {
    isEditMode.value = false
}
</script>

<template>
    <div class="w-full max-w-2xl mx-auto px-8 py-6 text-sm font-['Inter'] space-y-8">
        <!-- 제목 -->
        <div>
            <h2 class="text-xl font-bold mb-1">계정 정보</h2>
            <p class="text-gray-500 text-sm">회원님의 계정 정보를 확인하고 수정할 수 있습니다.</p>
        </div>

        <!-- 기본 정보 -->
        <div class="space-y-4">
            <h3 class="text-base font-semibold">기본 정보</h3>

            <!-- 프로필 사진 + 이름 -->
            <div class="flex items-center gap-4">
                <!-- 이미지 영역 -->
                <div class="relative">
                    <!-- 수정 모드: 업로드 가능 -->
                    <label v-if="isEditMode" for="profile-upload" class="cursor-pointer block">
                        <div class="w-16 h-16 rounded-full bg-violet-200 overflow-hidden">
                            <img v-if="user.profileImg" :src="user.profileImg" alt="프로필 이미지"
                                class="w-full h-full object-cover" />
                            <img v-else src="../../assets/icons/profile.png" alt="기본 이미지"
                                class="w-full h-full object-cover" />
                        </div>
                    </label>

                    <!-- 보기 모드: 클릭 없음 -->
                    <div v-else class="w-16 h-16 rounded-full bg-violet-200 overflow-hidden">
                        <img v-if="user.profileImg" :src="user.profileImg" alt="프로필 이미지"
                            class="w-full h-full object-cover" />
                        <img v-else src="../../assets/icons/profile.png" alt="기본 이미지"
                            class="w-full h-full object-cover" />
                    </div>

                    <!-- 삭제 버튼 (오른쪽 하단에 X 아이콘) -->
                    <button v-if="isEditMode && user.profileImg" @click="user.profileImg = ''"
                        class="absolute -right-1 -bottom-1 w-5 h-5 bg-white border border-gray-300 rounded-full text-xs flex items-center justify-center hover:bg-red-500 hover:text-white"
                        title="삭제">
                        ×
                    </button>

                    <!-- input hidden -->
                    <input id="profile-upload" type="file" accept="image/*" class="hidden" @change="onProfileChange" />
                </div>

                <!-- 이름 -->
                <div class="flex flex-col gap-1 w-full">
                    <label class="block mb-0.5 font-medium">이름</label>
                    <div v-if="!isEditMode" class="py-2 px-3 bg-gray-50 rounded border w-full">
                        {{ user.name }}
                    </div>
                    <input v-else type="text" v-model="user.name" class="w-full border rounded px-3 py-2" />
                    <p class="text-gray-500 text-xs" v-if="isEditMode">클릭하여 프로필 사진 변경</p>
                </div>
            </div>


            <!-- 이메일 -->
            <div>
                <label class="block mb-1 font-medium">이메일 주소 <p class="text-stone-600">(이메일은 변경할 수 없습니다.)</p></label>
                <div v-if="!isEditMode" class="py-2 px-3 bg-gray-50 rounded border">{{ user.email }}</div>
                <p v-else class="w-full bg-gray-50  border rounded px-3 py-2">{{ user.email }}</p>
            </div>

            <!-- 휴대폰 번호 -->
            <div>
                <label class="block mb-1 font-medium">휴대폰 번호</label>
                <div v-if="!isEditMode" class="py-2 px-3 bg-gray-50 rounded border">{{ user.phone }}</div>
                <div v-else class="flex gap-2">
                    <input type="tel" v-model="user.phone" class="flex-1 border rounded px-3 py-2" />
                    <button class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">인증하기</button>
                </div>
            </div>
        </div>

        <!-- 비밀번호 확인 UI -->
        <div v-if="isPasswordConfirming" class="space-y-4 pt-4 border-t">
            <h3 class="text-base font-semibold">비밀번호 확인</h3>
            <div>
                <label class="block mb-1 font-medium">비밀번호를 입력하세요</label>
                <input type="password" v-model="password" class="w-full border rounded px-3 py-2" />
            </div>
            <button @click="confirmPassword" class="w-full bg-purple-600 text-white py-2 rounded font-semibold">
                확인
            </button>
        </div>

        <!-- 하단 버튼 -->
        <div class="pt-6 flex justify-between items-center" v-if="!isEditMode && !isPasswordConfirming">
            <!-- 왼쪽 버튼들 묶음 -->
            <div class="flex space-x-2">
                <button class="px-4 py-2 bg-purple-600 text-white rounded" @click="isPasswordConfirming = true">
                    회원정보 변경
                </button>
                <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded" @click="isPasswordModalOpen = true">
                    비밀번호 변경
                </button>
            </div>
            <!-- 오른쪽 끝에 있는 탈퇴 버튼 -->
            <button class="text-red-600" @click="isWithdrawModalOpen = true">회원 탈퇴</button>
        </div>

        <!-- 비밀번호 변경 모달 -->
        <PasswordChangeModal v-if="isPasswordModalOpen" @close="isPasswordModalOpen = false" />
        <Withdraw v-if="isWithdrawModalOpen" @close="isWithdrawModalOpen = false" />
    </div>

    <!-- 저장 버튼 -->
    <div v-if="isEditMode" class="pt-6 justify-center text-center">
        <button class="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold" @click="saveChanges">
            변경사항 저장
        </button>
    </div>
    <!-- 위 메뉴들과 적당히 띄운 후 탈퇴 버튼 -->


</template>


<style scoped></style>