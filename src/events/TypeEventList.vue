<template>
    <div>
        <h2 class="text-2xl font-bold mb-6">{{ title }} 예정 이벤트</h2>

        <div class="wrapper grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-10">
            <EventShowMoreCard v-for="event in events" :key="event.id" :id="event.id" :title="event.title"
                :venue="event.venue" :startDate="event.saleStart" :endDate="event.saleEnd" :posterUrl="BASE_IMAGE_URL + encodeURI(event.posterImgUrl)"
                :badge="event.badge" />
        </div>

        <InfiniteLoading :key="infiniteKey" @infinite="loadEvents">
            <template #complete>
                <div></div>
            </template>
        </InfiniteLoading>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import EventShowMoreCard from './EventShowMoreCard.vue'
import { useEventsStore } from '@/stores/useEventsStore'
import { useLoadingStore } from '@/stores/useLoadingStore'

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

const props = defineProps({
    type: {
        type: String,
        required: true
    }
})

const eventsStore = useEventsStore()
const loadingStore = useLoadingStore()

const events = ref([])
const infiniteKey = ref(0)

const slice = ref({
    page: 0,
    size: 30,
    hasNext: true
})

// 타입에 따른 제목
const title = computed(() => {
    return props.type === 'openings' ? '오픈' : '종료'
})

// 이벤트 로드 함수
const loadEvents = async ($state) => {
    try {
        loadingStore.startLoading()

        const response = await eventsStore.getMoreEventsTicketSchedule(
            props.type,
            slice.value.page,
            slice.value.size
        )

        const content = response?.content || []

        if (content.length === 0) {
            console.log('더 이상 불러올 데이터 없음.')
            $state.complete()
        } else {
            events.value.push(...content)
            $state.loaded()
            slice.value.page++
        }
    } catch (error) {
        console.error(`${title.value} 예정 이벤트 목록 불러오기 실패:`, error)
        $state.error()
    } finally {
        loadingStore.stopLoading()
    }
}

// type 값이 변경될 때 데이터 다시 로드
watch(() => props.type, (newType) => {
    slice.value.page = 0
    events.value = []
    infiniteKey.value++ // InfiniteLoading 리셋
})
</script>

<style scoped>
.wrapper {
    width: 100%;
    max-width: 70vw;
    margin: 0 auto;
}
</style>