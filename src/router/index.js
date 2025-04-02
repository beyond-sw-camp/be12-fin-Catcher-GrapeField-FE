import { createWebHistory, createRouter } from "vue-router";

import Main from "../../public/Main.vue";
import Login from "../user/Login.vue";

const routes = [
    {path: "/", component: Main},
    {path: "/login", name: 'Login', component: Login},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;