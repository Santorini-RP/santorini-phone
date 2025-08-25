<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSystemStore } from '@core/nui/store/system'
import StatusBar from '@core/nui/components/StatusBar.vue'
import LockScreen from '@core/nui/components/LockScreen.vue'
import HomeScreen from '@core/nui/components/HomeScreen.vue'
import PhysicalButtons from '@core/nui/components/PhysicalButtons.vue'

const router = useRouter()
const systemStore = useSystemStore()

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

const goHome = () => {
  if (!systemStore.isLocked) {
    router.push('/')
  }
}

const handleDynamicIslandClick = () => {
  // Expandir Dynamic Island temporariamente
  const island = document.querySelector('.dynamic-island') as HTMLElement
  if (island) {
    island.style.transform = 'translateX(-50%) scale(1.1)'
    setTimeout(() => {
      island.style.transform = 'translateX(-50%) scale(1)'
    }, 200)
  }
}

onMounted(() => {
  // Simular Dynamic Island aparecendo
  setTimeout(() => {
    showDynamicIsland.value = true
  }, 1000)
})
</script>

<style scoped>
/* Phone Container */
.phone-container {
  width: 375px;
  height: 812px;
  transform: scale(0.7);
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8));
}

/* Phone Frame */
.phone-frame {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #000000 100%);
  border-radius: 50px;
  padding: 6px;
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    0 0 0 2px #333,
    0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Notch Container */
.notch-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

/* Dynamic Island */
.dynamic-island {
  width: 120px;
  height: 30px;
  background: #000000;
  border-radius: 20px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.6);
}

.dynamic-island:hover {
  transform: scale(1.05);
  background: #1a1a1a;
}

.camera-sensor {
  width: 4px;
  height: 4px;
  background: #333;
  border-radius: 50%;
}

/* Phone Screen */
.phone-screen {
  width: 100%;
  height: 100%;
  background: #000000;
  border-radius: 44px;
  overflow: hidden;
  position: relative;
}

/* Screen Content */
.screen-content {
  width: 100%;
  height: 100%;
  background: url('/src/core/nui/assets/images/backgrounds/cloud8.jpg') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  position: relative;
}

.screen-off {
  background: #000000;
  opacity: 0.1;
}

/* Main Content */
.main-content {
  flex: 1;
  padding-top: 50px;
  overflow: hidden;
  position: relative;
}

.app-content {
  height: 100%;
  width: 100%;
}

/* Home Indicator */
.home-indicator-bar {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 20;
}

.home-indicator {
  width: 134px;
  height: 5px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.home-indicator:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scaleX(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .phone-container {
    transform: scale(0.6);
  }
}

@media (max-width: 480px) {
  .phone-container {
    transform: scale(0.5);
  }
}

@media (max-width: 360px) {
  .phone-container {
    transform: scale(0.4);
  }
}

/* Animations */
@keyframes island-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.dynamic-island {
  animation: island-pulse 3s infinite ease-in-out;
}
</style>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <!-- iPhone 15 Container -->
    <div class="relative phone-container">
      <!-- Physical Buttons -->
      <PhysicalButtons 
        @power="handlePowerButton"
        @volume-up="handleVolumeUp"
        @volume-down="handleVolumeDown"
        @silent-switch="handleSilentSwitch"
      />
      
      <!-- iPhone Frame -->
      <div class="phone-frame">
        <!-- Dynamic Island / Notch -->
        <div class="notch-container">
          <div 
            v-if="isScreenOn && showDynamicIsland"
            class="dynamic-island"
            @click="handleDynamicIslandClick"
          >
            <div class="camera-sensor"></div>
          </div>
        </div>

        <!-- Screen Content -->
        <div class="phone-screen">
          <div 
            class="screen-content"
            :class="{ 'screen-off': !isScreenOn }"
          >
            <!-- Status Bar -->
            <StatusBar v-if="isScreenOn" :time="currentTime" />

            <!-- Main Content -->
            <div v-if="isScreenOn" class="main-content">
              <!-- Lock Screen -->
              <LockScreen 
                v-if="systemStore.isLocked" 
                @unlock="handleUnlock"
                :time="currentTime"
              />
              
              <!-- Home Screen or Apps -->
              <div v-else class="app-content">
                <router-view v-slot="{ Component }">
                  <component :is="Component" v-if="Component" />
                  <HomeScreen v-else />
                </router-view>
              </div>
            </div>

            <!-- Home Indicator -->
            <div v-if="isScreenOn" class="home-indicator-bar">
              <div 
                class="home-indicator"
                @click="goHome"
                @touchstart="goHome"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
