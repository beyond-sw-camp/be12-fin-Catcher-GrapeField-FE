<template>
    <div class="category-container">
        <h2 class="category-title">카테고리</h2>
        <div class="category-buttons">
            <button v-for="category in categories" :key="category.id" class="category-button"
                :class="{ active: selectedCategory === category.id }" @click="selectCategory(category.id)">
                <div class="category-name">{{ category.name }}</div>
                <div class="category-count">{{ category.count }}</div>
            </button>
        </div>
    </div>
</template>

<script>
import categoryData from '../assets/data/category.json'
export default {
    data() {
        return {
            selectedCategory: 'all',
            categories: []
        };
    },
    created() {
        this.categories = categoryData.categories;
    },
    methods: {
        selectCategory(categoryId) {
            this.selectedCategory = categoryId;
            this.$emit('category-changed', categoryId);
        }
    }
};
</script>

<style scoped>
.category-container {
    margin-bottom: 2vw;
    width: 95%;
    max-width: 95vw;
    margin: 2vh auto;
    padding: 0 5vw;
}

.category-title {
    font-size: 1.5vw;
    font-weight: 700;
    color: #27272a;
    margin-bottom: 1vw;
}

.category-buttons {
    display: flex;
    justify-content: space-evenly;
    gap: 1vw;
    overflow-x: auto;
    padding-bottom: 0.5vw;
}

.category-button {
    min-width: 10vw;
    height: 6vw;
    background-color: white;
    border: none;
    border-radius: 0.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.category-button.active {
    background-color: #6b21a8;
}

.category-name {
    font-size: 1.2vw;
    font-weight: 700;
    color: #525252;
    margin-bottom: 0.5vw;
}

.category-count {
    font-size: 0.8vw;
    color: #737373;
}

.category-button.active .category-name,
.category-button.active .category-count {
    color: white;
}

/* 반응형 */
@media (max-width: 768px) {
    .category-title {
        font-size: 2.5vw;
    }

    .category-button {
        min-width: 15vw;
        height: 8vw;
    }

    .category-name {
        font-size: 2vw;
    }

    .category-count {
        font-size: 1.2vw;
    }
}

@media (max-width: 480px) {
    .category-title {
        font-size: 4vw;
    }

    .category-buttons {
        gap: 2vw;
    }

    .category-button {
        min-width: 25vw;
        height: 12vw;
    }

    .category-name {
        font-size: 3vw;
    }

    .category-count {
        font-size: 2vw;
    }
}
</style>