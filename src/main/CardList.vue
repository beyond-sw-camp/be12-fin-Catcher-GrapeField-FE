<template>
  <div class="w-[95%] max-w-[70vw] mx-auto my-[2vh] p-[2vh_2vw] font-['Inter']">
    <div class="flex justify-between items-center mb-[2vh]">
      <h1 class="text-[2.7vmin] font-bold text-zinc-900">{{ title }} 예정</h1>
      <div class="text-[2vmin] text-purple-700 cursor-pointer" @click="goToMore">더보기</div>
    </div>

    <div class="flex flex-wrap gap-y-[2vh] gap-x-[2vw]">
      <div
        v-for="(event, i) in events"
        :key="i"
        class="relative flex w-[48%] h-[17vh] bg-white border border-zinc-200 rounded-md overflow-hidden mb-[2vh]"
      >
        <div class="w-[30%] h-full flex items-start pt-[1.5vh] pl-[1vw] relative">
          <router-link :to="`/events/${event.id}`">
            <img v-if="event.imageUrl" :src="event.imageUrl" class="absolute top-0 left-0 w-full h-full object-cover" alt="" />
            <div v-else class="absolute top-0 left-0 w-full h-full bg-gray-200"></div>
          </router-link>
          <div class="bg-black/50 px-[0.6vw] py-[0.3vh] rounded z-10">
            <span class="text-white text-[1.3vmin]">{{ event.badge }}</span>
          </div>
        </div>
        <div class="w-[75%] p-[1.5vh_1.5vw] flex flex-col">
          <h2 class="text-[1.9vmin] font-bold text-zinc-900 mb-[0.8vh]">{{ event.title }}</h2>
          <div class="text-[1.8vmin] text-stone-500 mb-[0.6vh]">
            {{ event.date }} <br />| {{ event.location }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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

// 더보기 클릭 시 라우팅
const goToMore = () => {
  router.push({ path: '/events', query: { type: type.value } });
};
</script>