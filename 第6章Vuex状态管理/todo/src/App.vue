<template>

  <div class="container">
      <div class="app-content animated bounce">
        <navheader @change="changePage" :page="currentPage"></navheader>
         <transition enter-active-class="fadeIn animated faster" leave-active-class="fadeOut animated faster">
            <component :is="currentPage"></component>
        </transition>

      </div>
    </div>

</template>
<script>
  import navheader from './components/navheader.vue'
  import todo from './views/todo.vue'
  import recycle from './views/recycle.vue'
  import {ref,reactive,watch,watchEffect} from 'vue'

  /**
   * 待办事项页面组件
   */
  export default {
    name: 'App',// 组件的名称，尽量和文件名一致
    components: {
      navheader,
      todo,
      recycle
    },
    setup(){
      let currentPage = ref('todo') // 当前页面

      function changePage (val) {// 接收到子组件的调用

        // 改变当前页面
        currentPage.value = val
      }

      return {
        changePage,
        currentPage
      }
    }

  }
</script>
<style>
  body {
    margin: 0; /* 清除页面默认边距 */
  }
  #app {
    color: #2c3e50;/* 设置默认字体颜色 */
    background: linear-gradient(180deg, #2ebf91, #8360c3);/* 设置线性渐变：从蓝色到紫色 */
    height: 100vh;/* 设置容器高度为撑满容器 */
    display: flex;/* 设置容器为弹性布局 */
    align-items: center/* 设置文字居中 */
  }
  .container {
    padding: 0 10px;/* 设置内边距 */
    flex-grow: 1;/* 设置弹性值为了撑满宽度 */
    margin: 0 auto;/* 设置居中 */
    position: relative;
  }
  .app-content {
    background: #ededed;/* 设置背景颜色 */
    padding: 16px;/* 设置内边距 */
    padding-top: 0;/* 设置内上边距为0 */
    border-radius: 5px;/* 设置圆角属性 */
    box-shadow: 0 0 30px -5px #2c3e50;/* 设置边框阴影 */
    margin: 16px auto;/* 设置上下边距并左右居中 */
    min-height: 400px;/* 设置最小高度 */
  }
  .nav-header {
    padding: 20px;/* 设置内边距 */
    text-align: center;/* 设置文字居中 */
  }
  .nav-header a.router-link-active {
    color: #42b983;
  }
  .nav-header a {
    font-weight: 700;
    color: #2c3e50;
    cursor: pointer;
  }
  /* 美化滚动条样式 */
  ::-webkit-scrollbar {
    background: 0 0;
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #d7d7d7;
    border-radius: 6px;
    width: 6px;
    height: 6px;
  }
</style>
