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
        <input
            type="text"
            placeholder="제목, 내용, 작성자 검색"
            class="border px-4 py-2 rounded w-full"
        />
        <button class="bg-purple-600 text-white px-4 py-2 rounded whitespace-nowrap">검색</button>
      </div>
      <button class="bg-purple-600 text-white px-4 py-2 rounded">글쓰기</button>
    </div>


    <!-- 게시판 테이블 -->
    <table class="w-full table-auto border-t border-gray-300 text-center text-sm">
      <thead class="bg-gray-100">
      <tr>
        <th class="py-3">번호</th>
        <th>분류</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>조회수</th>
        <th>추천</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in paginatedRows" :key="index" class="border-b">
        <td class="py-2">{{ row.id }}</td>
        <td>
            <span :class="getCategoryClass(row.category)" class="px-2 py-1 rounded-full text-white text-xs">
              {{ row.category }}
            </span>
        </td>
        <td class="text-left pl-4">{{ row.title }}</td>
        <td>{{ row.writer }}</td>
        <td>{{ row.date }}</td>
        <td>{{ row.views }}</td>
        <td>{{ row.likes }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <!-- 페이지네이션 -->
    <div class="mt-6 flex justify-center space-x-2">
      <button
          v-for="n in totalPages"
          :key="n"
          @click="currentPage = n"
          class="px-3 py-1 border rounded text-sm"
          :class="currentPage === n ? 'bg-purple-500 text-white' : 'bg-white text-gray-600'"
      >
        {{ n }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 탭 목록 & 상태
const tabs = ['전체', '공지', '후기', '질문', '정보']
const selectedTab = ref('전체')

// 페이지네이션 관련
const currentPage = ref(1)
const rowsPerPage = 5

// 전체 게시글
const boardRows = ref([
  { id: '공지', category: '공지', title: '[필독] <꽃의 비밀> 관람 시 유의사항 안내', writer: '운영자', date: '2025.02.05', views: 1245, likes: 58 },
  { id: 15, category: '후기', title: '2월 12일 관람 관련 후기 - 정말정말 인기기 입장예약이에요!', writer: '찐팬', date: '2025.02.12', views: 328, likes: 42 },
  { id: 14, category: '질문', title: '화이트씨어터 주변 주차 정보 있나요?', writer: '처음관람자', date: '2025.02.10', views: 156, likes: 12 },
  { id: 13, category: '후기', title: '박정훈 배우님의 스페어 캐릭터 표현이 섬세했어요(스포주의)', writer: '연극사랑', date: '2025.02.08', views: 287, likes: 39 },
  { id: 12, category: '정보', title: '화이트씨어터 주차 및 대중교통 안내', writer: '운전연습', date: '2025.02.07', views: 421, likes: 51 },
  { id: 11, category: '후기', title: '2월 5일 공연 - 무대 장치가 정말 아름다웠어요', writer: '무대덕후', date: '2025.02.05', views: 198, likes: 24 },
  { id: 10, category: '질문', title: '3월에 관람 예정인데 공연팀 배우님 출연 일정 아시는 분?', writer: '배우팬', date: '2025.02.04', views: 143, likes: 8 },
  { id: 9, category: '후기', title: '오픈런 공연 리뷰 - 꽃의 비밀에 전하는 감동', writer: '매일관람', date: '2025.02.03', views: 342, likes: 37 },
  { id: 8, category: '정보', title: '공연 중 소품 활용이 독특했던 장면들', writer: '소품장인', date: '2025.02.03', views: 176, likes: 19 },
  { id: 7, category: '질문', title: '작품 속 의상 신청에 대해 예약제도 있음?', writer: '작품분석', date: '2025.02.02', views: 204, likes: 18 },
  { id: 6, category: '정보', title: '<꽃의 비밀> 원작과 연극의 차이점 정리', writer: '문학전공', date: '2025.02.01', views: 267, likes: 31 },
])

// 탭 필터링된 게시글
const filteredRows = computed(() => {
  const rows = selectedTab.value === '전체'
      ? boardRows.value
      : boardRows.value.filter(row => row.category === selectedTab.value)
  currentPage.value = 1 // 탭 변경 시 페이지 초기화
  return rows
})

// 현재 페이지에 표시할 게시글
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage
  return filteredRows.value.slice(start, start + rowsPerPage)
})

// 전체 페이지 수
const totalPages = computed(() =>
    Math.ceil(filteredRows.value.length / rowsPerPage)
)

// 카테고리 뱃지 색상
function getCategoryClass(category) {
  switch (category) {
    case '공지': return 'bg-red-500'
    case '후기': return 'bg-purple-500'
    case '질문': return 'bg-blue-500'
    case '정보': return 'bg-green-500'
    default: return 'bg-gray-400'
  }
}
</script>


<style scoped>
th, td {
  text-align: center;
}
td.text-left {
  text-align: left;
}
</style>
