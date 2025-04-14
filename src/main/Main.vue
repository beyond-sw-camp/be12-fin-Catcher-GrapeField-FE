<script setup>
import { ref, onMounted } from 'vue';
import TopBanner from './TopBanner.vue';
import PopularPost from './PopularPost.vue';
import PopularChatRoom from './PopularChatRoom.vue';
import Category from './Category.vue';
import Card from './CardTemplate.vue';
import Calendar from './Calendar.vue';
import CardList from './CardList.vue';
import axios from 'axios';
import { useLoadingStore } from '@/stores/useLoadingStore';

const loadingStore = useLoadingStore();

// 이벤트 데이터 상태 정의
const openEvents = ref([]);
const closeEvents = ref([]);

// 티켓 오픈/종료 예정 이벤트 데이터 로드 함수
const loadEventsData = async () => {
    try {
        loadingStore.startLoading();

        const response = await axios.get("/api/events/ticket/main", {
            params: { category: 'ALL', page: 0, size: 6 }
        });

        if (response.data) {
            openEvents.value = response.data.openings?.content || [];
            closeEvents.value = response.data.closures?.content || [];
        }
    } catch (error) {
        console.error('이벤트 데이터 로드 실패:', error);
    } finally {
        loadingStore.stopLoading();
    }
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(loadEventsData);
</script>

<template>
    <TopBanner />
    <div>
        <div class="content-row flex flex-col lg:flex-row w-full max-w-[1200px] mx-auto gap-y-4 lg:gap-x-8">
            <div class="w-full lg:w-3/5 h-full">
                <PopularPost />
            </div>
            <div class="w-full lg:w-2/5 h-full">
                <PopularChatRoom />
            </div>
        </div>
        <Category />
        <Card />
        <Calendar />
        <!-- 데이터를 props로 직접 전달 -->
        <CardList title="오픈" index="1" :events="openEvents" />
        <CardList title="종료" index="6" :events="closeEvents" />
    </div>
</template>