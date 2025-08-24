import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const isLocked = ref(true)
  const volume = ref(80)
  const isSilent = ref(false)
  const pin = ref('1234')
  const enteredPin = ref('')
  const pinAttempts = ref(0)
  const maxPinAttempts = ref(3)

  const volumeLevel = computed(() => {
    if (volume.value === 0) return 'muted'
    if (volume.value < 30) return 'low'
    if (volume.value < 70) return 'medium'
    return 'high'
  })

  const isVolumeMuted = computed(() => volume.value === 0 || isSilent.value)

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

  const isPinBlocked = computed(() => pinAttempts.value >= maxPinAttempts.value)

  return {
    isLocked,
    volume,
    isSilent,
    pin,
    enteredPin,
    pinAttempts,
    maxPinAttempts,
    volumeLevel,
    isVolumeMuted,
    isPinBlocked,
    lockDevice,
    unlockDevice,
    adjustVolume,
    toggleSilentMode,
    addPinDigit,
    removePinDigit,
    validatePin
  }
})
