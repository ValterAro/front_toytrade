import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import TradesView from "@/views/TradesView.vue";
import ToyView from "@/views/ToyView.vue";
import FaqView from "@/views/FaqView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AdminView from "@/views/AdminView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/trade/trades',
    name: 'trades',
    component: TradesView
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
  }
]

const router = new VueRouter({
  routes
})

export default router
