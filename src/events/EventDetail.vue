<template>
  <div class="text-gray-800 text-sm space-y-10 max-w-[1320px] mx-auto">
    <!-- 예매 정보 -->
    <section>
      <h2 class="text-lg font-bold mb-3">예매 정보</h2>

      <div class="flex flex-col gap-6">
        <!-- 예매 안내 -->
        <div>
          <h3 class="font-semibold mb-2">예매 안내</h3>
          <!-- 예매 안내 정보 -->
          <div v-if="hasTicketInfo" class="flex flex-wrap gap-4">
            <!-- 선예매 -->
            <div v-for="ticketInfo in presaleTickets" :key="ticketInfo.saleStart"
              class="bg-purple-50 p-4 rounded-md w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] min-w-[180px] flex flex-col justify-between">
              <div>
                <p class="font-semibold mb-2">선예매</p>
                <p class="text-sm text-gray-700 break-words">
                  {{ formatTicketPeriod(ticketInfo.saleStart) }}
                </p>
              </div>
              <div class="mt-2 flex flex-wrap gap-1 items-center break-words">
                <span class="px-2 py-0.5 rounded text-xs text-white"
                  :class="getVendorClass(ticketInfo.ticketVendor.toUpperCase())">
                  {{ ticketInfo.ticketVendor }}
                </span>
                <a v-if="ticketInfo.ticketLink" :href="ticketInfo.ticketLink" target="_blank"
                  class="ml-2 text-xs text-blue-600 underline break-all">
                  예매 바로가기
                </a>
              </div>

            </div>

            <!-- 일반예매 -->
            <div v-for="ticketInfo in normalTickets" :key="ticketInfo.saleStart"
              class="bg-green-50 p-4 rounded-md w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] min-w-[180px] flex flex-col justify-between">
              <div>
                <p class="font-semibold mb-2">일반예매</p>
                <p class="text-sm text-gray-700 break-words">
                  {{ formatTicketPeriod(ticketInfo.saleStart) }}
                </p>
              </div>
              <div class="mt-2 flex flex-wrap gap-1 items-center break-words">
                <span class="px-2 py-0.5 rounded text-xs text-white"
                  :class="getVendorClass(ticketInfo.ticketVendor.toUpperCase())">
                  {{ ticketInfo.ticketVendor }}
                </span>
                <a v-if="ticketInfo.ticketLink" :href="ticketInfo.ticketLink" target="_blank"
                  class="ml-2 text-xs text-blue-600 underline break-all">
                  예매 바로가기
                </a>
              </div>

            </div>
          </div>
          <div v-else class="bg-gray-50 p-4 rounded-md text-center text-gray-500">
            예매 정보가 없습니다.
          </div>
        </div>

        <!-- 가격 정보 -->
        <div>
          <h3 class="font-semibold mb-2">가격 안내</h3>
          <div v-if="event.seatPriceList && event.seatPriceList.length > 0" class="bg-gray-50 p-4 rounded-md">
            <div class="flex flex-wrap gap-x-6 gap-y-3">
              <div v-for="seat in event.seatPriceList" :key="seat.seatType"
                class="flex items-center bg-violet-50 rounded px-3 py-1 shadow-sm">
                <div class="mr-3 text-gray-700 whitespace-normal">{{ seat.seatType }}</div>
                <div class="font-semibold text-right text-gray-900">{{ formatPrice(seat.price) }}원</div>
                <div v-if="seat.description" class="ml-2 text-xs truncate text-gray-400">({{ seat.description }})</div>
              </div>
            </div>
          </div>
          <div v-else class="bg-gray-50 p-4 rounded-md text-center text-gray-500">가격 정보가 없습니다.</div>
        </div>
      </div>

      <hr class="mt-6 border-gray-300" />
    </section>

    <!-- 출연진 -->
    <section>
      <h2 class="text-lg font-bold mb-3">출연진</h2>
      <div v-if="participants.performers && participants.performers.length > 0" class="flex flex-wrap gap-4">
        <div v-for="actor in participants.performers" :key="actor.name"
          class="w-32 bg-white rounded-lg shadow overflow-hidden">
          <div class="h-40 overflow-hidden">
            <img :src="actor.imgUrl || 'https://via.placeholder.com/150'" :alt="actor.name"
              class="w-full h-full object-cover" />
          </div>
          <div class="p-3">
            <p class="font-semibold text-center">{{ actor.name }}</p>
            <p class="text-sm text-gray-600 text-center">{{ actor.role }}</p>
          </div>
        </div>
      </div>
      <div v-else class="bg-gray-50 p-4 rounded-md">
        <p class="text-center text-gray-500">출연진 정보가 없습니다.</p>
      </div>
      <hr class="mt-6 border-gray-300" />
    </section>

    <!--제작, 후원-->
    <section>
      <h2 class="text-lg font-bold mb-3">제작, 후원</h2>
      <div v-if="participants.organizations && participants.organizations.length > 0" class="flex flex-wrap gap-4">
        <div v-for="company in participants.organizations" :key="company.name"
          class="w-32 bg-white rounded-lg shadow overflow-hidden">
          <div class="h-40 overflow-hidden">
            <img :src="company.imgUrl || 'https://via.placeholder.com/150'" :alt="company.name"
              class="w-full h-full object-cover" />
          </div>
          <div class="p-3">
            <p class="font-semibold text-center">{{ company.name }}</p>
            <p class="text-sm text-gray-600 text-center">{{ company.type }}</p>
          </div>
        </div>
      </div>
      <div v-else class="bg-gray-50 p-4 rounded-md">
        <p class="text-center text-gray-500">제작/후원 정보가 없습니다.</p>
      </div>
      <hr class="mt-6 border-gray-300" />
    </section>

    <!-- 공연 소개 -->
    <section>
      <h2 class="text-lg font-bold mb-3">공연 소개</h2>
      <p v-if="event.description" class="leading-relaxed whitespace-pre-line">
        {{ event.description }}
        <br /><br />
        {{ event.venue }}에서 진행되는 이번 공연은 {{ event.ageLimit || '전체' }} 이상 관람 가능한
        작품으로,<br />
        소비자와 자신의 역할을 잇는 배우들의 무대입니다.<br />
        특유의 복식, 공정성, 정정당당 등 실력파 배우들의 열연이 이번 작품의 큰
        highlight입니다.<br />
        {{ calculateDuration }} 동안 펼쳐지는 감동의 무대, &lt;{{ event.title }}&gt;과 함께하세요.
      </p>
      <p v-else class="text-center text-gray-500 p-4 bg-gray-50 rounded-md">
        공연 소개 정보가 없습니다.
      </p>
      <hr class="mt-6 border-gray-300" />
    </section>

    <!-- 관람 안내 -->
    <section>
      <h2 class="text-lg font-bold mb-3">관람 안내</h2>
      <p v-if="event.notification" class="list-disc list-inside text-gray-700">
        {{ event.notification }}
      </p>
      <div v-else class="bg-gray-50 p-4 rounded-md">
        <p class="text-center text-gray-500">관람 안내 정보가 없습니다.</p>
      </div>
      <hr class="mt-6 border-gray-300" />
    </section>

    <!-- 상세 이미지 -->
    <section ref="detailSectionRef">
      <h2 class="text-lg font-bold mb-3">상세 이미지</h2>
      <div class="border rounded-lg bg-gray-50 overflow-hidden transition-all duration-500">
        <template v-if="descriptionImages.length > 0">
          <img v-for="(img, i) in descriptionImages.slice(0, showCount)" :key="i"
            :src="BASE_IMAGE_URL + encodeURI(img.imgUrl)" alt="상세 이미지" class="w-full object-contain" />

          <!-- 로딩 중 표시 -->
          <div v-if="isLoading" class="text-center py-4 text-gray-500">
            이미지를 불러오는 중...
          </div>

          <!-- 더 이상 이미지가 없을 때 -->
          <div v-if="!hasMore" class="text-center py-4 text-gray-500">
            더 이상 이미지가 없습니다.
          </div>
        </template>
        <template v-else>
          <p class="text-sm text-gray-400 text-center py-10">
            이미지 정보가 없습니다.
          </p>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, nextTick } from "vue";
