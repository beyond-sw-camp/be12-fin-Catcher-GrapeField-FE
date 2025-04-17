<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import { useCommentStore } from '@/stores/useCommentStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const commentStore = useCommentStore();

const emit = defineEmits(['comment-added']);
const props = defineProps({
    eventIdx: Number,
    postIdx: Number
});

const isLogin = computed(() => userStore.isLogin);
const newComment = ref('');

const submitComment = async () => {
    if (!isLogin.value) return;

    const trimmedComment = newComment.value.trim();
    if (!trimmedComment) return;

    try {
        const requestData = {
            postIdx: props.postIdx,
            content: newComment.value
        };

        // 댓글 등록
        await commentStore.setComment(requestData);

        // 이벤트 방출(추가된 댓글이 목록에 나오도록)
        emit('comment-added');

        // 입력 초기화
        newComment.value = '';
    } catch (error) {
        // 에러 처리
        alert(error.response?.data?.message || '댓글 등록 중 오류가 발생했습니다.');
    }
}

const login = () => {
    router.push({
        path: '/login',
        query: {
            redirect: route.fullPath, // 현재 경로 저장
        }
    });
}

</script>
<template>
    <!-- 댓글 입력 섹션 -->
    <div class="p-4 border-b">
        <template v-if="isLogin">
            <textarea v-model="newComment" placeholder="댓글을 작성해주세요."
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24"></textarea>
            <div class="flex justify-end mt-2">
                <button @click="submitComment" :disabled="!newComment.trim()"
                    class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    댓글 등록
                </button>
            </div>
        </template>
        <div v-else class="text-center text-gray-500 bg-gray-100 p-4 rounded-md">
            <p>글을 작성하려면 로그인이 필요합니다.</p>
            <button @click="login" class="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                로그인
            </button>
        </div>
    </div>
</template>