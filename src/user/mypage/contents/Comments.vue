<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';
import { useEventsStore } from '@/stores/useEventsStore';

const router = useRouter();
const eventsStore = useEventsStore();

// 페이지네이션 관련 데이터
const currentPage = ref(1);
const totalPages = ref(1);
const hasNext = ref(false);
const hasPrevious = ref(false);
const pageSize = 10; // 페이지당 항목 개수

// loadData 함수 수정 - 페이지 파라미터 추가 및 API 요청에 페이지 정보 포함
const loadData = async (page = 0) => {  // 기본값 0으로 설정
  try {
    const res = await axios.get(`/api/user/mypage/comment?page=${page}&size=${pageSize}`, {
      withCredentials: true
    });
    comments.value = res.data.content;

    // 페이지네이션 정보 업데이트
    totalPages.value = res.data.totalPages || 1;
    currentPage.value = page + 1;  // 이제 page 파라미터 사용 가능
    hasNext.value = currentPage.value < totalPages.value;
    hasPrevious.value = currentPage.value > 1;
  } catch (e) {
    console.log(e)
  }
}

const formatDate = (dateStr) => {
  return dateStr?.split('T')[0].replace(/-/g, '.') ?? ''
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    loadData(page - 1); // API는 0부터 시작하는 페이지를 사용
  }
}

function goToPost(eventIdx, idx) {
  eventsStore.setTab('게시판')
  router.push(`/events/${eventIdx}/post/${idx}`)
}

onMounted(() => {
  loadData(); // 첫 페이지(인덱스 0) 로드
});


const comments = ref([])

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
      <div v-for="comment in comments" :key="comment.id" @click="goToPost(comment.eventIdx, comment.postIdx)"
        class="flex justify-center border-t text-sm text-gray-800 hover:bg-violet-50 px-4 py-3 items-start gap-4">

        <!-- 체크박스 -->
        <div class="w-5 text-center mt-1">
          <input type="checkbox" v-model="comment.selected" class="w-4 h-4" />
        </div>
        <!-- 내용 -->
        <div class="flex-1">
          <p class="text-violet-600 font-semibold truncate">[{{ comment.category }}] {{ comment.eventTitle }} - {{
            comment.postTitle }}</p>
          <p class="text-gray-700 line-clamp-2">내 댓글 : {{ comment.comment }}</p>
        </div>

        <!-- 날짜 -->
        <div class="w-32 mt-1 text-center">
          {{ formatDate(comment.createdAt) }}
        </div>
      </div>
    </div>

    <!-- 게시글 없을 때 메시지 -->
    <div v-if="comments.length === 0" class="py-10 text-center text-gray-500">
      작성한 댓글이 없습니다.
    </div>

    <!-- 페이지네이션 -->
    <div v-if="totalPages > 1" class="mt-6 flex justify-center items-center gap-2 flex-wrap">
      <button @click="goToPage(currentPage - 1)" :disabled="!hasPrevious" class="px-3 py-1 rounded border text-sm"
        :class="hasPrevious ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
        이전
      </button>

      <!-- 페이지 버튼 개선 - 최대 5개만 표시 -->
      <template v-for="n in totalPages" :key="n">
        <button v-if="n === 1 || n === totalPages || (n >= currentPage - 1 && n <= currentPage + 1)"
          @click="goToPage(n)" class="px-2 py-1 rounded-md text-xs font-semibold border transition" :class="{
            'bg-violet-600 text-white border-violet-600': currentPage === n,
            'bg-white text-gray-600 border-gray-300 hover:bg-gray-100': currentPage !== n
          }">
          {{ n }}
        </button>
        <span v-else-if="n === currentPage - 2 || n === currentPage + 2" class="px-1">...</span>
      </template>

      <button @click="goToPage(currentPage + 1)" :disabled="!hasNext" class="px-3 py-1 rounded border text-sm"
        :class="hasNext ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
        다음
      </button>
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