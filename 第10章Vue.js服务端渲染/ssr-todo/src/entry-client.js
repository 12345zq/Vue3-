import { createApp } from './main'

const { app, router } = createApp()
// 针对有懒加载路由组件的情况，需等待路由解析完
router.isReady().then(() => {
  app.mount('#app')
})
