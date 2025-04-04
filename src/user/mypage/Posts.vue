<script setup>
import { ref, watch } from 'vue'

const posts = ref([
    { id: 1, board: '[뮤지컬]오페라의 유령', title: '크리스틴 배우 이름이 뭐죠?', date: '2025-03-07', selected: false, commentCnt: 3, recommendCnt: 1 },
    { id: 2, board: '[박람회] 2025 케이펫페어', title: '간식값 20만원 쓰고 옴', date: '2025-03-07', selected: false, commentCnt: 100, recommendCnt: 70 },
    { id: 3, board: '[전시회]고흐', title: '사람이 많아서 힘들지만 즐거웠어요', date: '2025-02-25', selected: false },
    // ...
])

const selectAll = ref(false)

function toggleAll() {
    posts.value.forEach(p => (p.selected = selectAll.value))
}

watch(posts, () => {
    selectAll.value = posts.value.every(p => p.selected)
}, { deep: true })

function deleteSelected() {
    posts.value = posts.value.filter(p => !p.selected)
}
</script>

<template>
    <div class="w-full p-6 font-['Inter']">
        <h2 class="text-2xl font-bold mb-6">작성 글 보기</h2>

        <div class="border border-gray-300 rounded">
            <!-- 헤더 -->
            <div class="flex bg-gray-100 text-sm text-gray-700 font-semibold px-4 py-2">
                <div class="w-5 text-center"></div>
                <div class="flex-1 text-center">제목</div>
                <div class="w-32 text-center">날짜</div>

            </div>

            <!-- 게시글 목록 -->
            <div v-for="post in posts" :key="post.id"
                class="flex border-t text-sm text-gray-800 hover:bg-violet-50 px-4 py-2 items-center">

                <!-- 체크박스: 가로+세로 정렬 -->
                <div class="w-10 flex justify-center items-center">
                    <input type="checkbox" v-model="post.selected" class="w-4 h-4" />
                </div>

                <!-- 제목 -->
                <div class="flex-1 truncate">
                    <span v-if="post.board" class="text-violet-600 font-semibold mr-1">[{{ post.board }}]</span>
                    <span class="hover:underline cursor-pointer">{{ post.title }}</span>
                    <span v-if="post.viewCnt !== 0" class="text-gray-500 ml-1">({{ post.commentCnt }})</span>
                    <span v-if="post.recommendCnt !== 0" class="text-rose-500 ml-2">{{ post.recommendCnt }}</span>
                </div>

                <!-- 날짜 -->
                <div class="w-32 text-center">
                    {{ post.date }}
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
                선택한 게시글 삭제
            </button>
        </div>
    </div>
</template>

<style scoped></style>