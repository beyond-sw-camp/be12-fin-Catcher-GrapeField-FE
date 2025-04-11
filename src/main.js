import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import Vue3Toastify from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import InfiniteLoading from "v3-infinite-loading";

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState());

app.component("InfiniteLoading", InfiniteLoading);
app.use(Vue3Toastify, {autoClose: 3000});
app.use(router);
app.use(pinia);
app.mount("#app");