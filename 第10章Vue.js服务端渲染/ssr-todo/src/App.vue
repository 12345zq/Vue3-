<template>

  <div class="container">
      <div class="app-content animated bounce">
        <navheader></navheader>
        <router-view v-slot="{ Component }">
            <transition enter-active-class="fadeIn animated faster" leave-active-class="fadeOut animated faster">
                <component :is="Component"></component>
            </transition>
        </router-view>

      </div>
    </div>

</template>
<script>
  import navheader from './components/navheader.vue'

  /**
   * 待办事项页面组件
   */
  export default {
    name: 'App',// 组件的名称，尽量和文件名一致
    components: {
      navheader,
    },
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
