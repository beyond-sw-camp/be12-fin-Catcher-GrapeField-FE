<script setup>
import { ref, watch } from 'vue'

const comments = ref([
  {
    id: 1,
    board: '[뮤지컬] 웃는 남자',
    postTitle: '웃는 남자 보고 왔습니다',
    myComment: '저두 보고 왔어요!',
    date: '2025-03-30',
    selected: false
  },
  {
    id: 2,
    board: '[뮤지컬] 오페라의 유령',
    postTitle: '영어 버전도 좋지만 한국어 버전도 좋아요',
    myComment: '둘 다 좋죠 ㅎㅎ',
    date: '2025-03-29',
    selected: false
  },
  // 추가 댓글...
])

const selectAll = ref(false)

function toggleAll() {
  comments.value.forEach(c => (c.selected = selectAll.value))
}

watch(comments, () => {
  selectAll.value = comments.value.every(c => c.selected)
}, { deep: true })

function deleteSelected() {
  comments.value = comments.value.filter(c => !c.selected)
}
</script>
<template>
  <div class="w-full p-6 font-['Inter']">
    <h2 class="text-2xl font-bold mb-6">작성 댓글 보기</h2>

    <!-- 댓글 리스트 -->
    <div class="border border-gray-300 rounded">
      <!-- 헤더 -->
      <div class="flex bg-gray-100 text-sm text-gray-700 font-semibold px-4 py-2">
        <div class="w-5 text-center"></div>
        <div class="flex-1 text-center">내용</div>
        <div class="w-32 text-center">날짜</div>
      </div>

      <!-- 리스트 항목 -->
      <div v-for="comment in comments" :key="comment.id"
        class="flex justify-center border-t text-sm text-gray-800 hover:bg-violet-50 px-4 py-3 items-start gap-4">

        <!-- 체크박스 -->
        <div class="w-5 text-center mt-1">
          <input type="checkbox" v-model="comment.selected" class="w-4 h-4" />
        </div>
        <!-- 내용 -->
        <div class="flex-1">
          <p class="text-violet-600 font-semibold truncate">[{{ comment.board }}] {{ comment.postTitle }}</p>
          <p class="text-gray-700 line-clamp-2">내 댓글 : {{ comment.myComment }}</p>
        </div>

        <!-- 날짜 -->
        <div class="w-32 mt-1 text-center">
          {{ comment.date }}
        </div>
      </div>
    </div>

    <!-- 하단 선택/삭제 영역 -->
    <div class="flex justify-between items-center mt-4">
      <div>
        <input type="checkbox" v-model="selectAll" @change="toggleAll" class="mr-2" />
        <label>전체 선택</label>
      </div>
      <button class="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded" @click="deleteSelected">선택한 댓글
        삭제</button>
    </div>
  </div>
</template>
<style scoped></style>