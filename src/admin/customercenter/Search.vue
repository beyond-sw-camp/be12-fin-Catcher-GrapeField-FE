<script setup>
import { ref } from 'vue'
const keyword = ref('')

const SearchItems = (text) => {
    console.log('검색어:', text)
}
</script>

<template>
    <div class="mt-2 px-10 flex items-center">
    <input type="text" v-model="keyword" placeholder="검색어를 입력하세요."
           class="bg-zinc-100 w-[90%] h-12 px-4 rounded-3xl border border-zinc-300"/>
    <button class="ml-4 w-10 h-10" @click="SearchItems(keyword)">
      <div class="search-icon ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </button>
    </div>
</template>

<style scoped>
.search-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7B42C3;
  border-radius: 50%;
}

.search-icon svg {
  width: 50%;
  height: 50%;
  stroke: #ffffff; /* 흰색 아이콘 */
}

</style>