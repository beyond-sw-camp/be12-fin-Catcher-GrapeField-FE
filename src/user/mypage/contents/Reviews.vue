<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';
import { useEventsStore } from '@/stores/useEventsStore';

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

const router = useRouter();
const eventsStore = useEventsStore();

// 페이지네이션 관련 데이터 
const currentPage = ref(1);
const totalPages = ref(1);
const hasNext = ref(false);
const hasPrevious = ref(false);
const pageSize = 10; // 페이지당 항목 개수

const loadData = async (page = 0) => {  // 기본값 0으로 설정
    try {
        const res = await axios.get(`/api/user/mypage/review?page=${page}&size=${pageSize}`, {
            withCredentials: true
        });

        // API 응답 로깅하여 구조 확인
        console.log('API Response:', res.data);

        // 응답 구조에 따라 데이터 설정
        if (res.data.content) {
            // Spring Data의 Page 객체 구조를 가진 경우
            reviews.value = res.data.content;
            totalPages.value = res.data.totalPages || 1;
            currentPage.value = page + 1;
            hasNext.value = !res.data.last;
            hasPrevious.value = !res.data.first;
        } else {
            // 단순 배열이 반환된 경우
            reviews.value = res.data;
            totalPages.value = 1;
            currentPage.value = 1;
            hasNext.value = false;
            hasPrevious.value = false;
            console.warn('응답에 페이지네이션 정보가 없습니다.');
        }
    } catch (e) {
        console.error('리뷰 로딩 중 오류:', e);
        reviews.value = [];
        totalPages.value = 1;
        currentPage.value = 1;
        hasNext.value = false;
        hasPrevious.value = false;
    }
}

const reviews = ref([])

const selectAll = ref(false)

function toggleAll() {
    reviews.value.forEach(r => (r.selected = selectAll.value))
}

watch(reviews, () => {
    selectAll.value = reviews.value.every(r => r.selected)
}, { deep: true })

function deleteSelected() {
    reviews.value = reviews.value.filter(r => !r.selected)
}

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        loadData(page - 1); // API는 0부터 시작하는 페이지를 사용
    }
}

function goToPost(eventIdx) {
    eventsStore.setTab('한줄평')
    router.push(`/events/${eventIdx}`)
}

const formatDate = (dateStr) => {
    return dateStr?.split('T')[0].replace(/-/g, '.') ?? ''
}

onMounted(() => {
    loadData(0);
})
</script>

<template>
    <div class="w-full p-6 font-['Inter']">
        <h2 class="text-2xl font-bold mb-6">한줄평 ({{ reviews.length }})</h2>

        <!-- 리뷰 리스트 -->
        <div class="space-y-4">
            <div v-for="review in reviews" :key="review.idx" @click="goToPost(review.eventIdx)"
                class="flex flex-col md:flex-row bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4">
                <!-- 좌측: 체크박스 + 포스터 묶음 -->
                <div class="flex items-center gap-4 w-28">
                    <!-- 체크박스: 고정 높이 박스 안에서 중앙 정렬 -->
                    <div class="flex justify-center items-center w-6 h-28">
                        <input type="checkbox" v-model="review.selected" class="w-4 h-4" />
                    </div>

                    <!-- 포스터: 같은 높이로 통일 -->
                    <div
                        class="w-20 h-28 overflow-hidden rounded-md border border-gray-300 flex justify-center items-center shrink-0">
                        <img :src="BASE_IMAGE_URL + encodeURI(review.poster_img_url)" alt="poster" class="w-full h-full object-cover" />
                    </div>
                </div>

                <!-- 우측: 텍스트 정보 -->
                <div class="flex-1 px-3">
                    <h3 class="font-semibold text-base text-violet-700 mb-1">
                        {{ review.events }}
                    </h3>

                    <div class="text-yellow-400 text-sm mb-1">
                        <span v-for="n in Math.min(review.rating || 0, 100)" :key="n">★</span>
                        <span v-for="n in Math.max(0, Math.min(5, 5 - (review.rating || 0)))" :key="'empty' + n"
                            class="text-gray-300">★</span>
                    </div>

                    <p class="text-sm text-gray-700 mb-2">{{ review.content }}</p>
                    <span class="text-sm text-gray-500">{{ formatDate (review.createdAt) }}</span>
                </div>
            </div>
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

        <!-- 하단 선택/삭제 -->
        <div class="flex justify-between items-center mt-6">
            <div>
                <input type="checkbox" v-model="selectAll" @change="toggleAll" class="mr-2" />
                <label class="text-sm">전체 선택</label>
            </div>
            <button @click="deleteSelected"
                class="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 text-sm">
                선택한 한줄평 삭제
            </button>
        </div>
    </div>
</template>


<style scoped></style>