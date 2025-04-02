<template>
  <div class="login-wrapper">
    <div class="side-block">
      <div class="dot-group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="side-label">culture</div>
    </div>

    <div class="login-box">
      <h2 class="title">로그인</h2>
      <div class="input-group">
        <label for="email">이메일</label>
        <input id="email" type="email" placeholder="이메일 주소를 입력하세요" v-model="email" />
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input id="password" type="password" placeholder="비밀번호를 입력하세요" v-model="password" />
      </div>
      <div class="checkbox-wrapper">
        <input type="checkbox" id="remember" v-model="remember" />
        <label for="remember">로그인 상태 유지</label>
      </div>
      <button class="login-btn" @click="login">로그인</button>

      <div class="divider-wrapper">
        <div class="divider-line"></div>
        <div class="divider-text">또는</div>
        <div class="divider-line"></div>
      </div>

      <!-- 소셜 로그인 버튼들 -->
      <button class="social-btn kakao"  @click="kakaoLogin">
        <span class="icon">💬</span>
        카카오 계정으로 로그인
      </button>

      <button class="social-btn naver"  @click="naverLogin">
        <span class="icon">N</span>
        네이버 계정으로 로그인
      </button>

      <button class="social-btn google"  @click="googleLogin">
        <span class="icon">G</span>
        구글 계정으로 로그인
      </button>

      <div class="bottom-links">
        <p>계정이 없으신가요? <router-link to="/signup">회원가입</router-link></p>
        <router-link to="/forgot-password">비밀번호를 잊으셨나요?</router-link>
      </div>
    </div>

    <div class="side-block">
      <div class="dot-group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="side-label">moments</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const email = ref('')
const password = ref('')
const remember = ref(false)

const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  const success = await userStore.login({ email: email.value, password: password.value })
  if (success) router.push('/')
  else alert('로그인 실패. 이메일이나 비밀번호를 확인해주세요.')
}

const kakaoLogin = () => {
  alert('카카오 로그인 준비 중입니다.')
}

const naverLogin = () => {
  alert('네이버 로그인 준비 중입니다.')
}

const googleLogin = () => {
  alert('구글 로그인 준비 중입니다.')
}

</script>

<style scoped>
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  height: 100vh;
  background-color: #fff;
}

.side-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
}

.dot-group {
  display: flex;
  gap: 0.375rem;
}

.dot {
  width: 0.625rem;
  height: 0.625rem;
  background-color: #8228d5;
  border-radius: 50%;
}

.side-label {
  font-size: 0.875rem;
  color: #333;
  font-weight: 400;
}

.login-box {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2.5rem 1.875rem;
  width: 21.25rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.875rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.375rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-group label {
  font-size: 0.8125rem;
  color: #333;
  margin-bottom: 0.25rem;
}

.input-group input {
  padding: 0.625rem;
  font-size: 0.875rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  gap: 0.375rem;
  margin-top: -0.375rem;
}

.login-btn {
  margin-top: 0.25rem;
  padding: 0.75rem;
  background-color: #6A11CB;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 0.9375rem;
  cursor: pointer;
}

.divider-wrapper {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  justify-content: center;
  font-size: 0.75rem;
  color: #888;
}

.divider-line {
  flex: 1;
  height: 0.0625rem;
  background-color: #eee;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  width: 100%;
}

.kakao {
  background-color: #ffeb00;
  color: #3c1e1e;
}

.naver {
  background-color: #03c75a;
  color: #ffffff;
}

.google {
  background-color: #ffffff;
  color: #3c4043;
  border: 1px solid #dadce0;
}

.icon {
  font-size: 1.1rem;
}

.bottom-links {
  margin-top: 0.625rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.bottom-links a {
  color: #8228d5;
  text-decoration: none;
  font-weight: 500;
}
</style>
