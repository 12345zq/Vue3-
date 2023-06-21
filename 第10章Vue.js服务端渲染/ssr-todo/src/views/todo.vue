<template>
  <div class="todo">
    <div class="title">
      事项列表<span class="shuffle-btn" @click="shuffleList"></span>
    </div>
    <div class="add-new">
      <input v-model.trim="newTodoContent" class="input" type="text" name="new_todo" placeholder="请输入内容" enterkeyhint="send"
        @keyup.enter.prevent="saveTodo">
    </div>
    <div class="s-wrap">
        <transition-group name="list-complete" tag="div">
          <div v-for="item in todoItems" class="list-complete-item"  :key="item.id">
            <titem :item="item" @delete="deleteItem" @complete="completeItem"></titem>
          </div>
        </transition-group>
    </div>
  </div>
</template>

<script>
  import titem from '../components/titem.vue'
  import {ref,computed,toRaw} from 'vue'
  
  import Vuex from 'vuex'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'todo',// 组件的名称，尽量和文件名一致
    components: {
      titem
    },
    setup(){
      const store = Vuex.useStore()
      let todoItems = computed(() => store.state.todoItems)

      let newTodoContent = ref('')// 输入框input的内容
      
      /**
       * 创建事项
       */
      function saveTodo() {

        // 如果没有输入内容，直接返回
        if (!newTodoContent.value) return
        // 将事项存入列表
        store.dispatch('addTodo',{
          id: Math.random().toString(36).substr(2, 5),// 获取随机ID值
          content: newTodoContent.value// 设置内容
        })
        // 创建完成后清空输入框内容
        newTodoContent.value = ''
      }
      /**
       * 删除事项
       */

      const deleteItem = (obj)=>store.dispatch('deleteTodo',obj)

      /**
       * 修改事项
       */
      function completeItem(obj) {
        let arr = []
        // 找到对应id的事项，然后替换
        for (let i = 0 ; i < todoItems.value.length ; i++) {
          if (todoItems.value[i].id == obj.id) {
            arr.push(obj)
          } else {
            arr.push(todoItems.value[i])
          }
        }

        store.commit('resetTodo',arr)
      }
      /**
       * 打乱顺序
       */
      let shuffleList = ()=> {
          store.commit('resetTodo',_.shuffle(toRaw(todoItems.value)))
      }

      return {
        newTodoContent,
        deleteItem,
        todoItems,
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
