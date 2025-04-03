<template>
  <div class="w-[1440px] h-[1215px] relative">
    <div
      class="w-[1440px] h-[1200px] left-0 top-[17px] absolute bg-white"
    ></div>
    <div class="w-[1440px] h-20 left-0 top-[9px] absolute bg-white"></div>
    <div
      class="w-[500px] h-[650px] left-[470px] top-[195px] absolute bg-white"
    ></div>
    <div
      class="left-[638.50px] top-[237px] absolute text-center justify-start text-black text-3xl font-normal font-['Helvetica']"
    >
      비밀번호 찾기
    </div>
    <div
      class="w-96 h-0 left-[520px] top-[295px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-zinc-100"
    ></div>
    <div
      class="left-[583px] top-[330px] absolute text-center justify-start text-stone-500 text-base font-normal font-['Helvetica']"
    >
      가입 시 등록한 이메일 주소를 입력해주세요.
    </div>
    <div
      class="left-[601px] top-[360px] absolute text-center justify-start text-stone-500 text-base font-normal font-['Helvetica']"
    >
      비밀번호 재설정 링크를 보내드립니다.
    </div>
    <div
      class="left-[520px] top-[429px] absolute justify-start text-stone-500 text-base font-normal font-['Helvetica']"
    >
      이메일
    </div>

    <!-- 이메일 입력 필드 -->
    <div class="w-96 h-14 left-[520px] top-[465px] absolute bg-neutral-50">
      <input
        v-model="email"
        type="email"
        placeholder="이메일 주소를 입력하세요"
        class="w-full h-full p-3 text-base border border-gray-300 rounded-md"
      />
    </div>

    <!-- 비밀번호 재설정 링크 받기 버튼 -->
    <div class="w-96 h-14 left-[520px] top-[555px] absolute bg-purple-700">
      <button
        @click="sendResetLink"
        class="w-full h-full text-white text-base font-normal font-['Helvetica'] rounded-md"
      >
        비밀번호 재설정 링크 받기
      </button>
    </div>

    <div
      class="left-[667px] top-[648px] absolute text-center justify-start text-white text-xs font-normal font-['Aclonica']"
    >
      1
    </div>
    <div
      class="w-9 h-0 left-[685px] top-[655px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-zinc-300"
    ></div>
    <div class="size-7 left-[720px] top-[640px] absolute bg-zinc-100"></div>
    <div
      class="left-[731px] top-[648px] absolute text-center justify-start text-neutral-400 text-xs font-normal font-['Aclonica']"
    >
      2
    </div>
    <div
      class="w-9 h-0 left-[750px] top-[655px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-zinc-300"
    ></div>
    <div class="size-7 left-[785px] top-[640px] absolute bg-zinc-100"></div>
    <div
      class="left-[796px] top-[648px] absolute text-center justify-start text-neutral-400 text-xs font-normal font-['Aclonica']"
    >
      3
    </div>
    <div
      class="left-[640.50px] top-[673px] absolute text-center justify-start text-zinc-800 text-xs font-normal font-['Helvetica']"
    >
      이메일 입력
    </div>
    <div
      class="left-[723.50px] top-[673px] absolute text-center justify-start text-neutral-400 text-xs font-normal font-['Helvetica']"
    >
      인증
    </div>
    <div
      class="left-[783px] top-[673px] absolute text-center justify-start text-neutral-400 text-xs font-normal font-['Helvetica']"
    >
      재설정
    </div>
    <router-link
      to="/login"
      class="left-[639.50px] top-[720px] absolute text-center justify-start text-purple-700 text-base font-normal font-['Helvetica']"
    >
      로그인 화면으로 돌아가기
    </router-link>

    <div
      class="left-[650px] top-[760px] absolute justify-start text-stone-500 text-base font-normal font-['Helvetica']"
    >
      계정이 없으신가요?
    </div>

    <router-link
      to="/signup"
      class="left-[790px] top-[760px] absolute justify-start text-purple-700 text-base font-normal font-['Helvetica']"
    >
      회원가입
    </router-link>
    <div class="left-[320px] top-[390px] absolute justify-start text-black text-3xl font-normal font-['Helvetica']">reset</div>
  <div class="size-4 left-[1112px] top-[607px] absolute opacity-80 bg-purple-700"></div>
  <div class="size-4 left-[1142px] top-[592px] absolute opacity-90 bg-purple-700"></div>
  <div class="size-4 left-[1127px] top-[627px] absolute opacity-70 bg-purple-700"></div>
  <div class="size-4 left-[1157px] top-[612px] absolute opacity-90 bg-purple-700"></div>
  <div class="left-[1220px] top-[590px] absolute justify-start text-black text-3xl font-normal font-['Helvetica']">access</div>
  <div class="w-[1440px] h-24 left-0 top-[1115px] absolute bg-neutral-50"></div> 
  <div class="w-[500px] h-44 left-[470px] top-[865px] absolute bg-neutral-50"></div>
  <div class="left-[520px] top-[889px] absolute justify-start text-black text-base font-normal font-['Helvetica']">비밀번호가 기억나지 않으신가요?</div>
  <div class="w-96 h-0 left-[520px] top-[925px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-zinc-100"></div>
  <div class="left-[520px] top-[941px] absolute justify-start text-stone-500 text-sm font-normal font-['Helvetica']">• 이메일로 전송된 링크는 30분 동안 유효합니다.</div>
  <div class="left-[520px] top-[971px] absolute justify-start text-stone-500 text-sm font-normal font-['Helvetica']">• 이메일을 받지 못하셨다면 스팸함을 확인해주세요.</div>
  <div class="left-[520px] top-[1001px] absolute justify-start text-stone-500 text-sm font-normal font-['Helvetica']">• 계속해서 문제가 발생한다면 고객센터로 문의해주세요.</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref(""); // 이메일 바인딩

const sendResetLink = () => {
  alert(`비밀번호 재설정 링크가 ${email.value}로 전송되었습니다.`);
};
</script>

<style scoped></style>
