<template>
    <div class="banner-wrapper">
        <div class="banner-container">
            <div class="banner-content" v-for="(slide, index) in slides" :key="index" v-show="currentIndex === index"
                :class="{ 'clickable': slide.link }">
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
                                    <span class="search-icon">🔍</span>
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

<script>
import bannerData from '../assets/data/banner-slides.json';

export default {
    name: 'TopBanner',
    data() {
        return {
            currentIndex: 0,
            slides: [],
            timer: null,
            searchQuery: '',
            isPaused: false
        };
    },
    created() {
        // 데이터에 링크 정보 추가
        this.slides = bannerData.slides.map(slide => {
            // 제목에 따른 링크 매핑
            let link = null;

            if (slide.title.includes('커뮤니티')) {
                link = '/community';
            } else if (slide.title.includes('콘서트')) {
                link = '/events';
            } else if (slide.title.includes('전시회')) {
                link = '/events';
            } else if (slide.title.includes('박람회')) {
                link = '/events';
            } else if (slide.title.includes('뮤지컬')) {
                link = '/events';
            } else if (slide.title.includes('이벤트')) {
                link = '/events';
            } else if (slide.title.includes('베스트 공연')) {
                link = '/events';
            } else if (slide.title.includes('문화 콘텐츠')) {
                link = '/';
            }

            return {
                ...slide,
                link: link
            };
        });
    },
    mounted() {
        this.startSlideTimer();
    },
    beforeUnmount() {
        this.stopSlideTimer();
    },
    methods: {
        startSlideTimer() {
            if (!this.isPaused) {
                this.timer = setInterval(() => {
                    this.nextSlide();
                }, 3000); // 3초마다 슬라이드 변경
            }
        },
        stopSlideTimer() {
            clearInterval(this.timer);
            this.timer = null;
        },
        pauseSlider() {
            this.isPaused = true;
            this.stopSlideTimer();
        },
        resumeSlider() {
            this.isPaused = false;
            this.startSlideTimer();
        },
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        },
        goToSlide(index) {
            this.currentIndex = index;
            // 수동으로 슬라이드 변경 시 타이머 재설정
            this.stopSlideTimer();
            this.startSlideTimer();
        },
        goToSearch() {
            // 검색 페이지로 이동
            if (this.searchQuery.trim()) {
                if (this.$router) {
                    this.$router.push({
                        path: '/search',
                        query: { q: this.searchQuery }
                    });
                } else {
                    // 라우터가 없는 경우 직접 URL 변경
                    window.location.href = `/search?q=${encodeURIComponent(this.searchQuery)}`;
                }
            }
        }
    }
};
</script>

<style scoped>
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
    width: 70vw;
    margin: 4vh auto;
    padding: 0 1vw;
}

.banner-container {
    width: 100%;
    height: 28vh;
    min-height: 240px;
    background-color: #f8f5ff;
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
    color: #333;
    margin-bottom: 1.2vh;
}

.banner-subtitle {
    font-size: 1.2vw;
    color: #777;
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
@media (max-width: 1200px) {
    .banner-wrapper {
        width: 80vw;
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
        width: 85vw;
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

@media (max-width: 600px) {
    .banner-wrapper {
        width: 90vw;
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