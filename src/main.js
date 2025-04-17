// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import Vue3Toastify from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import InfiniteLoading from "v3-infinite-loading";

// 커스텀 axios 인스턴스 사용
import axiosInstance from "./utils/axios";

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState());

app.use(pinia);
app.use(router);
app.use(Vue3Toastify, { autoClose: 3000 });
app.component("InfiniteLoading", InfiniteLoading);

// 전역 axios 설정 (선택적으로)
app.config.globalProperties.$axios = axiosInstance;

app.mount("#app");
