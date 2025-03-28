import { createWebHistory, createRouter } from "vue-router";

import Main from "../../public/Main.vue";

const routes = [
    {path: "/", component: Main},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;