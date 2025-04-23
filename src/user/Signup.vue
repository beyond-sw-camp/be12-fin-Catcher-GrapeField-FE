<template>
  <div class="signup-wrapper">
    <div class="side-block">
      <div class="dot"></div>
      <div class="side-label">discover</div>
    </div>

    <div class="signup-box">
      <div class="flex flex-col gap-6">
        <!-- 첫 줄: 이미지 + 이름/전화번호 -->
        <div class="flex gap-6 items-start">
          <!-- 프로필 이미지 업로드 + preview + 제거 버튼 -->
<div class="w-24 h-36 bg-gray-100 rounded-md overflow-hidden relative flex items-center justify-center">
  <label v-if="!form.profileImg" class="cursor-pointer w-full h-full flex items-center justify-center">
    <input type="file" class="hidden" @change="onProfileImageChange" accept="image/*" />
    <span class="text-gray-400 text-sm">이미지 선택</span>
  </label>

  <!-- preview 상태 -->
  <div v-else class="relative w-full h-full">
    <img
      :src="previewUrl"
      alt="프로필 이미지"
      class="object-cover w-full h-full"
    />
    <!-- ❌ 제거 버튼 -->
    <button
      @click="removeProfileImage"
      type="button"
      class="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full w-5 h-5 text-xs text-gray-700 hover:text-red-500"
    >
      ×
    </button>
  </div>
</div>


          <!-- 이름 + 전화번호 입력 -->
          <div class="flex flex-col gap-4 flex-1">
            <div class="input-group">
              <label for="name">이름</label>
              <input id="name" type="text" placeholder="이름을 입력하세요" v-model="form.username"
                class="border border-gray-300 rounded px-3 py-2" />
            </div>
            <div class="input-group">
              <label for="phone">전화번호</label>
              <input id="phone" type="tel" placeholder="전화번호를 입력하세요" v-model="form.phone"
                class="border border-gray-300 rounded px-3 py-2" />
            </div>
          </div>
        </div>

        <!--이메일, 비밀번호, 비밀번호 확인-->
        <div class="input-group">
            <label for="email">이메일</label>
            <input id="email" type="email" placeholder="이메일 주소를 입력하세요" v-model="form.email"
              class="border border-gray-300 rounded px-3 py-2 w-full" />
          </div>
          <div class="input-group">
            <label for="password">비밀번호</label>
            <input id="password" type="password" placeholder="비밀번호 (8자 이상)" v-model="form.password"
              class="border border-gray-300 rounded px-3 py-2 w-full" />
          </div>
        <!-- 셋째 줄: 비밀번호 확인 -->
        <div class="input-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input id="confirmPassword" type="password" placeholder="비밀번호를 다시 입력해주세요" v-model="form.confirmPassword"
            class="border border-gray-300 rounded px-3 py-2 w-full" />
          <p v-if="isPasswordMismatch" class="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다</p>
        </div>
      </div>

      <!-- 관심 분야 -->
      <div class="section">
        <label class="section-label">관심 분야 (선택)</label>
        <div class="events_interest-grid truncate">
          <button v-for="item in interests" :key="item"
            :class="['events_interest-btn', { selected: selectedInterests.includes(item) }]"
            @click="toggleInterest(item)">
            {{ item }}
          </button>
        </div>
      </div>

      <!-- 약관 동의 -->
      <div class="section">
        <label class="section-label">약관 동의</label>
        <div class="checkbox-group">
          <div>
            <input type="checkbox" id="allAgree" v-model="agreeAll" @change="toggleAllAgreements" />
            <label for="allAgree">전체 동의</label>
          </div>
          <div v-for="(agree, key) in agreements" :key="key">
            <input type="checkbox" :id="key" v-model="agreements[key]" />
            <label :for="key">{{ agreementLabels[key] }}</label>
          </div>
        </div>
      </div>

      <!-- 회원가입 버튼 -->
      <button class="submit-btn" @click="signup()">회원가입</button>

      <!-- 로그인 링크 -->
      <router-link to="/login" class="login-link">
        이미 계정이 있으신가요? 로그인
      </router-link>
    </div>

    <div class="side-block">
      <div class="dot-group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="side-label">culture</div>
    </div>
  </div>
</template>


<script setup>
import { useUserStore } from "../stores/useUserStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';

const router = useRouter();
const userStore = useUserStore();

const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  profileImg: null,
});

