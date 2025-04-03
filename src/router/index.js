import { createWebHistory, createRouter } from "vue-router";

import Main from "../../public/Main.vue";
import CustomerCenter from "../admin/CustomerCenter.vue"

const routes = [
    {path: "/", component: Main},
    {path: "/customercenter", component: CustomerCenter},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;