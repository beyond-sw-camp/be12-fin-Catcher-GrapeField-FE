<template>
  <div class="calendar-container">
    <router-link to="/calendar_detail">
      <h1 class="title cursor-pointer hover:underline">다가오는 이벤트</h1>
      </router-link>

      <p class="subtitle">캘린더에서 다가오는 공연과 전시 일정을 확인하세요</p>

      <div class="calendar-box">
        <!-- 캘린더 헤더 -->
        <div class="calendar-header">
          <button class="nav-btn">&lt;</button>
          <div class="month-year">2025년 4월</div>
          <button class="nav-btn">&gt;</button>
        </div>

        <!-- 요일 헤더 -->
        <div class="weekdays">
          <div class="weekday" v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day">
            {{ day }}
          </div>
        </div>

        <!-- 날짜 그리드 -->
        <div class="days-grid">
          <div class="day-cell" v-for="(day, index) in calendarDays" :key="index" @click="toggleEvent(day)">
            <span :class="getDateClass(day)">{{ day.date }}</span>
            <div class="dot" v-if="day.hasEvent"></div>
          </div>
        </div>
      </div>

      <!-- 선택된 이벤트 표시 -->
      <div v-if="selectedDate && eventList.length > 0" class="events-container">
        <div v-for="(event, index) in eventList" :key="index" class="event-row">
          <div class="event-date">{{ formatDate(selectedDate) }}</div>
          <div class="event-title">{{ event.title }}</div>
          <button class="alarm-btn">알림 설정</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarComponent',
  data() {
    return {
      selectedDate: null,
      calendarDays: [
        { date: 30, currentMonth: false, hasEvent: false },
        { date: 31, currentMonth: false, hasEvent: false },
        { date: 1, currentMonth: true, hasEvent: false },
        { date: 2, currentMonth: true, hasEvent: false },
        { date: 3, currentMonth: true, hasEvent: false },
        { date: 4, currentMonth: true, hasEvent: true },
        { date: 5, currentMonth: true, hasEvent: true },

        { date: 6, currentMonth: true, hasEvent: false },
        { date: 7, currentMonth: true, hasEvent: false },
        { date: 8, currentMonth: true, hasEvent: false },
        { date: 9, currentMonth: true, hasEvent: true },
        { date: 10, currentMonth: true, hasEvent: false },
        { date: 11, currentMonth: true, hasEvent: false },
        { date: 12, currentMonth: true, hasEvent: true },

        { date: 13, currentMonth: true, hasEvent: false },
        { date: 14, currentMonth: true, hasEvent: false },
        { date: 15, currentMonth: true, hasEvent: true, isToday: true },
        { date: 16, currentMonth: true, hasEvent: false },
        { date: 17, currentMonth: true, hasEvent: true },
        { date: 18, currentMonth: true, hasEvent: false },
        { date: 19, currentMonth: true, hasEvent: false },

        { date: 20, currentMonth: true, hasEvent: false },
        { date: 21, currentMonth: true, hasEvent: false },
        { date: 22, currentMonth: true, hasEvent: false },
        { date: 23, currentMonth: true, hasEvent: false },
        { date: 24, currentMonth: true, hasEvent: false },
        { date: 25, currentMonth: true, hasEvent: false },
        { date: 26, currentMonth: true, hasEvent: false },

        { date: 27, currentMonth: true, hasEvent: false },
        { date: 28, currentMonth: true, hasEvent: false },
        { date: 29, currentMonth: true, hasEvent: false },
        { date: 30, currentMonth: true, hasEvent: false },
        { date: 1, currentMonth: false, hasEvent: false },
        { date: 2, currentMonth: false, hasEvent: false },
        { date: 3, currentMonth: false, hasEvent: false }
      ],
      events: {
        4: [{ title: '뮤지컬 라이온킹 예매 오픈 (12:00)' }],
        5: [{ title: '박람회 예매 오픈 (14:00)' }],
        9: [{ title: '전시회 예매 오픈 (10:00)' }],
        12: [{ title: '콘서트 예매 오픈 (11:00)' }],
        15: [
          { title: '뮤지컬 햄릿 예매 오픈 (12:00)' },
          { title: '고양이 박람회 예매 오픈 (12:00)' }
        ],
        17: [{ title: '마술쇼 예매 오픈 (13:00)' }]
      }
    }
  },
  computed: {
    eventList() {
      return this.selectedDate && this.events[this.selectedDate]
        ? this.events[this.selectedDate]
        : [];
    }
  },
  methods: {
    toggleEvent(day) {
      if (!day.currentMonth || !day.hasEvent) return;

      if (this.selectedDate === day.date) {
        this.selectedDate = null; // 같은 날짜 클릭 시 토글
      } else {
        this.selectedDate = day.date;
      }
    },
    getDateClass(day) {
      const classes = [];
      if (!day.currentMonth) classes.push('other-month');
      if (day.date === this.selectedDate) classes.push('selected');
      else if (day.isToday) classes.push('today');
      return classes;
    },
    formatDate(date) {
      return `4월 ${date}일`;
    }
  }
}
</script>

