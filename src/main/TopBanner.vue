<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import bannerData from '../assets/data/banner-slides.json';

const router = useRouter();

const currentIndex = ref(0);
const slides = ref([]);
const timer = ref(null);
const searchQuery = ref('');
const isPaused = ref(false);

onBeforeMount(() => {
  slides.value = bannerData.slides.map(slide => {
    let link = null;

    if (slide.events_id !== "null") {
      link = `/events/${slide.events_id}`;
    }
    else {
      link = '/events';
    }

    return {
      ...slide,
      link
    };
  });
});

onMounted(() => {
  startSlideTimer();
});

onBeforeUnmount(() => {
  stopSlideTimer();
});

function startSlideTimer() {
  if (!isPaused.value) {
    timer.value = setInterval(() => {
      nextSlide();
    }, 3000);
  }
}

function stopSlideTimer() {
  clearInterval(timer.value);
  timer.value = null;
}

function pauseSlider() {
  isPaused.value = true;
  stopSlideTimer();
}

function resumeSlider() {
  isPaused.value = false;
  startSlideTimer();
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
}

function goToSlide(index) {
  currentIndex.value = index;
  stopSlideTimer();
  startSlideTimer();
}

function goToSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    });
  }
}
function getBackgroundStyle(slide) {
  if (slide.imgSrc) {
    return {
      backgroundImage: `url(${slide.imgSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#f8f5ff' // 이미지 위에 약간 기본색 느낌 유지
    };
  } else {
    return {
      backgroundColor: '#f8f5ff'
    };
  }
}

</script>

<template>
    <div class="banner-wrapper">
        <div class="banner-container">
            <div class="banner-content" v-for="(slide, index) in slides" :key="index"
                 v-show="currentIndex === index"
                :class="{ 'clickable': slide.link}"
                :style="getBackgroundStyle(slide)">
              <div class="overlay"></div>
                <router-link v-if="slide.link" :to="slide.link" class="banner-link">
                    <div class="banner-text">
                        <h1 class="banner-title">{{ slide.title }}</h1>
                        <p class="banner-subtitle">{{ slide.subtitle }}</p>
                        <!-- 첫 번째 데이터에만 검색 기능 넣기 -->
                        <div class="search-wrapper" v-if="index === 0" @click.stop.prevent>
                            <form @submit.prevent="goToSearch" class="search-form">
                                <input type="text" class="search-input" :placeholder="slide.searchPlaceholder"
                                    v-model="searchQuery" @focus="pauseSlider" @blur="resumeSlider">
                                <button type="submit" class="search-button" @click.stop>
                                    <span class="search-icon font-bold">검색</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </router-link>

                <div v-else class="banner-text">
                    <h1 class="banner-title">{{ slide.title }}</h1>
                    <p class="banner-subtitle">{{ slide.subtitle }}</p>
                    <!-- 첫 번째 데이터에만 검색 기능 넣기 -->
                    <div class="search-wrapper" v-if="index === 0">
                        <form @submit.prevent="goToSearch" class="search-form">
                            <input type="text" class="search-input" :placeholder="slide.searchPlaceholder"
                                v-model="searchQuery" @focus="pauseSlider" @blur="resumeSlider">
                            <button type="submit" class="search-button">
                                <span class="search-icon">🔍</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="pagination-dots">
                <div v-for="(slide, index) in slides" :key="index" class="dot"
                    :class="{ active: currentIndex === index }" @click="goToSlide(index)">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4); /* 어두운 반투명 */
  z-index: 1;
}

/* 기존 스타일 그대로 유지 */
.banner-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
}

.banner-content.clickable {
    cursor: pointer;
    transition: transform 0.2s ease;
}

.banner-content.clickable:hover {
    transform: scale(1.01);
}

.search-wrapper form {
    display: flex;
    width: 100%;
    height: 100%;
}

.banner-wrapper {
    width: 70%;
    margin: 4vh auto;
    padding: 0 1vw;
}

.banner-container {
    width: 100%;
    height: 30vh;
    min-height: 240px;
    border-radius: 1vw;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0.3vh 0.8vw rgba(0, 0, 0, 0.1);
}

.banner-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 3vh 3vw;
}

.banner-text {
    position: relative;
    z-index: 2;
    max-width: 75%;
}

.banner-title {
    font-size: 2.2vw;
    font-weight: 700;
    color: black;
    margin-bottom: 1.2vh;
}

.banner-subtitle {
    font-size: 1.2vw;
    color: black;
    margin-bottom: 2.5vh;
}

.search-wrapper {
    display: flex;
    width: 40vw;
    max-width: 500px;
    height: 5vh;
    min-height: 50px;
    position: relative;
    z-index: 5;
}

.search-input {
    width: calc(100% - 50px);
    height: 100%;
    border: 1px solid #ddd;
    border-right: none;
    border-radius: 0.6vw 0 0 0.6vw;
    padding: 0 1.2vw;
    font-size: 1.1vw;
}

.search-button {
    min-width: 50px;
    width: 50px;
    flex: 0 0 50px;
    height: 100%;
    background-color: #9966cc;
    border: none;
    border-radius: 0 0.6vw 0.6vw 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.search-icon {
    color: white;
    font-size: 1.3vw;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
}

.pagination-dots {
    position: absolute;
    bottom: 2.4vh;
    left: 3vw;
    display: flex;
    gap: 0.8vw;
    z-index: 2;
}

.dot {
    width: 0.7vw;
    height: 0.7vw;
    min-width: 8px;
    min-height: 8px;
    border-radius: 50%;
    background-color: #ddd;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dot.active {
    background-color: #9966cc;
}

/* 반응형 스타일 */
@media (max-width: 1280px) {
    .banner-wrapper {
        width: 80%;
    }

    .banner-title {
        font-size: 2.5vw;
        text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
    }

    .banner-subtitle {
        font-size: 1.4vw;
    }

    .search-wrapper {
        width: 45vw;
    }

    .search-input,
    .search-icon {
        font-size: 1.3vw;
    }
}

@media (max-width: 768px) {
    .banner-wrapper {
        width: 85%;
    }

    .banner-container {
        height: 22vh;
        min-height: 200px;
    }

    .banner-title {
        font-size: 3.2vw;
    }

    .banner-subtitle {
        font-size: 1.8vw;
    }

    .search-wrapper {
        width: 55vw;
        height: 4.5vh;
        min-height: 45px;
    }

    .search-input,
    .search-icon {
        font-size: 1.6vw;
        text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
    }

    .dot {
        width: 1vw;
        height: 1vw;
    }
}

@media (max-width: 640px) {
    .banner-wrapper {
        width: 90%;
    }

    .banner-container {
        height: 20vh;
        min-height: 180px;
    }

    .banner-title {
        font-size: 4vw;
    }

    .banner-subtitle {
        font-size: 2.5vw;
        margin-bottom: 2vh;
    }

    .search-wrapper {
        width: 70vw;
        height: 4vh;
        min-height: 40px;
    }

    .search-input,
    .search-icon {
        font-size: 2.5vw;
    }

    .dot {
        width: 1.5vw;
        height: 1.5vw;
    }

    .banner-content {
        padding: 2vh 2.5vw;
    }
}
</style>