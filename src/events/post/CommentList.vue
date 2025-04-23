<template>
    <div class="comment-list-container">
        <!-- 댓글 목록 -->
        <div class="divide-y">
            <div v-for="comment in paginatedComments" :key="comment.id" class="p-4 hover:bg-gray-50 transition-colors">
                <div class="flex items-start space-x-3 w-full">
                    <div class="flex-grow">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-semibold text-gray-800">{{ comment.writer }}</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>

                                <!-- 수정 및 삭제 버튼 -->
                                <div v-if="comment.editable" class="flex items-center gap-1">
                                    <button @click="editComment(comment)"
                                        class="text-xs text-gray-500 hover:text-purple-600 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button @click="deleteComment(comment.idx)"
                                        class="text-xs text-gray-500 hover:text-red-600 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-700">{{ comment.content }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 댓글 없음 상태 -->
        <div v-if="comments.length === 0" class="text-center text-gray-500 p-8">
            아직 작성된 댓글이 없습니다.
        </div>

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
import { useCommentStore } from '@/stores/useCommentStore'
const commentStore = useCommentStore()

// emit을 위한 설정
const emit = defineEmits(['update-comment-count'])

const props = defineProps({
    eventIdx: Number,
    postIdx: Number
});

const comments = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const totalElements = ref(0)
const hasNext = ref(false)
const hasPrevious = ref(false)

// 페이지네이션
const resetPagination = () => {
    comments.value = []
    currentPage.value = 1
    totalPages.value = 1
    totalElements.value = 0
    hasNext.value = false
    hasPrevious.value = false
}

// 댓글 불러오기 메서드
// CommentList.vue
const loadCommentList = async () => {
    try {
        const response = await commentStore.getCommentList(props.postIdx, currentPage.value - 1);
        if (response && response.instances) {
            comments.value = response.instances;
            totalPages.value = response.totalPages;
            totalElements.value = response.totalElements;
            hasNext.value = currentPage.value < totalPages.value;
            hasPrevious.value = currentPage.value > 1;
            // 댓글 개수 emit
            emit('update-comment-count', totalElements.value);
        } else {
            resetPagination();
        }
    } catch (error) {
        console.error('댓글 로딩 중 오류:', error);
        resetPagination();
    }
}

// TODO : 댓글 수정 메서드
const editComment = (comment) => {
    // 댓글 수정 로직 구현 (예: 모달 오픈 또는 인라인 수정)
    console.log('Edit comment:', comment)
}

// TODO : 댓글 삭제 메서드
const deleteComment = async (commentIdx) => {
    try {
        // 확인 대화상자
        const confirmDelete = confirm('정말로 이 댓글을 삭제하시겠습니까?')
        if (!confirmDelete) return

        // 댓글 삭제 API 호출
        await commentStore.deleteComment(commentIdx)

        // 댓글 목록 새로고침
        loadCommentList()
    } catch (error) {
        console.error('댓글 삭제 중 오류:', error)
        alert('댓글 삭제에 실패했습니다.')
    }
}


// currentPage 변경 시 댓글 다시 불러오기
watch(currentPage, loadCommentList);

defineExpose({
    loadCommentList
})

const paginatedComments = computed(() => comments.value)

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// 컴포넌트 마운트 시 댓글 불러오기
onMounted(() => {
    loadCommentList()
})
</script>

<style scoped>
.comment-list-container {
    @apply bg-white rounded-lg;
}
</style>