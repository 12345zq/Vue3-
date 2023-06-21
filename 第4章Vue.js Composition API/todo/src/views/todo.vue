<template>
  <div class="todo">
    <div class="title">
      事项列表
    </div>
    <div class="add-new">
      <input v-model.trim="state.newTodoContent" class="input" type="text" name="new_todo" placeholder="请输入内容" enterkeyhint="send"
        @keyup.enter.prevent="saveTodo">
    </div>
    <div>
        <titem v-for="item in state.todoItems" :item="item"  :key="item.id" @delete="deleteItem" @complete="completeItem"></titem>
    </div>
  </div>
</template>

<script>
  import titem from '../components/titem.vue'
  import {onMounted,reactive,watch} from 'vue'
  
  import dataUtils from '../utils/dataUtils'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'todo',// 组件的名称，尽量和文件名一致
    components: {
      titem
    },
    setup(){
      const state = reactive({
        newTodoContent: '',// 输入框input的内容
        todoItems: []// 待办事项的列表
      })

      function fetchData() {
        state.todoItems = dataUtils.getItem('todoList') || []
      }
      /**
       * 创建事项
       */
      function saveTodo() {

        // 如果没有输入内容，直接返回
        if (!state.newTodoContent) return
        // 将事项存入列表
        state.todoItems.push({
          id: Math.random().toString(36).substr(2, 5),// 获取随机ID值
          content: state.newTodoContent// 设置内容
        })
        // 创建完成后清空输入框内容
        state.newTodoContent = ''
      }
      /**
       * 存储事项列表
       */
      function storeItems(array) {

        dataUtils.setItem('todoList', array)
      }
      /**
       * 删除事项
       */
      function deleteItem(obj) {
        // 以下逻辑为找到对应id的事项，然后删除
        state.todoItems = state.todoItems.filter(item=>{
            return item.id != obj.id
        })
        // 通知已删除事项页面，实时更新已删除数据
        window.mitt.emit('addDelete', obj)
      }

      /**
       * 修改事项
       */
      function completeItem(obj) {
        // 找到对应id的事项，然后替换
        for (let i = 0 ; i < state.todoItems.length ; i++) {
          if (state.todoItems[i].id == obj.id) {
            state.todoItems[i] = obj
            break
          }
        }
      }


      watch(
        () => _.cloneDeep(state.todoItems),// 利用_.cloneDeep复制复杂对象
        (val, oldVal) => {
          storeItems(val)// 一旦有改动立刻调用更新存储
        },{deep:true}
      )

      onMounted(()=>{
        window.mitt.on('addRevert', (obj) =>{
          state.todoItems.push(obj)
          
        })
        fetchData()
      })


      return {
        state,
        deleteItem,
        completeItem,
        saveTodo
      }
    }
  }
</script>
<style scoped>
  .todo .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 27px;
    margin-bottom: 24px;
    text-align: center;
  }

  .todo .add-new {
    margin-bottom: 10px;
  }

  .todo .add-new input {
    box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, .05);/* 添加阴影效果 */
    width: 100%;/* 设置宽度 */
    height: 40px;/* 设置高度 */
    padding: 4px;/* 设置内边距 */
    font-size: 16px;/* 设置字体大小 */
    color: #363636;/* 设置字体颜色 */
    background-color: #fff;/* 设置背景颜色 */
    border-color: transparent;/* 去除默认背景边框 */
    border-radius: 4px;/* 设置圆角 */
    box-sizing: border-box;/* 设置内边距不占据宽高 */
  }

</style>
