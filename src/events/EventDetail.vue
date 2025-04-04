<template>
    <div class="text-gray-800 text-sm space-y-10 max-w-[1320px] mx-auto">
      <!-- 예매 정보 -->
      <section>
        <h2 class="text-lg font-bold mb-3">예매 정보</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="bg-red-50 p-4 rounded-md flex-1">
            <p class="font-semibold">선예매</p>
            <p>{{ event.bookingEarly }}</p>
            <div class="mt-1">
              <span class="inline-block bg-red-400 text-white px-2 py-0.5 rounded text-xs">선예매중</span>
            </div>
          </div>
          <div class="bg-green-50 p-4 rounded-md flex-1">
            <p class="font-semibold">일반예매</p>
            <p>{{ event.bookingNormal }}</p>
            <div class="mt-1 flex flex-wrap gap-1">
              <span class="bg-red-400 text-white px-2 py-0.5 rounded text-xs">선예매</span>
              <span class="bg-blue-400 text-white px-2 py-0.5 rounded text-xs">예스24</span>
              <span class="bg-green-400 text-white px-2 py-0.5 rounded text-xs">티켓링크</span>
            </div>
          </div>
        </div>
        <hr class="mt-6 border-gray-300" />
      </section>
  
      <!-- 출연진 -->
      <section>
        <h2 class="text-lg font-bold mb-3">출연진</h2>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="member in event.cast"
            :key="member.name"
            class="bg-gray-100 px-4 py-2 rounded-md"
          >
            <p class="font-semibold">{{ member.name }}</p>
            <p class="text-sm text-gray-600">{{ member.role }}</p>
          </div>
        </div>
        <hr class="mt-6 border-gray-300" />
      </section>
  
      <!-- 공연 소개 -->
      <section>
        <h2 class="text-lg font-bold mb-3">공연 소개</h2>
        <p class="leading-relaxed whitespace-pre-line">
          {{ event.description }}
          <br /><br />
          {{ event.venue }}에서 진행되는 이번 공연은 중학생 이상 관람 가능한 작품으로,<br />
          소비자와 자신의 역할을 잇는 배우들의 무대입니다.<br />
          특유의 복식, 공정성, 정정당당 등 실력파 배우들의 열연이 이번 작품의 큰 highlight입니다.<br />
          {{ event.duration }} 동안 펼쳐지는 감동의 무대, &lt;{{ event.title }}&gt;과 함께하세요.
        </p>
        <hr class="mt-6 border-gray-300" />
      </section>
  
      <!-- 관람 안내 -->
      <section>
        <h2 class="text-lg font-bold mb-3">관람 안내</h2>
        <ul class="list-disc list-inside text-gray-700">
          <li v-for="(rule, index) in event.guidelines" :key="index">
            {{ rule }}
          </li>
        </ul>
        <hr class="mt-6 border-gray-300" />
      </section>
  
      <!-- 상세 이미지 -->
      <section>
        <h2 class="text-lg font-bold mb-3">상세 정보 (예매 사이트 이미지)</h2>
        <div class="border rounded-lg bg-gray-50 flex items-center justify-center h-64">
          <img
            v-if="event.detailImage"
            :src="event.detailImage"
            alt="상세 이미지"
            class="object-contain max-h-full"
          />
          <p v-else class="text-sm text-gray-400">이 영역에 예매 사이트에서 가져온 상세 정보 이미지가 배치됩니다</p>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  defineProps({
    event: Object
  })
  </script>
  