<template>
  <div class="w-full max-w-[70vw] mx-auto p-[2vh_2vw] font-['Inter',sans-serif]">
    <router-link to="/calendar_detail">
      <h1 class="text-[2.1vw] font-bold text-zinc-800 mb-[1vh] cursor-pointer hover:underline">다가오는 이벤트</h1>
    </router-link>

    <p class="text-[1.9vmin] text-stone-500 mb-[3vh]">캘린더에서 다가오는 공연과 전시 일정을 확인하세요</p>

    <div class="w-full bg-white rounded-[1vmin] shadow-sm mb-[3vh]">
      <!-- 캘린더 헤더 -->
      <div class="flex items-center py-[1.5vh] px-[2vw] bg-gray-100 rounded-t-[1vmin]">
        <button 
          class="bg-transparent border-none text-[2.5vmin] cursor-pointer w-[3vmin] h-[3vmin] flex items-center justify-center"
          @click="prevMonth"
        >&lt;</button>
        <div class="flex-1 text-[2.5vmin] font-bold text-center">{{ displayYear }}년 {{ displayMonth }}월</div>
        <button 
          class="bg-transparent border-none text-[2.5vmin] cursor-pointer w-[3vmin] h-[3vmin] flex items-center justify-center"
          @click="nextMonth"
        >&gt;</button>
      </div>

      <!-- 요일 헤더 -->
      <div class="grid grid-cols-7 border-b border-gray-100 py-[1vh]">
        <div 
          v-for="day in weekdays" 
          :key="day" 
          class="text-[2vmin] text-stone-500 text-center"
        >
          {{ day }}
        </div>
      </div>

      <!-- 날짜 그리드 -->
      <div class="grid grid-cols-7 grid-rows-6">
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index" 
          @click="toggleEvent(day)"
          class="h-[7vh] flex justify-center items-center relative cursor-pointer"
        >
          <span 
            class="text-[2.5vmin] text-center flex justify-center items-center w-[5vmin] h-[5vmin]"
            :class="{
              'text-gray-300': !day.currentMonth,
              'bg-purple-800 text-white font-bold rounded-full': day.date === selectedDate && day.currentMonth,
              'bg-red-200 text-white font-bold rounded-full': day.isToday && day.date !== selectedDate
            }"
          >{{ day.date }}</span>
          <div 
            v-if="day.hasEvent" 
            class="absolute bottom-[0.8vh] w-[0.8vmin] h-[0.8vmin] bg-purple-800 rounded-full"
          ></div>
        </div>
      </div>
    </div>

    <!-- 선택된 이벤트 표시 -->
    <div v-if="selectedDate && eventList.length > 0" class="flex flex-col gap-[1vh]">
      <div 
        v-for="(event, index) in eventList" 
        :key="index" 
        class="flex items-center bg-gray-100 px-[2vw] h-[5vh] rounded-[0.8vmin]"
      >
        <div class="font-bold mr-[2vw] min-w-[8vw] text-[2.2vmin]">{{ formatDate(selectedDate) }}</div>
        <div class="flex-grow text-[2.0vmin]">{{ event.title }}</div>
        <button class="bg-transparent border-none text-purple-800 font-bold text-[2vmin] cursor-pointer py-[0.5vh] px-[1vw]">
          알림 설정
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCalendarStore } from '@/stores/uesCalendarStore'

const CalendarStore = useCalendarStore();

// 상수 정의
const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

// 반응형 상태
const selectedDate = ref(null);
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1); // JavaScript는 0-11 월, UI는 1-12 월
const calendarDays = ref([]);
const events = ref({});

// 현재 날짜가 속한 연도와 월을 표시
const displayYear = computed(() => currentYear.value);
const displayMonth = computed(() => currentMonth.value);

// 계산된 속성: 선택된 날짜의 이벤트 목록
const eventList = computed(() => {
  return selectedDate.value && events.value[selectedDate.value]
    ? events.value[selectedDate.value]
    : [];
});

// 날짜 포맷팅
const formatDate = (date) => {
  return `${displayMonth.value}월 ${date}일`;
};

