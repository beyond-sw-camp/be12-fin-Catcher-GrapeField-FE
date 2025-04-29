<script setup>
import { ref, watch } from 'vue'

const scraps = ref([
    { id: 1, board: '[전시회]서울 일러스트 페어', title: '구매 하울', date: '2025-03-01', selected: false },
    { id: 2, board: '[연극]햄릿', title: '공연 요약본', date: '2025-02-28', selected: false },
    { id: 3, board: '[콘서트]나훈아', title: '부모님께 효도한 후기', date: '2025-02-20', selected: false }
])

const selectAll = ref(false)

// 전체 선택 toggle
const toggleAll = () => {
    scraps.value.forEach(scrap => {
        scrap.selected = selectAll.value
    })
}

// 선택 삭제
const deleteSelected = () => {
    scraps.value = scraps.value.filter(scrap => !scrap.selected)
    selectAll.value = false
}
</script>
<template>
    <div class="w-full p-6 font-['Inter']">
        <h2 class="text-2xl font-bold mb-6">스크랩한 글 보기</h2>

        <!-- 스크랩 리스트 -->
        <div class="border border-gray-300 rounded">
            <!-- 헤더 -->
            <div class="flex bg-gray-100 text-sm text-gray-700 font-semibold px-4 py-2">
                <div class="w-10 text-center"></div>
                <div class="flex-1 text-center">글 제목</div>
                <div class="w-32 text-center">날짜</div>
            </div>

            <!-- 리스트 항목 -->
            <div v-for="scrap in scraps" :key="scrap.id"
                class="flex border-t text-sm text-gray-800 hover:bg-violet-50 px-4 py-2 items-center">
                <!-- 체크박스 -->
                <div class="w-10 flex justify-center items-center">
                    <input type="checkbox" v-model="scrap.selected" class="w-4 h-4" />
                </div>

                <!-- 글 제목 + 게시판 -->
                <div class="flex-1 truncate">
                    <span v-if="scrap.board" class="text-violet-600 font-semibold mr-1">[{{ scrap.board }}]</span>
                    <span class="hover:underline cursor-pointer">{{ scrap.title }}</span>
                </div>

                <!-- 작성 날짜 -->
                <div class="w-32 text-center">
                    {{ scrap.date }}
                </div>
            </div>
        </div>

        <!-- 하단 선택/삭제 -->
        <div class="flex justify-between items-center mt-4">
            <div>
                <input type="checkbox" v-model="selectAll" @change="toggleAll" class="mr-2" />
                <label>전체 선택</label>
            </div>
            <button class="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded" @click="deleteSelected">
                선택한 스크랩 삭제
            </button>
        </div>
    </div>
</template>

<style scoped></style>