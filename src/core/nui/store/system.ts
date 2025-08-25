import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const isLocked = ref(true)
  const volume = ref(80)
  const isSilent = ref(false)
  const airplaneMode = ref(false)
  const streamerMode = ref(false)
  const pin = ref('1234')
  const enteredPin = ref('')
  const pinAttempts = ref(0)
  const maxPinAttempts = ref(3)
  const brightness = ref(80) // Brilho em porcentagem (0-100)

  const volumeLevel = computed(() => {
    if (volume.value === 0) return 'muted'
    if (volume.value < 30) return 'low'
    if (volume.value < 70) return 'medium'
    return 'high'
  })

  const isVolumeMuted = computed(() => volume.value === 0 || isSilent.value)

  const screenBrightness = computed(() => {
    // Mapeia o brilho (20-100) para um valor de filtro CSS (0.5-1.0)
    const minBrightness = 0.5
    const maxBrightness = 1.0
    return minBrightness + (brightness.value / 100) * (maxBrightness - minBrightness)
  })

  const lockDevice = () => {
    isLocked.value = true
    enteredPin.value = ''
  }

  const unlockDevice = () => {
    isLocked.value = false
    enteredPin.value = ''
    pinAttempts.value = 0
  }

  const adjustVolume = (delta: number) => {
    const newVolume = Math.max(0, Math.min(100, volume.value + delta))
    volume.value = newVolume
  }

  const toggleSilentMode = () => {
    isSilent.value = !isSilent.value
  }

  const toggleAirplaneMode = () => {
    airplaneMode.value = !airplaneMode.value
  }

  const toggleStreamerMode = () => {
    streamerMode.value = !streamerMode.value
  }

  const addPinDigit = (digit: string) => {
    if (enteredPin.value.length < 4) {
      enteredPin.value += digit
    }
  }

  const removePinDigit = () => {
    enteredPin.value = enteredPin.value.slice(0, -1)
  }

  const validatePin = (): boolean => {
    if (enteredPin.value === pin.value) {
      unlockDevice()
      return true
    } else {
      pinAttempts.value++
      enteredPin.value = ''
      return false
    }
  }

  const setBrightness = (level: number) => {
    brightness.value = Math.max(0, Math.min(100, level))
  }

  const isPinBlocked = computed(() => pinAttempts.value >= maxPinAttempts.value)

  return {
    isLocked,
    volume,
    isSilent,
    airplaneMode,
    streamerMode,
    pin,
    enteredPin,
    pinAttempts,
    maxPinAttempts,
    brightness,
    volumeLevel,
    isVolumeMuted,
    isPinBlocked,
    screenBrightness,
    lockDevice,
    unlockDevice,
    adjustVolume,
    toggleSilentMode,
    toggleAirplaneMode,
    toggleStreamerMode,
    addPinDigit,
    removePinDigit,
    validatePin,
    setBrightness
  }
})