// 이벤트 토글
const toggleEvent = (day) => {
  if (!day.currentMonth || !day.hasEvent) return;

  if (selectedDate.value === day.date) {
    selectedDate.value = null; // 같은 날짜 클릭 시 토글
  } else {
    selectedDate.value = day.date;
  }
};

// 달력 계산
const calculateCalendarDays = () => {
  const year = currentYear.value;
  const month = currentMonth.value;
  
  // 해당 월의 첫날과 마지막 날 구하기
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  
  // 이전 달의 날짜들 추가
  const daysFromPrevMonth = firstDay.getDay();
  const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
  
  const days = [];
  
  // 이전 달의 날짜 추가
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    days.push({
      date: prevMonthLastDate - i,
      currentMonth: false,
      hasEvent: false
    });
  }
  
  // 현재 달의 날짜 추가
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: i,
      currentMonth: true,
      hasEvent: events.value[i] ? true : false,
      isToday: isCurrentMonth && today.getDate() === i
    });
  }
  
  // 다음 달의 날짜 추가 (6주 캘린더를 만들기 위해)
  const remainingDays = 42 - days.length; // 6주 * 7일 = 42
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      currentMonth: false,
      hasEvent: false
    });
  }
  
  calendarDays.value = days;
};

// 이전 월로 이동
const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  calculateCalendarDays();
  fetchEventsForCurrentMonth();
};

// 다음 월로 이동
const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  calculateCalendarDays();
  fetchEventsForCurrentMonth();
};

const fetchEventsForCurrentMonth = () => {
  const response = CalendarStore.mainList(displayYear.value, displayMonth.value);
  
  // 예시 데이터 (실제 구현에서는 API 응답으로 대체)
  const mockEvents = {};
  
  // 각 월마다 다른 예시 이벤트 생성
  if (currentMonth.value === 4 && currentYear.value === 2025) {
    mockEvents[4] = [{ title: '뮤지컬 라이온킹 예매 오픈 (12:00)' }];
    mockEvents[5] = [{ title: '박람회 예매 오픈 (14:00)' }];
    mockEvents[9] = [{ title: '전시회 예매 오픈 (10:00)' }];
    mockEvents[12] = [{ title: '콘서트 예매 오픈 (11:00)' }];
    mockEvents[15] = [
      { title: '뮤지컬 햄릿 예매 오픈 (12:00)' },
      { title: '고양이 박람회 예매 오픈 (12:00)' }
    ];
    mockEvents[17] = [{ title: '마술쇼 예매 오픈 (13:00)' }];
  } else if (currentMonth.value === 5 && currentYear.value === 2025) {
    mockEvents[2] = [{ title: '오페라 카르멘 예매 오픈 (10:00)' }];
    mockEvents[7] = [{ title: '재즈 페스티벌 티켓 오픈 (09:00)' }];
    mockEvents[14] = [{ title: '미술 전시회 오픈 (11:00)' }];
    mockEvents[21] = [{ title: '클래식 콘서트 시리즈 (19:30)' }];
  } else {
    // 다른 월에는 임의의 이벤트 생성
    const randomDays = [
      Math.floor(Math.random() * 28) + 1,
      Math.floor(Math.random() * 28) + 1,
      Math.floor(Math.random() * 28) + 1
    ];
    
    randomDays.forEach(day => {
      mockEvents[day] = [{ title: `${currentYear.value}년 ${currentMonth.value}월 이벤트 (${Math.floor(Math.random() * 12) + 9}:00)` }];
    });
  }
  
  events.value = mockEvents;
  
  // 캘린더 날짜에 이벤트 표시 업데이트
  calendarDays.value = calendarDays.value.map(day => {
    return {
      ...day,
      hasEvent: day.currentMonth && events.value[day.date] ? true : false
    };
  });
};

// 컴포넌트 마운트 시 초기화
onMounted(() => {
  // 현재 날짜로 초기화 (예시에서는 2025년 4월로 설정)
  currentYear.value = 2025;
  currentMonth.value = 4;
  
  calculateCalendarDays();
  fetchEventsForCurrentMonth();
});
</script>