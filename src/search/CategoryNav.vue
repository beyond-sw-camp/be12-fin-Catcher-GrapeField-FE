<script setup>

</script>

<template>
  <section data-layer="<nav/>검색결과 카테고리 바" class="self-stretch h-28 relative">
    <div data-layer="Title"
         class="left-0 top-0 absolute justify-start text-neutral-800 text-2xl font-bold font-['Inter']">'햄릿' 검색 결과
    </div>
    <div data-layer="Frame 1321317464"
         class="w-100 h-14 left-0 top-[47px] absolute inline-flex justify-start items-start">
      <router-link to="/search" data-layer="통합검색"
                   class="border border-zinc-200 w-48 h-14 px-7 py-5 bg-white flex justify-center items-center gap-2.5">
        <div data-layer="통합검색" class="text-center justify-start text-violet-600 text-base font-bold font-['Inter']">
          통합검색
        </div>
      </router-link>
      <router-link to="/search/events" data-layer="공연/전시"
                   class="border border-zinc-200 w-48 h-14 px-7 py-5 bg-white flex justify-center items-center gap-2.5">
        <div data-layer="공연/전시"
             class="text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">공연/전시
        </div>
      </router-link>
      <router-link to="/search/post" data-layer="게시판"
                   class="border border-zinc-200 w-48 h-14 px-9 py-5 bg-white flex justify-center items-center gap-2.5">
        <div data-layer="게시판" class="text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">
          게시판
        </div>
      </router-link>
      <router-link to="/search/post" data-layer="한줄평"
                   class="border border-zinc-200 w-48 h-14 px-9 py-5 bg-white flex justify-center items-center gap-2.5">
        <div data-layer="한줄평" class="text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">
          한줄평
        </div>
      </router-link>
    </div>
  </section>
</template>

<style scoped>

</style>