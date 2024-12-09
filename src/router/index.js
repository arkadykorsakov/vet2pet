import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      layout: 'auth'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
