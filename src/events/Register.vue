<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

const route = useRoute()
const userStore = useUserStore()

// 사용자 역할
const role =userStore.role;
const genres = ['콘서트', '뮤지컬', '연극', '전시회', '박람회',]
</script>

<template>
    <div class="max-w-[1320px] mx-auto px-8 py-10">
        <!-- 제목 영역 -->
        <h1 v-if="role === 'user'" class="text-2xl font-bold text-white bg-violet-700 py-4 px-6 rounded">공연/전시
            신청
        </h1>
        <h1 v-else-if="role === 'admin'" class="text-2xl font-bold text-white bg-violet-700 py-4 px-6 rounded">
            공연/전시 등록</h1>
        <p v-if="role === 'user'" class="mt-4 text-sm text-gray-600">
            GrapeField에 공연 또는 전시회를 등록하고 싶으신가요? 아래 양식을 작성해 주시면 검토 후 등록해 드립니다. <br />
            <span class="text-red-500">* </span>표시는 필수 입력 항목입니다.
        </p>

        <!-- 기본 정보 -->
        <section class="mt-6 border-t pt-6">
            <h2 class="font-semibold text-gray-700 mb-4">기본 정보</h2>
            <div class="flex gap-4 mb-4">
                <select class="border rounded px-3 py-2 w-1/6" required>
                    <option disabled selected>장르 선택</option>
                    <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
                </select>
                <input class="border rounded px-3 py-2 flex-1" placeholder="공연/전시 제목" required />
            </div>
            <div class="flex gap-4 w-full">
                <input class="border rounded px-3 py-2 w-[20%]" placeholder="주최자/기관명" />
                <input class="border rounded px-3 py-2 w-[20%]" placeholder="담당자명" />
                <input class="border rounded px-3 py-2 w-[30%]" placeholder="연락처 (예: 000-0000-0000)" />
                <input class="border rounded px-3 py-2 w-[30%]" placeholder="이메일" />
            </div>
        </section>

        <section class="mt-6 border-t pt-6">
            <h2 class="font-semibold text-gray-700 mb-4">장소 및 일정</h2>

            <!-- 첫 줄: 장소명, 주소, 주소 검색 버튼 -->
            <div class="flex gap-4 mb-4">
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-600 mb-1">장소명</label>
                    <input type="text" class="w-full border rounded px-3 py-2" placeholder="공연/전시가 열리는 장소" />
                </div>
                <div class="flex-[2]">
                    <label class="block text-sm font-medium text-gray-600 mb-1">주소</label>
                    <div class="flex gap-2">
                        <input type="text" class="w-full border rounded px-3 py-2" placeholder="주소를 입력하세요" />
                        <button class="bg-violet-700 whitespace-nowrap text-white px-4 py-2 rounded">주소 검색</button>
                    </div>
                </div>
            </div>

            <!-- 두 번째 줄: 시작일, 종료일, 관람 시간 -->
            <div class="flex gap-4">
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-600 mb-1">시작일 *</label>
                    <input type="date" class="w-full border rounded px-3 py-2" />
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-600 mb-1">종료일 *</label>
                    <input type="date" class="w-full border rounded px-3 py-2" />
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-600 mb-1">관람 시간</label>
                    <input type="text" class="w-full border rounded px-3 py-2"
                        placeholder="시간이 아닌 분으로 표기해주세요. 예) 120분" />
                </div>
            </div>
        </section>


        <!-- 상세 정보 -->
        <section class="mt-6 border-t pt-6">
            <h2 class="font-semibold text-gray-700 mb-4">상세 정보</h2>

            <!-- 공연/전시 설명 -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">공연/전시 설명 *</label>
                <textarea class="w-full border rounded px-3 py-2" rows="4"
                    placeholder="공연/전시에 대한 상세 설명을 입력해 주세요."></textarea>
            </div>

            <!-- 예매 정보 -->
            <div class="flex flex-wrap items-center gap-4 mb-4">
                <div class="flex items-center">
                    <input type="checkbox" id="bookable" class="mr-2" />
                    <label for="bookable" class="text-sm font-medium text-gray-700">선예매</label>
                </div>
                <input class="border rounded px-3 py-2 w-40" placeholder="예) R석" />
                <div class="flex items-center gap-1">
                    <input class="border rounded px-3 py-2 w-40" placeholder="예) 150,000" />
                    <span class="text-gray-500 text-sm">원</span>
                </div>
                <div class="flex items-center gap-2 flex-1">
                    <input class="border rounded px-3 py-2 w-full" placeholder="http://" />
                    <button class="w-10 h-10 rounded border text-violet-700 text-lg">+</button>
                </div>
            </div>

            <!-- 포스터 이미지 -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">포스터 이미지 *</label>
                <div class="flex gap-4">
                    <input type="file" class="flex-1 border rounded px-3 py-2 text-sm" />
                    <button class="bg-violet-700 text-white px-4 py-2 rounded">찾아보기</button>
                </div>
                <p class="text-xs text-gray-500 mt-1">파일을 선택하세요 (최대 5MB, JPG/PNG 형식)</p>
            </div>

            <!-- 개인정보 동의 -->
            <div class="flex items-center mt-4 text-sm">
                <input type="checkbox" id="agree" class="mr-2" />
                <label for="agree" class="text-gray-700">
                    개인정보 수집 및 이용에 동의합니다. *
                    <a href="#" class="text-violet-600 underline ml-2">[약관 보기]</a>
                </label>
            </div>
        </section>

        <!-- 신청 버튼 -->
        <div class="text-center mt-10">
            <button v-if="role === 'user'"
                class="bg-violet-700 text-white px-10 py-3 rounded-full text-lg font-semibold">
                신청하기
            </button>
            <button v-else-if="role === 'admin'"
                class="bg-violet-700 text-white px-10 py-3 rounded-full text-lg font-semibold">
                등록하기
            </button>
        </div>

    </div>
</template>

<style scoped></style>