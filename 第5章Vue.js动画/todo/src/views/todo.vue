<template>
  <div class="todo">
    <div class="title">
      事项列表<span class="shuffle-btn" @click="shuffleList"></span>
    </div>
    <div class="add-new">
      <input v-model.trim="state.newTodoContent" class="input" type="text" name="new_todo" placeholder="请输入内容" enterkeyhint="send"
        @keyup.enter.prevent="saveTodo">
    </div>
    <div class="s-wrap">
        <transition-group name="list-complete" tag="div">
            <div v-for="item in state.todoItems" class="list-complete-item"  :key="item.id">
                <titem :item="item" @delete="deleteItem" @complete="completeItem"></titem>
            </div>
        </transition-group>
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
        state.todoItems.unshift({
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

        // 修改已删除事项页面数据，更新已删除数据
        let recycleList = dataUtils.getItem('recycleList') || []
        recycleList.unshift(obj)
        dataUtils.setItem('recycleList', recycleList)

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
      /**
       * 打乱顺序
       */
      function shuffleList() {
        state.todoItems = _.shuffle(state.todoItems)
      }

      watch(
        () => JSON.parse(JSON.stringify(state.todoItems)),
        (val, oldVal) => {
          storeItems(val)// 一旦有改动立刻调用更新存储
        },{deep: true}
      )

      onMounted(()=>{

        fetchData()
      })


      return {
        state,
        deleteItem,
        completeItem,
        shuffleList,
        saveTodo
      }
    }
  }
</script>
<style scoped>
  .todo {
    position: absolute;/* 绝对定位 */
    background: #ededed;/* 设置背景颜色 */
    left: 16px;/* 设置位置 */
    right: 16px;
    top:90px;
  }
  .s-wrap {
    overflow-y:auto;/* 设置可纵向滚动 */
    height: 208px;
  }
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
  
  .list-complete-item {
    transition: all 0.8s ease;/* 全状态添加过渡 */
  }
  /* 动画进入和离开时应用CSS样式 */
  .list-complete-enter-from,
  .list-complete-leave-to {
    opacity: 0;/* 渐隐效果 */
    transform: translateY(20px);/* 向下移动 */
  }
  .shuffle-btn {
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-image: url('../assets/shuffle.png');/* 设置背景图片 */
    background-size: 60% 60%;/* 设置背景尺寸 */
    background-repeat: no-repeat;/* 设置背景不重复 */
    background-position: center;/* 设置背景位置 */
    border-radius: 50%;/* 设置div为圆形 */
    display: inline-block;/* 横向排列 */
    vertical-align: -8px;
  }
</style>
