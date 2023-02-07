import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import TradesView from "@/views/TradesView.vue";
import RegisterView from "@/views/RegisterView.vue";

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
  }
]

const router = new VueRouter({
  routes
})

export default router
