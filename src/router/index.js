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
import Admin from "../admin/Admin.vue"
import SignupSuccess from "../user/SignupSuccess.vue";
import EventsRegister from "../events/Register.vue";
import EmailVerification from "../user/EmailVerification.vue";
import EventShowMore from "../events/EventShowMore.vue";
import Detail from "../events/Detail.vue";
import ChatRoom from "../events/chat/Detail.vue";
import ChatRoomList from "../events/chat/List.vue";
import MyPage from "../user/mypage/MyPage.vue";
import DetailCalendar from "../calendar/DetailCalendar.vue";

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
    {path: "/admin", component: Admin},
    {path: "/signupsuccess", name: 'SignupSuccess', component: SignupSuccess},
    {path: '/emailverify', name: EmailVerification, component: EmailVerification },
    {path: "/events/register", component: EventsRegister},
    {path: "/events", name: 'EventShowMore', component: EventShowMore},
    { path: "/events/:id", name: 'Detail', component: Detail, props: true },
    { path: "/chat-list", name: "ChatRoomList", component: ChatRoomList, props: true, meta: { standalone: true } },
    { path: "/chat-room/:id", name: "ChatRoom", component: ChatRoom, props: true, meta: { standalone: true } },
    { path:"/mypage", component: MyPage},
    {path: "/calendar_detail", name: 'DetailCalendar', component: DetailCalendar},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;