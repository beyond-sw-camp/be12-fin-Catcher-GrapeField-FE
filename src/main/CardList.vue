<template>
  <div class="w-[95%] max-w-[70vw] mx-auto my-[2vh] p-[2vh_2vw] font-['Inter']">
    <div class="flex justify-between items-center mb-[2vh]">
      <h1 class="text-[2.7vmin] font-bold text-zinc-900">{{ title }} 예정</h1>
      <div class="text-[2vmin] text-purple-700 cursor-pointer">더보기</div>
    </div>

    <div class="flex flex-wrap gap-y-[2vh] gap-x-[2vw]">
      <div
        v-for="(event, i) in events.recommendedCards"
        :key="i"
        class="relative flex w-[48%] h-[17vh] bg-white border border-zinc-200 rounded-md overflow-hidden mb-[2vh]"
      >
        <div class="w-[30%] h-full flex items-start pt-[1.5vh] pl-[1vw] relative">
          <img v-if="event.imageUrl" :src="event.imageUrl" class="absolute top-0 left-0 w-full h-full object-cover" alt="" />
          <div class="bg-black/50 px-[0.6vw] py-[0.3vh] rounded z-10">
            <span class="text-white text-[1.3vmin]">{{ event.badge }}</span>
          </div>
        </div>
        <div class="w-[75%] p-[1.5vh_1.5vw] flex flex-col">
          <h2 class="text-[1.9vmin] font-bold text-zinc-900 mb-[0.8vh]">{{ event.title }}</h2>
          <div class="text-[1.8vmin] text-stone-500 mb-[0.6vh]">
            {{ event.date }} <br />| {{ event.location }}
          </div>
          <!-- <div class="text-[1.8vmin] text-red-600 mb-[0.6vh]">{{ title }}까지 {{ daysLeft }}일 남음</div> -->
          <button
            class="absolute bottom-[1.5vh] right-[1.5vw] bg-purple-700 text-white border-none px-[1vw] py-[0.6vh] rounded text-[1.8vmin] cursor-pointer"
          >
            더보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import cards from '../assets/data/card.json';

const props = defineProps({
  title: {
    type: String,
    default: '종료 예정',
  },
  index: {
    type: [Number, String],
    default: 1,
  },
});

const events = ref(cards);
</script>
