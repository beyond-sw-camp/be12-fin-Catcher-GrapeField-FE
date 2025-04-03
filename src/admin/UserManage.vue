<script setup>
import { ref } from 'vue'

const page = ref(1)

const users = [
    {
        nickname: 'grapeuser1',
        email: 'grape1@test.com',
        signupType: '이메일',
        role: '일반회원',
        signupDate: '2025-04-01'
    },
    {
        nickname: 'adminuser',
        email: 'admin@grape.com',
        signupType: '소셜 로그인',
        role: '관리자',
        signupDate: '2025-03-20'
    },
    {
        nickname: 'user3',
        email: 'user3@grape.com',
        signupType: '이메일',
        role: '일반회원',
        signupDate: '2025-02-15'
    }
]
</script>

<template>
    <div class="w-full p-6">
        <!-- 헤더 -->
        <h2 class="text-xl font-bold text-violet-700 mb-4">사용자 관리</h2>

        <!-- 필터 영역 -->
        <div class="flex items-center gap-4 mb-4 justify-between">
            <div class="flex gap-4">
                <select class="border px-3 py-2 text-sm rounded">
                    <option>가입경로</option>
                    <option>이메일</option>
                    <option>소셜 로그인</option>
                </select>
                <select class="border px-3 py-2 text-sm rounded">
                    <option>회원등급</option>
                    <option>일반회원</option>
                    <option>관리자</option>
                </select>
                <input type="text" placeholder="닉네임 또는 이메일 검색" class="border px-3 py-2 text-sm rounded w-64" />
            </div>
            <div class="flex gap-2">
                <button class="bg-violet-700 text-white px-4 py-2 text-sm rounded">검색</button>
                <button class="border bg-violet-700 text-white px-4 py-2 text-sm rounded">권한 변경</button>
                <button class="border bg-gray-200 px-4 py-2 text-sm rounded">이용 정지</button>
            </div>
        </div>

        <!-- 테이블 -->
        <table class="w-full border text-sm">
            <thead class="bg-gray-100 text-gray-600">
                <tr>
                    <th class="p-2 text-center"><input type="checkbox" /></th>
                    <th class="p-2 text-center">닉네임</th>
                    <th class="p-2 text-center">이메일</th>
                    <th class="p-2 text-center">가입경로</th>
                    <th class="p-2 text-center">회원등급</th>
                    <th class="p-2 text-center">가입일</th>
                    <th class="p-2 text-center">관리</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index" class="border-t text-center">
                    <td class="p-2"><input type="checkbox" /></td>
                    <td class="p-2">{{ user.nickname }}</td>
                    <td class="p-2">{{ user.email }}</td>
                    <td class="p-2">{{ user.signupType }}</td>
                    <td class="p-2">{{ user.role }}</td>
                    <td class="p-2">{{ user.signupDate }}</td>
                    <td class="p-2 space-x-2">
                        <!-- <button class="bg-violet-700 text-white text-xs px-2 py-1 rounded">정지</button> -->
                        <button class="bg-gray-200 text-xs px-2 py-1 rounded">상세 확인</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 페이징 -->
        <div class="flex justify-center mt-6 space-x-2">
            <button v-for="n in 3" :key="n" class="w-8 h-8 border rounded text-sm"
                :class="page === n ? 'bg-violet-700 text-white' : 'bg-white text-gray-700'" @click="page = n">
                {{ n }}
            </button>
        </div>
    </div>
</template>
<style scoped></style>
