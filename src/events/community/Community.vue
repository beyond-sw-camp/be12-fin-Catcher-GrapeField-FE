<script setup>
import RightSide from './RightSide.vue';
import LeftSide from './LeftSide.vue';
import CardList from '../../main/CardList.vue';
</script>
<template>
    <div class="w-full">
        <!-- 중앙 정렬된 콘텐츠 영역 -->
        <div class="max-w-[1200px] mx-auto flex flex-col lg:flex-row min-h-screen">

            <!-- 왼쪽 콘텐츠 영역 -->
            <div class="w-full lg:w-[75%] p-4">
                <!-- 예: 인기글 목록 등 -->
                <LeftSide/> <MainContent />
            </div>

            <!-- 오른쪽 사이드바 -->
            <aside class="w-full lg:w-[25%] min-w-[280px] p-4">
                <RightSide />
            </aside>
        </div>
    </div>
    <CardList title="추천 게시판" />
</template>


<style scoped></style>