import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBatteryStore = defineStore('battery', () => {
  const level = ref(85)
  const isCharging = ref(false)

  const batteryIcon = computed(() => {
    if (isCharging.value) return 'charging'
    if (level.value <= 20) return 'low'
    if (level.value <= 50) return 'medium'
    return 'high'
  })

  const batteryColor = computed(() => {
    if (isCharging.value) return 'text-green-400'
    if (level.value <= 20) return 'text-red-400'
    if (level.value <= 50) return 'text-yellow-400'
    return 'text-white'
  })

  return {
    level,
    isCharging,
    batteryIcon,
    batteryColor
  }
})
