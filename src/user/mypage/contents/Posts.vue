<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/useEventsStore';
import axios from 'axios';

const router = useRouter();
const eventsStore = useEventsStore();
const posts = ref([]);

// 페이지네이션 관련 데이터
const currentPage = ref(1);
const totalPages = ref(1);
const hasNext = ref(false);
const hasPrevious = ref(false);
const pageSize = 10; // 페이지당 항목 개수

const loadData = async (page = 0) => {
    try {
        const res = await axios.get(`/api/user/mypage/post?page=${page}&size=${pageSize}`, {
            withCredentials: true
        });
        posts.value = res.data.content;

        // 페이지네이션 정보 업데이트
        totalPages.value = res.data.totalPages || 1;
        currentPage.value = page + 1;
        hasNext.value = currentPage.value < totalPages.value;
        hasPrevious.value = currentPage.value > 1;
    } catch (e) {
        console.log(e);
    }
};

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        loadData(page - 1); // API는 0부터 시작하는 페이지를 사용
    }
}

function goToPost(eventIdx, idx) {
    console.log("hey")
    eventsStore.setTab('게시판')
    router.push(`/events/${eventIdx}/post/${idx}`)
}

const formatDate = (dateStr) => {
    return dateStr?.split('T')[0].replace(/-/g, '.') ?? ''
}

onMounted(() => {
    loadData(0); // 첫 페이지(인덱스 0) 로드
});

const selectAll = ref(false)

function toggleAll() {
    posts.value.forEach(p => (p.selected = selectAll.value))
}

// 체크박스 상태 감시
watch(posts, () => {
    if (posts.value.length > 0) {
        selectAll.value = posts.value.every(p => p.selected)
    }
}, { deep: true })

function deleteSelected() {
    // 여기에 선택한 게시글 삭제 API 호출 추가 필요
    posts.value = posts.value.filter(p => !p.selected)
}
</script>

<template>
    <div class="w-full p-6 font-['Inter']">
        <h2 class="text-2xl font-bold mb-6">작성 글 보기</h2>

        <div class="border border-gray-300 rounded">
            <!-- 헤더 -->
            <div class="flex bg-gray-100 text-sm text-gray-700 font-semibold px-4 py-2">
                <div class="w-5 text-center"></div>
                <div class="flex-1 text-center">제목</div>
                <div class="w-32 text-center">날짜</div>
            </div>

            <!-- 게시글 목록 -->
            <div v-for="post in posts" :key="post.idx"
                class="flex border-t text-sm text-gray-800 hover:bg-violet-50 px-4 py-2 items-center">

                <!-- 체크박스: 가로+세로 정렬 -->
                <div class="w-10 flex justify-center items-center" @click.stop>
                    <input type="checkbox" v-model="post.selected" class="w-4 h-4" />
                </div>

                <!-- 제목 -->
                <div class="flex-1 truncate" @click="goToPost(post.eventIdx, post.idx)">
                    <span v-if="post.category" class="text-violet-600 font-semibold mr-1">[{{ post.category
                    }}]{{ post.eventTitle }}</span>
                    <span class="hover:underline cursor-pointer">{{ post.title }}</span>
                    <span v-if="post.commentCount !== null" class="text-gray-500 ml-1">({{ post.commentCount }})</span>
                    <span v-if="post.recommendCnt !== 0" class="text-rose-500 ml-2">{{ post.recommendCnt }}</span>
                </div>

                <!-- 날짜 -->
                <div class="w-32 text-center">
                    {{ formatDate(post.createdAt) }}
                </div>
            </div>

            <!-- 게시글 없을 때 메시지 -->
            <div v-if="posts.length === 0" class="py-10 text-center text-gray-500">
                작성한 게시글이 없습니다.
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
        <div class="flex justify-between items-center mt-4">
            <div>
                <input type="checkbox" v-model="selectAll" @change="toggleAll" class="mr-2" />
                <label>전체 선택</label>
            </div>
            <button class="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded" @click="deleteSelected">
                선택한 게시글 삭제
            </button>
        </div>
    </div>
</template>