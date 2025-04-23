<template>
    <div class="w-full max-w-[70vw] mx-auto p-4 box-border">
        <h2 class="text-[2vw] font-bold text-zinc-800 mb-[1vw]">카테고리</h2>
        <div class="flex justify-between overflow-x-auto pb-[1vw] scrollbar-thin">
            <button v-for="category in categories" :key="category.id"
                class="min-w-[10vw] h-[8vw] flex-shrink-0 rounded-[0.8vw] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-md border relative overflow-hidden"
                :class="selectedCategory === category.id ? 'border-purple-600' : 'border-gray-200 hover:border-purple-300'"
                @click="selectCategory(category.id)">

                <!-- 상단 장식 요소 (아이콘 영역) -->
                <div class="absolute top-0 left-0 w-full h-[35%] flex items-center justify-center"
                    :class="selectedCategory === category.id ? 'bg-purple-600' : 'bg-purple-200'">
                    <div class="text-[1.8vw]"
                        :class="selectedCategory === category.id ? 'text-white' : 'text-purple-600'">
                        {{ category.emoji }}
                    </div>
                </div>

                <!-- 텍스트 영역 (흰색 배경 유지) -->
                <div class="absolute top-[35%] left-0 w-full h-[65%] bg-white flex items-center justify-center">
                    <div class="text-[1.2vw] font-bold"
                        :class="selectedCategory === category.id ? 'text-purple-800' : 'text-zinc-700'">
                        {{ category.name }}
                    </div>
                </div>

                <!-- 선택 표시 (밑줄) -->
                <div v-if="selectedCategory === category.id"
                    class="absolute bottom-[0.5vw] w-[60%] h-[0.2vw] bg-purple-600 rounded-full"></div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: 'ALL'
    }
});
const emit = defineEmits(['update:modelValue']);

const selectedCategory = ref(props.modelValue);

// 외부에서 변경됐을 경우 내부에도 반영
watch(() => props.modelValue, (newVal) => {
    selectedCategory.value = newVal;
});

// 카테고리에 이모지 추가
const categories = ref([
    { id: "ALL", name: "전체", emoji: "🔍" },
    { id: "MUSICAL", name: "뮤지컬", emoji: "🎭" },
    { id: "PLAY", name: "연극", emoji: "🎬" },
    { id: "CONCERT", name: "콘서트", emoji: "🎤" },
    { id: "EXHIBITION", name: "전시회", emoji: "🖼️" },
    { id: "CLASSIC", name: "클래식", emoji: "🎻" }
]);

const selectCategory = (categoryId) => {
    selectedCategory.value = categoryId;
    emit('update:modelValue', categoryId); // v-model 반영
};
</script>

<style scoped>
/* 스크롤바 스타일링 (기존과 동일) */
.scrollbar-thin::-webkit-scrollbar {
    height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
}

/* 반응형 스타일 */
@media (max-width: 1200px) {
    button.min-w-\[10vw\] {
        min-width: 10vw;
        height: 9vw;
    }

    .text-\[1\.2vw\] {
        font-size: 1.4vw;
    }

    .text-\[1\.8vw\] {
        font-size: 2vw;
    }
}

@media (max-width: 768px) {
    div.max-w-\[70vw\] {
        max-width: 90vw;
    }

    h2.text-\[2vw\] {
        font-size: 3vw;
    }

    button.min-w-\[10vw\] {
        min-width: 15vw;
        height: 10vw;
    }

    .text-\[1\.2vw\] {
        font-size: 2vw;
    }

    .text-\[1\.8vw\] {
        font-size: 2.8vw;
    }
}

@media (max-width: 480px) {
    h2.text-\[2vw\] {
        font-size: 7vw;
    }

    button.min-w-\[10vw\] {
        min-width: 25vw;
        height: 15vw;
    }

    .text-\[1\.2vw\] {
        font-size: 3vw;
    }

    .text-\[1\.8vw\] {
        font-size: 4.5vw;
    }
}
</style>