import { getAuth } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    component: () => import('@/views/LoginView'),
    meta: { layout: 'empty' },
    name: 'login',
    path: '/login'
  },
  {
    component: () => import('@/views/RegisterView'),
    meta: { layout: 'empty' },
    name: 'register',
    path: '/register'
  },
  {
    component: () => import('@/views/HomeView'),
    meta: { auth: true, layout: 'main' },
    name: 'home',
    path: '/'
  },
  {
    component: () => import('@/views/CategoriesView'),
    meta: { auth: true, layout: 'main' },
    name: 'categories',
    path: '/categories'
  },
  {
    component: () => import('@/views/DetailView'),
    meta: { auth: true, layout: 'main' },
    name: 'detail',
    path: '/detail/:id',
    props: true
  },
  {
    component: () => import('@/views/HistoryView'),
    meta: { auth: true, layout: 'main' },
    name: 'history',
    path: '/history'
  },
  {
    component: () => import('@/views/PlanningView'),
    meta: { auth: true, layout: 'main' },
    name: 'planning',
    path: '/planning'
  },
  {
    component: () => import('@/views/ProfileView'),
    meta: { auth: true, layout: 'main' },
    name: 'profile',
    path: '/profile'
  },
  {
    component: () => import('@/views/RecordView'),
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
