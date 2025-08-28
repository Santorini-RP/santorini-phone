<script setup lang="ts">
import { type PropType } from 'vue';
import type { Alarm } from '../store/app-store';
import { BellRing, X } from 'lucide-vue-next';

defineProps({
  alarm: {
    type: Object as PropType<Alarm>,
    required: true,
  },
});

defineEmits(['snooze', 'stop']);
</script>

<template>
  <div class="absolute inset-0 bg-black/40 backdrop-blur-xl z-[200] flex flex-col justify-between items-center text-white p-8 pb-20 animate-fade-in">
    <div class="flex-1 flex flex-col items-center justify-center text-center">
      <h1 class="text-6xl font-bold">{{ alarm.label }}</h1>
      <p class="text-4xl font-light mt-2">{{ alarm.time }}</p>
    </div>
    <div class="w-full flex justify-around items-center">
      <div class="flex flex-col items-center space-y-2">
        <button 
          @click="$emit('snooze')" 
          class="w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
        >
          <BellRing class="w-9 h-9" />
        </button>
        <span class="text-lg">Snooze</span>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <button 
          @click="$emit('stop')" 
          class="w-20 h-20 bg-orange-500/80 rounded-full flex items-center justify-center text-white hover:bg-orange-600 active:bg-orange-700 transition-colors"
        >
          <X class="w-10 h-10" />
        </button>
        <span class="text-lg">Stop</span>
      </div>
    </div>
  </div>
</template>
