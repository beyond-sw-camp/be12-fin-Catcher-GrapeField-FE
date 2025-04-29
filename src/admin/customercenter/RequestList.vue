<script setup>
import { ref, reactive, computed } from 'vue';
import { toast } from 'vue3-toastify';

const category = ref({
    type: 'all'
});

const selectCategory = (type) => {
    category.value.type = type;
}

const inquiries = ref([
    {
        id: 5,
        title: '우는 남자',
        status: '미승인',
        createdAt: '2024.04.01',
        answeredAt: '2024.04.02',
        content: '',
        answer: '이미 등록된 공연입니다.',
    },
    {
        id: 4,
        title: '우는 남자',
        status: '승인',
        createdAt: '2024.03.31',
        answeredAt: '2024.04.01',
        content: '',
        answer: '승인되었습니다.',
    },
    {
        id: 3,
        title: '채팅방 기능 오류 신고',
        status: '처리중',
        createdAt: '2024.03.30',
        answeredAt: '',
        content: '채팅방이 안 들어가져요!',
        answer: '',
    },
])

const userRole = ref({
    // role: 'user',
    role: 'admin',
})
const openIndex = ref(null)
function toggle(index) {
    if (userRole.value.role !== 'admin') {
        toast("접근 권한이 없습니다.", {
            "theme": "auto",
            "type": "warning",
            "autoClose": 1500,
            "hideProgressBar": true,
            "position": "bottom-center",
            "dangerouslyHTMLString": true
        })
        return
    }else{
        openIndex.value = openIndex.value === index ? null : index
    }
}
</script>

<template>
    <div class="w-[100%] mt-2">
        <div class="w-[100%] mb-4 h-20 flex items-end justify-between mt-8">
            <div class="m-4">
                <div class="text-zinc-800 text-xl font-bold font-['Inter'] mb-2">공연/전시 신청</div>
                <div class="text-stone-500 text-sm font-normal font-['Inter']">
                    GrapeField 서비스에 등록되지 않은 공연/전시를 신청할 수 있습니다.<br>
                    이미 등록된 공연을 신청할 경우 승인되지 않을 수 있습니다.
                </div>
            </div>
            <div>
                <button
                    class="w-20 h-8 mr-4 bg-violet-700 text-white text-sm font-bold rounded flex items-center justify-center">
                    신청하기</button>
            </div>
        </div>
        <div class="w-[100%] h-12 bg-stone-50 flex items-center mb-4">
            <div class="flex items-center gap-4 text-zinc-800 text-base font-bold font-['Inter'] pl-5">
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
                    :class="category.type === 'all' ? 'outline-2' : 'outline-1'" @click="selectCategory('all')">
                    전체</button>
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
                    :class="category.type === 'user' ? 'outline-2' : 'outline-1'" @click="selectCategory('user')">
                    처리중</button>
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
                    :class="category.type === 'service' ? 'outline-2' : 'outline-1'" @click="selectCategory('service')">
                    승인</button>
                <button
                    class="w-20 h-8 bg-white outline outline-offset-[-1px] outline-violet-700 rounded-3xl flex items-center justify-center"
                    :class="category.type === 'service' ? 'outline-2' : 'outline-1'" @click="selectCategory('service')">
                    미승인</button>
            </div>
        </div>



        <div class="w-[100%]">
            <table class="w-[100%] text-sm">
                <thead class="bg-gray-100 text-gray-600">
                    <tr>
                        <th class="text-left px-4 py-2 w-[10%]">번호</th>
                        <th class="text-left px-4 py-2">제목</th>
                        <th class="text-center px-4 py-2 w-[20%]">상태</th>
                        <th class="text-center px-4 py-2 w-[15%]">등록일</th>
                        <th class="text-center px-4 py-2 w-[15%]">답변일</th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="(item, index) in inquiries" :key="item.id">
                        <!-- 목록 행 -->
                        <tr class="cursor-pointer hover:bg-gray-50" @click="toggle(index)">
                            <td class="px-4 py-3 text-center">{{ item.id }}</td>
                            <td class="px-4 py-3">{{ item.title }}</td>
                            <td class="text-center">
                                <div class="flex justify-center">
                                    <span
                                        class="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium w-fit"
                                        :class="{
                                            'bg-blue-100 text-blue-600': item.status === '승인',
                                            'bg-green-100 text-yellow-500': item.status === '처리중',
                                            'bg-red-100 text-orange-500': item.status === '미승인'
                                        }">
                                        {{ item.status }}
                                    </span>
                                </div>
                            </td>
                            <td class="text-center">{{ item.createdAt }}</td>
                            <td class="text-center">{{ item.answeredAt || '-' }}</td>
                        </tr>
                    </template>
                </tbody>

            </table>
        </div>
    </div>
</template>

<style scoped></style>