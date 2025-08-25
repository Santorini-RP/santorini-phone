<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSystemStore } from '@core/nui/store/system'

const router = useRouter()
const systemStore = useSystemStore()

const goBack = () => {
  router.push('/')
}

const adjustVolume = (delta: number) => {
  systemStore.adjustVolume(delta)
}

const toggleSilentMode = () => {
  systemStore.toggleSilentMode()
}
</script>

<template>
  <div class="h-full bg-black text-white flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-800">
      <button 
        @click="goBack"
        class="text-blue-400 text-lg"
      >
        ← Back
      </button>
      <h1 class="text-lg font-semibold">Settings</h1>
      <div class="w-12"></div>
    </div>

    <!-- Settings Content -->
    <div class="flex-1 p-4">
      <div class="space-y-4">
        <!-- Volume Control -->
        <div class="bg-gray-900 rounded-lg p-4">
          <h2 class="text-lg font-semibold mb-3">Volume</h2>
          <div class="flex items-center space-x-4">
            <button 
              @click="adjustVolume(-10)"
              class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center"
            >
              🔉
            </button>
            <div class="flex-1 bg-gray-700 h-2 rounded-full">
              <div 
                class="bg-blue-500 h-2 rounded-full transition-all duration-200"
                :style="{ width: `${systemStore.volume}%` }"
              ></div>
            </div>
            <button 
              @click="adjustVolume(10)"
              class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center"
            >
              🔊
            </button>
          </div>
          <div class="text-center text-sm text-gray-400 mt-2">
            {{ systemStore.volume }}%
          </div>
        </div>

        <!-- Silent Mode -->
        <div class="bg-gray-900 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold">Silent Mode</h3>
              <p class="text-sm text-gray-400">Mute all sounds and vibrations</p>
            </div>
            <button 
              @click="toggleSilentMode"
              class="w-12 h-6 rounded-full transition-colors duration-200"
              :class="systemStore.isSilentMode ? 'bg-blue-500' : 'bg-gray-600'"
            >
              <div 
                class="w-4 h-4 bg-white rounded-full transition-transform duration-200"
                :class="systemStore.isSilentMode ? 'translate-x-7' : 'translate-x-1'"
              ></div>
            </button>
          </div>
        </div>

        <!-- Phone Scale -->
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="font-semibold mb-3">Phone Scale</h3>
          <p class="text-sm text-gray-400 mb-3">Adjust the size of the phone interface</p>
          <div class="text-center text-sm text-blue-400">
            Coming soon...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
