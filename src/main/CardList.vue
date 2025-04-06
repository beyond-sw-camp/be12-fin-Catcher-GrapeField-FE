<template>
  <div class="container">
    <div class="header">
      <h1 class="title">{{ title }}</h1>
      <div class="more-btn">더보기</div>
    </div>
    <div class="cards-container">
      <!-- v-for로 이벤트 데이터 순회 -->
      <div v-for="(event, index) in events" :key="index" class="card">
        <div class="card-left" :class="event.category">
          <!-- 이미지 영역 (나중에 교체될 예정) -->
          <img
            v-if="event.image"
            :src="event.image"
            class="event-image"
            alt=""
          />
          <div class="tag">
            <span>{{ event.status }}</span>
          </div>
        </div>
        <div class="card-right">
          <h2 class="event-title">{{ event.title }}</h2>
          <div class="event-info">
            {{ event.period }} | {{ event.location }}
          </div>
          <div class="day-left">종료까지 {{ event.daysLeft }}일 남음</div>
          <button class="detail-btn">더보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventsEndingSoon",
  props: {
    title: {
      type: String,
      default: "종료 예정",
    },
  },
  data() {
    return {
      // 샘플 데이터 - 실제로는 props나 API 호출로 대체됨
      events: [
        {
          id: 1,
          title: "전시 〈모네: 빛을 그리다〉",
          period: "~ 2025.04.15",
          location: "그라운드시로 성수",
          status: "전시중",
          category: "red", // 임시 색상 클래스 (이미지로 대체 예정)
          daysLeft: 5,
          image: null, // 이미지 URL (실제 구현 시 추가)
        },
        {
          id: 2,
          title: "뮤지컬 〈웨스트 사이드 스토리〉",
          period: "~ 2025.04.20",
          location: "LG아트센터 서울",
          status: "공연중",
          category: "purple",
          daysLeft: 10,
          image: null,
        },
        {
          id: 3,
          title: "연극 〈친정엄마와 2박3일〉",
          period: "~ 2025.04.25",
          location: "대학로 아트원씨어터",
          status: "공연중",
          category: "orange",
          daysLeft: 15,
          image: null,
        },
        {
          id: 4,
          title: "팀랩: 라이프 - 석양의 숲과 꽃",
          period: "~ 2025.04.30",
          location: "동대문디자인플라자(DDP)",
          status: "전시중",
          category: "teal",
          daysLeft: 20,
          image: null,
        },
        {
          id: 5,
          title: "반 고흐 미디어 아트 전",
          period: "~ 2025.05.05",
          location: "현대백화점 무역센터점",
          status: "전시중",
          category: "blue",
          daysLeft: 25,
          image: null,
        },
      ],
    };
  },
  methods: {
    // 필요한 메서드 추가
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: 95vw;
  margin: 2vh auto;
  padding: 2vh 5vw;
  font-family: "Inter", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
}

.title {
  font-size: 3vmin;
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
  width: 47%;
  height: 14vh;
  background: white;
  border: 1px solid #e5e5e5;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 2vh;
}

.card-left {
  width: 25%;
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

/* 임시 색상 클래스 (나중에 이미지로 대체) */
.red {
  background-color: #b91c1c;
}
.purple {
  background-color: #7c3aed;
}
.orange {
  background-color: #f59e0b;
}
.teal {
  background-color: #0ea5e9;
}
.blue {
  background-color: #4f46e5;
}

.tag {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5vh 0.8vw;
  border-radius: 4px;
  position: relative;
  z-index: 1;
}

.tag span {
  color: white;
  font-size: 1.5vmin;
}

.card-right {
  width: 75%;
  padding: 1.5vh 1.5vw;
  display: flex;
  flex-direction: column;
}

.event-title {
  font-size: 2.2vmin;
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
