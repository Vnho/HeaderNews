import Vue from 'vue'
import Login from '../views/login'
import Layout from '../views/layout'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routers = [
  // 登录页面
  {
    path: '/',
    name: 'Login',
    component: Login
  },

  // 首页
  {
    path: '/layout',
    name: 'Layout',
    component: Layout
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routers
})

router.beforeEach((to, from, next) => {
})

export default router
