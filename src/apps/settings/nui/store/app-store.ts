import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const phoneScale = ref(100) // Porcentagem do tamanho do telefone
  const theme = ref<'light' | 'dark'>('dark')
  const notifications = ref(true)

  // Actions
  const setPhoneScale = (scale: number) => {
    phoneScale.value = Math.max(50, Math.min(150, scale))
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
  }

  const toggleNotifications = () => {
    notifications.value = !notifications.value
  }

  const resetToDefaults = () => {
    phoneScale.value = 100
    theme.value = 'dark'
    notifications.value = true
  }

  return {
    // State
    phoneScale,
    theme,
    notifications,
    
    // Actions
    setPhoneScale,
    setTheme,
    toggleNotifications,
    resetToDefaults
  }
})
