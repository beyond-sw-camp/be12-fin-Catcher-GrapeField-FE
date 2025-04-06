<script setup>
</script>

<template>
    <div class="w-full max-w-2xl mx-auto p-6 text-sm font-['Inter'] space-y-8">
      <!-- 제목 -->
      <div>
        <h2 class="text-xl font-bold mb-1">계정 정보</h2>
        <p class="text-gray-500 text-sm">회원님의 계정 정보를 확인하고 수정할 수 있습니다.</p>
      </div>
  
      <!-- 기본 정보 -->
      <div class="space-y-4">
        <h3 class="text-base font-semibold">기본 정보</h3>
  
        <div>
          <label class="block mb-1 font-medium">이름</label>
          <input type="text" class="w-full border rounded px-3 py-2" value="김포도" />
        </div>
  
        <div>
          <label class="block mb-1 font-medium">이메일 주소 (아이디)</label>
          <input type="email" class="w-full border rounded px-3 py-2" value="example@grapefield.co.kr" />
        </div>
  
        <div>
          <label class="block mb-1 font-medium">휴대폰 번호</label>
          <div class="flex gap-2">
            <input type="tel" class="flex-1 border rounded px-3 py-2" value="010-1234-5678" />
            <button class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">인증하기</button>
          </div>
        </div>
      </div>
  
      <!-- 비밀번호 변경 -->
      <div class="space-y-4 pt-4 border-t">
        <h3 class="text-base font-semibold">비밀번호 변경</h3>
  
        <div>
          <label class="block mb-1 font-medium">현재 비밀번호</label>
          <input type="password" class="w-full border rounded px-3 py-2" placeholder="현재 비밀번호를 입력하세요" />
        </div>
  
        <div>
          <label class="block mb-1 font-medium">새 비밀번호</label>
          <input type="password" class="w-full border rounded px-3 py-2" placeholder="새 비밀번호를 입력하세요" />
        </div>
  
        <div>
          <label class="block mb-1 font-medium">새 비밀번호 확인</label>
          <input type="password" class="w-full border rounded px-3 py-2" placeholder="새 비밀번호를 다시 입력하세요" />
        </div>
      </div>
  
      <!-- 저장 버튼 -->
      <div class="pt-6">
        <button class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold">
          변경사항 저장
        </button>
      </div>
    </div>
  </template>

<style scoped>
</style>