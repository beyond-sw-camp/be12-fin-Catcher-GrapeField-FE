<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import CustomerCenterHeader from './CustomerCenterHeader.vue';
import NoticeList from './NoticeList.vue';
import Faq from './Faq.vue';
import Guide from './Guide.vue';
import Qna from './Qna.vue';
import RequestList from './RequestList.vue';
import CustomerCenterBottom from './CustomerCenterBottom.vue';

const route = useRoute()
const router = useRouter()

const selectedType = ref({
    type:'notice'
});

watch(() => route.query.type,(newType) => {
        if (newType) selectedType.value.type = newType
    },
    { immediate: true }
)

// Header, Footer로부터 선택 이벤트 받아 반영
const handleSelectType = (type) => {
    selectedType.value.type = type
    router.replace({ query: { type } }) // URL 쿼리도 반영
}
</script>

<template>
    <main class="mx-auto w-[100%] max-w-[70vw] px-4 sm:px-6 lg:px-8">
        <CustomerCenterHeader :selected="selectedType.type" @selectedType="handleSelectType"/>
        <NoticeList v-if="selectedType.type==='notice'" />
        <Faq v-else-if="selectedType.type==='faq'" />
        <Guide v-else-if="selectedType.type==='guide'" />
        <Qna v-else-if="selectedType.type==='qna'" />
        <RequestList v-else-if="selectedType.type==='request'" />
        <CustomerCenterBottom @selectedType="handleSelectType"/>
    </main>
</template>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 70vw;
  margin: 0 auto;
  padding: 1rem;
}
</style>