<script setup>
import { useSearchStore } from '@/stores/useSearchStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const props = defineProps({
    keyword: String
})

const searchStore = useSearchStore()
const router = useRouter()

const tabs = [
    { label: '통합 검색', path: '/search' },
    { label: '공연/전시', path: '/search/events' },
    { label: '게시판', path: '/search/post' },
    { label: '한줄평', path: '/search/review' }
]

onMounted(() => {
    if (!searchStore.selectedSearchTap) {
        searchStore.setTab('통합 검색')
    }
})

function goToTab(tab) {
    searchStore.setTab(tab.label)
    router.push({ path: tab.path, query: { keyword: props.keyword } })
}
</script>

<template>
    <section class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold text-neutral-800">
            {{ props.keyword }} 검색 결과
        </h2>

        <nav class="flex gap-2">
            <button v-for="tab in tabs" :key="tab.path" @click="goToTab(tab)"
                class="truncate w-40 h-14 px-7 py-4 flex items-center justify-center rounded text-base transition"
                :class="{
                    'text-violet-600 font-bold underline bg-white': searchStore.selectedSearchTap === tab.label,
                    'text-zinc-600 bg-white': searchStore.selectedSearchTap !== tab.label
                }">
                {{ tab.label }}
            </button>
        </nav>
    </section>
</template>