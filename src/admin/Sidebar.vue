<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const activeMenu = ref('report')

const props = defineProps({
    menus: String
});

// 부모에게 전달할 이벤트 정의
const emit = defineEmits(['selectMenu'])
const menus = [
    { label: '신고 관리', value: 'report' },
    { label: 'QnA 관리', value: 'qna' },
    { label: '사용자 관리', value: 'user' },
    { label: '공연/전시 신청 관리', value: 'event' }
]

const selectMenu = (menu) => {
    activeMenu.value = menu
    emit('selectMenu', menu) // ✅ 부모로 이벤트 전달
}
</script>

<template>
    <aside class="w-48 bg-violet-800 text-white flex flex-col font-['Inter']">
        <!-- 로고 영역 -->
        <div class="h-20 flex items-center px-6 text-xl font-bold">
            🟣 grape <span class="font-light ml-1">field</span>
            <span class="text-sm whitespace-nowrap ml-2">관리자</span>
        </div>

        <!-- 메뉴 영역 -->
        <nav class="flex flex-col mt-4">
            <button v-for="menu in menus" :key="menu.value" @click="selectMenu(menu.value)"
                class="text-left px-6 py-3 text-base font-medium tracking-tight transition-colors duration-200" :class="{
                    'bg-violet-600 font-semibold': activeMenu === menu.value,
                    'hover:bg-violet-700': activeMenu !== menu.value,
                }">
                {{ menu.label }}
            </button>
        </nav>
    </aside>
</template>
