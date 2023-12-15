import './assets/main.scss'

// document.querySelectorAll(".st1")

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap'


//ElementPlus的插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'









import App from './App.vue'
import router from './router'



const app = createApp(App)
app.use(ElementPlus);
app.use(createPinia())
app.use(router)



app.mount('#app')



