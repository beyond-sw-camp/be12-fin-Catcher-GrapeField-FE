<template>
    <Card title="추천" :cards="cardData.recommendedCards" />
    <Card title="인기" :cards="cardData.popularCards" />
    <Card title="신규" :cards="cardData.newCards" />
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