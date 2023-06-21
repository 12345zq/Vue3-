<template>
  <div class="recycle">
    <div class="title">
      回收站
    </div>
    <div class="no-data" v-if="recycleItems.length == 0">暂无已删除的事项</div>
    <ritem v-for="item in recycleItems" :key="item.id" :item="item" @revert="revertItem"></ritem>

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
    data(){
      return {
        recycleItems: []// 已删除事项的列表
      }
    },
    watch:{
      // 一旦有改动立刻调用更新存储
      recycleItems:{
          handler(val){
            this.storeItems(val)
          },
          deep:true
      }
    },
    mounted(){
      window.mitt.on('addDelete', (obj) =>{
        this.recycleItems.push(obj)
      })
      this.fetchData()
    },
    methods:{
       /**
       * 从存储中获取已删除事项数据
       */
      fetchData(){
        this.recycleItems = dataUtils.getItem('recycleList') || []
      },
      /**
       * 恢复事项
       */
      revertItem(obj){
        // 将需要恢复的事项从已删除事项列表中剔除
        this.recycleItems = this.recycleItems.filter(item=>{
          return item.id != obj.id
        })

        window.mitt.emit('addRevert', obj)
      },
      /**
       * 存储已删除事项列表
       */
      storeItems(array){
        dataUtils.setItem('recycleList', array)
      }
    }
  }
</script>
<style scoped>
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
