import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const isLocked = ref(true)
  const volume = ref(80)
  const ringtoneVolume = ref(75)
  const callVolume = ref(90)
  const isSilent = ref(false)
  const airplaneMode = ref(false)
  const streamerMode = ref(false)
  const pin = ref('1234')
  const enteredPin = ref('')
  const pinAttempts = ref(0)
  const maxPinAttempts = ref(3)
  const brightness = ref(80) // Brilho em porcentagem (0-100)
  const ringtone = ref('Default')
  const availableRingtones = ref(['Default', 'Harp', 'Apex', 'Radar', 'Sencha', 'Silk', 'Summit'])
  const textTone = ref('Default')
  const availableTextTones = ref(['Default', 'Note', 'Chord', 'Tritone', 'Boing', 'Glass'])

  // Date & Time settings
  const use24HourTime = ref(true)
  const setTimeAutomatically = ref(true)
  const timeZone = ref('America/Sao_Paulo')

  // Language & Region settings
  const language = ref('English')
  const availableLanguages = ref([
    'English', 'Deutsch', 'Français', 'Español', 'Nederlands', 'Dansk',
    'Norsk', 'ไทย', 'عربي', 'Русский', 'Czech', 'Svenska', 'Polski', 'Magyar'
  ])
  const temperatureUnit = ref<'C' | 'F'>('F')

  // Storage settings
  const totalStorage = ref(128 * 1024 * 1024 * 1024); // 128 GB in bytes
  const systemUsage = ref(6.2 * 1024 * 1024 * 1024); // System uses 6.2 GB

  // Wallpaper settings
  const availableWallpapers = ref([
    { id: 'w1', url: '/src/core/nui/assets/images/backgrounds/w1.png', name: 'Pink Waves' },
    { id: 'w2', url: '/src/core/nui/assets/images/backgrounds/w2.png', name: 'Purple Silk' },
    { id: 'w3', url: '/src/core/nui/assets/images/backgrounds/w3.png', name: 'Red Glow' },
    { id: 'w4', url: '/src/core/nui/assets/images/backgrounds/w4.png', name: 'Orange Glow' },
    { id: 'w5', url: '/src/core/nui/assets/images/backgrounds/w5.png', name: 'Magenta Swirl' },
    { id: 'w6', url: '/src/core/nui/assets/images/backgrounds/w6.png', name: 'Blue Mist' },
    { id: 'w7', url: '/src/core/nui/assets/images/backgrounds/w7.png', name: 'Blue Silk' },
    { id: 'w8', url: '/src/core/nui/assets/images/backgrounds/w8.png', name: 'Orange Fade' },
  ]);
  const currentWallpaperId = ref('w3'); // Default to the one selected in the image

  // Security settings
  const faceUnlockEnabled = ref(false);
  const passcodeEnabled = ref(true);

  // Phone settings
  const myNumber = ref('(123) 456-7890');
  const showCallerId = ref(true);
  const blockedContacts = ref([
    { id: 1, number: '(205) 144-0412' },
    { id: 2, number: '(205) 118-9841' },
  ]);

  const currentWallpaper = computed(() => {
    return availableWallpapers.value.find(w => w.id === currentWallpaperId.value) || availableWallpapers.value[0];
  });

  const setWallpaper = (wallpaperId: string) => {
    currentWallpaperId.value = wallpaperId;
  };

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
    if (passcodeEnabled.value) {
      isLocked.value = true
      enteredPin.value = ''
    }
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
  
  const verifyPin = (pinToVerify: string): boolean => {
    if (pinToVerify === pin.value) {
      enteredPin.value = '';
      pinAttempts.value = 0;
      return true;
    } else {
      pinAttempts.value++;
      enteredPin.value = '';
      return false;
    }
  };

  const setBrightness = (level: number) => {
    brightness.value = Math.max(0, Math.min(100, level))
  }

  const setRingtone = (newRingtone: string) => {
    ringtone.value = newRingtone;
  }

  const setTextTone = (newTextTone: string) => {
    textTone.value = newTextTone;
  }

  const toggle24HourTime = () => {
    use24HourTime.value = !use24HourTime.value;
  }

  const toggleSetTimeAutomatically = () => {
    setTimeAutomatically.value = !setTimeAutomatically.value;
  }

  const setLanguage = (lang: string) => {
    language.value = lang;
  }

  const setTemperatureUnit = (unit: 'C' | 'F') => {
    temperatureUnit.value = unit;
  }

  const toggleFaceUnlock = () => {
    faceUnlockEnabled.value = !faceUnlockEnabled.value;
  };

  const togglePasscode = () => {
    passcodeEnabled.value = !passcodeEnabled.value;
  };

  const toggleShowCallerId = () => {
    showCallerId.value = !showCallerId.value;
  };

  const unblockContact = (contactId: number) => {
    blockedContacts.value = blockedContacts.value.filter(c => c.id !== contactId);
  };

  const isPinBlocked = computed(() => pinAttempts.value >= maxPinAttempts.value)

  return {
    isLocked,
    volume,
    ringtoneVolume,
    callVolume,
    isSilent,
    airplaneMode,
    streamerMode,
    pin,
    enteredPin,
    pinAttempts,
    maxPinAttempts,
    brightness,
    ringtone,
    availableRingtones,
    textTone,
    availableTextTones,
    use24HourTime,
    setTimeAutomatically,
    timeZone,
    language,
    availableLanguages,
    temperatureUnit,
    totalStorage,
    systemUsage,
    availableWallpapers,
    currentWallpaperId,
    faceUnlockEnabled,
    passcodeEnabled,
    myNumber,
    showCallerId,
    blockedContacts,
    currentWallpaper,
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
    verifyPin,
    setBrightness,
    setRingtone,
    setTextTone,
    setWallpaper,
    toggle24HourTime,
    toggleSetTimeAutomatically,
    setLanguage,
    setTemperatureUnit,
    toggleFaceUnlock,
    togglePasscode,
    toggleShowCallerId,
    unblockContact
  }
})