import { useEventsStore } from "@/stores/useEventsStore";

const eventStore = useEventsStore();

const props = defineProps({
  event: Object,
  idx: Number
});

// NOTE: 임시 이미지 링크
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

// 이미지 관련 상태
const descriptionImages = ref([]);
const showCount = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);

// 이미지 로딩 함수
const loadDetailImages = async () => {
  // 이미 로딩 중이거나 더 이상 이미지가 없으면 리턴
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;
  try {
    const response = await eventStore.getEventDetailImages(props.idx);
    if (response && response.length > 0) {
      descriptionImages.value = response;
      hasMore.value = response.length > 0;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error("상세 이미지 정보 로드 실패:", error);
    hasMore.value = false;
  } finally {
    isLoading.value = false;
  }
}

// Intersection Observer
const observer = ref(null);

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (
          entry.isIntersecting &&
          showCount.value < descriptionImages.value.length &&
          !isLoading.value
        ) {
          showCount.value++;
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '200px'
    }
  );

  // 마지막 이미지에 옵저버 설정
  nextTick(() => {
    const images = document.querySelectorAll('img');
    const lastImage = images[images.length - 1];
    if (lastImage) {
      observer.value.observe(lastImage);
    }
  });

  // 이미지 초기 로드
  loadDetailImages();
});

onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

// 출연진/기업 정보
const participants = ref({ performers: [], organizations: [] })
const loadParticipantDetail = async () => {
  try {
    const response = await eventStore.getParticipantDetail(props.idx)
    if (response) {
      participants.value.performers = response.performers || []
      participants.value.organizations = response.organizations || []
    }
  } catch (error) {
    console.error("참여자 정보 로드 실패:", error);
  }
}

// 기타 유틸
const formatPrice = (price) => price.toLocaleString('ko-KR')

// 티켓 정보 필터링 및 포매팅 추가
const presaleTickets = computed(() => {
  return props.event.ticketInfoList?.filter(ticket => ticket.isPresale) || []
})

const normalTickets = computed(() => {
  return props.event.ticketInfoList?.filter(ticket => !ticket.isPresale) || []
})

// 티켓 기간 포맷팅 함수 추가
const formatTicketPeriod = (dateString) => {
  if (!dateString) return '정보가 없습니다'

  const date = new Date(dateString)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시`
}

const hasTicketInfo = computed(() => {
  return props.event.ticketInfoList && props.event.ticketInfoList.length > 0
})
const getVendorClass = (vendor) => {
  switch (vendor) {
    case "INTERPARK": return "bg-red-400"
    case "YES24": return "bg-blue-500"
    case "MELON": return "bg-green-500"
    case "TICKETLINK": return "bg-orange-500"
    case "TICKETBAY": return "bg-gray-200"
    case "OFFICIAL": case "공식홈페이지": return "bg-black"
    default: return "bg-gray-400"
  }
}

const calculateDuration = computed(() => {
  if (!props.event.startDate || !props.event.endDate) return '미정'
  const start = new Date(props.event.startDate)
  const end = new Date(props.event.endDate)
  const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24))
  return diffDays === 0 ? '하루' : diffDays === 1 ? '이틀' : `${diffDays}일`
})

// 컴포넌트 마운트 시 추가 정보 로드
onMounted(() => {
  loadParticipantDetail()
})
</script>