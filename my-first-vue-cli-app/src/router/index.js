import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import auth from '../middleware/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      middleware: auth
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
