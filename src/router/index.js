import { createWebHistory, createRouter } from "vue-router";

import Main from "../main/Main.vue";
import Login from "../user/Login.vue";
import Signup from "../user/Signup.vue";
import GeneralResult from "/src/search/GeneralResult.vue";
import EventsResult from "/src/search/EventsResult.vue";
import FindPassword from "../user/FindPassword.vue";

const routes = [
    {path: "/", component: Main},
    {path: "/login", name: 'Login', component: Login},
    {path: "/signup", name: 'Signup', component: Signup},
    {path: "/search", name: 'Search', component: GeneralResult},
    {path: "/search/events", name: 'EventsResult', component: EventsResult},
    {path: "/findpassword", name: 'FindPassword', component: FindPassword},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;