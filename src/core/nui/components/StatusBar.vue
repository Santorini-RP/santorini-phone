<script setup lang="ts">
import { computed } from 'vue'
import { useBatteryStore } from '@core/nui/store/battery'
import { useSystemStore } from '@core/nui/store/system'

defineProps<{
  time: string
}>()

const batteryStore = useBatteryStore()
const systemStore = useSystemStore()

const signalBars = computed(() => 4) // Simular sinal completo
</script>

<template>
  <div class="flex justify-between items-center px-6 py-2 text-white text-sm font-medium">
    <!-- Left: Time -->
    <div class="font-semibold">
      {{ time }}
    </div>

    <!-- Right: Icons -->
    <div class="flex items-center space-x-1">
      <!-- Signal Bars -->
      <div class="flex items-end space-x-1">
        <div 
          v-for="bar in 4" 
          :key="bar"
          class="w-1 rounded-sm transition-all"
          :class="[
            bar <= signalBars ? 'bg-white' : 'bg-gray-600',
            bar === 1 ? 'h-1' : bar === 2 ? 'h-2' : bar === 3 ? 'h-3' : 'h-4'
          ]"
        ></div>
      </div>

      <!-- WiFi Icon -->
      <div class="text-white text-xs">📶</div>

      <!-- Battery -->
      <div class="flex items-center space-x-1">
        <span class="text-xs" :class="batteryStore.batteryColor">
          {{ batteryStore.level }}%
        </span>
        <div class="w-6 h-3 border border-white rounded-sm relative">
          <div 
            class="h-full rounded-sm transition-all"
            :class="batteryStore.batteryColor.replace('text-', 'bg-')"
            :style="{ width: `${batteryStore.level}%` }"
          ></div>
          <div class="absolute -right-1 top-1 w-1 h-1 bg-white rounded-sm"></div>
        </div>
      </div>
    </div>
  </div>
</template>
