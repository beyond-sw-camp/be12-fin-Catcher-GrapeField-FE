<template>
  <div class="w-full max-w-[70vw] mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-zinc-900">{{ title }}</h2>
      <button v-if="showMoreButton" @click="goToShowMore" class="text-purple-800 font-bold">더보기</button>
    </div>

    <div class="relative px-12"> <!-- 좌우 버튼 공간 확보를 위해 패딩 추가 -->
      <button class="nav absolute left-0 top-1/2 -translate-y-1/2" @click="scroll('left')">&#10094;</button>
      
      <div ref="sliderRef" class="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2">
        <div
          v-for="(card, index) in cards"
          :key="card.idx"
          class="min-w-[240px] max-w-[240px] bg-white rounded-xl shadow-md flex-shrink-0 flex flex-col"
        >
          <!-- 포스터 비율 2:3 (가로:세로) 영역 설정 -->
          <router-link :to="`/events/${card.idx}`" class="w-full pt-[150%] relative rounded-t-xl overflow-hidden">
            <img 
              :src="card.posterImgUrl" 
              class="absolute top-0 left-0 w-full h-full object-cover" 
              alt="이벤트 포스터"
            />
          </router-link>
          <div class="p-3 flex-grow">
            <h3 class="font-semibold text-zinc-800 truncate">{{ card.title }}</h3>
            <p class="text-sm text-zinc-500 truncate">{{ card.location }}</p>
            <p class="text-sm text-zinc-500 truncate">{{ card.date }}</p>
          </div>
        </div>
      </div>
      
      <button class="nav absolute right-0 top-1/2 -translate-y-1/2" @click="scroll('right')">&#10095;</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: String,
  cards: Array,
  showMoreButton: { type: Boolean, default: true },
})

const router = useRouter()
const sliderRef = ref(null)

const scroll = (direction) => {
  const container = sliderRef.value
  const cardWidth = container.querySelector('div')?.offsetWidth || 240
  const scrollAmount = cardWidth + 16 // 카드 너비 + gap
  
  if (direction === 'left') {
    container.scrollLeft -= scrollAmount
  } else {
    container.scrollLeft += scrollAmount
  }
}

const goToShowMore = () => {
  router.push({ path: '/events', query: { sort: titleToSortKey(props.title) } })
}

const titleToSortKey = (title) => {
  switch (title) {
    case '추천':
      return 'recommend'
    case '인기':
      return 'popular'
    case '신규':
      return 'new'
    default:
      return 'recommend'
  }
}
</script>

<style scoped>
.nav {
  background-color: white;
  color: #6b21a8;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  border: none;
}

/* 스크롤바 숨기기 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>