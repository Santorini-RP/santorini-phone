import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const phoneScale = ref(100) // Porcentagem do tamanho do telefone
  const theme = ref<'light' | 'dark'>('light')
  const notifications = ref(true)
  const automaticTheme = ref(false)

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
  
  const toggleAutomaticTheme = () => {
    automaticTheme.value = !automaticTheme.value
  }


  const resetToDefaults = () => {
    phoneScale.value = 100
    theme.value = 'dark'
    notifications.value = true
    automaticTheme.value = false
  }

  return {
    // State
    phoneScale,
    theme,
    notifications,
    automaticTheme,
    
    // Actions
    setPhoneScale,
    setTheme,
    toggleNotifications,
    toggleAutomaticTheme,
    resetToDefaults
  }
})