const fields = [
  {
    id: "name",
    label: "이름",
    type: "text",
    placeholder: "이름을 입력하세요",
    model: "name",
  },
  {
    id: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일 주소를 입력하세요",
    model: "email",
  },
  {
    id: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요 (8자 이상)",
    model: "password",
  },
  {
    id: "confirmPassword",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 다시 입력해주세요",
    model: "confirmPassword",
  },
  {
    id: "phone",
    label: "전화번호",
    type: "tel",
    placeholder: "전화번호를 입력해주세요",
    model: "phone",
  },
];

// 실시간 비밀번호 불일치 여부 확인
const isPasswordMismatch = computed(() => {
  return form.value.confirmPassword.length > 0 &&
    form.value.password !== form.value.confirmPassword
})

const previewUrl = ref('')
const onProfileImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.profileImg = file

    const reader = new FileReader()
    reader.onload = (event) => {
      previewUrl.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeProfileImage = () => {
  form.value.profileImg = null
  previewUrl.value = ''
}
const interests = ["뮤지컬", "연극", "콘서트", "전시회", "클래식"];
const selectedInterests = ref([]);

const toggleInterest = (item) => {
  if (selectedInterests.value.includes(item)) {
    selectedInterests.value = selectedInterests.value.filter((i) => i !== item);
  } else {
    selectedInterests.value.push(item);
  }
};

const agreeAll = ref(false);
const agreements = ref({
  service: false,
  privacy: false,
  marketing: false,
});
const agreementLabels = {
  service: "서비스 이용약관 동의 (필수)",
  privacy: "개인정보 처리방침 동의 (필수)",
  marketing: "마케팅 정보 수신 동의 (선택)",
};

const toggleAllAgreements = () => {
  Object.keys(agreements.value).forEach((key) => {
    agreements.value[key] = agreeAll.value;
  });
};

const signup = async () => {
  const { email, password, username } = form.value;
  if (!email || !password || !username) {
    toast("이름, 이메일, 비밀번호는 필수입니다.", {
            "theme": "auto",
            "type": "error",
            "autoClose": 1500,
            "hideProgressBar": true,
            "position": "bottom-center",
            "dangerouslyHTMLString": true
        })
    return;
  }
  if (isPasswordMismatch.value) {
    toast("비밀번호가 일치하지 않습니다.", {
            "theme": "auto",
            "type": "error",
            "autoClose": 1500,
            "hideProgressBar": true,
            "position": "bottom-center",
            "dangerouslyHTMLString": true
        })
    return;
  }
  const result = await userStore.signup(form.value);
  console.log(result);
  if (result == true) {
    router.push('/email_verify');
  } else {
    toast("이미 가입한 이메일입니다.", {
            "theme": "auto",
            "type": "error",
            "autoClose": 1500,
            "hideProgressBar": true,
            "position": "bottom-center",
            "dangerouslyHTMLString": true
        })
    return;
  }
};

</script>

<style scoped>
.signup-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  background-color: #fff;
  min-height: 100vh;
  padding-top: 40px;
  box-sizing: border-box;
}

.side-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
}

.dot,
.dot-group .dot {
  width: 0.625rem;
  height: 0.625rem;
  background-color: #8228d5;
  border-radius: 50%;
}

.dot-group {
  display: flex;
  gap: 0.375rem;
}

.side-label {
  font-size: 0.875rem;
  color: #333;
  font-weight: 400;
}

.signup-box {
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 0.5rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.input-group label {
  font-size: 0.8125rem;
  color: #333;
}

.input-group input {
  padding: 0.625rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.section-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.events_interest-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 한 줄에 5개 */
  gap: 0.5rem;
}

.events_interest-btn {
  padding: 0.5rem 0.75rem;
  background-color: #fafafa;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
}

.events_interest-btn.selected {
  background-color: #8228d5;
  color: white;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.submit-btn {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #8228d5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
}

.login-link {
  font-size: 0.75rem;
  color: #8228d5;
  text-align: center;
  margin-top: 0.5rem;
  text-decoration: none;
}

.email-row {
  display: flex;
  gap: 0.5rem;
}

.email-row input {
  flex: 1;
  padding: 0.625rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.verify-btn {
  white-space: nowrap;
  padding: 0.625rem 1rem;
  background-color: #8228d5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
}

.verify-btn:hover {
  background-color: #6f1ab6;
}
</style>
