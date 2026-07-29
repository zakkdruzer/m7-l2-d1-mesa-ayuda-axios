import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NuevoTicketView from '../views/NuevoTicketView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/nuevo-ticket',
    name: 'nuevo-ticket',
    component: NuevoTicketView,
    beforeEnter: () => {
      const token = localStorage.getItem('token')
      return token ? true : '/login'
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router