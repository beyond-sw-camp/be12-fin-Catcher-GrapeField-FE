<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue';
import Report from './Report.vue';
import Qna from './customercenter/Qna.vue';
import UserManage from './UserManage.vue';
import RequestList from './customercenter/RequestList.vue';
import { useUserStore } from '../stores/useUserStore';

const userStore = useUserStore();
const userRole = ref({
    role:''
})

const selectedMenu = ref({
    menu:'report'
});

const handleMenuType = (menu) => {
    selectedMenu.value.menu = menu
}

</script>

<template>
    <div class="wrapper flex min-h-screen">
      <!-- 왼쪽 사이드바 -->
      <Sidebar class="w-100 bg-violet-800 text-white" :menus="selectedMenu.menu" @selectMenu="handleMenuType"/>
      <!-- 오른쪽 메인 콘텐츠 -->
      <main class="flex-1 mr-8 px-6">
        <Report v-if="selectedMenu.menu==='report'" />
        <Qna v-if="selectedMenu.menu==='qna'"/>
        <UserManage v-if="selectedMenu.menu==='user'"/>
        <RequestList v-if="selectedMenu.menu==='event'"/>
      </main>
    </div>
  </template>
<style scoped>
/*여백 통일 임시 조치*/
.wrapper{
  margin-bottom: 2vh;
  width: 95%;
  max-width: 95vw;
  margin-right: auto;
  margin-left: auto;
  padding: 0;
}
</style>