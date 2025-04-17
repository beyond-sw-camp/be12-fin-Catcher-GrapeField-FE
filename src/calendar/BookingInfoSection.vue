<template>
    <div v-if="selectedData" ref="bookingSection" class="mt-12 space-y-6 pb-20">
        <!-- 상단 제목/부제목 한 줄 정렬 -->
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
            <h2 class="text-xl font-bold text-zinc-800">
                {{ selectedData.date }} {{ isMyCalendar ? '예매 일정' : '예매 오픈 정보' }}
            </h2>
            <p class="text-base text-stone-500">
                {{ selectedData.items.length }}개의 {{ isMyCalendar ? '예매 일정이' : '공연/전시회가' }}
                {{ isMyCalendar ? '등록되어 있습니다' : '예매를 시작합니다' }}
            </p>
        </div>
        <!-- 예매 정보 카드 목록 -->
        <div v-for="(item, index) in selectedData.items" :key="index"
            :class="['rounded-xl p-6 flex items-center justify-between', bgColorMap[categoryTranslation[item.category]]]">
            <div class="flex items-center gap-4">
                <div
                    :class="['w-20 h-6 rounded-full text-white text-xs text-center flex items-center justify-center', badgeColorMap[categoryTranslation[item.category]]]">
                    {{ categoryTranslation[item.category] }}
                </div>
                <div>
                    <a :href="`/events/${ item.idx }`">
                        <div class="text-base font-bold text-zinc-800">{{ item.title }}</div>
                    </a>
                    <div class="text-sm text-stone-500">예매 시작: {{ item.time }}</div>
                    <div class="text-sm text-stone-500">예매처: {{ item.vendor }}</div>
                    <div class="text-sm" :class="linkColorMap[categoryTranslation[item.category]]">
                        <a :href="item.link" target="_blank">바로가기 &gt;</a>
                    </div>
                    <div class="text-sm text-stone-500">공연 기간: {{ item.period }}</div>
                    <div class="text-sm text-stone-500">장소: {{ item.location }}</div>
                </div>
            </div>
            <button
                :class="['w-24 h-7 rounded-full border text-sm', borderColorMap[categoryTranslation[item.category]], textColorMap[categoryTranslation[item.category]]]">
                알림 설정
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'

// props를 변수로 받아서 사용
const props = defineProps({
    selectedData: Object,
    isMyCalendar: {
        type: Boolean,
        default: false
    }
})

const bookingSection = ref(null)

// props.selectedData로 접근
watch(() => props.selectedData, (newVal) => {
    if (newVal && bookingSection.value) {
        console.log(bookingSection.value)
        // 부드럽게 스크롤
        bookingSection.value.scrollIntoView({ behavior: 'smooth' })
    }
}, { immediate: true }) // immediate 옵션 추가하면 초기 렌더링 시에도 확인함



const categoryTranslation = {
    'MUSICAL': '뮤지컬',
    'EXHIBITION': '전시',
    'PLAY': '연극',
    'CONCERT': '콘서트',
    'FAIR': '박람회'
};

const bgColorMap = {
    뮤지컬: 'bg-purple-100',
    전시: 'bg-green-100',
    연극: 'bg-orange-100',
    콘서트: 'bg-fuchsia-100',
    박람회: 'bg-amber-100',
}

const badgeColorMap = {
    뮤지컬: 'bg-purple-700',
    전시: 'bg-green-500',
    연극: 'bg-orange-500',
    콘서트: 'bg-fuchsia-700',
    박람회: 'bg-amber-500',
}

const textColorMap = {
    뮤지컬: 'text-purple-700',
    전시: 'text-green-500',
    연극: 'text-orange-500',
    콘서트: 'text-fuchsia-700',
    박람회: 'text-amber-500',
}

const borderColorMap = {
    뮤지컬: 'border-purple-700',
    전시: 'border-green-500',
    연극: 'border-orange-500',
    콘서트: 'border-fuchsia-700',
    박람회: 'border-amber-500',
}

const linkColorMap = {
    뮤지컬: 'text-purple-700',
    전시: 'text-green-500',
    연극: 'text-orange-500',
    콘서트: 'text-fuchsia-700',
    박람회: 'text-amber-500',
}
</script>