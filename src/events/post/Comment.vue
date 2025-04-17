<template>
    <div class="mx-auto">
        <!-- 댓글 섹션 컨테이너 -->
        <div class="bg-white rounded-lg">
            <!-- 댓글 헤더 -->
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-lg font-semibold text-gray-800">댓글 {{ commentCount }}개</h2>
            </div>
            <CommentRegister :postIdx="props.postIdx" :eventIdx="props.eventIdx" @comment-added="refreshCommentList" />
            <CommentList ref="commentListRef" :postIdx="props.postIdx" :eventIdx="props.eventIdx"
                @update-comment-count="updateCommentCount" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import CommentRegister from './CommentRegister.vue'
import CommentList from './CommentList.vue'

const props = defineProps({
    eventIdx: Number,
    postIdx: Number
});

const commentCount = ref(0)
const commentListRef = ref(null)

//댓글 개수 가져오기
const updateCommentCount = (count) => {
    commentCount.value = count
}

//댓글 등록시 댓글 목록 새로고침침
const refreshCommentList = async () => {
    if (commentListRef.value) {
        await commentListRef.value.loadCommentList()
    }
}
</script>