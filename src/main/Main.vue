<template>
    <TopBanner />
    <div class="main-content">
        <div class="content-row">
            <PopularPost />
            <PopularChatRoom />
        </div>
        <Category />
        <Card />
        <Calendar />
        <CardList title="오픈 예정"/>
        <CardList title="종료 예정"/>
    </div>
</template>


<script>

import TopBanner from './TopBanner.vue'
import PopularPost from './PopularPost.vue'
import PopularChatRoom from './PopularChatRoom.vue'
import Category from './Category.vue'
import Card from './CardTemplate.vue'
import Calendar from './Calendar.vue'
import CardList from './CardList.vue'


export default {
    components: {
        TopBanner,
        PopularPost,
        PopularChatRoom,
        Category,
        Card,
        Calendar,
        CardList
    }
}
</script>

<style>
/* 메인 컨테이너 스타일 */
.content-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    /* 상단 정렬 */
    gap: 2vw;
    
    width: 95%
}

/* 인기 게시글 조정 */
.popular-posts {
    width: 45%;
    min-width: 35vw;
    max-width: 45vw;
    padding-left: 5vw;
    margin-top: 0;
    /* 마진 제거 */
}

/* 인기 채팅방 조정 */
.chat-rooms {
    width: 45%;
    min-width: 35vw;
    max-width: 45vw;
    padding-right: 5vw;
    margin-top: 0;
    /* 마진 제거 */
}

/* 섹션 제목 스타일 통일 */
.popular-title,
.chat-title {
    font-size: 1.2vw;
    font-weight: 700;
    color: #27272a;
    margin-bottom: 1vw;
}

/* 컴포넌트 내부 간격 통일 */
.post-list,
.room-list {
    gap: 0.vw;
}

/* 아이템 높이 통일 */
.post-item,
.room-item {
    height: 3.5vw;
}

@media (max-width: 768px) {
    .content-row {
        flex-direction: column;
    }

    .popular-posts,
    .chat-rooms {
        width: 100%;
        max-width: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
        margin-bottom: 3vw;
    }

    .popular-title,
    .chat-title {
        font-size: 2.5vw;
    }
}
</style>