import { getAuth } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const auth = getAuth()
  const user = auth.currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !user) {
    next({ name: 'login', query: { message: 'login' } })
  } else {
    next()
  }
})

export default router
