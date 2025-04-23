<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import ContentsHedaer from './ContentsHedaer.vue';
import Scrap from './Scraps.vue';
import Posts from './Posts.vue';
import Comments from './Comments.vue';
import Reviews from './Reviews.vue';
const route = useRoute()
const router = useRouter()

const selectedType = ref({
    type:'scraps'
});

watch(() => route.query.type,(newType) => {
        if (newType) selectedType.value.type = newType
    },
    { immediate: true }
)
// Header로부터 선택 이벤트 받아 반영
const handleSelectType = (type) => {
    selectedType.value.type = type
    router.replace({ query: { type } }) // URL 쿼리도 반영
}
</script>

<template>
    <ContentsHedaer :selected="selectedType.type" @selectedType="handleSelectType"/>
    <Scrap v-if="selectedType.type==='scraps'" />
    <Posts v-else-if="selectedType.type==='posts'" />
    <Comments v-else-if="selectedType.type==='comments'" />
    <Reviews v-else-if="selectedType.type==='reviews'" />

</template>

<style scoped>
</style>