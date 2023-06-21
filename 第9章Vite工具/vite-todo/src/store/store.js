
import Vuex from 'vuex'
import dataUtils from '../utils/dataUtils'
const myPlugin = (store) => {
  store.subscribe((mutation, state) => {
    // 每次调用mutation，在这里持久化数据
    dataUtils.setItem('todoList', state.todoItems)
    dataUtils.setItem('recycleList', state.recycleItems)
  })
}
export default Vuex.createStore({
  plugins: [myPlugin],
  state: {
    todoItems:dataUtils.getItem('todoList') || [],
    recycleItems:dataUtils.getItem('recycleList') || [],
  },
  mutations: {
    /*
    * 添加事项
    */
    addTodo (state, obj) {
      state.todoItems.unshift(obj)
    },
    /*
    * 添加回收站事项
    */
    addRecycle (state, obj) {
      state.recycleItems.unshift(obj)
    },
    /*
    * 删除回收站事项
    */
    deleteRecycle (state, obj) {
      // 以下逻辑为找到对应id的事项，然后删除
      state.recycleItems = state.recycleItems.filter(item=>{
        return item.id != obj.id
      })
    },
    /*
    * 删除事项
    */
    deleteTodo (state, obj) {
      // 以下逻辑为找到对应id的事项，然后删除
      state.todoItems = state.todoItems.filter(item=>{
        return item.id != obj.id
      })
    },
    /*
    * 重置事项列表
    */
    resetTodo(state, array){
      state.todoItems = array
    }
  },
  actions: {
    addTodo (context, obj) {
      context.commit('addTodo', obj)
    },
    addRecycle (context, obj) {
      context.commit('addRecycle', obj)
    },
    deleteTodo(context, obj){
      // 先删除代办事项
      context.commit('deleteTodo', obj)
      // 后增加回收站事项
      context.commit('addRecycle', obj)
    },
    revertTodo(context, obj){
      // 先删回收站事项
      context.commit('deleteRecycle', obj)
      // 后增加代办事项
      context.commit('addTodo', obj)
    }
  }
})