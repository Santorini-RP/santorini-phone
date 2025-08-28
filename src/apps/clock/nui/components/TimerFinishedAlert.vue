<script setup lang="ts">
import { X, RefreshCw } from 'lucide-vue-next';

defineEmits(['stop', 'restart']);
</script>

<template>
  <div class="fixed inset-0 bg-black/40 backdrop-blur-xl z-[200] flex flex-col justify-between items-center text-white p-8 pb-20 animate-fade-in">
    <div class="flex-1 flex items-center justify-center">
      <h1 class="text-6xl font-bold">Timer</h1>
    </div>
    <div class="w-full flex justify-around items-center">
      <div class="flex flex-col items-center space-y-2">
        <button 
          @click="$emit('stop')" 
          class="w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
        >
          <X class="w-10 h-10" />
        </button>
        <span class="text-lg">Stop</span>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <button 
          @click="$emit('restart')" 
          class="w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
        >
          <RefreshCw class="w-9 h-9" />
        </button>
        <span class="text-lg">Restart</span>
      </div>
    </div>
  </div>
</template>
