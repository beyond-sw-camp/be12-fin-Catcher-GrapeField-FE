<template>
  <div class="w-full">
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
      <!--TODO : 게시글 등록 페이지 추가 필요-->
      <button class="bg-purple-600 text-white px-4 py-2 rounded" @click="goPostRegister()">글쓰기</button>
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
              {{ getPostTypeDisplay(row.postType) }}
            </span>
          </td>
          <td class="text-left pl-4">
            <router-link :to="`/events/${eventIdx}/post/${row.idx}`">
              {{ row.title }}
            </router-link>
          </td>
          <td>{{ row.writer }}</td>
          <td>{{ formatDate(row.createdAt) }}</td>
          <td>{{ row.viewCnt }}</td>
          <td>{{ row.recommendCnt }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="mt-6 flex justify-center items-center gap-2 flex-wrap">
      <button @click="goToPage(currentPage - 1)" :disabled="!hasPrevious" class="px-3 py-1 rounded border text-sm"
        :class="hasPrevious ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
        이전
      </button>

      <!-- 페이지 버튼 개선 - 최대 5개만 표시 -->
      <template v-for="n in totalPages" :key="n">
        <button v-if="n === 1 || n === totalPages || (n >= currentPage - 1 && n <= currentPage + 1)"
          @click="goToPage(n)" class="px-2 py-1 rounded-md text-xs font-semibold border transition" :class="{
            'bg-purple-600 text-white border-purple-600': currentPage === n,
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePostStore } from '@/stores/usePostStore'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();

// 한글 표시와 enum 값 매핑
const tabMapping = {
  '전체': 'ALL',
  '공지': 'NOTICE',
  '정보': 'INFO',
  '잡담': 'CHAT',
  '후기': 'REVIEW',
  '질문': 'QUESTION',
};

// 화면에 표시할 탭 목록 (한글)
const tabs = Object.keys(tabMapping);
const selectedTab = ref('전체')
const eventIdx = Number(route.params.eventIdx)

const boardRows = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalElements = ref(0)
const hasNext = ref(false)
const hasPrevious = ref(false)

const resetPagination = () => {
  boardRows = [],
    currentPage = 1
  totalPages = 1
  totalElements = 0
  hasNext = false
  hasPrevious = false
}

const loadPostList = async () => {
  // 탭 변경 시 무조건 1페이지로 초기화
  if (selectedTab.value !== '전체') {
    currentPage.value = 1;
  }

  // 선택된 탭에 해당하는 enum 값으로 변환
  const selectedEnum = tabMapping[selectedTab.value];

  const response = await postStore.getPostList(eventIdx, currentPage.value - 1, selectedEnum); // 백엔드로 enum 값 전송
  if (response && response.instances) {
    boardRows.value = response.instances;
    totalPages.value = response.totalPages;
    totalElements.value = response.totalElements;
    hasNext.value = currentPage.value < totalPages.value;
    hasPrevious.value = currentPage.value > 1;
  } else {
    resetPagination();
  }
};

// 탭이 변경될 때와 페이지 변경 시 데이터 새로 불러오기
watch(selectedTab, loadPostList)
watch(currentPage, loadPostList)

onMounted(loadPostList)

// 필터링은 이제 서버에서 처리되므로 추가 필터링 불필요
const paginatedRows = computed(() => boardRows.value);

// enum으로 내려오는 postType을 한글로 표시하기 위한 역매핑
const getPostTypeDisplay = (enumType) => {
  // enum 값에서 한글 표시로 변환하는 역매핑
  const reverseMapping = {};
  for (const [key, value] of Object.entries(tabMapping)) {
    reverseMapping[value] = key;
  }
  return reverseMapping[enumType] || enumType;
};

function getCategoryClass(category) {
  if (category === 'NOTICE') return 'text-red-600 font-bold'
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

function goPostRegister() {
  postStore.setCurrentBoardIdx(eventIdx);
  router.push({ name: 'PostRegister' });
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
