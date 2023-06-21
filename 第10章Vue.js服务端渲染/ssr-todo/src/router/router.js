import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
    routes:[
    { path: '/', redirect: '/todo' },// 配置默认路由，重定向到/todo
    {
      path:'/todo',
      component:()=>import('../views/todo.vue')// 代办事项页面
    },{
      path:'/recycle',
      component:()=>import('../views/recycle.vue')// 回收站页面
    }]
  })
}
