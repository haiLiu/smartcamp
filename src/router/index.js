import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import Home from '@/views/home/Home.vue'
import Welcome from '@/views/home/Welcome.vue'
import Users from '@/views/user/Users.vue'
import Rights from '@/views/power/Rights.vue'
import Roles from '@/views/power/Roles.vue'
import Camp from '@/views/camp/Camp.vue'
import addCamp from '@/views/camp/addCamp.vue'


//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {path: '/',redirect: '/login'},
  {path: '/login',component: Login},
  {path: '/register',component: Register},
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {path: '/welcome',component: Welcome},
      {path: '/users', component: Users},
      {path: '/rights', component: Rights},
      {path: '/roles', component: Roles},
      {path: '/goods', component: Camp},
      {path: '/params', component: addCamp},

    ]
  }, 
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
  if(to.path === '/register'){
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