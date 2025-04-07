<template>
    <Card class="wrapper" title="추천" :cards="cardData.recommendedCards" />
    <Card class="wrapper" title="인기" :cards="cardData.popularCards" />
    <Card class="wrapper" title="신규" :cards="cardData.newCards" />
</template>

<script>
import Card from './Card.vue'
import cardData from '../assets/data/card.json'

export default {
    components: {
        Card
    },
    data() {
        return {
            cardData
        };
    }
};
</script>

<style scoped>
/* 카드 래퍼 스타일 - 75vw로 변경 */
.wrapper {
    width: 100%;
    max-width: 70vw;
    margin: 4vh auto;
    padding: 0 1rem;
    box-sizing: border-box;
}

@media (max-width: 1200px) {
    .wrapper {
        max-width: 95vw;
    }
}

@media (max-width: 768px) {
    .wrapper {
        max-width: 90vw;
        margin: 3vh auto;
    }
}

@media (max-width: 480px) {
    .wrapper {
        max-width: 85vw;
        margin: 2vh auto;
    }
}
</style>