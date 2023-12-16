import { createRouter, createWebHistory } from 'vue-router'

import { auth } from '@/services/firebase'

const routes = [
  {
    component: () => import('@/views/LoginView.vue'),
    meta: { layout: 'empty' },
    name: 'login',
    path: '/login'
  },
  {
    component: () => import('@/views/RegisterView.vue'),
    meta: { layout: 'empty' },
    name: 'register',
    path: '/register'
  },
  {
    component: () => import('@/views/HomeView.vue'),
    meta: { auth: true, layout: 'main' },
    name: 'home',
    path: '/'
  },
  {
    component: () => import('@/views/CategoriesView.vue'),
    meta: { auth: true, layout: 'main' },
    name: 'categories',
    path: '/categories'
  },
  {
    component: () => import('@/views/DetailView.vue'),
    meta: { auth: true, layout: 'main' },
    name: 'detail',
    path: '/detail/:id',
    props: true
  },
  {
    component: () => import('@/views/HistoryView.vue'),
    meta: { auth: true, layout: 'main' },
    name: 'history',
    path: '/history'
  },
  {
    component: () => import('@/views/PlanningView.vue'),
    meta: { auth: true, layout: 'main' },
    name: 'planning',
    path: '/planning'
  },
  {
    component: () => import('@/views/ProfileView.vue'),
    meta: { auth: true, layout: 'main' },
    name: 'profile',
    path: '/profile'
  },
  {
    component: () => import('@/views/RecordView.vue'),
    meta: { auth: true, layout: 'main' },
    name: 'record',
    path: '/record'
  },
  {
    component: () => import('@/views/NotFoundView.vue'),
    meta: { auth: true, layout: 'main' },
    name: 'not-found',
    path: '/:pathMatch(.*)*'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  const user = auth.currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !user) {
    return { name: 'login', query: { message: 'login' } }
  }
})

export default router
