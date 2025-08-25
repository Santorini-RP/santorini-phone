<script setup lang="ts">
import { ref } from 'vue'
import { Globe, AlarmClock, Timer, Hourglass } from 'lucide-vue-next'

const activeTab = ref('Timer')
const tabs = [
  { name: 'World Clock', icon: Globe },
  { name: 'Alarm', icon: AlarmClock },
  { name: 'Stopwatch', icon: Hourglass },
  { name: 'Timer', icon: Timer },
]

const selectedTime = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const isTimerRunning = ref(false)

const startTimer = () => {
  isTimerRunning.value = true
}

const cancelTimer = () => {
  isTimerRunning.value = false
  selectedTime.value = { hours: 0, minutes: 0, seconds: 0 }
}
</script>

<template>
  <div class="h-full text-black flex flex-col font-sans">
    <!-- Header -->
    <div class="px-4 pt-4 pb-2">
      <h1 class="text-3xl font-bold">Timer</h1>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col items-center justify-around p-4">
      <!-- Time Picker -->
      <div class="flex justify-center items-center w-full text-center text-5xl font-thin -mt-8">
        <div class="w-28">
          <div class="text-base text-gray-500 font-normal">Hours</div>
          <div class="mt-4">{{ selectedTime.hours }}</div>
        </div>
        <div class="w-28">
          <div class="text-base text-gray-500 font-normal">Minutes</div>
          <div class="mt-4">{{ selectedTime.minutes }}</div>
        </div>
        <div class="w-28">
          <div class="text-base text-gray-500 font-normal">Seconds</div>
          <div class="mt-4">{{ selectedTime.seconds }}</div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-around items-center w-full">
        <button 
          @click="cancelTimer"
          class="w-20 h-20 rounded-full bg-gray-300/70 text-black text-lg font-medium flex items-center justify-center transition-colors hover:bg-gray-400/70"
        >
          Cancel
        </button>
        <button 
          @click="startTimer"
          class="w-20 h-20 rounded-full bg-green-500 text-white text-lg font-medium flex items-center justify-center transition-colors hover:bg-green-600"
        >
          Start
        </button>
      </div>

      <!-- Recents -->
      <div class="w-full">
        <h2 class="text-xl font-bold mb-2 px-2">Recents</h2>
        <div class="bg-white rounded-xl p-4 text-center text-gray-500">
          No Recents
        </div>
      </div>
    </div>

    <!-- Tab Bar -->
    <div class="bg-gray-200/70 backdrop-blur-md border-t border-gray-300/50 px-4 pt-2 pb-4">
      <div class="flex justify-around">
        <button 
          v-for="tab in tabs" 
          :key="tab.name"
          @click="activeTab = tab.name"
          class="flex flex-col items-center space-y-1 transition-colors"
          :class="activeTab === tab.name ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'"
        >
          <component :is="tab.icon" class="w-6 h-6" />
          <span class="text-xs font-medium">{{ tab.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
