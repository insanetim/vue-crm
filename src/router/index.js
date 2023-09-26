import Vue from 'vue'
import VueRouter from 'vue-router'
import { getAuth } from 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('@/views/Register')
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Home')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Categories')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Detail')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/History')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Planning')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Profile')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Record')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const user = auth.currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !user) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
