<script setup>
import { ref, reactive, computed } from 'vue';

const category = ref({
  type:'all'
});

const selectCategory = (type) =>{
  category.value.type = type;
}

const faqList = [
  {
    question: '[공지] 환불 정책 안내내',
    answer: '환불 정책은 마이페이지 > 예매내역에서 확인 가능합니다.',
  },
  {
    question: '[점검] 2025-04-03 점검 예정 안내',
    answer: '저희 사이트는 예매처가 아니므로 티켓을 예매했던 사이트를 확인해주세요.',
  },
  {
    question: '[이벤트] 채팅 기능 오픈 기념 이벤트 안내',
    answer: '이용안내 페이지를 참고해주세요.',
  },
]

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="w-[1320px] mt-2">
    <div class="w-[1320px] h-12 bg-stone-50 flex items-center">
      <div class="flex items-center gap-4 text-zinc-800 text-base font-bold font-['Inter'] pl-5">
        <button class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
        :class="category.type==='all' ? 'outline-2' : 'outline-1'"
        @click="selectCategory('all')">전체</button>
        <button class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
        :class="category.type==='user' ? 'outline-2' : 'outline-1'"
        @click="selectCategory('user')">공지</button>
        <button class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
        :class="category.type==='service' ? 'outline-2' : 'outline-1'"
        @click="selectCategory('service')">점검</button>
        <button class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
        :class="category.type==='event' ? 'outline-2' : 'outline-1'"
        @click="selectCategory('event')">이벤트</button>
      </div>
    </div>
    <div>
      <div class="space-y-2 mt-2 text-sm text-gray-700 font-normal leading-relaxed">
        <div
          v-for="(item, index) in faqList"
          :key="index"
          class="border rounded-lg overflow-hidden"
        >
          <button
            class="w-full text-left px-4 py-3 bg-white hover:bg-gray-100 flex justify-between items-center"
            @click="toggle(index)"
          >
            <span>{{ item.question }}</span>
            <span>
              <span v-if="openIndex === index">➖</span>
              <span v-else>➕</span>
            </span>
          </button>
          <div
            v-if="openIndex === index"
            class="bg-violet-50 text-gray-700 px-4 py-3 transition-all"
          >
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>