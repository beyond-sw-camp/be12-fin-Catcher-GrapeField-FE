<template>
    <div class="w-full h-screen flex justify-center items-center bg-white">

      <div class="w-[500px] h-[650px] bg-white flex flex-col justify-center items-center">
       
        <div class="text-center text-black text-6xl font-normal font-['ABeeZee']">
          인증 코드 확인
        </div>
  
        
        <div class="text-center text-stone-500 text-base font-normal font-['Helvetica'] mt-4">
          이메일로 6자리 인증 코드를 발송했습니다.
        </div>
        <div class="text-center text-stone-500 text-base font-normal font-['Helvetica'] mt-2">
          아래에 코드를 입력해주세요.
        </div>
  
        <!-- 이메일 -->
        <div class="w-96 h-12 mt-4 bg-neutral-50">
          <div class="text-center justify-start text-zinc-800 text-base font-normal font-['Helvetica']">
            user@example.com
          </div>
        </div>
  
        <!-- 인증 코드 입력 박스 -->
        <div class="flex justify-between w-96 mt-4">
          <input class="w-14 h-20 bg-neutral-50 border border-gray-300" type="text" maxlength="1" />
          <input class="w-14 h-20 bg-neutral-50 border border-gray-300" type="text" maxlength="1" />
          <input class="w-14 h-20 bg-neutral-50 border border-gray-300" type="text" maxlength="1" />
          <input class="w-14 h-20 bg-neutral-50 border border-gray-300" type="text" maxlength="1" />
          <input class="w-14 h-20 bg-neutral-50 border border-gray-300" type="text" maxlength="1" />
          <input class="w-14 h-20 bg-neutral-50 border border-gray-300" type="text" maxlength="1" />
        </div>
  
        <!-- 남은 시간 표시 -->
        <div class="text-center text-stone-500 text-base font-normal font-['Helvetica'] mt-4">
          남은 시간 05:00
        </div>
  

        <div class="w-96 h-14 bg-purple-700 mt-6 flex justify-center items-center">
          <div class="text-white text-base font-normal font-['Helvetica']">인증 확인</div>
        </div>
  
        <div class="text-center text-purple-700 text-base font-normal font-['Helvetica'] mt-4">
          <router-link to="/resend-verification">인증 코드 재발송</router-link>
        </div>

        <div class="text-center text-stone-500 text-sm font-normal font-['Helvetica'] mt-4">
          <div>• 이메일 주소를 다시 확인해주세요.</div>
          <div>• 스팸 메일함을 확인해주세요.</div>
          <div>• 인증 코드는 발송 후 5분 동안 유효합니다.</div>
        </div>
      </div>
  

      <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div class="size-4 opacity-90 bg-purple-700"></div>
        <div class="size-4 opacity-80 bg-purple-700"></div>
        <div class="size-4 opacity-90 bg-purple-700"></div>
        <div class="size-4 opacity-70 bg-purple-700"></div>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  </style>
  