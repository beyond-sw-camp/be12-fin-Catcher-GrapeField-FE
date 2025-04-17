<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../../common/Header.vue';
import Footer from '../../common/Footer.vue';
import Sidebar from './Sidebar.vue';
import UserInfo from './UserInfo.vue';
import Contents from './Contents.vue';
import Favorite from './Favorite.vue';
import QnA from './QnA.vue';
import MyCalendar from './MyCalendar.vue';

const route = useRoute()
const router = useRouter()

const selectedMenu = ref({
    menu: 'information'
});

const handleMenuType = (menu) => {
    selectedMenu.value.menu = menu
    // "글 관리" 외의 메뉴에서는 쿼리 제거
    if (menu !== 'contents') {
        router.replace({ query: {}  }) // 또는 route.path
    }
}
</script>

<template>
    <Header />
    <div class="mt-16 flex mt-4 min-h-screen"> 
        <!-- 왼쪽 사이드바 -->
        <Sidebar class="mt-16 w-100" :menus="selectedMenu.menu" @selectMenu="handleMenuType" />
        <!-- 오른쪽 메인 콘텐츠 -->
        <main class="mt-16 flex-1 mr-8 px-6">
            <UserInfo v-if="selectedMenu.menu === 'information'" />
            <Contents v-if="selectedMenu.menu === 'contents'" />
            <MyCalendar v-if="selectedMenu.menu === 'calender'" />
            <Favorite v-if="selectedMenu.menu === 'favorite'" />
            <QnA v-if="selectedMenu.menu === 'qna'" />
        </main>
    </div>
    <Footer />

</template>

<style scoped></style>