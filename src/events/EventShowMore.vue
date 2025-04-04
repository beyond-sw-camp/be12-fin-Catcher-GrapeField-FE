<template>
    <div>
      <!-- 추천 콘텐츠 섹션 -->
      <Card title="추천 콘텐츠" :cards="combinedCards" />
  
      <!-- 카테고리 -->
      <Category />
  
      <!-- 그 아래 이벤트 카드 리스트 -->
      <EventShowMoreList />
    </div>
  </template>
  
  <script>
  import Card from '../main/Card.vue'
  import cardData from '../assets/data/card.json'
  import Category from '../main/Category.vue'
  import EventShowMoreList from './EventShowMoreList.vue'
  
  export default {
    components: {
      Card,
      Category,
      EventShowMoreList,
    },
    data() {
      return {
        combinedCards: [
          ...cardData.recommendedCards,
          ...cardData.popularCards,
          ...cardData.newCards
        ]
      };
    }
  }
  </script>