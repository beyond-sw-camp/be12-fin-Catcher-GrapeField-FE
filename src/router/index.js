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
import EventsRegister from "../events/register/Register.vue";
import EmailVerification from "../user/EmailVerification.vue";
import EventShowMore from "../events/EventShowMore.vue";
import Event from "../events/Event.vue";
import ChatRoom from "../events/chat/Detail.vue";
import ChatRoomList from "../events/chat/List.vue";
import MyPage from "../user/mypage/MyPage.vue";
import DetailCalendar from "../calendar/DetailCalendar.vue";
import Community from "../events/community/Community.vue";
import PostRegister from "../events/post/PostRegister.vue"
import PostDetail from "@/events/post/PostDetail.vue"

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
    {
        path: '/admin',
        component: Admin,
        meta: { standalone: true },
      },
      {
        path: '/mypage',
        component: MyPage,
        meta: { standalone: true },
      },
    {path: "/signupsuccess", name: 'SignupSuccess', component: SignupSuccess},
    {path: '/email_verify', name: EmailVerification, component: EmailVerification },
    {path: '/email_verify/:uuid',name: 'EmailVerify',component: () => import('@/user/EmailVerificationView.vue')},
    //관리자 페이지(공연/전시 등록)
    { path: '/events/register', component: EventsRegister },
    //사용자 페이지(공연/전시 신청)
    { path: '/events/request', component: EventsRegister },
    { path: "/events", name: 'EventShowMore', component: EventShowMore},
    { path: '/events/:idx',
      component: Event,
      children: [
        { path: '', // 기본 경로 (게시글 목록)
          name: 'EventPostList',
          component: () => import('@/events/post/EventPost.vue')},
        { path: 'post/:idx', // 게시글 상세
          name: 'EventPostDetail',
          component: () => import('@/events/post/PostDetail.vue'), props: true}
      ]
    },
    { path: "/post/register", name:'PostRegister', component: PostRegister},
    { path: "/chat-list", name: "ChatRoomList", component: ChatRoomList, props: true, meta: { standalone: true } },
    { path: "/chat-room/:id", name: "ChatRoom", component: ChatRoom, props: true, meta: { standalone: true } },
    // { path:"/mypage", component: MyPage},
    {path: "/calendar_detail", name: 'DetailCalendar', component: DetailCalendar},
    {path: "/community", name: 'CommunityHome', component: Community},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 항상 맨 위로 스크롤 이동
        return { top: 0 }
      }
});

export default router;