<style scoped>
.calendar-container {
  font-family: 'Inter', sans-serif;
  width: 100%;
  max-width: 70vw;
  margin: 0 auto;
  padding: 2vh 2vw;
}

.title {
  font-size: 2.4vw;
  font-weight: bold;
  color: #27272a;
  margin-bottom: 1vh;
}

.subtitle {
  font-size: 2vmin;
  color: #78716c;
  margin-bottom: 3vh;
}

.calendar-box {
  width: 100%;
  background-color: white;
  border-radius: 1vmin;
  box-shadow: 0 0.1vh 0.3vh rgba(0, 0, 0, 0.1);
  margin-bottom: 3vh;
}

.calendar-header {
  display: flex;
  align-items: center;
  padding: 1.5vh 2vw;
  background-color: #f5f5f5;
  border-radius: 1vmin 1vmin 0 0;
}

.month-year {
  flex: 1;
  font-size: 2.5vmin;
  font-weight: bold;
  text-align: center;
}

.nav-btn {
  background-color: transparent;
  border: none;
  font-size: 2.5vmin;
  cursor: pointer;
  width: 3vmin;
  height: 3vmin;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #f0f0f0;
  padding: 1vh 0;
}

.weekday {
  font-size: 2vmin;
  color: #78716c;
  text-align: center;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.day-cell {
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.day-cell span {
  font-size: 2.5vmin;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vmin;
  height: 5vmin;
}

.other-month {
  color: #cccccc;
}

.today {
  background-color: #FFB4B4;
  color: white;
  font-weight: bold;
  border-radius: 50%;
}

.selected {
  background-color: #6b21a8;
  color: white;
  font-weight: bold;
  border-radius: 50%;
}

.dot {
  position: absolute;
  bottom: 0.8vh;
  width: 0.8vmin;
  height: 0.8vmin;
  background-color: #6b21a8;
  border-radius: 50%;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.event-row {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 0 2vw;
  height: 5vh;
  border-radius: 0.8vmin;
}

.event-date {
  font-weight: bold;
  margin-right: 2vw;
  min-width: 8vw;
  font-size: 2.2vmin;
}

.event-title {
  flex-grow: 1;
  font-size: 2.0vmin;
}

.alarm-btn {
  background-color: transparent;
  border: none;
  color: #6b21a8;
  font-weight: bold;
  font-size: 2vmin;
  cursor: pointer;
  padding: 0.5vh 1vw;
}

/* 반응형 조정 */
@media (max-width: 768px) {
  .calendar-container {
    padding: 1vh 3vw;
  }

  .title {
    font-size: 4vmin;
  }

  .subtitle {
    font-size: 2.6vmin;
  }

  .month-year,
  .event-date,
  .event-title {
    font-size: 2.5vmin;
  }

  .weekday {
    font-size: 2.5vmin;
  }

  .day-cell span {
    font-size: 3vmin;
  }

  .alarm-btn {
    font-size: 2.5vmin;
  }
}

@media (max-width: 480px) {
  .calendar-container {
    max-width: 95vw;
  }

  .title {
    font-size: 6vmin;
  }

  .subtitle {
    font-size: 3.5vmin;
  }

  .day-cell {
    height: 6vh;
  }

  .event-date {
    min-width: 15vw;
  }
}
</style>