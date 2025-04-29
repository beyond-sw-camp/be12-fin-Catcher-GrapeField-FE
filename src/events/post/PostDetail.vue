<template>
    <div class="px-6 pb-3 w-full">
        <!-- 상단 네비게이션 -->
        <div class="flex items-center text-sm text-gray-500 mb-4">
            <span>게시글</span>
            <span class="mx-1">></span>
            <span>{{ postType }}</span>
        </div>

        <!-- 게시글 제목 -->
        <div class="bg-purple-100 rounded-lg px-4 py-3 mb-6">
            <h1 class="text-xl font-bold text-purple-900">{{ post.title }}</h1>
        </div>

        <!-- 게시글 정보 -->
        <div class="border-b border-gray-200 pb-4 mb-6">
            <div class="flex flex-wrap justify-between items-center text-sm">
                <div class="flex space-x-6">
                    <div>
                        <span class="text-gray-500">작성자: </span>
                        <span class="font-medium">{{ post.writer }}</span>
                    </div>
                    <div>
                        <span class="text-gray-500">작성일: </span>
                        <span>{{ formatDate(post.createdAt) }}</span>
                    </div>
                </div>
                <div class="flex space-x-6">
                    <div>
                        <span class="text-gray-500">조회: </span>
                        <span>{{ post.viewCnt }}</span>
                    </div>
                    <div>
                        <span class="text-gray-500">추천: </span>
                        <span>{{ post.recommendCnt }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 버튼 영역 -->
        <div class="flex justify-end mt-6 mb-4 space-x-2">
            <button v-if="post.editable" @click="editPost"
                class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                수정
            </button>
            <button v-if="post.editable" @click="deletePost"
                class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-red-600 hover:text-white">
                삭제
            </button>
        </div>

        <!-- 게시글 내용 -->
        <div class="mb-8 px-5">
            <!-- 마크다운 또는 HTML 본문 -->
            <div class="prose max-w-none mb-6" v-html="formattedContent"></div>

            <!-- 이미지 렌더링 (이미지 서버 baseURL + 상대경로) -->
            <div v-if="post.images && post.images.length > 0" class="my-6">
                <div v-for="(image, index) in post.images" :key="index"
                    class="my-4 bg-purple-50 p-4 rounded-lg flex justify-center">
                    <img :src="baseImageUrl + image" alt="본문 이미지" class="max-h-96 object-contain" />
                </div>
            </div>
        </div>

        <!-- 구분선 -->
        <hr class="my-6 border-gray-200">
        <Comment :postIdx="props.postIdx" :eventIdx="props.eventIdx"/>
        <hr class="my-6 border-gray-200">
        <!-- 게시글 목록 섹션 제목 -->
        <div class="flex justify-between items-center mb-4">
            <button @click="backToList" class="text-sm text-purple-600 hover:text-purple-800">
                전체 목록 보기 →
            </button>
        </div>

        <!-- 게시글 목록 -->
        <EventPost :eventIdx="eventIdx" :isSubComponent="true" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/stores/usePostStore';
import { useUserStore } from '@/stores/useUserStore';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import EventPost from './EventPost.vue';
import Comment from './Comment.vue';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const userStore = useUserStore();

const props = defineProps({
    eventIdx: Number,
    postIdx: Number
});


const post = ref({
    postIdx: null,
    title: '',
    content: '',
    username: '',
    createdAt: '',
    viewCnt: 0,
    recommendCnt: 0,
    postType: '',
    isVisible: true,
    images: [],
    attachments: []
});

const loading = ref(true);
const error = ref(null);

// 게시글 유형에 따른 한글 표시
const postTypeMapping = {
    'NOTICE': '공지',
    'REVIEW': '후기',
    'QUESTION': '질문',
    'INFO': '정보',
    'CHAT': '잡담'
};

// 표시할 게시글 유형
const postType = computed(() => {
    return postTypeMapping[post.value.postType] || '일반';
});

// 마크다운 또는 HTML 형식의 내용 처리
const formattedContent = computed(() => {
    if (!post.value.content) return '';

    // 마크다운이 적용된 HTML로 변환하고 보안 처리
    const rawHtml = marked(post.value.content);
    return DOMPurify.sanitize(rawHtml);
});

//NOTE: 이미지 링크 임의 설정(.env파일)
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

const fetchPost = async () => {
    try {
        loading.value = true;
        const data = await postStore.getPostDetail(props.postIdx);
        console.log(data);
        if (data) {
            post.value = data;
        }
    } catch (err) {
        error.value = '게시글을 불러오는 중 오류가 발생했습니다.';
        console.error('게시글 조회 오류:', err);
    } finally {
        loading.value = false;
    }
};

// 컴포넌트 마운트 시 게시글 불러오기
onMounted(fetchPost);

// 라우트 파라미터가 변경될 때마다 게시글 다시 불러오기
watch(() => props.postIdx, (newIdx, oldIdx) => {
    if (newIdx !== oldIdx) {
        fetchPost();
        window.scrollTo(0, 0);
    }
}, { immediate: true });

// 날짜 포맷팅
const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

// 목록으로 돌아가기
function backToList() {
    router.push(`/events/${props.eventIdx}`);
}

// 게시글 수정
const editPost = () => {
    router.push(`/events/${props.eventIdx}/post/edit/${props.postIdx}`);
};

// 게시글 삭제
const deletePost = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
        const response = await postStore.deletePost(props.postIdx);
        
        console.log(response);
        if(response === false){
            alert('게시글 삭제 중 오류가 발생했습니다.'); return;
        }
        alert('게시글이 삭제되었습니다.');
        backToList();
    } catch (err) {
        alert('게시글 삭제 중 오류가 발생했습니다.');
        console.error('게시글 삭제 오류:', err);
    }
};
</script>

<style scoped>
/* 필요한 추가 스타일 */
.prose {
    line-height: 1.7;
}

.prose p {
    margin-bottom: 1rem;
}
</style>