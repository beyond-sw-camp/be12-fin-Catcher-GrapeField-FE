<script setup>
import { ref, onMounted, watch } from 'vue';
import TopBanner from './TopBanner.vue';
import PopularPost from './PopularPost.vue';
import PopularChatRoom from './PopularChatRoom.vue';
import Category from './Category.vue';
import Card from './CardTemplate.vue';
import Calendar from './Calendar.vue';
import CardList from './CardList.vue';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { useEventsStore } from '@/stores/useEventsStore';

const loadingStore = useLoadingStore();
const eventsStore = useEventsStore();

// 공통 카테고리 상태 정의
const selectedCategory = ref('ALL');

// 이벤트 데이터 상태 정의
const openEvents = ref([]);
const closeEvents = ref([]);

// 티켓 오픈/종료 예정 이벤트 데이터 로드 함수
const loadTicketEventsData = async (category = 'ALL') => {
    try {
        loadingStore.startLoading();

        const response = await eventsStore.getMainEventsTicketSchedule();
        if (response) {
            openEvents.value = response.openings.content || [];
            closeEvents.value = response.closures?.content || [];
        }
    } catch (error) {
        console.error('티켓 이벤트 데이터 로드 실패:', error);
    } finally {
        loadingStore.stopLoading();
    }
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
    await loadTicketEventsData(selectedCategory.value);
});

// 카테고리 변경 시 모든 데이터 다시 로드
const handleCategoryChange = async (newCategory) => {
    selectedCategory.value = newCategory;
    await loadTicketEventsData(newCategory);
};

// selectedCategory가 변경될 때마다 데이터 다시 로드
watch(() => selectedCategory.value, async (newCategory) => {
    await loadTicketEventsData(newCategory);
});
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
        
        <!-- v-model로 카테고리 양방향 바인딩 -->
        <Category v-model="selectedCategory" />
        
        <!-- 선택된 카테고리 전달 -->
        <Card :category="selectedCategory" />
        
        <Calendar />
        
        <!-- 데이터와 카테고리를 props로 직접 전달 -->
        <CardList title="오픈" index="1" :events="openEvents" :category="selectedCategory" />
        <CardList title="종료" index="6" :events="closeEvents" :category="selectedCategory" />
    </div>
</template>