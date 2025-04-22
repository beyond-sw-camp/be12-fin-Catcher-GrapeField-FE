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
          @click="prevMonth">&lt;</button>
        <div class="flex-1 text-[2.5vmin] font-bold text-center">{{ displayYear }}년 {{ displayMonth }}월</div>
        <button
          class="bg-transparent border-none text-[2.5vmin] cursor-pointer w-[3vmin] h-[3vmin] flex items-center justify-center"
          @click="nextMonth">&gt;</button>
      </div>

      <!-- 요일 헤더 -->
      <div class="grid grid-cols-7 border-b border-gray-100 py-[1vh]">
        <div v-for="day in weekdays" :key="day" class="text-[2vmin] text-stone-500 text-center">
          {{ day }}
        </div>
      </div>

      <!-- 날짜 그리드 -->
      <div class="grid grid-cols-7 grid-rows-6">
        <div v-for="(day, index) in calendarDays" :key="index" @click="toggleEvent(day)"
          class="h-[7vh] flex justify-center items-center relative cursor-pointer">
          <span class="text-[2.5vmin] text-center flex justify-center items-center w-[5vmin] h-[5vmin]" :class="{
            'text-gray-300': !day.currentMonth,
            'bg-purple-800 text-white font-bold rounded-full': day.date === selectedDate && day.currentMonth,
            'bg-red-200 text-white font-bold rounded-full': day.isToday && day.date !== selectedDate
          }">{{ day.date }}</span>
          <div v-if="day.hasEvent" class="absolute bottom-[0.8vh] w-[0.8vmin] h-[0.8vmin] bg-purple-800 rounded-full">
          </div>
        </div>
      </div>
    </div>

    <!-- 선택된 이벤트 표시 -->
    <div v-if="selectedDate && eventList.length > 0" class="flex flex-col gap-[1vh]">
      <div v-for="(event, index) in eventList" :key="index"
        class="flex items-center bg-gray-100 px-[2vw] h-[5vh] rounded-[0.8vmin]">
        <a :href="`/events/${event.id}`" class="flex items-center flex-grow no-underline text-inherit">
          <div class="font-bold mr-[2vw] min-w-[8vw] text-[2.2vmin]">
            {{ formatDate(selectedDate) }}
          </div>
          <div class="text-[2.0vmin]">
            {{ event.title }}
          </div>
        </a>

        <button
          class="bg-transparent border-none text-purple-800 font-bold text-[2vmin] cursor-pointer py-[0.5vh] px-[1vw]"
          @click.stop>
          알림 설정
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCalendarStore } from '@/stores/useCalendarStore'
import axios from 'axios'

const CalendarStore = useCalendarStore();

const fetchEventsForCurrentMonth = async () => {
  const targetDate = new Date(displayYear.value, displayMonth.value, 1);
  const isoDateString = targetDate.toISOString().slice(0, 19);

  try {
    const response = await axios.get('/api/events/calendar', {
      params: {
        date: isoDateString
      }
    });

    // API 응답에서 이벤트 데이터 추출
    const eventData = response.data.startEvents || [];

    // 날짜별로 이벤트를 그룹화 (키: 일, 값: 이벤트 배열)
    const groupedEvents = {};

    eventData.forEach(event => {

      if (events.isPresale == null) {

        const saleStartDate = new Date(event.saleStart);
        const day = saleStartDate.getDate();
        const eventMonth = saleStartDate.getMonth() + 1;
        const eventYear = saleStartDate.getFullYear();

        // 현재 표시중인 달력의 연월과 일치하는 이벤트만 필터링
        if (eventYear === displayYear.value && eventMonth === displayMonth.value) {
          if (!groupedEvents[day]) {
            groupedEvents[day] = [];
          }

          // 이벤트 시간 추출
          const hours = saleStartDate.getHours();
          const minutes = saleStartDate.getMinutes();
          const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

          // 이벤트 정보 가공
          groupedEvents[day].push({
            id: event.idx,
            title: `${event.title} 예매 오픈 (${timeString})`,
            category: event.category,
            ticketVendor: event.ticketVendor,
            isPresale: event.isPresale,
            saleEnd: event.saleEnd
          });
        }
      }
    });

    events.value = groupedEvents;

    // 캘린더 날짜에 이벤트 표시 업데이트
    calendarDays.value = calendarDays.value.map(day => {
      return {
        ...day,
        hasEvent: day.currentMonth && events.value[day.date] ? true : false
      };
    });
  } catch (error) {
    console.error('이벤트 데이터 로딩 실패:', error);
  }
};

onMounted(async () => {
  // 현재 날짜로 초기화
  currentYear.value = new Date().getFullYear();
  currentMonth.value = new Date().getMonth() + 1;

  calculateCalendarDays();
  await fetchEventsForCurrentMonth();
});

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



// 컴포넌트 마운트 시 초기화
onMounted(() => {
  // 현재 날짜로 초기화 (예시에서는 2025년 4월로 설정)
  currentYear.value = 2025;
  currentMonth.value = 4;

  calculateCalendarDays();
  fetchEventsForCurrentMonth();
});
</script>