import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // vue插件



export default defineConfig({
  base: './',
  server: {
    port: 8888
  },
  plugins: [
    vue(), // 针对vue文件解析
    
    ]
})
