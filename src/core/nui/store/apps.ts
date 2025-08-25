import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadSystemConfig, getAvailableApps, type AppConfig } from '@core/nui/utils/appLoader'

export const useAppsStore = defineStore('apps', () => {
  const enabledApps = ref<string[]>([])
  const isLoaded = ref(false)
  const systemApps = ref<AppConfig[]>([])
  const storeApps = ref<AppConfig[]>([])

  const mainApps = computed(() => storeApps.value)
  const dockApps = computed(() => systemApps.value)

  const loadAppsConfig = async () => {
    try {
      const config = await loadSystemConfig()
      enabledApps.value = config.apps || []
      
      // Carregar apps categorizados pelos manifestos
      const apps = await getAvailableApps(enabledApps.value)
      systemApps.value = apps.systemApps
      storeApps.value = apps.storeApps
      
      isLoaded.value = true
    } catch (error) {
      console.error('Erro ao carregar configuração de apps:', error)
      enabledApps.value = []
      systemApps.value = []
      storeApps.value = []
      isLoaded.value = true
    }
  }

  const getAppById = (id: string): AppConfig | undefined => {
    return [...mainApps.value, ...dockApps.value].find(app => app.id === id)
  }

  return {
    enabledApps,
    isLoaded,
    systemApps,
    storeApps,
    mainApps,
    dockApps,
    loadAppsConfig,
    getAppById
  }
})
