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
      <button v-if="isLogin" class="bg-purple-600 text-white px-4 py-2 rounded" @click="goPostRegister()">글쓰기</button>
    </div>

    <!-- 데스크탑용 헤더 -->
    <div class="hidden sm:grid grid-cols-12 h-12 bg-gray-100 text-sm font-bold text-neutral-800 border-t border-b">
      <div class="col-span-1 flex items-center justify-center">분류</div>
      <div class="col-span-5 pl-2 flex items-center justify-start">제목</div>
      <div class="col-span-2 flex items-center justify-center">작성자</div>
      <div class="col-span-2 flex items-center justify-center">작성일</div>
      <div class="col-span-1 flex items-center justify-center">조회</div>
      <div class="col-span-1 flex items-center justify-center">추천</div>
    </div>

    <!-- 게시글 리스트 -->
    <div v-for="(row, index) in paginatedRows" :key="index"
      class="border-b bg-white text-sm text-neutral-800 hover:bg-gray-50 px-2 py-2">
      <!-- 모바일 -->
      <div class="sm:hidden flex flex-col gap-1">
        <!-- 분류 -->
        <div>
          <div class="text-xs text-gray-400">분류</div>
          <span :class="getCategoryClass(row.postType)" class="text-sm font-semibold">
            {{ getPostTypeDisplay(row.postType) }}
          </span>
        </div>
        <!-- 제목 -->
        <div>
          <div class="text-xs text-gray-400">제목</div>
          <div @click="goToPost(eventIdx, row.idx)"
            class="font-medium truncate cursor-pointer hover:underline hover:text-black">
            {{ row.title }}
          </div>
        </div>
        <!-- 하단 메타 -->
        <div class="text-xs text-gray-500 flex flex-wrap gap-x-3 gap-y-1 mt-1">
          <span>👤 {{ row.writer }}</span>
          <span>🗓 {{ formatDate(row.createdAt) }}</span>
          <span>👁 {{ row.viewCnt }}</span>
          <span>❤️ {{ row.recommendCnt }}</span>
        </div>
      </div>

      <!-- 데스크탑 -->
      <div class="hidden sm:grid sm:grid-cols-12 sm:gap-2 sm:h-12 items-center">
        <div class="col-span-1 text-center">
          <span :class="getCategoryClass(row.postType)" class="text-sm font-semibold">
            {{ getPostTypeDisplay(row.postType) }}
          </span>
        </div>
        <div class="col-span-5 pl-2 text-left truncate cursor-pointer hover:underline" @click="goToPost(eventIdx, row.idx)">
          {{ row.title }}
        </div>
        <div class="col-span-2 text-center truncate">{{ row.writer }}</div>
        <div class="col-span-2 text-center truncate">{{ formatDate(row.createdAt) }}</div>
        <div class="col-span-1 text-center">{{ row.viewCnt }}</div>
        <div class="col-span-1 text-center">{{ row.recommendCnt }}</div>
      </div>
    </div>

    <!-- 페이지네이션 (기존 그대로 유지) -->
    <div class="mt-6 flex justify-center items-center gap-2 flex-wrap">
      <button @click="goToPage(currentPage - 1)" :disabled="!hasPrevious" class="px-3 py-1 rounded border text-sm"
        :class="hasPrevious ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
        이전
      </button>
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
import { useUserStore } from '@/stores/useUserStore';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const userStore = useUserStore()

const isLogin = computed(() => userStore.isLogin);

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
  boardRows = []
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

function goToPost(boardIdx, postIdx) {
  router.push(`/events/${boardIdx}/post/${postIdx}`)
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
