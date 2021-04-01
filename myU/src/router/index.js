import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


let router = new Router({
  routes: [{
    path : '/',
    component : ()=>import('../components/index'),
    children : [{
      path : '/cart',
      component : ()=>import("../views/cart"),
      name: '购物车'
    },{
      path : '/mine',
      component : ()=> import("../views/mine"),
      name: '我的',
      // beforeEnter : (to,from,next)=>{
      //   // if (to.path === '')
      //   if (!localStorage.getItem('person')){
      //     next('/login')
      //     return
      //   }
      //   next()
      // }
    },{
      path : '/home',
      component : ()=>import("../views/home"),
      name : '首页'
    },{
      path : '/sort',
      component : ()=>import('../views/sort'),
      name: '分类'
    },{
      path: '',
      redirect : '/home'
    }]
  },{
    path: '/detail',
    component: () =>import("../pages/detail")
  },{
    path: '/goodssure',
    component: ()=>import('../pages/goodsSure'),
    name: '确认订单'
  },{
    path: '/login',
    component: ()=>import('../pages/login')
  },{
    path: '/register',
    component: ()=>import('../pages/register')
  },
    {
    path: '/goodslist',
    component: ()=>import('../pages/goodsList'),
    name: '小U商城'
  }
  ,{
    path: '*',
    director : '/                                                                                                                                                 '
  }]
})

// router.beforeEach((to,from,next) => {
//   if (to.path === '/logIn') {
//     next()
//     return
//   }
//   let state = localStorage.getItem('isTrue');
//   if (state){
//     next()
//     return;
//   }
//   next('/logIn')
// })

export default router
