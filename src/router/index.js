import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import TradesView from "@/views/TradesView.vue";
import ToyView from "@/views/ToyView.vue";
import FaqView from "@/views/FaqView.vue";
import RegisterView from "@/views/RegisterView.vue";
import MyView from "@/views/MyView.vue";
import AdminView from "@/views/AdminView.vue";
import ConfirmationView from "@/views/ConfirmationView.vue";
import ProfileView from "@/views/ProfileView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/trade/all',
    name: 'trades',
    component: TradesView
  },
  {path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/trade/me',
    name: 'mytrades',
    component: MyView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/toy',
    name: 'toy',
    component: ToyView
  },
  {
    path: '/faq',
    name: 'faq',
    component: FaqView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: ConfirmationView
  }
]

const router = new VueRouter({
  routes
})

export default router
