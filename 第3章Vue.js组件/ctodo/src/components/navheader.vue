<template>
  <div class="nav-header">
    <a @click="changePage('todo')" :class="{active:page == 'todo'}">
      代办事项
    </a> |
    <a @click="changePage('recycle')" :class="{active:page == 'recycle'}">
      回收站
    </a>
    <span class="clear" @click="clear">清空</span>
  </div>
</template>

<script>
  import dataUtils from '../utils/dataUtils'
  /**
   * 标题按钮组件
   */
  export default  {
    name: 'navheader',
    props: {
      page: {
        type: String
      }
    },
    methods:{
      // 改变当前页面
      changePage(val){
        // 通知父组件
        this.$emit('change', val)
      },
      clear(){
        // 清空缓存
        dataUtils.clearAllItems()
        // 刷新页面
        window.location.reload()
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
</style>
