<script setup>
import TopBanner from './TopBanner.vue'
import PopularPost from './PopularPost.vue'
import PopularChatRoom from './PopularChatRoom.vue'
import Category from './Category.vue'
import Card from './CardTemplate.vue'
import Calendar from './Calendar.vue'
import CardList from './CardList.vue'
</script>

<template>
    <TopBanner />
    <div>
        <div class="content-row">
            <PopularPost />
            <PopularChatRoom />
        </div>
        <Category />
        <Card/>
        <Calendar />
        <CardList title="오픈 예정"/>
        <CardList title="종료 예정"/>
    </div>
</template>

<style>
/* 상단 배너와 맞춘 content-row 너비 및 내부 아이템 너비 설정 */
.content-row {
    display: flex;
    width: 70vw;
    margin: 0 auto;
    justify-content: space-between;
    gap: 2vw;
}

/* 인기 게시글 / 채팅방 공통 스타일 */
.popular-posts,
.chat-rooms {
    width: 34vw;
    padding: 1rem;
    margin: 2vh 0;
    box-sizing: border-box;
}

/* 반응형 - 1200px 이하 */
@media (max-width: 1200px) {
    .content-row {
        width: 80vw;
    }

    .popular-posts,
    .chat-rooms {
        width: 39vw;
    }
}

/* 반응형 - 768px 이하 (한 줄 배치) */
@media (max-width: 768px) {
    .content-row {
        width: 85vw;
        flex-direction: column;
        gap: 3vh;
    }

    .popular-posts,
    .chat-rooms {
        width: 100%;
    }
}

/* 반응형 - 600px 이하 */
@media (max-width: 600px) {
    .content-row {
        width: 90vw;
    }

    .popular-posts,
    .chat-rooms {
        width: 100%;
    }
}
</style>