<template>
  <div class="container">
    <div class="header">
      <h1 class="title">{{ title }} 예정</h1>
      <div class="more-btn">더보기</div>
    </div>
    <div class="cards-container">
      <!-- v-for로 이벤트 데이터 순회 -->
      <div v-for="(event, i) in events.recommendedCards" :key="i" class="card">
        <div class="card-left" :class="event.category">
          <!-- 이미지 영역 (나중에 교체될 예정) -->
          <img v-if="event.imageUrl" :src="event.imageUrl" class="event-image" alt="" />
          <div class="tag">
            <span>{{ event.badge }}</span>
          </div>
        </div>
        <div class="card-right">
          <h2 class="event-title">{{ event.title }}</h2>
          <div class="event-info">
            {{ event.date }} <br>
            | {{ event.location }}
          </div>
          
          <!-- <div class="day-left">{{ title}}까지 {{ daysLeft }}일 남음</div> -->
          <button class="detail-btn">더보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cards from '../assets/data/card.json'
export default {
  name: "EventsEndingSoon",
  props: {
    title: {
      type: String,
      default: "종료 예정",
    },
    index: {
      type: [Number, String],
      default:1
    }
  },
  data() {
    return {
      // 샘플 데이터 - 실제로는 props나 API 호출로 대체됨
      events: cards,
      i: this.index
    };
  },
  methods: {
    // 남은 날짜 계산하는 메소드 작성
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: 70vw;
  margin: 2vh auto;
  padding: 2vh 2vw;
  font-family: "Inter", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
}

.title {
  font-size: 2.7vmin;
  font-weight: bold;
  color: #27272a;
}

.more-btn {
  font-size: 2vmin;
  color: #6d28d9;
  cursor: pointer;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2vh 2vw;
}

.card {
  display: flex;
  width: 48%;
  height: 17vh;
  background: white;
  border: 1px solid #e5e5e5;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 2vh;
}

.card-left {
  width: 30%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  padding-top: 1.5vh;
  padding-left: 1vw;
  position: relative;
}

.event-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tag {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.3vh 0.6vw;
  border-radius: 4px;
  position: relative;
  z-index: 1;
}

.tag span {
  color: white;
  font-size: 1.3vmin;
}

.card-right {
  width: 75%;
  padding: 1.5vh 1.5vw;
  display: flex;
  flex-direction: column;
}

.event-title {
  font-size: 1.9vmin;
  font-weight: bold;
  color: #27272a;
  margin-bottom: 0.8vh;
}

.event-info {
  font-size: 1.8vmin;
  color: #78716c;
  margin-bottom: 0.6vh;
}

.day-left {
  font-size: 1.8vmin;
  color: #dc2626;
  margin-bottom: 0.6vh;
}

.detail-btn {
  position: absolute;
  bottom: 1.5vh;
  right: 1.5vw;
  background-color: #6d28d9;
  color: white;
  border: none;
  padding: 0.6vh 1vw;
  border-radius: 4px;
  font-size: 1.8vmin;
  cursor: pointer;
}

/* 반응형 조정 */
@media (max-width: 1024px) {
  .card {
    width: 100%;
    height: 12vh;
  }

  .event-title {
    font-size: 2.5vmin;
  }
}

@media (max-width: 768px) {
  .card {
    height: 14vh;
  }

  .event-title {
    font-size: 3vmin;
  }

  .event-info,
  .day-left {
    font-size: 2.2vmin;
  }

  .tag span {
    font-size: 2vmin;
  }

  .detail-btn {
    font-size: 2.2vmin;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 5vmin;
  }

  .more-btn {
    font-size: 3vmin;
  }

  .card {
    height: 16vh;
  }

  .event-title {
    font-size: 3.5vmin;
  }

  .event-info,
  .day-left {
    font-size: 3vmin;
  }

  .tag span {
    font-size: 2.5vmin;
  }

  .detail-btn {
    font-size: 3vmin;
  }
}
</style>
