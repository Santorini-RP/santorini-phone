import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { loadSystemConfig, generateAppRoutes } from '@core/nui/utils/appLoader'

// Rotas base do sistema
const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@core/nui/components/HomeScreen.vue')
  }
]

// Função para criar o router com rotas dinâmicas
async function createAppRouter() {
  const routes = [...baseRoutes]
  
  try {
    // Carregar configuração e gerar rotas dos apps
    const config = await loadSystemConfig()
    const appRoutes = await generateAppRoutes(config.apps || [])
    routes.push(...appRoutes)
  } catch (error) {
    console.warn('Erro ao carregar rotas dos apps:', error)
  }

  return createRouter({
    history: createWebHistory(),
    routes
  })
}

// Exportar uma promise do router para uso no main.ts
export default createAppRouter()
