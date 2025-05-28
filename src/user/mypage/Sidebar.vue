<script setup>
import {onMounted, ref} from 'vue'
import axios from "axios";
import {useUserStore} from "@/stores/useUserStore.js";

const props = defineProps({
    menus: String
});
const userStore = useUserStore()
// 부모에게 전달할 이벤트 정의
const emit = defineEmits(['selectMenu'])
const menus = [
    { label: '내 정보 보기', value: 'information' },
    { label: '글 관리', value: 'contents' },
    { label: '캘린더 보기', value: 'calender' },
    { label: '즐겨찾기 관리', value: 'favorite' },
    { label: '1:1 문의 내역', value: 'qna' }
]

const activeMenu = ref('information')

const selectMenu = (value) => {
    activeMenu.value = value
    emit('selectMenu', value) // ✅ 부모로 이벤트 전달
}
const user = ref({
  name: '',
  email: '',
  profileImg: '',
  role: ''
})
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

// onMounted(async () => {
//   try {
//     const res = await axios.get('api/user/mypage', {
//       withCredentials: true
//     });
//
//     const username = res.data?.username || '';
//     const email = res.data?.email || '';
//     const profileImg = res.data?.profileImg || '';
//     const role = res.data?.role || '일반 회원'; // 기본 역할 설정
//
//     user.value = { name:username, email, profileImg, role };
//     //console.log("추출된 데이터:", user.value);
//   } catch (error) {
//     console.error('에러 발생:', error);
//   }
// });

</script>

<template>
    <aside class="w-60 bg-white text-black px-4 py-6 font-['Inter'] border-r whitespace-nowrap">
        <!-- 사용자 정보 영역 -->
        <div class="flex flex-col items-center text-center mb-8">
            <!-- 프로필 이미지 영역 -->
            <div
                class="w-16 h-16 rounded-full bg-violet-200 flex items-center justify-center text-white text-lg font-bold">
                <!-- 이미지가 없을 경우 기본 이미지 -->
                <img v-if="userStore.profileImg" :src="BASE_IMAGE_URL + encodeURI(userStore.profileImg)" alt="프로필 이미지"
                    class="w-full h-full rounded-full object-cover" />
                <img v-else="userStore.profileImg" src="/assets/icons/profile.png" alt="기본 이미지"
                    class="w-full h-full rounded-full object-cover" />
            </div>

            <!-- 유저 이름 및 역할 -->
            <div class="mt-2 font-semibold text-base">{{ userStore.username }}님</div>
            <div class="text-sm text-gray-500">{{ userStore.userDetail.role }}</div>
        </div>

        <!-- 메뉴 리스트 -->
        <nav class="flex flex-col text-sm">
            <button v-for="menu in menus" :key="menu.value" @click="selectMenu(menu.value)"
                class="flex items-center px-3 py-2 rounded transition-all" :class="{
                    'bg-violet-100 text-violet-800 font-semibold': activeMenu === menu.value,
                    'hover:bg-violet-50': activeMenu !== menu.value
                }">
                <span class="w-2 h-2 rounded-full bg-violet-600 mr-2" v-if="activeMenu === menu.value" />
                {{ menu.label }}
            </button>
        </nav>
    </aside>
</template>
