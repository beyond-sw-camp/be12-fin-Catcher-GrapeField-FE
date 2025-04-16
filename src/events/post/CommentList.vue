<template>
    <div class="comment-list-container">
        <!-- 댓글 목록 -->
        <div class="divide-y">
            <div v-for="comment in paginatedComments" :key="comment.id" class="p-4 hover:bg-gray-50 transition-colors">
                <div class="flex items-start space-x-3">
                    <div class="flex-grow">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-semibold text-gray-800">{{ comment.author }}</span>
                            <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
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
import { ref, computed, onMounted, watch, defineExpose } from 'vue'
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

// currentPage 변경 시 댓글 다시 불러오기
watch(currentPage, loadCommentList);

defineExpose({
    loadCommentList
})

onMounted(loadCommentList)
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