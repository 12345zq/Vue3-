<template>
  <div class="recycle">
    <div class="title">
      回收站
    </div>
    <div class="no-data" v-if="state.recycleItems.length == 0">暂无已删除的事项</div>
    <div class="s-wrap">
      <ritem v-for="item in state.recycleItems" :key="item.id" :item="item" @revert="revertItem"></ritem>
    </div>
  </div>
</template>

<script>
  import ritem from '../components/ritem.vue'
  import dataUtils from '../utils/dataUtils'
  import {onMounted,reactive,watch} from 'vue'
  /**
   *  回收站页面组件
   */
  export default {
    name: 'recycle',// 组件的名称，尽量和文件名一致
    components: {
      ritem
    },

    setup(){
      const state = reactive({
        recycleItems: []// 已删除事项的列表
      })

      /**
       * 从存储中获取已删除事项数据
       */
      function fetchData() {
        state.recycleItems = dataUtils.getItem('recycleList') || []
      }
      /**
       * 恢复事项
       */
      function revertItem(obj) {
        // 将需要恢复的事项从已删除事项列表中剔除
        state.recycleItems = state.recycleItems.filter(item=>{
            return item.id != obj.id
        })


        // 修改代办事项页面数据，恢复代办数据
        let todoList = dataUtils.getItem('todoList') || []
        todoList.unshift(obj)
        dataUtils.setItem('todoList', todoList)
      }
      /**
       * 存储已删除事项列表
       */
      function storeItems(array) {
        dataUtils.setItem('recycleList', array)
      }

      watch(
        () => JSON.parse(JSON.stringify(state.recycleItems)),
        (val, oldVal) => {
          storeItems(val)// 一旦有改动立刻调用更新存储
        },{deep:true}
      )

      onMounted(()=>{
        fetchData()
      })

      return {
        state,
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
