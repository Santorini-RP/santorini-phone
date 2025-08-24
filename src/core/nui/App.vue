<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSystemStore } from '@core/nui/store/system'
import { useBatteryStore } from '@core/nui/store/battery'
import StatusBar from '@core/nui/components/StatusBar.vue'
import LockScreen from '@core/nui/components/LockScreen.vue'
import HomeScreen from '@core/nui/components/HomeScreen.vue'
import PhysicalButtons from '@core/nui/components/PhysicalButtons.vue'

const router = useRouter()
const route = useRoute()
const systemStore = useSystemStore()
const batteryStore = useBatteryStore()

const isScreenOn = ref(true)
const showDynamicIsland = ref(false)

const currentTime = computed(() => {
  const now = new Date()
  return now.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
})

const handlePowerButton = () => {
  isScreenOn.value = !isScreenOn.value
  if (!isScreenOn.value) {
    systemStore.lockDevice()
  }
}

const handleVolumeUp = () => {
  systemStore.adjustVolume(10)
}

const handleVolumeDown = () => {
  systemStore.adjustVolume(-10)
}

const handleSilentSwitch = () => {
  systemStore.toggleSilentMode()
}

const handleUnlock = () => {
  isScreenOn.value = true
  router.push('/')
}

onMounted(() => {
  // Simular Dynamic Island aparecendo
  setTimeout(() => {
    showDynamicIsland.value = true
  }, 1000)
})
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-8">
    <!-- iPhone 15 Frame -->
    <div class="relative">
      <!-- Physical Buttons -->
      <PhysicalButtons 
        @power="handlePowerButton"
        @volume-up="handleVolumeUp"
        @volume-down="handleVolumeDown"
        @silent-switch="handleSilentSwitch"
      />
      
      <!-- iPhone Body -->
      <div class="w-[375px] h-[812px] bg-gray-900 rounded-[60px] border-4 border-gray-700 shadow-2xl relative overflow-hidden">
        <!-- Screen -->
        <div 
          class="absolute inset-4 bg-black rounded-[56px] overflow-hidden transition-all duration-500"
          :class="{ 'opacity-0': !isScreenOn }"
        >
          <!-- Dynamic Island -->
          <div 
            v-if="isScreenOn && showDynamicIsland"
            class="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 dynamic-island w-32 h-8 flex items-center justify-center"
          >
            <div class="w-4 h-4 bg-gray-800 rounded-full"></div>
          </div>

          <!-- Status Bar -->
          <StatusBar v-if="isScreenOn" :time="currentTime" />

          <!-- Screen Content -->
          <div v-if="isScreenOn" class="h-full flex flex-col">
            <!-- Lock Screen -->
            <LockScreen 
              v-if="systemStore.isLocked" 
              @unlock="handleUnlock"
              :time="currentTime"
            />
            
            <!-- Home Screen or Apps -->
            <div v-else class="flex-1">
              <router-view v-slot="{ Component }">
                <component :is="Component" v-if="Component" />
                <HomeScreen v-else />
              </router-view>
            </div>

            <!-- Home Indicator -->
            <div class="flex justify-center pb-2">
              <div class="w-32 h-1 bg-white bg-opacity-30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
