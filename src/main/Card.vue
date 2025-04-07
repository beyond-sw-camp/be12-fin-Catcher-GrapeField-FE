<template>
  <div class="slider-wrapper">
    <div class="slider-header">
      <h2>{{ title }}</h2>
      <button v-if="showMoreButton" class="more-btn" @click="goToShowMore">더보기</button>
    </div>

    <div class="slider">
      <button class="nav prev" @click="prevPage" :disabled="currentPage === 0">
        &#10094;
      </button>

      <div class="cards-view">
        <div class="card" v-for="(card, index) in visibleCards" :key="card.id">
          <div class="image-wrapper">
            <img :src="card.imageUrl" alt="이미지" />
            <div v-if="card.badge" class="badge" :class="card.badgeType">
              {{ card.badge }}
            </div>
          </div>
          <div class="info">
            <h3 class="title">{{ card.title }}</h3>
            <p class="meta">{{ card.location }} | {{ card.date }}</p>
            <div class="bottom">
              <button class="details-btn">더보기</button>
              <div class="stats">
                <span><img src="../assets/icons/empty-heart.png" /> {{ card.likes }}</span>
                <span><img src="../assets/icons/comment2.png" /> {{ card.comments }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="nav next" @click="nextPage" :disabled="currentPage >= maxPage">
        &#10095;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    cards: Array,
    showMoreButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentPage: 0,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    itemsPerPage() {
      if (this.windowWidth < 768) return 1;
      else if (this.windowWidth < 1024) return 2;
      else return 3;
    },
    maxPage() {
      return Math.ceil(this.cards.length / this.itemsPerPage) - 1;
    },
    visibleCards() {
      const start = this.currentPage * this.itemsPerPage;
      return this.cards.slice(start, start + this.itemsPerPage);
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.currentPage > this.maxPage) {
        this.currentPage = this.maxPage;
      }
    },
    prevPage() {
      if (this.currentPage > 0) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.maxPage) this.currentPage++;
    },
    goToShowMore() {
      this.$router.push("/events");
    },
  },
};
</script>

<style scoped>
.slider-wrapper {
  width: 100%;
  max-width: 70vw;
  margin: 0 auto;
  padding: 1rem;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.slider-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #27272a;
}

.more-btn {
  background: none;
  border: none;
  color: #6b21a8;
  font-weight: bold;
  cursor: pointer;
}

.slider {
  display: flex;
  align-items: center;
  position: relative;
}

.cards-view {
  display: flex;
  gap: 1rem;
  overflow: hidden;
  flex: 1;
}

.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  min-width: 100%;
  max-width: 100%;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .card {
    min-width: calc(50% - 0.5rem);
    max-width: calc(50% - 0.5rem);
  }
}

@media (min-width: 1024px) {
  .card {
    min-width: calc(33.333% - 0.67rem);
    max-width: calc(33.333% - 0.67rem);
  }
}

.image-wrapper {
  height: 60%;
  position: relative;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: #22c55e;
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
}

.info {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  height: 40%;
}

.title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #27272a;
}

.meta {
  font-size: 0.85rem;
  color: #737373;
  margin-bottom: auto;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details-btn {
  background: #6b21a8;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  font-size: 0.8rem;
  cursor: pointer;
}

.details-btn:hover {
  background: #581c87;
}

.stats {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #737373;
}

.stats img {
  height: 1rem;
  width: 1rem;
  vertical-align: middle;
}

.nav {
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  color: #6b21a8;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
}

.nav:hover:not(:disabled) {
  background: #f3f4f6;
  transform: scale(1.1);
}

.nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
