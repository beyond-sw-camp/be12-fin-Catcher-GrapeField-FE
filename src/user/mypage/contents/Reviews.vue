<script setup>
import { ref, watch } from 'vue'

const reviews = ref([
    {
        id: 1,
        events: '[연극]햄릿',
        posterUrl: '/sample/images/poster1.jpg',
        rating: 5,
        comment: '햄릿의 독백 장면이 압권이었습니다. 배우의 감정 표현이 정말 섬세했어요!',
        date: '2025.04.18',
        selected: false
    },
    {
        id: 2,
        events: '[뮤지컬]별이',
        posterUrl: '/sample/images/poster2.jpg',
        rating: 4,
        comment: '배우 연기가 인상 깊었어요!',
        date: '2025.04.18',
        selected: false
    }
    // 추가 데이터...
])

const selectAll = ref(false)

function toggleAll() {
    reviews.value.forEach(r => (r.selected = selectAll.value))
}

watch(reviews, () => {
    selectAll.value = reviews.value.every(r => r.selected)
}, { deep: true })

function deleteSelected() {
    reviews.value = reviews.value.filter(r => !r.selected)
}
</script>

<template>
    <div class="w-full p-6 font-['Inter']">
        <h2 class="text-2xl font-bold mb-6">한줄평 ({{ reviews.length }})</h2>

        <!-- 리뷰 리스트 -->
        <div class="space-y-4">
            <div v-for="review in reviews" :key="review.id"
                class="flex flex-col md:flex-row bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4">
                <!-- 좌측: 체크박스 + 포스터 묶음 -->
                <div class="flex items-center gap-4 w-28">
                    <!-- 체크박스: 고정 높이 박스 안에서 중앙 정렬 -->
                    <div class="flex justify-center items-center w-6 h-28">
                        <input type="checkbox" v-model="review.selected" class="w-4 h-4" />
                    </div>

                    <!-- 포스터: 같은 높이로 통일 -->
                    <div
                        class="w-20 h-28 overflow-hidden rounded-md border border-gray-300 flex justify-center items-center shrink-0">
                        <img :src="review.posterUrl" alt="poster" class="w-full h-full object-cover" />
                    </div>
                </div>

                <!-- 우측: 텍스트 정보 -->
                <div class="flex-1 px-3">
                    <h3 class="font-semibold text-base text-violet-700 mb-1">
                        {{ review.events }}
                    </h3>

                    <div class="text-yellow-400 text-sm mb-1">
                        <span v-for="n in review.rating" :key="n">★</span>
                        <span v-for="n in 5 - review.rating" :key="'empty' + n" class="text-gray-300">★</span>
                    </div>

                    <p class="text-sm text-gray-700 mb-2">{{ review.comment }}</p>
                    <span class="text-sm text-gray-500">{{ review.date }}</span>
                </div>
            </div>
        </div>

        <!-- 하단 선택/삭제 -->
        <div class="flex justify-between items-center mt-6">
            <div>
                <input type="checkbox" v-model="selectAll" @change="toggleAll" class="mr-2" />
                <label class="text-sm">전체 선택</label>
            </div>
            <button @click="deleteSelected"
                class="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 text-sm">
                선택한 한줄평 삭제
            </button>
        </div>
    </div>
</template>


<style scoped></style>