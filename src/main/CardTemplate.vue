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
/* 여백 들여쓰기 통일 조정용... 임시 레이아웃 속성*/
.wrapper{
  margin-bottom: 2vw;
  width: 95%;
  max-width: 95vw;
  margin: 2vh auto;
  padding: 0 5vw;
}
</style>