<template>
    <div class="card-slider-container">
        <div class="card-slider-header">
            <h2 class="section-title">{{ title }}</h2>
            <button class="more-btn">더보기</button>
        </div>

        <div class="card-slider">
            <!-- 왼쪽 화살표 버튼 -->
            <button class="nav-button prev-button" @click="prevPage" :disabled="currentPage === 0"
                :class="{ disabled: currentPage === 0 }">
                <span class="arrow-icon">&#10094;</span>
            </button>

            <!-- 카드들 -->
            <div class="cards-container">
                <div v-for="(card, index) in visibleCards" :key="card.id" class="card" :style="getCardStyle(index)">
                    <div class="card-image-container">
                        <img :src="card.imageUrl" alt="콘텐츠 이미지" class="card-image" />
                        <div v-if="card.badge" class="card-badge" :class="card.badgeType">
                            {{ card.badge }}
                        </div>
                    </div>

                    <div class="card-content">
                        <h3 class="card-title">{{ card.title }}</h3>
                        <p class="card-location">{{ card.location }} | {{ card.date }}</p>

                        <div class="card-footer">
                            <button class="details-button">더보기</button>
                            <div class="card-stats">
                                <!-- <Card title="추천" /> -->
                                <span class="like-count"><img src="../assets/icons/empty-heart.png" alt="" class="heart"> {{
                                    card.likes }}</span>
                                <span class="comment-count"><img src="../assets/icons/comment2.png" alt=""> {{ card.comments }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 오른쪽 화살표 버튼 -->
            <button class="nav-button next-button" @click="nextPage"
                :disabled="currentPage >= Math.ceil(cards.length / itemsPerPage) - 1"
                :class="{ disabled: currentPage >= Math.ceil(cards.length / itemsPerPage) - 1 }">
                <span class="arrow-icon">&#10095;</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '추천'
        },
        cards: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            currentPage: 0,
            windowWidth: window.innerWidth
        };
    },
    computed: {
        itemsPerPage() {
            // 화면 너비에 따라 표시할 카드 수 결정
            if (this.windowWidth < 768) {
                return 1;
            } else if (this.windowWidth < 1024) {
                return 2;
            } else if (this.windowWidth < 1280) {
                return 3;
            } else {
                return 3; // 기본값은 3개
            }
        },
        visibleCards() {
            const startIndex = this.currentPage * this.itemsPerPage;
            return this.cards.slice(startIndex, startIndex + this.itemsPerPage);
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
            // 페이지 변경 시 최대 페이지 범위를 벗어나지 않도록 조정
            const maxPage = Math.ceil(this.cards.length / this.itemsPerPage) - 1;
            if (this.currentPage > maxPage) {
                this.currentPage = maxPage < 0 ? 0 : maxPage;
            }
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        },
        nextPage() {
            const maxPage = Math.ceil(this.cards.length / this.itemsPerPage) - 1;
            if (this.currentPage < maxPage) {
                this.currentPage++;
            }
        },
        getCardStyle(index) {
            return {
                transition: 'transform 0.3s ease, opacity 0.3s ease',
            };
        }
    }
};
</script>

<style scoped>
    img {
        height: 1.4vw;
        width: 1.4vw;
    
    }
.heart {
    height: 1.3vw;
    width: 1.3vw;
}

.card-slider-container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 1rem;
}

.card-slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #27272a;
}

.more-btn {
    font-size: 1.2rem;
    font-weight: 700;
    color: #27272a;
    background: none;
    border: none;
    cursor: pointer;
}

.card-slider {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.cards-container {
    flex: 1;
    display: flex;
    gap: 1rem;
    overflow: hidden;
}

.card {
    flex: 1;
    min-width: calc(33.333% - 1rem);
    max-width: calc(33.333% - 1rem);
    height: 480px;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.card-image-container {
    position: relative;
    height: 65%;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
    transition: transform 0.3s ease;
}

.card:hover .card-image {
    transform: scale(1.05);
}

.card-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
}

.card-badge.ongoing {
    background-color: #22c55e;
    /* 녹색 */
    color: white;
}

.card-badge.soon {
    background-color: #22c55e;
    /* 녹색 */
    color: white;
}

.card-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 35%;
}

.card-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #27272a;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-location {
    font-size: 0.9rem;
    color: #737373;
    margin-bottom: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
}

.details-button {
    background-color: #6b21a8;
    /* 보라색 */
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.details-button:hover {
    background-color: #581c87;
}

.card-stats {
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
    color: #737373;
}

.nav-button {
    width: 3rem;
    height: 3rem;
    background-color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
}

.nav-button:hover {
    background-color: #f3f4f6;
    transform: scale(1.1);
}

.nav-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.arrow-icon {
    font-size: 1.2rem;
    color: #6b21a8;
}

/* 반응형 스타일 */
@media (max-width: 1280px) {
    .card {
        min-width: calc(50% - 1rem);
        max-width: calc(50% - 1rem);
    }
}

@media (max-width: 1024px) {
    .card {
        min-width: calc(50% - 1rem);
        max-width: calc(50% - 1rem);
    }
}

@media (max-width: 768px) {
    .card {
        min-width: 100%;
        max-width: 100%;
    }

    .card-slider {
        padding: 0 1rem;
    }

    .nav-button {
        width: 2.5rem;
        height: 2.5rem;
    }
}

@media (max-width: 480px) {
    .section-title {
        font-size: 1.2rem;
    }

    .more-btn {
        font-size: 1rem;
    }

    .card-content {
        padding: 0.8rem;
    }

    .card-title {
        font-size: 1rem;
    }

    .card-location {
        font-size: 0.8rem;
    }

    .details-button,
    .card-stats {
        font-size: 0.7rem;
    }
}
</style>