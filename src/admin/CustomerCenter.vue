<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import CustomerCenterHeader from './CustomerCenterHeader.vue';
import NoticeList from './NoticeList.vue';
import Faq from './Faq.vue';

const selectedType = ref({
    type:'notice'
});

//Header에서 받은 데이터
const handleSelectType = (type) => {
    selectedType.value.type = type;
};

</script>

<template>
    <main class="mt-24 mx-auto">
        <CustomerCenterHeader :selected="selectedType.type" @selectedType="handleSelectType"/>
        <NoticeList v-if="selectedType.type==='notice'" />
        <Faq v-else-if="selectedType.type==='faq'" />
    </main>

</template>

<style scoped>
</style>