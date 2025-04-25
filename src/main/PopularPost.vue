<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import { useEventsStore } from '../stores/useEventsStore'

const router = useRouter();
const eventsStore = useEventsStore();
const posts = ref([])

function goToPost(eventIdx, idx) {
    eventsStore.setTab('게시판')
    router.push(`/events/${eventIdx}/post/${idx}`)
}


onMounted(async () => {
    const res = await axios.get('/api/post/list', {
        params: {
            orderBy: 'popular',
            category: 'ALL'
        }
    });

    posts.value = res.data.instances;
})
</script>


<template>
  <div class="w-full p-4 bg-white shadow rounded-lg">
    <h2 class="text-lg font-bold text-zinc-900 mb-4">인기 게시글</h2>

    <div class="flex flex-col gap-1">
      <div
          v-for="(post, index) in posts.slice(0,6)" @click="goToPost(post.eventIdx, post.idx)"
          :key="index"
          class="flex items-center px-4 py-3 border border-gray-100 rounded-lg min-w-0 gap-2"
      >
        <!-- 게시판 제목 -->
        <div class="w-[30%] min-w-0 truncate text-purple-800 text-sm font-medium text-center">
          {{ post.eventTitle }}
        </div>

        <!-- 게시글 제목 -->
        <div class="w-[40%] min-w-0 truncate text-zinc-900 text-sm font-medium text-center">
          {{ post.title }}
        </div>

        <!-- 날짜 -->
        <div class="w-[10%] text-center text-gray-400 text-sm">
          {{ post.date }}
        </div>

        <!-- 통계 -->
        <div class="w-[20%] flex justify-between">
          <div class="flex items-center gap-1">
            <img src="@/assets/icons/view.png" alt="comment" class="w-4 h-4" />
            <div class="text-purple-800 text-sm">{{ post.viewCnt }}</div>
          </div>
          <div class="flex items-center gap-1">
            <img src="@/assets/icons/like.png" alt="like" class="w-4 h-4" />
            <div class="text-purple-800 text-sm">{{ post.recommendCnt }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.popular-posts {
  /* 일단 사용 안 하는 중 */
    width: 35vw;
    /* 너비 통일 */
    min-width: 0;
    /* min-width 제거 */
    max-width: 35vw;
    /* max-width 유지 */
    padding-left: 0;
    /* 왼쪽 패딩 제거 또는 줄임 */
    margin-top: 4vw;
    margin-bottom: 4vw;
    box-sizing: border-box;
    /* 패딩이 너비에 포함되도록 설정 */
}   

.popular-title {
    font-size: 1.2vw;
    font-weight: 700;
    color: #27272a;
    margin-bottom: 1vw;
}

.post-list {
    display: flex;
    flex-direction: column;
    gap: 1vw;
}

.post-item {
    position: relative;
    width: 100%;
    height: 4vw;
    background-color: white;
    border-radius: 1vw;
    border: 0.05vw solid #f3f4f6;
    display: flex;
    align-items: center;
    padding: 0 1.5vw;
}

.post-event {
    width: 25%;
    font-size: 1vw;
    font-weight: 500;
    color: #6b21a8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post-title {
    width: 25%;
    font-size: 1vw;
    font-weight: 500;
    color: #27272a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post-date {
    width: 20%;
    font-size: 1vw;
    color: #9ca3af;
    text-align: left;
}

.post-stats {
    display: flex;
    align-items: center;
    gap: 1.5vw;
    margin-left: auto;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 0.3vw;
}

img {
    width: 1.5vw;
    height: 1.5vw;
    position: relative;
}

.comment-icon:before,
.comment-icon:after {
    content: "";
    position: absolute;
    background-color: #6b21a8;
}

.comment-icon:before {
    width: 0.8vw;
    height: 0.8vw;
    left: 0.1vw;
    top: 0.1vw;
}

.like-icon:before,
.like-icon:after {
    content: "";
    position: absolute;
    background-color: #6b21a8;
}

.like-icon:before {
    width: 0.7vw;
    height: 0.7vw;
    border-radius: 50%;
    left: 0.15vw;
    top: 0.15vw;
}

.stat-count {
    font-size: 1vw;
    color: #6b21a8;
}

@media (max-width: 768px) {
    .popular-title {
        font-size: 3vw;
        margin-bottom: 2vw;
    }

    .post-item {
        height: 7vw;
        border-radius: 1.5vw;
        padding: 0 2vw;
    }

    .post-event {
        font-size: 1.8vw;
    }

    .post-title {
        font-size: 1.8vw;
    }

    .post-date {
        font-size: 1.8vw;
    }

    .stat-icon {
        width: 1.8vw;
        height: 1.8vw;
    }

    .comment-icon:before {
        width: 1.5vw;
        height: 1.5vw;
    }

    .like-icon:before {
        width: 1.3vw;
        height: 1.3vw;
    }

    .stat-count {
        font-size: 1.8vw;
    }
}

@media (max-width: 480px) {
    .popular-title {
        font-size: 4vw;
    }

    .post-item {
        height: 10vw;
        flex-wrap: wrap;
        padding: 1.5vw 3vw;
    }

    .post-event {
        width: 50%;
        font-size: 2.5vw;
    }

    .post-title {
        width: 50%;
        font-size: 2.5vw;
    }

    .post-date {
        width: 30%;
        font-size: 2.2vw;
        order: 3;
    }

    .post-stats {
        width: 70%;
        order: 4;
        justify-content: flex-end;
    }

    .stat-icon {
        width: 2.5vw;
        height: 2.5vw;
    }

    .comment-icon:before {
        width: 2vw;
        height: 2vw;
    }

    .like-icon:before {
        width: 1.8vw;
        height: 1.8vw;
    }

    .stat-count {
        font-size: 2.5vw;
    }
}
</style>