<template>
  <div class="nav-header">
    <router-link to="/todo" active-class="active">代办事项</router-link>
    |
    <router-link to="/recycle" active-class="active">回收站</router-link>
    <span class="clear tada animated infinite" @click="clear">清空</span>
  </div>
</template>

<script>
//   import dataUtils from '../utils/dataUtils'
  /**
   * 标题按钮组件
   */
  export default  {
    name: 'navheader',
    setup(props,context){

      function clear() {
        // 清空缓存
        // dataUtils.clearAllItems()
        // 刷新页面
        window.location.reload()
      }

      return {
        clear
      }
    }


  }
</script>

<style scoped>
  .nav-header {
    padding: 20px;/* 设置内边距 */
    text-align: center;/* 设置字体居中 */
  }

  .nav-header a {
    font-weight: 700;/* 设置字体加粗 */
    color: #2c3e50;/* 设置字体颜色 */
    cursor: pointer;/* 设置鼠标移入成小手状 */
    text-decoration: none;/* 删除下划线 */
  }

  .nav-header a.active {
    color: #42b983/* 设置激活态的字体颜色 */
  }

  .nav-header .clear {
    position: absolute;
    right: 21px;
    top: 24px;
    font-size: 12px;
    cursor: pointer;
  }
  .infinite {
    animation-iteration-count:infinite;
  }
</style>
