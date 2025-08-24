import type { RouteRecordRaw } from 'vue-router'

export interface AppConfig {
  id: string
  name: string
  icon: string
  color: string
  badge?: string
  route?: string
  category?: 'app' | 'dock'
}

export interface SystemConfig {
  apps: string[]
}

// Configuração padrão dos apps do sistema
const systemApps: AppConfig[] = [
  // Apps principais do iOS que sempre aparecem
  { id: 'settings', name: 'Settings', icon: '⚙️', color: 'bg-gray-600', category: 'app' },
  { id: 'clock', name: 'Clock', icon: '🕐', color: 'bg-orange-500', category: 'app' },
  { id: 'weather', name: 'Weather', icon: '🌤️', color: 'bg-blue-400', category: 'app' },
  { id: 'notes', name: 'Notes', icon: '📝', color: 'bg-yellow-400', category: 'app' },
  
  // Dock apps (sempre presentes)
  { id: 'phone', name: 'Phone', icon: '📞', color: 'bg-green-500', category: 'dock' },
  { id: 'messages', name: 'Messages', icon: '💬', color: 'bg-green-600', badge: '1', category: 'dock' },
  { id: 'camera', name: 'Camera', icon: '📷', color: 'bg-gray-700', category: 'dock' },
  { id: 'photos', name: 'Photos', icon: '🖼️', color: 'bg-blue-500', category: 'dock' }
]

// Configuração dos apps modulares (baseado nas pastas em /apps)
const modularAppsConfig: Record<string, Omit<AppConfig, 'id'>> = {
  calculator: {
    name: 'Calculator',
    icon: '🧮',
    color: 'bg-gray-800',
    route: '/app/calculator',
    category: 'app'
  }
  // Adicione aqui a configuração de outros apps conforme você criar as pastas
}

export async function loadSystemConfig(): Promise<SystemConfig> {
  try {
    const response = await fetch('/config.json')
    if (!response.ok) {
      console.warn('config.json não encontrado, usando configuração padrão')
      return { apps: [] }
    }
    return await response.json()
  } catch (error) {
    console.warn('Erro ao carregar config.json:', error)
    return { apps: [] }
  }
}

export function getAvailableApps(enabledApps: string[]): {
  mainApps: AppConfig[]
  dockApps: AppConfig[]
} {
  const mainApps: AppConfig[] = []
  const dockApps: AppConfig[] = []

  // Adicionar apps do sistema
  systemApps.forEach(app => {
    if (app.category === 'dock') {
      dockApps.push(app)
    } else {
      mainApps.push(app)
    }
  })

  // Adicionar apps modulares habilitados
  enabledApps.forEach(appId => {
    const appConfig = modularAppsConfig[appId]
    if (appConfig) {
      const fullConfig: AppConfig = {
        id: appId,
        ...appConfig
      }
      
      if (appConfig.category === 'dock') {
        dockApps.push(fullConfig)
      } else {
        mainApps.push(fullConfig)
      }
    }
  })

  return { mainApps, dockApps }
}

export function generateAppRoutes(enabledApps: string[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  enabledApps.forEach(appId => {
    const appConfig = modularAppsConfig[appId]
    if (appConfig?.route) {
      routes.push({
        path: appConfig.route,
        name: appId,
        component: () => import(`@apps/${appId}/nui/index.vue`)
      })
    }
  })

  return routes
}
