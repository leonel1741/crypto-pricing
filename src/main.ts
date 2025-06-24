// import './assets/main.css'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import http from './boot/http'

const app = createApp(App)

app.provide('http', http)

app.use(createPinia())
app.use(router)

app.mount('#app')
