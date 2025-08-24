<script setup lang="ts">
import { useSystemStore } from '@core/nui/store/system'

defineEmits<{
  power: []
  'volume-up': []
  'volume-down': []
  'silent-switch': []
}>()

const systemStore = useSystemStore()
</script>

<template>
  <!-- Power Button -->
  <button 
    @click="$emit('power')"
    class="absolute right-[-8px] top-[120px] w-2 h-12 bg-gray-600 rounded-l-lg hover:bg-gray-500 transition-colors z-10"
    title="Power Button"
  ></button>

  <!-- Volume Up -->
  <button 
    @click="$emit('volume-up')"
    class="absolute left-[-8px] top-[100px] w-2 h-8 bg-gray-600 rounded-r-lg hover:bg-gray-500 transition-colors z-10"
    title="Volume Up"
  ></button>

  <!-- Volume Down -->
  <button 
    @click="$emit('volume-down')"
    class="absolute left-[-8px] top-[140px] w-2 h-8 bg-gray-600 rounded-r-lg hover:bg-gray-500 transition-colors z-10"
    title="Volume Down"
  ></button>

  <!-- Silent Switch -->
  <button 
    @click="$emit('silent-switch')"
    class="absolute left-[-8px] top-[60px] w-2 h-6 bg-gray-600 rounded-r-lg hover:bg-gray-500 transition-colors z-10"
    :class="{ 'bg-orange-500': systemStore.isSilent }"
    title="Silent Switch"
  ></button>
</template>
