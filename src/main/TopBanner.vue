<template>
    <div class="banner-wrapper">
        <div class="banner-container">
            <div class="banner-content" v-for="(slide, index) in slides" :key="index" v-show="currentIndex === index">
                <div class="banner-text">
                    <h1 class="banner-title">{{ slide.title }}</h1>
                    <p class="banner-subtitle">{{ slide.subtitle }}</p>
                    <!-- 첫 번재 데이터에만 검색 기능 넣기 -->
                    <div class="search-wrapper" v-if="index === 0"> 
                            <input type="text" class="search-input" :placeholder="slide.searchPlaceholder">
                            <button class="search-button">
                                <span class="search-icon">🔍</span>
                            </button>
                    </div>
                </div>
            </div>
            <div class="pagination-dots">
                <div v-for="(slide, index) in slides" :key="index" class="dot"
                    :class="{ active: currentIndex === index }" @click="goToSlide(index)"></div>
            </div>
        </div>
    </div>
</template>

<script>
import bannerData from '../assets/data/banner-slides.json';

export default {
    data() {
        return {
            currentIndex: 0,
            slides: [],
            timer: null
        };
    },
    created() {
        this.slides = bannerData.slides;
    },
    mounted() {
        this.startSlideTimer();
    },
    beforeUnmount() {
        this.stopSlideTimer();
    },
    methods: {
        startSlideTimer() {
            this.timer = setInterval(() => {
                this.nextSlide();
            }, 3000); // 3초마다 슬라이드 변경
        },
        stopSlideTimer() {
            clearInterval(this.timer);
        },
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        },
        goToSlide(index) {
            this.currentIndex = index;
            // 수동으로 슬라이드 변경 시 타이머 재설정
            this.stopSlideTimer();
            this.startSlideTimer();
        }
    }
};
</script>

<style scoped>

.banner-wrapper {
  width: 95%;
  max-width: 95vw;
  margin: 1vh auto;
  padding: 0 10vw;
}

.banner-container {
    width: 100%;
    height: 30vh;
    min-height: 200px;
    background-color: #f8f5ff;
    border-radius: 0.8vw;
    position: relative;
    overflow: hidden;
}

.banner-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 3vh 4vw;
}

.banner-text {
    position: relative;
    z-index: 2;
    max-width: 80%;
}

.banner-title {
    font-size: min(2.5vw, 32px);
    font-weight: 700;
    color: #333;
    margin-bottom: 1vh;
}

.banner-subtitle {
    font-size: min(1.4vw, 18px);
    color: #777;
    margin-bottom: 2vh;
}

.search-wrapper {
    display: flex;
    width: min(60%, 500px);
    height: 5vh;
    min-height: 40px;
    margin-top: 2vh;
    position: relative;
}

.search-input {
    width: calc(100% - 40px);
    height: 100%;
    border: none;
    border-radius: 4px 0 0 4px;
    padding: 0 1.5vw;
    font-size: min(1.1vw, 16px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-button {
    width: 40px;
    height: 100%;
    background-color: #6a0dad;
    border: none;
    border-radius: 0 4px 4px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.search-icon {
    color: white;
    font-size: min(1.1vw, 16px);
}

.pagination-dots {
    position: absolute;
    bottom: 3vh;
    left: 4vw;
    display: flex;
    gap: 0.8vw;
}

.dot {
    width: 0.6vw;
    height: 0.6vw;
    max-width: 8px;
    max-height: 8px;
    border-radius: 50%;
    background-color: #ddd;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dot.active {
    background-color: #6a0dad;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
    .banner-container {
        height: 25vh;
    }

    .banner-title {
        font-size: 4vw;
    }

    .banner-subtitle {
        font-size: 2.2vw;
    }

    .search-wrapper {
        width: 80%;
    }

    .search-input {
        font-size: 2vw;
    }

    .dot {
        width: 1vw;
        height: 1vw;
    }
}

@media (max-width: 480px) {
    .banner-wrapper {
        width: 95%;
        padding: 0 1vw;
    }

    .banner-container {
        height: 30vh;
    }

    .banner-text {
        max-width: 60%;
    }

    .banner-title {
        font-size: 4vw;
    }

    .banner-subtitle {
        font-size: 3.5vw;
    }

    .search-wrapper {
        width: 90%;
    }

    .search-input {
        font-size: 3vw;
    }

    .dot {
        width: 1.5vw;
        height: 1.5vw;
    }
}
</style>