<template>
    <div class="w-full max-w-[70vw] mx-auto my-[4vh] px-4 box-border">
        <Card title="추천" :cards="recommendedCards" />
    </div>
    <div class="w-full max-w-[70vw] mx-auto my-[4vh] px-4 box-border">
        <Card title="인기" :cards="popularCards" />
    </div>
    <div class="w-full max-w-[70vw] mx-auto my-[4vh] px-4 box-border">
        <Card title="신규" :cards="newCards" />
    </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import Card from './Card.vue'
import cardData from '../assets/data/card.json'
import { useEventsStore } from '@/stores/useEventsStore';
const eventsStore = useEventsStore();

const props = defineProps({
    category: {
        type: String,
        default: '',
    },
});

const recommendedCards = ref([])
const popularCards = ref([])
const newCards = ref([])

const loadEvents = async () => {
    try {
        const response = await eventsStore.getMainEvents(props.category)

        if (response) {
            recommendedCards.value = response.recommend.content
            popularCards.value = response.popular.content
            newCards.value = response.new.content
        }
    } catch (error) {
        console.error('공연/전시 목록 불러오기 실패:', error)
    }
}

// 최초 1회 로딩
onMounted(loadEvents)
// category가 바뀔 때마다 다시 호출
watch(() => props.category, loadEvents)

</script>

<style scoped>
@media (max-width: 1200px) {
    .max-w-\[70vw\] {
        max-width: 95vw;
    }
}

@media (max-width: 768px) {
    .max-w-\[70vw\] {
        max-width: 90vw;
    }

    .my-\[4vh\] {
        margin-top: 3vh;
        margin-bottom: 3vh;
    }
}

@media (max-width: 480px) {
    .max-w-\[70vw\] {
        max-width: 85vw;
    }

    .my-\[4vh\] {
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
}
</style>