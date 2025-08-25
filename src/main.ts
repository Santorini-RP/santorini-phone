import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from '@core/nui/App.vue'
import { createAppRouter } from '@core/nui/router'
import { initializeAppManager } from '@core/nui/services/appManager'

async function initApp() {
  // 1. Inicializa o gerenciador de apps antes de tudo
  await initializeAppManager()

  // 2. Cria o router APÓS o appManager estar pronto
  const router = await createAppRouter()
  
  const app = createApp(App)
  const pinia = createPinia()
  
  app.use(pinia)
  app.use(router)
  app.mount('#app')
}

initApp().catch(console.error)
