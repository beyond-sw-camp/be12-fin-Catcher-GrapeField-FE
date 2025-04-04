import { createWebHistory, createRouter } from "vue-router";
import Main from "../main/Main.vue";
import Login from "../user/Login.vue";
import Signup from "../user/Signup.vue";
import GeneralResult from "/src/search/GeneralResult.vue";
import EventsResult from "/src/search/EventsResult.vue";
import PostResult  from "/src/search/PostResult.vue";
import ReviewResult from "/src/search/ReviewResult.vue";
import FindPassword from "../user/FindPassword.vue";
import CustomerCenter from "../admin/customercenter/CustomerCenter.vue"
import SignupSuccess from "../user/SignupSuccess.vue";
import EmailVerification from "../user/EmailVerification.vue";
import EventShowMore from "../events/EventShowMore.vue";
import Detail from "../events/Detail.vue";

const routes = [
    {path: "/", component: Main},
    {path: "/login", name: 'Login', component: Login},
    {path: "/signup", name: 'Signup', component: Signup},
    {path: "/search", name: 'Search', component: GeneralResult},
    {path: "/search/events", name: 'EventsResult', component: EventsResult},
    {path: "/search/post", name: 'PostResult', component: PostResult},
    {path: "/search/review", name: 'ReviewResult', component: ReviewResult},
    {path: "/findpassword", name: 'FindPassword', component: FindPassword},
    {path: "/customercenter", component: CustomerCenter},
    {path: "/signupsuccess", name: 'SignupSuccess', component: SignupSuccess},
    { path: '/emailverify', name: EmailVerification, component: EmailVerification },
    {path: "/events", name: 'EventShowMore', component: EventShowMore},
    {path: "/events/:id", name: 'Detail', component: Detail, props: true},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;