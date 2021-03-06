import Vue from 'vue'
import Login from '@/views/login'
import Layout from '@/views/layout'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import CommentDetail from '@/views/comment-detail'
import Material from '@/views/material'
import Account from '@/views/account'

Vue.use(VueRouter)

const routes = [
  // 为默认显示页重定向为首页
  {
    path: '/',
    redirect: '/layout'
  },

  // 登录页面
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  // 首页
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [
      // 文章列表
      {
        path: '/article',
        name: 'Article',
        component: Article
      },

      // 发布文章
      {
        path: '/publish',
        name: 'Publish',
        component: Publish
      },

      // 修改文章
      {
        path: '/publish/:articleId',
        name: 'updateArticle',
        component: Publish
      },

      // 评论列表
      {
        path: '/comment',
        name: 'Comment',
        component: Comment
      },

      // 评论管理
      {
        path: '/comment/:commentId',
        name: 'CommentDetail',
        props: true,
        component: CommentDetail
      },

      // 素材管理
      {
        path: '/material',
        name: 'Material',
        component: Material
      },

      // 账户信息
      {
        path: '/account',
        name: 'Account',
        component: Account
      }
    ]
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
  routes
})

/*
路由拦截器 beforeEach的用法
接受一个函数作为参数
参数1: to 表示去哪里的信息
参数2: from 表示来自哪里的信息
参数3: next 是一个方法,用于路由放行
*/
// 具体要做的就是:判断用户登录状态,有通过,没有不通过
router.beforeEach((to, from, next) => {
  // 加载页面时进度条开启
  Nprogress.start()

  // 判断当前进入页面是否为登录页
  if (to.path === '/login') {
    next()
    // 停止后续代码执行
    return
  }

  // 定义一个常量来接收浏览器本地存储的 token 数据
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    // 如果本地存储中没有 token 数据，则跳转到登录页
    next('/login')
    // 如果在登录页非登录状态访问
    // 非登录页面，手动终止进度条
    // 否则进度条不会停止
    Nprogress.done()
  }
})

router.afterEach(route => {
  Nprogress.done()
})

export default router
