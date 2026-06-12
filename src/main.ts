import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import B2C from './pages/B2C.vue'
import B2B from './pages/B2B.vue'
import Advantages from './pages/Advantages.vue'
import Contact from './pages/Contact.vue'
import './styles.css'

const routes = [
  { path: '/', component: Home },
  { path: '/b2c', component: B2C },
  { path: '/b2b', component: B2B },
  { path: '/advantages', component: Advantages },
  { path: '/contact', component: Contact },
]

const router = createRouter({ history: createWebHistory(), routes })
createApp(App).use(router).mount('#app')
