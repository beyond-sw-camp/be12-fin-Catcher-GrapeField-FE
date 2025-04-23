<template>
  <div class="w-[95%] max-w-[70vw] mx-auto my-[2vh] p-[2vh_2vw] font-['Inter']">
    <div class="flex justify-between items-center mb-[2vh]">
      <h1 class="text-[2.7vmin] font-bold text-zinc-900">{{ title }} 예정</h1>
      <div class="text-[2vmin] text-purple-700 cursor-pointer" @click="goToMore">더보기</div>
    </div>

    <div class="flex flex-wrap gap-y-[2vh] gap-x-[2vw]">
      <div v-for="(event, i) in events" :key="i"
        class="relative flex w-[48%] h-[17vh] bg-white border border-zinc-200 rounded-md overflow-hidden mb-[2vh]">
        <div class="w-[30%] h-fu ll flex items-start pt-[1.5vh] pl-[1vw] relative">
          <router-link :to="`/events/${event.idx}`">
            <img v-if="event.posterImgUrl" :src="BASE_IMAGE_URL + event.posterImgUrl"
              class="absolute top-0 left-0 w-full h-full object-cover" alt="" />
            <div v-else class="absolute top-0 left-0 w-full h-full bg-gray-200"></div>
          </router-link>
        </div>
        <div class="w-[75%] p-[1.5vh_1.5vw] flex flex-col">
          <h2 class="text-[1.9vmin] font-bold text-zinc-900 mb-[0.8vh]">{{ event.title }}</h2>
          <div v-if="type.includes('openings')" class="text-[1.8vmin] text-stone-500 mb-[0.6vh]">
            오픈일: {{ formatDate(event.saleStart) }} <br /><br />| {{ event.venue }}
          </div>
          <div v-else-if="type.includes('closures')" class="text-[1.8vmin] text-stone-500 mb-[0.6vh]">
            종료일 : {{ formatDate(event.saleEnd) }} <br /><br />| {{ event.venue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

const router = useRouter();

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
};

// props 정의 - events 배열을 추가로 받음
const props = defineProps({
  title: {
    type: String,
    default: '종료',
  },
  index: {
    type: [Number, String],
    default: 1,
  },
  events: {
    type: Array,
    default: () => [],
  }
});

// title에 따라 type 값을 매핑
const type = computed(() => props.title.includes('오픈') ? 'openings' : 'closures');
console.log('heyyyy!!! '+type.value)  

// 더보기 클릭 시 라우팅
const goToMore = () => {
  router.push({ path: '/events', query: { type: type.value } });
};
</script>