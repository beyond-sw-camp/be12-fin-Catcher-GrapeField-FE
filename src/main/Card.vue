<template>
  <div class="w-full max-w-[70vw] mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-zinc-900">{{ title }}</h2>
      <button v-if="showMoreButton" @click="goToShowMore" class="text-purple-800 font-bold">더보기</button>
    </div>

    <div class="flex items-center relative">
      <button class="nav" @click="prevPage" :disabled="currentPage === 0">
        &#10094;
      </button>

      <div class="flex gap-4 overflow-hidden flex-1">
        <div
          v-for="(card, index) in visibleCards"
          :key="card.id"
          class="bg-white rounded-xl shadow-md flex flex-col overflow-hidden transition-transform duration-300 h-[400px]"
          :class="cardWidth"
        >
          <div class="h-[60%] relative">
            <img :src="card.imageUrl" alt="이미지" class="w-full h-full object-cover" />
            <div v-if="card.badge" class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              {{ card.badge }}
            </div>
          </div>
          <div class="p-3 flex flex-col h-[40%]">
            <h3 class="text-base font-bold text-zinc-800 mb-2 truncate">{{ card.title }}</h3>
            <p class="text-sm text-zinc-500 truncate">{{ card.location }} | {{ card.date }}</p>
            <div class="mt-auto flex justify-between items-center">
              <button class="bg-purple-800 text-white text-sm px-3 py-1 rounded hover:bg-purple-900">더보기</button>
              <div class="flex gap-2 text-sm text-zinc-500">
                <span class="flex items-center gap-1"><img src="../assets/icons/empty-heart.png" class="w-4 h-4" /> {{ card.likes }}</span>
                <span class="flex items-center gap-1"><img src="../assets/icons/comment2.png" class="w-4 h-4" /> {{ card.comments }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="nav" @click="nextPage" :disabled="currentPage >= maxPage">
        &#10095;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String,
  cards: Array,
  showMoreButton: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
const currentPage = ref(0);
const windowWidth = ref(window.innerWidth);

const onResize = () => {
  windowWidth.value = window.innerWidth;
  if (currentPage.value > maxPage.value) {
    currentPage.value = maxPage.value;
  }
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

const itemsPerPage = computed(() => {
  if (windowWidth.value < 768) return 1;
  else if (windowWidth.value < 1024) return 2;
  else return 3;
});

const maxPage = computed(() => {
  return Math.ceil(props.cards.length / itemsPerPage.value) - 1;
});

const visibleCards = computed(() => {
  const start = currentPage.value * itemsPerPage.value;
  return props.cards.slice(start, start + itemsPerPage.value);
});

const cardWidth = computed(() => {
  if (windowWidth.value < 768) return 'w-full';
  else if (windowWidth.value < 1024) return 'w-1/2';
  else return 'w-1/3';
});

const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < maxPage.value) currentPage.value++;
};

const goToShowMore = () => {
  router.push('/events');
};
</script>

<style scoped>
.nav {
  background: white;
  border: none;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  color: #6b21a8;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
}

.nav:hover:not(:disabled) {
  background: #f3f4f6;
  transform: scale(1.1);
}

.nav:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}
</style>
