import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Index from '@/pages/Index'
const Login = () => import('@/pages/Login')
const Index = () => import('@/pages/Index')
const Part1 = () => import('@/pages/Part1')
const Part2 = () => import('@/pages/Part2')
const Part3 = () => import('@/pages/Part3')
const Part4 = () => import('@/pages/Part4')
const Part5 = () => import('@/pages/Part5') 
const Part6 = () => import('@/pages/Part6')
const Part7 = () => import('@/pages/Part7')

Vue.use(Router)

const router = new Router({
  linkActiveClass:'active',
  mode:'history',
  routes: [
  	
    {
      path:'/',
      name:'index',
      component:Index,
      redirect:{name:'part1'},
      meta: { requiresAuth: true },
      children:[
        {
          path:'/part1/:id',
          name:'part1',
          component:Part1,
          meta: { requiresAuth: true }
        },
        {
          path:'/part2/:id',
          name:'part2',
          component:Part2,
          meta: { requiresAuth: true }
        },
        {
          path:'/part5/:id',
          name:'part5',
          component:Part5,
          meta: { requiresAuth: true }
        },
        {
          path:'/part6/:id',
          name:'part6',
          component:Part6,
          meta: { requiresAuth: true }
        },
        {
          path:'/part7/:id',
          name:'part7',
          component:Part7,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/part3/:id',
      name:'part3',
      component:Part3,
      meta: { requiresAuth: true }
    },
    {
      path:'/part4/:id',
      name:'part4',
      component:Part4,
      meta: { requiresAuth: true }
    }
  ]
})


// 路由守卫
router.beforeEach((to,from,next) =>{
  let isRequireLogin = to.matched.some(record => record.meta.requiresAuth),
      storageUserInfo = sessionStorage.getItem('userInfo');
  if(isRequireLogin && storageUserInfo){
    if(to.path == '/'){
      next('/Part1/01')
    }else{
      next()
    }
  }else{
      if(to.path == '/login'){
        next()
      }else{
        next('/login')
      }
  }
})


export default router
