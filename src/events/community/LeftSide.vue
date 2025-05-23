<template>
    <div class="mx-auto w-full max-w-3xl">
        <!-- 인기글/최신글 탭 -->
        <div class="w-full mb-6 border-b border-neutral-200">
            <div class="flex items-center py-2">
                <span class="text-2xl mr-4 cursor-pointer"
                    :class="{ 'font-bold text-purple-700': activeTab === 'popular', 'text-stone-500': activeTab !== 'popular' }"
                    @click="setActiveTab('popular')">인기글</span>
                <span class="text-2xl text-zinc-800 mx-2">|</span>
                <span class="text-2xl cursor-pointer"
                    :class="{ 'font-bold text-purple-700': activeTab === 'recent', 'text-stone-500': activeTab !== 'recent' }"
                    @click="setActiveTab('recent')">최신글</span>
            </div>
        </div>

        <!-- 카테고리 선택 드롭다운 -->
        <div class="relative mb-4">
            <div class="flex items-center justify-between">
                <div class="relative">
                    <div class="bg-violet-50 w-36 h-7 flex items-center justify-center rounded cursor-pointer"
                        @click="toggleCategory">
                        <span class="text-sm font-bold text-purple-700">{{ selectedCategoryLabel }}</span>
                        <div class="ml-2 w-5 h-5 bg-violet-50 flex items-center justify-center"
                            @click.stop="toggleCategory">
                            <img v-if="!showCategoryMenu" src="@/assets/icons/down.png" alt="down">
                            <img v-else src="@/assets/icons/up.png" alt="up">
                        </div>
                    </div>
                    <div v-if="showCategoryMenu" class="absolute top-full left-0 w-36 bg-white shadow-md z-10">
                        <div class="p-2 cursor-pointer hover:bg-violet-50" v-for="(category, index) in categories"
                            :key="index" @click="selectCategory(category)">
                            {{ category.label }}
                        </div>
                    </div>
                </div>
                <div class="text-xs text-zinc-800">{{ currentDate }}</div>
            </div>
        </div>

        <!-- 게시글 목록 -->
        <div class="w-full">
            <!-- 인기글 목록 -->
            <div v-if="activeTab === 'popular'" class="w-full">
                <div v-for="(post, index) in filteredPosts" :key="post.id"
                    class="w-full h-24 border border-zinc-100 mb-2 flex cursor-pointer transition-colors hover:bg-violet-50"
                    @click="goToPost(post.eventIdx, post.idx)">

                    <!-- 숫자 박스 -->
                    <div class="w-16 h-16 bg-violet-50 m-2 flex items-center justify-center" v-if="index >= 0">
                        <span class="text-2xl font-bold text-purple-700">{{ index + 1 }}</span>
                    </div>
                    <div class="w-16 h-16 bg-violet-50 m-2" v-else></div>

                    <!-- 게시글 내용 -->
                    <div class="flex-1 p-2 flex flex-col justify-between min-w-0">
                        <div>
                            <h3 class="text-base font-bold text-zinc-800 mb-1 line-clamp-1">{{ post.title }}</h3>
                            <p class="text-sm text-stone-500 line-clamp-1">{{ post.content }}</p>
                        </div>
                        <div class="flex justify-between items-center w-full">
                            <span class="text-xs text-neutral-400">{{ post.eventTitle }} • {{ formatDate(post.createdAt)
                                }}</span>
                            <span class="text-sm text-purple-700">조회 {{ post.viewCnt }}</span>
                        </div>
                    </div>
                </div>

                <!-- 데이터가 없을 경우 표시할 빈 상태 -->
                <div v-if="filteredPosts.length === 0" class="w-full py-10 text-center text-gray-500">
                    해당 카테고리의 게시글이 없습니다.
                </div>
            </div>

            <!-- 최신글 목록 (순위 없이 동일한 폭) -->
            <div v-if="activeTab === 'recent'" class="w-full">
                <div v-for="post in filteredPosts" :key="post.id"
                    class="w-full h-24 border border-zinc-100 mb-2 cursor-pointer transition-colors hover:bg-violet-50"
                    @click="goToPost(post.eventIdx, post.idx)">
                    <!-- 게시글 내용 (왼쪽 패딩 없이 시작) -->
                    <div class="p-4 flex flex-col justify-between h-full">
                        <div>
                            <h3 class="text-base font-bold text-zinc-800 mb-1 line-clamp-1">{{ post.title }}</h3>
                            <p class="text-sm text-stone-500 line-clamp-1">{{ post.content }}</p>
                        </div>
                        <div class="flex justify-between items-center w-full">
                            <span class="text-xs text-neutral-400">{{ post.eventTitle }} • {{ formatDate(post.createdAt)
                                }}</span>
                            <span class="text-sm text-purple-700">조회 {{ post.viewCnt }}</span>
                        </div>
                    </div>
                </div>

                <!-- 데이터가 없을 경우 표시할 빈 상태 -->
                <div v-if="filteredPosts.length === 0" class="w-full py-10 text-center text-gray-500">
                    해당 카테고리의 게시글이 없습니다.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/useEventsStore';
import axios from 'axios';

const eventsStore = useEventsStore()
const router = useRouter()

// 활성 탭 상태 (인기글/최신글)
const activeTab = ref('popular');

// 카테고리 관련 상태
const categories = [
    { value: 'ALL', label: '전체' },
    { value: 'MUSICAL', label: '뮤지컬' },
    { value: 'PLAY', label: '연극' },
    { value: 'CONCERT', label: '콘서트' },
    { value: 'EXHIBITION', label: '전시회' },
    { value: 'CLASSIC', label: '클래식' }
];

const selectedCategory = ref('ALL'); // 값을 'ALL'로 변경
const selectedCategoryLabel = ref('전체'); // 이 변수 추가
const showCategoryMenu = ref(false);

// JSON 데이터 로드
const posts = ref([]);

// 현재 날짜
const currentDate = ref(new Date().toLocaleString());

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

function goToPost(eventIdx, postIdx) {
    eventsStore.setTab('게시판')
    router.push(`/events/${eventIdx}/post/${postIdx}`)
}
// 로드 함수 분리
const loadPosts = async () => {
    try {
        const res = await axios.get('/api/post/list', {
            params: {
                orderBy: activeTab.value,
                category: selectedCategory.value
            }
        });
        posts.value = res.data.instances;
    } catch (e) {
        console.error('게시글 로딩 실패:', e);
    }
};

// 탭 변경 함수
const setActiveTab = (tab) => {
    activeTab.value = tab;
    loadPosts();
};

// 카테고리 토글 함수
const toggleCategory = () => {
    showCategoryMenu.value = !showCategoryMenu.value;
};

// 카테고리 선택 함수
const selectCategory = (category) => {
    selectedCategory.value = category.value;
    selectedCategoryLabel.value = category.label;
    showCategoryMenu.value = false;
    loadPosts(); // 카테고리 변경 시 데이터 다시 로드
};

const filteredPosts = computed(() => {
    let result = posts.value || [];

    // 카테고리 필터링 (전체가 아닌 경우)

    if (selectedCategory.value !== 'ALL') {
        result = result.filter(post => post.category === selectedCategory.value);
    }

    return result.slice(0, 10); // 최대 5개 게시글만 표시
});

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
    await loadPosts();

    // 문서 클릭 시 카테고리 메뉴 닫기
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.relative')) {
            showCategoryMenu.value = false;
        }
    });
});
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
