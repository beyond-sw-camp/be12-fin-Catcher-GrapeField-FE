<template>
    <div class="w-full max-w-[70vw] mx-auto p-4 box-border">
        <h2 class="text-[2vw] font-bold text-zinc-800 mb-[1vw]">카테고리</h2>
        <div class="flex justify-between overflow-x-auto pb-[1vw] scrollbar-thin">
            <button v-for="category in categories" :key="category.id"
                class="min-w-[10vw] h-[6vw] flex-shrink-0 rounded-[0.5vw] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-sm"
                :class="selectedCategory === category.id ? 'bg-purple-800' : 'bg-white'"
                @click="selectCategory(category.id)">
                <div class="text-[1.2vw] font-bold mb-[0.5vw]"
                    :class="selectedCategory === category.id ? 'text-white' : 'text-zinc-600'">
                    {{ category.name }}
                </div>
                <div class="text-[0.8vw]" :class="selectedCategory === category.id ? 'text-white' : 'text-zinc-500'">
                    {{ category.count }}
                </div>
            </button>
        </div>
    </div>
</template>

<!-- Category.vue -->
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
});
const emit = defineEmits(['update:modelValue']);

const selectedCategory = ref(props.modelValue);

// 외부에서 변경됐을 경우 내부에도 반영
watch(() => props.modelValue, (newVal) => {
    selectedCategory.value = newVal;
});

//TODO: count부분 고쳐야함
const categories = ref([
    { id: "", name: "전체", count: "113개의 행사" },
    { id: "MUSICAL", name: "뮤지컬", count: "12개의 공연" },
    { id: "PLAY", name: "연극", count: "30개의 공연" },
    { id: "CONCERT", name: "콘서트", count: "30개의 공연" },
    { id: "EXHIBITION", name: "전시회", count: "30개의 전시회" },
    { id: "FAIR", name: "박람회", count: "11개의 박람회" }
]);

const selectCategory = (categoryId) => {
    selectedCategory.value = categoryId;
    emit('update:modelValue', categoryId); // v-model 반영
};
</script>


<style scoped>
/* 스크롤바 스타일링 - Tailwind에서 완전히 지원하지 않는 부분만 CSS로 유지 */
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
        height: 7vw;
    }

    .text-\[1\.2vw\] {
        font-size: 1.4vw;
    }

    .text-\[0\.8vw\] {
        font-size: 1vw;
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
        height: 8vw;
    }

    .text-\[1\.2vw\] {
        font-size: 2vw;
    }

    .text-\[0\.8vw\] {
        font-size: 1.2vw;
    }
}

@media (max-width: 480px) {
    h2.text-\[2vw\] {
        font-size: 7vw;
    }

    button.min-w-\[10vw\] {
        min-width: 25vw;
        height: 12vw;
    }

    .text-\[1\.2vw\] {
        font-size: 3vw;
    }

    .text-\[0\.8vw\] {
        font-size: 2vw;
    }
}
</style>