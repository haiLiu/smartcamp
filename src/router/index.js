import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {path: '/',redirect: '/login'},
  {path: '/login',component: Login},
  {path: '/home',component: Home}
]

const router = new VueRouter({
  routes
})

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  // from 代表从那个路径跳转而来
  // next 是一个函数,表示放行
  // next()放行 next('/login)强行跳转
  if(to.path === '/login'){
    return next();
  } 
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr){
    return next('/login')
  } 
  next()
})

export default router