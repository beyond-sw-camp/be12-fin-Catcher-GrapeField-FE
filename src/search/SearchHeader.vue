<script setup>
const props = defineProps({
    keyword:String
})
</script>

<template>
    <section class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold text-neutral-800"> {{ props.keyword }} 검색 결과</h2>
        <nav class="flex gap-2">
            <router-link to="/search"
                class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-zinc-600 flex items-center justify-center rounded">
                통합검색
            </router-link>
            <router-link to="/search/events"
                class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-violet-600 font-bold underline flex items-center justify-center rounded">
                공연/전시
            </router-link>
            <router-link to="/search/post"
                class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-zinc-600 flex items-center justify-center rounded">
                게시판
            </router-link>
            <router-link to="/search/review"
                class="truncate w-40 h-14 px-7 py-4 bg-white text-base text-zinc-600 flex items-center justify-center rounded">
                한줄평
            </router-link>
        </nav>
    </section>
</template>

<style scoped></style>