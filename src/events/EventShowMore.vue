<template>
    <div>
      <!-- 추천 콘텐츠 섹션 -->
       <!-- ✅ 메인에서는 더보기 버튼이 나오고 공연/전시 페이지에서는 더보기 버튼이 없도록 false 처리 -->
      <Card title="추천 콘텐츠" :cards="combinedCards" :showMoreButton="false" />
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