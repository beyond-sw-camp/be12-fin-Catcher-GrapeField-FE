<script setup>
import { ref } from 'vue'

const favoriteEvents = ref([
    { id: 1, title: '햄릿', category: '연극' },
    { id: 2, title: '알라딘', category: '뮤지컬' },
    { id: 3, title: '케이펫페어', category: '클래식' },
    { id: 4, title: '고흐 인사이드', category: '전시회' },
    { id: 5, title: '라라랜드 심포니', category: '공연' }
])

// 항목 위로 이동
const moveUp = (index) => {
    if (index === 0) return
    const temp = favoriteEvents.value[index]
    favoriteEvents.value[index] = favoriteEvents.value[index - 1]
    favoriteEvents.value[index - 1] = temp
}

// 항목 아래로 이동
const moveDown = (index) => {
    if (index === favoriteEvents.value.length - 1) return
    const temp = favoriteEvents.value[index]
    favoriteEvents.value[index] = favoriteEvents.value[index + 1]
    favoriteEvents.value[index + 1] = temp
}

// 삭제
const remove = (index) => {
    favoriteEvents.value.splice(index, 1)
}
</script>

<template>
    <div class="w-full p-6 font-['Inter'] overflow-x-auto">
        <h2 class="w-full text-2xl font-bold mb-6">즐겨찾기한 공연/전시</h2>

        <table class="w-full table-fixed min-w-[400px] border border-gray-300 text-sm">
            <thead class="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                    <th class="w-[10%]] text-xs text-center border border-gray-300 py-1 px-1">번호</th>
                    <th class="w-[50%] border border-gray-300 text-left px-2">메뉴 이름</th>
                    <th class="w-[25%] border border-gray-300">순서 설정</th>
                    <th class="w-[15%] border border-gray-300">관리</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(event, index) in favoriteEvents" :key="event.id" class="text-center hover:bg-violet-50">
                    <td class="truncate px-1 text-xs text-center border border-gray-300 py-1">
                        {{ index + 1 }}
                    </td>
                    <td class="border border-gray-300 text-left px-3 truncate">
                        [{{ event.category }}] {{ event.title }}
                    </td>
                    <td class="border border-gray-300">
                        <div class="flex flex-nowrap justify-center gap-1 px-1 py-1">
                            <button
                                class="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-xs whitespace-nowrap"
                                @click="moveUp(index)" :disabled="index === 0">
                                위로
                            </button>
                            <button
                                class="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-xs whitespace-nowrap"
                                @click="moveDown(index)" :disabled="index === favoriteEvents.length - 1">
                                아래로
                            </button>
                        </div>
                    </td>
                    <td class="border border-gray-300">
                        <button class="px-3 py-1 border rounded bg-gray-100 hover:bg-red-600 text-xs whitespace-nowrap"
                            @click="remove(index)">
                            삭제
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<style scoped></style>