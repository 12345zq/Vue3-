import { createApp } from 'vue';
import App from './App.vue'
import mitt from 'mitt'

let app = createApp(App)


window.mitt = mitt()


app.mount('#app')
