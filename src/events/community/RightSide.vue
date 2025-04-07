<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/useUserStore'
const router = useRouter()
const userStore = useUserStore()

// 사용자 역할
const role =userStore.role;


const notices = ref([
    { title: '[안내] 해외회원 가입개선 안내', isNew: true, link: '#' },
    { title: '[안내] 3/31 안전거래 기능 종료', isNew: false, link: '#' },
    { title: '[안내] 텀페이크 범죄 주의와 신고방법', isNew: false, link: '#' },
    { title: '[안내] 보험사기방지 특별법 안내', isNew: false, link: '#' },
    { title: '[안내] 우리 카페 홍보 신청 방법(New)', isNew: false, link: '#' },
])

const goToCustomerCenter = (value) => {
    if (value === 'qna') {
        router.push({ path: '/customercenter', query: { type: 'qna' } });
    } else if (value === 'faq') {
        router.push({ path: '/customercenter', query: { type: 'faq' } });
    } else if (value === 'request') {
        if(!role){
            alert("로그인을 해주세요.")
            return
        }else{
            router.push({ path: '/events/request' });
        }
    }
};
</script>
<template>
    <div class="space-y-6">
      <!-- 공지 -->
      <section class="border rounded-xl overflow-hidden">
        <div class="bg-purple-100 flex justify-between items-center px-4 py-2">
          <h2 class="text-sm font-bold text-gray-800">공지</h2>
          <a href="#" class="text-xs text-purple-600 hover:underline">더보기</a>
        </div>
        <ul class="px-4 py-2 space-y-2 text-sm text-gray-800">
          <li
            v-for="(notice, index) in notices"
            :key="index"
          >
            <a
              :href="notice.link"
              class="inline-block w-full break-words whitespace-normal"
            >
              {{ notice.title }}
              <span
                v-if="notice.isNew"
                class="ml-1 text-[10px] text-red-500 font-bold"
              >NEW</span>
            </a>
          </li>
        </ul>
      </section>
  
      <!-- 고객센터 -->
      <section class="border rounded-xl overflow-hidden">
        <div class="bg-purple-100 px-4 py-2">
          <h2 class="text-sm font-bold text-gray-800">고객센터</h2>
        </div>
        <div class="flex flex-col px-4 py-3 space-y-2">
          <button class="w-full border rounded-lg py-2 text-sm hover:bg-gray-50"
                  @click="goToCustomerCenter('faq')">FAQ</button>
          <button class="w-full border rounded-lg py-2 text-sm hover:bg-gray-50"
                  @click="goToCustomerCenter('qna')">QnA</button>
          <button class="w-full border rounded-lg py-2 text-sm hover:bg-gray-50"
                  @click="goToCustomerCenter('request')">공연/전시 신청</button>
        </div>
      </section>
    </div>
  </template>

<style scoped></style>