import { createWebHistory, createRouter } from "vue-router";

import Main from "../main/Main.vue";
import Login from "../user/Login.vue";
import Signup from "../user/Signup.vue";
import FindPassword from "../user/FindPassword.vue";

const routes = [
    {path: "/", component: Main},
    {path: "/login", name: 'Login', component: Login},
    {path: "/signup", name: 'Signup', component: Signup},
    {path: "/findpassword", name: 'FindPassword', component: FindPassword},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;