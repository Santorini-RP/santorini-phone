import type { AppConfig } from '@core/nui/utils/appLoader'
import { loadSystemConfig, loadAppManifest } from '@core/nui/utils/appLoader'

const appManifests = new Map<string, AppConfig>()
let isInitialized = false

/**
 * Carrega todos os manifestos de aplicativos habilitados em um cache na memória.
 * Deve ser chamado uma vez na inicialização do aplicativo.
 */
export async function initializeAppManager(): Promise<void> {
  if (isInitialized) {
    return
  }

  console.log('Initializing AppManager...')
  const systemConfig = await loadSystemConfig()
  const enabledApps = systemConfig.apps || []

  const manifestPromises = enabledApps.map(async (appId) => {
    const manifest = await loadAppManifest(appId)
    if (manifest) {
      appManifests.set(appId, manifest)
    }
  })

  await Promise.all(manifestPromises)
  isInitialized = true
  console.log(`AppManager initialized with ${appManifests.size} apps.`)
}

/**
 * Retorna se o gerenciador de aplicativos foi inicializado.
 */
export function isAppManagerInitialized(): boolean {
  return isInitialized
}

/**
 * Retorna a configuração de um aplicativo específico pelo seu ID.
 * @param id O ID do aplicativo.
 * @returns A configuração do aplicativo ou undefined se não for encontrado.
 */
export function getAppById(id: string): AppConfig | undefined {
  return appManifests.get(id)
}

/**
 * Retorna um array com todas as configurações de aplicativos carregados.
 */
export function getAllApps(): AppConfig[] {
  return Array.from(appManifests.values())
}

/**
 * Retorna um array com os aplicativos da categoria "system".
 */
export function getSystemApps(): AppConfig[] {
  return getAllApps().filter(app => app.category === 'system')
}

/**
 * Retorna um array com os aplicativos da categoria "store".
 */
export function getStoreApps(): AppConfig[] {
  return getAllApps().filter(app => app.category === 'store')
}
