import todo from '../views/todo.vue' // 代办事项页面
import recycle from '../views/recycle.vue' // 回收站页面
import {createRouter,createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/', redirect: '/todo' },// 配置默认路由，重定向到/todo
      { path: '/todo', component: todo },
      { path: '/recycle', component: recycle },
    ]
})

export default router
