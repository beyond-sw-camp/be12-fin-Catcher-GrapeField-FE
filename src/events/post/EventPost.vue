<template>
  <div class="px-6 pb-3 w-full">
    <!-- 탭 버튼 -->
    <div class="flex space-x-3 mb-4">
      <button v-for="tab in tabs" :key="tab" class="px-4 py-1 rounded-full text-sm"
        :class="selectedTab === tab ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'"
        @click="selectedTab = tab">
        {{ tab }}
      </button>
    </div>

    <!-- 검색 및 글쓰기 -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex space-x-2 w-1/3">
        <input type="text" placeholder="제목, 내용, 작성자 검색" class="border px-4 py-2 rounded w-full" />
        <button class="bg-purple-600 text-white px-4 py-2 rounded whitespace-nowrap">검색</button>
      </div>
      <button class="bg-purple-600 text-white px-4 py-2 rounded">글쓰기</button>
    </div>

    <!-- 게시판 테이블 -->
    <table class="w-full table-auto border-t border-gray-300 text-center text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-3">분류</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
          <th>추천</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in paginatedRows" :key="index" class="border-b">
          <td class="py-2">
            <span :class="getCategoryClass(row.postType)" class="px-2 py-1 text-xs">
              {{ row.postType }}
            </span>
          </td>
          <td class="text-left pl-4">{{ row.title }}</td>
          <td>{{ row.writer }}</td>
          <td>{{ formatDate(row.createdAt) }}</td>
          <td>{{ row.viewCnt }}</td>
          <td>{{ row.recommendCnt }}</td>
        </tr>
      </tbody>
    </table>

<!-- 페이지네이션 -->
<div class="mt-6 flex justify-center items-center gap-2 flex-wrap">
  <button @click="goToPage(currentPage - 1)" :disabled="!hasPrevious"
    class="px-3 py-1 rounded border text-sm"
    :class="hasPrevious ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
    이전
  </button>

  <!-- 페이지 버튼 개선 - 최대 5개만 표시 -->
  <template v-for="n in totalPages" :key="n">
  <button v-if="n === 1 || n === totalPages || (n >= currentPage - 1 && n <= currentPage + 1)"
    @click="goToPage(n)"
    class="px-2 py-1 rounded-md text-xs font-semibold border transition" 
    :class="{
      'bg-purple-600 text-white border-purple-600': currentPage === n,
      'bg-white text-gray-600 border-gray-300 hover:bg-gray-100': currentPage !== n
    }">
    {{ n }}
  </button>
  <span v-else-if="n === currentPage - 2 || n === currentPage + 2" class="px-1">...</span>
</template>

  <button @click="goToPage(currentPage + 1)" :disabled="!hasNext"
    class="px-3 py-1 rounded border text-sm"
    :class="hasNext ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
    다음
  </button>
</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePostStore } from '@/stores/usePostStore'

const postStore = usePostStore();
const tabs = ['전체', '공지', '후기', '질문', '정보']
const selectedTab = ref('전체')
const props = defineProps({ idx: Number })

const boardRows = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalElements = ref(0)
const rowsPerPage = ref(10)
const hasNext = ref(false)
const hasPrevious = ref(false)

const loadPostList = async () => {
  // 탭 변경 시 무조건 1페이지로 초기화
  if (selectedTab.value !== '전체') {
    currentPage.value = 1;
  }
  
  const response = await postStore.getPostList(props.idx, currentPage.value - 1); // 백엔드는 0부터 시작하는 페이지 인덱스 사용
  if (response && response.instances) {
    boardRows.value = response.instances;
    // 필터링 적용 후 페이지 계산
    if (selectedTab.value === '전체') {
      totalPages.value = response.totalPages;
      totalElements.value = response.totalElements;
    } else {
      // 현재 탭의 게시글만 필터링
      const filteredPosts = response.instances.filter(
        row => row.postType === selectedTab.value
      );
      // 필터링된 게시글 수로 페이지 재계산
      totalElements.value = filteredPosts.length;
      totalPages.value = Math.ceil(filteredPosts.length / rowsPerPage.value);
    }
    
    hasNext.value = currentPage.value < totalPages.value;
    hasPrevious.value = currentPage.value > 1;
  } else {
    boardRows.value = [];
    totalPages.value = 1;
    totalElements.value = 0;
    hasNext.value = false;
    hasPrevious.value = false;
  }
};

// 탭이 변경될 때만 loadPostList 호출하고, 페이지 변경은 별도 처리
watch(selectedTab, loadPostList)
// 페이지 변경 시에도 데이터 새로 불러오기
watch(currentPage, loadPostList)

onMounted(loadPostList)

const filteredRows = computed(() => {
  if (selectedTab.value === '전체') {
    return boardRows.value;
  }
  return boardRows.value.filter(row => row.postType === selectedTab.value);
})

const paginatedRows = computed(() => {
  // 서버 페이지네이션 사용 시 추가 슬라이싱 불필요
  return filteredRows.value;
})

function getCategoryClass(category) {
  if (category === '공지') return 'text-red-600 font-bold'
  return 'text-gray-600'
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString('ko-KR', options)
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>
<style scoped>
th,
td {
  text-align: center;
}

td.text-left {
  text-align: left;
}
</style>
