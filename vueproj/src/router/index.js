import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Index from '@/pages/Index'
const Home = () => import('@/pages/Home')
const Login = () => import('@/pages/Login')
const Index = () => import('@/pages/Index')
const Part1 = () => import('@/pages/Part1')
const Part2 = () => import('@/pages/Part2')
const Part3 = () => import('@/pages/Part3')
const Part4 = () => import('@/pages/Part4')
const Part5 = () => import('@/pages/Part5') 
const Part6 = () => import('@/pages/Part6')

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [
  	{
  		path:'/',
  		name:'login',
  		component:Login
  	},
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      redirect:{name:'part1'},
      children:[
        {
          path:'/part1',
          name:'part1',
          component:Part1
        },
        {
          path:'/part2',
          name:'part2',
          component:Part2
        },
        {
          path:'/part5',
          name:'part5',
          component:Part5
        },
        {
          path:'/part6',
          name:'part6',
          component:Part6
        }
      ]
    },
        {
          path:'/part3',
          name:'part3',
          component:Part3
        },
        {
          path:'/part4',
          name:'part4',
          component:Part4
        }
  ]
})
