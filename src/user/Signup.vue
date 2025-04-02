<template>
    <div class="signup-wrapper">
      <div class="side-block">
        <div class="dot"></div>
        <div class="side-label">discover</div>
      </div>

      <div class="signup-box">
        <h2 class="title">회원가입</h2>

        <div class="input-group" v-for="(field, index) in fields" :key="index">
          <label :for="field.id">{{ field.label }}</label>
          <input
            :id="field.id"
            :type="field.type"
            :placeholder="field.placeholder"
            v-model="form[field.model]"
          />
        </div>

        <div class="section">
          <label class="section-label">관심 분야 (선택)</label>
          <div class="events_interest-grid">
            <button
              v-for="item in interests"
              :key="item"
              :class="['events_interest-btn', { selected: selectedInterests.includes(item) }]"
              @click="toggleInterest(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>

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

        <button class="submit-btn">회원가입</button>
        <router-link to="/login" class="login-link">이미 계정이 있으신가요? 로그인</router-link>
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
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})

const fields = [
  { id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력하세요', model: 'name' },
  { id: 'email', label: '이메일', type: 'email', placeholder: '이메일 주소를 입력하세요', model: 'email' },
  { id: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력하세요 (8자 이상)', model: 'password' },
  { id: 'confirmPassword', label: '비밀번호 확인', type: 'password', placeholder: '비밀번호를 다시 입력해주세요', model: 'confirmPassword' },
  { id: 'phone', label: '전화번호', type: 'tel', placeholder: '전화번호를 입력해주세요', model: 'phone' }
]

const interests = ['뮤지컬', '연극', '콘서트', '전시회', '박람회']
const selectedInterests = ref([])
const toggleInterest = (item) => {
  if (selectedInterests.value.includes(item)) {
    selectedInterests.value = selectedInterests.value.filter(i => i !== item)
  } else {
    selectedInterests.value.push(item)
  }
}

const agreeAll = ref(false)
const agreements = ref({
  service: false,
  privacy: false,
  marketing: false
})
const agreementLabels = {
  service: '서비스 이용약관 동의 (필수)',
  privacy: '개인정보 처리방침 동의 (필수)',
  marketing: '마케팅 정보 수신 동의 (선택)'
}

const toggleAllAgreements = () => {
  Object.keys(agreements.value).forEach(key => {
    agreements.value[key] = agreeAll.value
  })
}
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
  width: 24rem;
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
  grid-template-columns: repeat(5, 1fr); /* 한 줄에 5개 */
  gap: 0.5rem;
}

.events_interest-btn {
  padding: 0.5rem 0.75rem;
  background-color: #FAFAFA;
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
</style>
