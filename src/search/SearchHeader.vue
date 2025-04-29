<script setup>
import { useSearchStore } from '@/stores/useSearchStore'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'

const route = useRoute()

const keyword = computed(() => route.query.keyword || searchStore.keyword)

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
    if (keyword.value) {
        searchStore.setKeyword(keyword.value)
    }
})

function goToTab(tab) {
    searchStore.setTab(tab.label)
    router.push({ path: tab.path, query: { keyword: keyword.value } })
}
</script>

<template>
    <section class="flex flex-col gap-4 bg-gray-50 px-6 py-5 rounded-xl border border-violet-100 shadow-sm">
        <!-- 제목 -->
        <h2 class="text-2xl font-bold text-neutral-800 flex items-center gap-2">
            <span class="w-2 h-6 bg-violet-500 inline-block rounded-sm"></span>
            <span>
                <span class="text-purple-600">“{{ keyword }}”</span> 검색 결과
            </span>
        </h2>

        <!-- 탭 버튼 -->
        <nav class="flex gap-3 mt-2">
            <button v-for="tab in tabs" :key="tab.path" @click="goToTab(tab)"
                class="truncate w-40 h-12 px-6 py-2 text-sm rounded-full border transition font-medium" :class="{
                    'bg-violet-100 text-violet-700 border-violet-300 font-semibold shadow-sm': searchStore.selectedSearchTap === tab.label,
                    'bg-white text-gray-500 border-zinc-300 hover:bg-zinc-50': searchStore.selectedSearchTap !== tab.label
                }">
                {{ tab.label }}
            </button>
        </nav>
    </section>
</template>