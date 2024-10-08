import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/private/HomeView.vue'
import TodoView from '@/views/private/TodoView.vue'
import LoginView from '@/views/public/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoView,
    }
  ]
})

export default router