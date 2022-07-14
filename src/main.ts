import { createApp } from 'vue'
import App from './App.vue'
import Element from 'element-plus'
import 'element-plus/theme-chalk/index.css';
import * as Icons from '@element-plus/icons'
import { createPinia } from 'pinia';
const app = createApp(App)



// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})


const pinia = createPinia()
app.use(Element).use(pinia).mount('#app')

