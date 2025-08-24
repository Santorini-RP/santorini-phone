import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadSystemConfig, getAvailableApps, type AppConfig } from '@core/nui/utils/appLoader'

export const useAppsStore = defineStore('apps', () => {
  const enabledApps = ref<string[]>([])
  const isLoaded = ref(false)

  const availableApps = computed(() => {
    return getAvailableApps(enabledApps.value)
  })

  const mainApps = computed(() => availableApps.value.mainApps)
  const dockApps = computed(() => availableApps.value.dockApps)

  const loadAppsConfig = async () => {
    try {
      const config = await loadSystemConfig()
      enabledApps.value = config.apps || []
      isLoaded.value = true
    } catch (error) {
      console.error('Erro ao carregar configuração de apps:', error)
      enabledApps.value = []
      isLoaded.value = true
    }
  }

  const getAppById = (id: string): AppConfig | undefined => {
    return [...mainApps.value, ...dockApps.value].find(app => app.id === id)
  }

  return {
    enabledApps,
    isLoaded,
    mainApps,
    dockApps,
    availableApps,
    loadAppsConfig,
    getAppById
  }
})
