<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useReviewStore } from '@/stores/useReviewStore'

const props = defineProps({
    eventIdx: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['update-total-count'])

const reviewStore = useReviewStore()

const reviews = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalElements = ref(0)
const hasNext = ref(false)
const hasPrevious = ref(false)
const selectedRating = ref(0)

// 페이지네이션 초기화
const resetPagination = () => {
    reviews.value = []
    currentPage.value = 1
    totalPages.value = 1
    totalElements.value = 0
    hasNext.value = false
    hasPrevious.value = false
}

// 한줄평 불러오기 메서드
const loadReviewList = async () => {
    try {
        const response = await reviewStore.getReviewList(
            props.eventIdx,
            currentPage.value - 1,
            selectedRating.value,
        );

        if (response && response.instances) {
            reviews.value = response.instances;
            totalPages.value = response.totalPages;
            totalElements.value = response.totalElements;
            hasNext.value = currentPage.value < totalPages.value;
            hasPrevious.value = currentPage.value > 1;

            // 총 개수 부모 컴포넌트에 emit
            emit('update-total-count', totalElements.value)
        } else {
            resetPagination();
        }
    } catch (error) {
        console.error('리뷰 로딩 중 오류:', error);
        resetPagination();
    }
}

// 페이지 변경 시 목록 다시 불러오기
watch(currentPage, loadReviewList)
watch(selectedRating, () => {
    currentPage.value = 1
    loadReviewList()
})

// 페이지 이동 메서드
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

// 별점 선택 핸들러
const selectRating = (rating) => {
    selectedRating.value = selectedRating.value === rating ? 0 : rating
}

// TODO: 리뷰 수정 메서드
const editReview = (review) => {
    // 리뷰 수정 로직 구현 (예: 모달 오픈)
    //console.log('Edit review:', review)
}

// TODO : 리뷰 삭제 메서드
const deleteReview = async (reviewIdx) => {
    try {
        // 확인 대화상자
        const confirmDelete = confirm('정말로 이 리뷰를 삭제하시겠습니까?')
        if (!confirmDelete) return

        // 리뷰 삭제 API 호출
        await reviewStore.deleteReview(reviewIdx)
        
        // 리뷰 목록 새로고침
        loadReviewList()
    } catch (error) {
        console.error('리뷰 삭제 중 오류:', error)
        alert('리뷰 삭제에 실패했습니다.')
    }
}

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// 컴포넌트 마운트 시 초기 로드
onMounted(() => {
    loadReviewList()
})

// 부모 컴포넌트에서 새로고침 요청 시 사용할 메서드
defineExpose({
    loadReviewList
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- 검색바 -->
        <!-- <div class="relative flex items-center">
            <input v-model="searchQuery" type="text" placeholder="검색어를 입력하세요"
                class="w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
            <button class="absolute right-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd" />  
                </svg>
            </button>
        </div> -->
        <!-- 별점 필터 -->
        <div class="flex items-center gap-4">
            <span class="text-neutral-600">별점 필터:</span>
            <div class="flex gap-2">
                <button v-for="rating in 5" :key="rating" @click="selectRating(rating)"
                    class="flex items-center justify-center w-10 h-10 rounded-full transition-colors" :class="selectedRating === rating
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'">
                    {{ rating }}★
                </button>
            </div>
        </div>

        <!-- 리뷰 카드 리스트 -->
        <div class="flex flex-col gap-4">
            <div v-for="review in reviews" :key="review.idx"
                class="self-stretch px-6 py-5 bg-white rounded-[10px] outline outline-1 outline-offset-[-0.5px] outline-violet-50 flex flex-col justify-start items-start gap-2.5">
                <div class="inline-flex justify-start items-center gap-4 w-full">
                    <div
                        class="w-9 h-10 px-3.5 py-3 bg-violet-50 rounded-[20px] inline-flex justify-center items-center">
                        <div class="text-center text-violet-600 text-xs font-bold">별</div>
                    </div>
                    <div class="w-full inline-flex flex-col gap-1">
                        <div class="flex justify-between items-center">
                            <div class="flex items-end gap-3">
                                <div class="text-neutral-800 text-base font-bold">{{ review.writer }}</div>
                                <div class="text-yellow-400 text-base">
                                    {{ '★'.repeat(review.rating) }}
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="text-neutral-400 text-xs">{{ formatDate(review.createdAt) }}</div>
                                
                                <!-- 수정 및 삭제 버튼 -->
                                <div v-if="review.editable" class="flex items-center gap-1">
                                    <button 
                                        @click="editReview(review)"
                                        class="text-xs text-gray-500 hover:text-purple-600 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button 
                                        @click="deleteReview(review.idx)"
                                        class="text-xs text-gray-500 hover:text-red-600 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="text-neutral-800 text-sm">{{ review.content }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 페이지네이션 -->
        <section class="flex justify-center">
            <div class="h-10 flex justify-center items-center gap-2.5">
                <!-- 이전 버튼 -->
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                        <path d="M37 1H5C2.8 1 1 2.8 1 5v32c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V5c0-2.2-1.8-4-4-4Z"
                            fill="white" stroke="#DEE2E6" />
                        <path d="M26 11L16 21l10 10" stroke="#495057" stroke-width="2" />
                    </svg>
                </button>

                <!-- 번호 버튼 -->
                <button v-for="page in totalPages" :key="page" @click="goToPage(page)" class="relative w-10 h-10">
                    <svg :width="42" :height="42" viewBox="0 0 42 42" fill="none">
                        <path d="M37 1H5C2.8 1 1 2.8 1 5v32c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V5c0-2.2-1.8-4-4-4Z"
                            :fill="page === currentPage ? '#7048E8' : 'white'"
                            :stroke="page === currentPage ? '#7048E8' : '#DEE2E6'" />
                    </svg>
                    <div class="absolute left-[15px] top-[10px] text-base text-center"
                        :class="page === currentPage ? 'text-white font-bold' : 'text-zinc-600 font-normal'">
                        {{ page }}
                    </div>
                </button>

                <!-- 다음 버튼 -->
                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                        <path d="M37 1H5C2.8 1 1 2.8 1 5v32c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V5c0-2.2-1.8-4-4-4Z"
                            fill="white" stroke="#DEE2E6" />
                        <path d="M16 11l10 10-10 10" stroke="#495057" stroke-width="2" />
                    </svg>
                </button>
            </div>
        </section>
    </div>
</template>