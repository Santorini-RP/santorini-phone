import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from '@core/nui/App.vue'
import routerPromise from '@core/nui/router'

async function initApp() {
  const app = createApp(App)
  const pinia = createPinia()
  
  // Aguardar o router ser criado com as rotas dinâmicas
  const router = await routerPromise
  
  app.use(pinia)
  app.use(router)
  app.mount('#app')
}

initApp().catch(console.error)
