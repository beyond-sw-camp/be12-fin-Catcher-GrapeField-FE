<script setup>
import { ref } from 'vue'
const keyword = ref('')

const SearchItems = (text) => {
    console.log('검색어:', text)
}
</script>

<template>
    <div class="mt-2 px-10 flex">
    <input type="text" v-model="keyword" placeholder="검색어를 입력하세요." class="bg-zinc-100 w-full h-12 px-4 rounded-3xl border border-zinc-300"
/>
    <button class="ml-4" @click="SearchItems(keyword)">⚔️</button>
    </div>
</template>