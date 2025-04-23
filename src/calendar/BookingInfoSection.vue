<template>
    <div v-if="selectedData" ref="bookingSection" class="mt-12 space-y-6 pb-20">
        <!-- 상단 제목/부제목 한 줄 정렬 -->
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
            <h2 class="text-xl font-bold text-zinc-800">
                {{ selectedData.date }} {{ isMyCalendar ? '일정' : '예매 오픈 정보' }}
            </h2>
            <p class="text-base text-stone-500">
                {{ selectedData.items.length }}개의 {{ isMyCalendar ? '일정이' : '공연/전시회가' }}
                {{ isMyCalendar ? '있습니다' : '예매를 시작합니다' }}
            </p>
        </div>
        <!-- 예매 정보 카드 목록 -->
        <div v-for="(item, index) in selectedData.items" :key="index" :class="[
            'rounded-xl p-6 flex items-center justify-between',
            bgColorMap[categoryTranslation[item.category]] ?? 'bg-gray-100'
        ]">
            <div class="flex items-center gap-4">
                <div :class="[
                    'w-20 h-6 rounded-full text-white text-xs text-center flex items-center justify-center',
                    badgeColorMap[categoryTranslation[item.category]] ?? 'bg-gray-500'
                ]">
                    {{ categoryTranslation[item.category] || '개인 일정' }}
                </div>
                <div>
                    <div class="text-base font-bold text-zinc-800">
                        <template v-if="item.vendor">
                            <!-- 공연/전시인 경우: 링크로 이동 -->
                            <router-link :to="`/events/${item.idx}`" class="hover:underline">
                                {{ item.title }}
                            </router-link>
                        </template>
                        <template v-else>
                            <!-- 개인 일정인 경우: 일반 텍스트 -->
                            {{ item.title }}
                        </template>
                    </div>
                    <!-- 공연/전시 정보일 때만 표시 -->
                    <template v-if="item.vendor">
                        <div class="text-sm text-stone-500">예매 시작: {{ item.time }}</div>
                        <div class="flex items-center text-sm text-stone-500">
                            <span>예매처: {{ item.vendor }}</span>
                            <div class="ml-2 text-sm" :class="linkColorMap[categoryTranslation[item.category]]">
                                <a :href="item.link" target="_blank">바로가기 &gt;</a>
                            </div>
                        </div>
                        <div class="text-sm text-stone-500">공연 기간: {{ item.period }}</div>
                        <div class="text-sm text-stone-500">장소: {{ item.location }}</div>
                    </template>

                    <!-- 개인 일정일 때만 표시 -->
                    <template v-else>
                        <div v-if="item.description" class="text-sm text-stone-500">메모: {{ item.description }}</div>
                    </template>
                </div>
            </div>

            <!-- 알림 설정 버튼은 공통 -->
            <button @click="manageNotify(item.idx)" :class="[
                'w-24 h-7 rounded-full border text-sm',
                borderColorMap[categoryTranslation[item.category]] ?? 'border-gray-500',
                textColorMap[categoryTranslation[item.category]] ?? 'text-gray-600'
            ]">
                {{ item.isNotify ? '알림 끄기' : '알림 받기' }}
            </button>

        </div>

    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useNotificationStore } from '@/stores/useNotificationStore'
import { useEventsStore } from '@/stores/useEventsStore'

const notificationStore = useNotificationStore()
const eventsStore = useEventsStore()

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
        // 부드럽게 스크롤
        bookingSection.value.scrollIntoView({ behavior: 'smooth' })
    }
}, { immediate: true }) // immediate 옵션 추가하면 초기 렌더링 시에도 확인함

async function manageNotify(idx) {
    const targetItem = props.selectedData.items.find(i => i.idx === idx)

    if (!targetItem) return

    // 공연/전시
    if (targetItem.vendor) {
        const success = await eventsStore.setNotify(idx)
        if (success) {
            targetItem.isNotify = !targetItem.isNotify // 수동으로 반영
        }
    }
    // 개인 일정
    else {
        const success = await notificationStore.togglePersonalNotify(idx)
        if (success) {
            targetItem.isNotify = !targetItem.isNotify // 수동으로 반영
        }
    }
}


const categoryTranslation = {
    'MUSICAL': '뮤지컬',
    'EXHIBITION': '전시',
    'PLAY': '연극',
    'CONCERT': '콘서트',
    'CLASSIC': '클래식식'
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