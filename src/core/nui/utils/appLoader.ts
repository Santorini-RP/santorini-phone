import type { RouteRecordRaw } from 'vue-router'

export type AppCategory = "system" | "store"

export interface BarConfig {
  mode: 'default' | 'overlay' | 'fullscreen';
  style: 'light' | 'dark';
}

export interface AppConfig {
  id: string
  name: string
  icon: string
  preinstalled: boolean
  removable: boolean
  category: AppCategory
  route: string
  size?: number; // App size in bytes
  statusBar?: Partial<BarConfig>
  navigationBar?: Partial<BarConfig>
  notifications?: number;
}

export interface SystemConfig {
  apps: string[]
}

// Função para carregar o manifesto de um app específico
export async function loadAppManifest(appId: string): Promise<AppConfig | null> {
  try {
    const manifestModule = await import(`@apps/${appId}/nui/manifest.ts`)
    return manifestModule.default || manifestModule
  } catch (error) {
    console.warn(`Erro ao carregar manifesto do app ${appId}:`, error)
    return null
  }
}

// Função para carregar configuração do sistema
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

// Função para carregar todos os apps disponíveis
export async function getAvailableApps(enabledApps: string[]): Promise<{
  systemApps: AppConfig[]
  storeApps: AppConfig[]
}> {
  const systemApps: AppConfig[] = []
  const storeApps: AppConfig[] = []

  // Carregar manifestos de todos os apps habilitados
  const appConfigs = await Promise.all(
    enabledApps.map(appId => loadAppManifest(appId))
  )

  // Filtrar e categorizar apps
  appConfigs.forEach(config => {
    if (config) {
      if (config.category === 'system') {
        systemApps.push(config)
      } else {
        storeApps.push(config)
      }
    }
  })

  return { systemApps, storeApps }
}

// Função para gerar rotas dinamicamente baseadas nos manifestos
export async function generateAppRoutes(enabledApps: string[]): Promise<RouteRecordRaw[]> {
  const routes: RouteRecordRaw[] = []

  // Carregar manifestos de todos os apps habilitados
  const appConfigs = await Promise.all(
    enabledApps.map(appId => loadAppManifest(appId))
  )

  // Gerar rotas baseadas nos manifestos
  appConfigs.forEach(config => {
    if (config && config.route) {
      routes.push({
        path: config.route,
        name: config.id,
        component: () => import(`@apps/${config.id}/nui/index.vue`)
      })
    }
  })

  return routes
}

// Função para instalar um novo app
export async function installApp(appId: string): Promise<boolean> {
  try {
    const manifest = await loadAppManifest(appId)
    if (!manifest) {
      throw new Error(`Manifesto do app ${appId} não encontrado`)
    }

    // Verificar se o app pode ser instalado
    if (manifest.preinstalled && !manifest.removable) {
      console.warn(`App ${appId} é do sistema e não pode ser instalado/removido`)
      return false
    }

    // Aqui você poderia adicionar lógica para persistir a instalação
    // Por exemplo, salvar no localStorage ou enviar para o servidor
    
    return true
  } catch (error) {
    console.error(`Erro ao instalar app ${appId}:`, error)
    return false
  }
}

// Função para desinstalar um app
export async function uninstallApp(appId: string): Promise<boolean> {
  try {
    const manifest = await loadAppManifest(appId)
    if (!manifest) {
      console.warn(`Manifesto do app ${appId} não encontrado`)
      return false
    }

    // Verificar se o app pode ser removido
    if (!manifest.removable) {
      console.warn(`App ${appId} não pode ser removido`)
      return false
    }

    // Aqui você poderia adicionar lógica para persistir a remoção
    // Por exemplo, remover do localStorage ou enviar para o servidor
    
    return true
  } catch (error) {
    console.error(`Erro ao desinstalar app ${appId}:`, error)
    return false
  }
}
