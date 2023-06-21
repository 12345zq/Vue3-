<template>
  <div class="recycle">
    <div class="title">
      回收站
    </div>
    <div class="no-data" v-if="recycleItems.length == 0">暂无已删除的事项</div>
    <div class="s-wrap">
      <ritem v-for="item in recycleItems" :key="item.id" :item="item" @revert="revertItem"></ritem>
    </div>
  </div>
</template>

<script>
  import ritem from '../components/ritem.vue'
  import {computed} from 'vue'
  import Vuex from 'vuex'
  /**
   *  回收站页面组件
   */
  export default {
    name: 'recycle',// 组件的名称，尽量和文件名一致
    components: {
      ritem
    },

    setup(){

      const store = Vuex.useStore()
      let recycleItems = computed(() => store.state.recycleItems)
      /**
       * 恢复事项
       */
      const revertItem = (obj)=>store.dispatch('revertTodo',obj)

      return {
        recycleItems,
        revertItem
      }

    }

  }
</script>
<style scoped>
  .recycle {
    position: absolute;
    background: #ededed;
    left: 16px;
    right: 16px;
    top: 90px;
  }
  .s-wrap {
    overflow-y:auto;
    height: 208px;
  }
  .recycle .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 27px;
    margin-bottom: 24px;
    text-align: center;
  }

  .recycle .no-data {
    text-align: center;
  }
</style>
