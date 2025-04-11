<template>
    <div class="w-full max-w-[70vw] mx-auto my-[4vh] px-4 box-border">
        <Card title="추천" :cards="cardData.recommendedCards" />
    </div>
    <div class="w-full max-w-[70vw] mx-auto my-[4vh] px-4 box-border">
        <Card title="인기" :cards="cardData.popularCards" />
    </div>
    <div class="w-full max-w-[70vw] mx-auto my-[4vh] px-4 box-border">
        <Card title="신규" :cards="cardData.newCards" />
    </div>
</template>

<script setup>
import Card from './Card.vue'
import cardData from '../assets/data/card.json'
</script>

<style scoped>
@media (max-width: 1200px) {
    .max-w-\[70vw\] {
        max-width: 95vw;
    }
}

@media (max-width: 768px) {
    .max-w-\[70vw\] {
        max-width: 90vw;
    }

    .my-\[4vh\] {
        margin-top: 3vh;
        margin-bottom: 3vh;
    }
}

@media (max-width: 480px) {
    .max-w-\[70vw\] {
        max-width: 85vw;
    }

    .my-\[4vh\] {
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
}
</style>