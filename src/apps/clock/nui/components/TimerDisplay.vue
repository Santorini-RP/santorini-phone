<script setup lang="ts">
import { computed } from 'vue';
import { Bell } from 'lucide-vue-next';

const props = defineProps<{
  remainingTime: number;
  totalDuration: number;
}>();

const CIRCLE_RADIUS = 120;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const progress = computed(() => {
  if (props.totalDuration === 0) return 0;
  return props.remainingTime / props.totalDuration;
});

const strokeDashoffset = computed(() => {
  return CIRCLE_CIRCUMFERENCE * (1 - progress.value);
});

const formattedTime = computed(() => {
    const hours = Math.floor(props.remainingTime / 3600);
    const minutes = Math.floor((props.remainingTime % 3600) / 60);
    const seconds = props.remainingTime % 60;

    const parts = [];
    if (props.totalDuration >= 3600 || hours > 0) parts.push(hours.toString().padStart(2, '0'));
    parts.push(minutes.toString().padStart(2, '0'));
    parts.push(seconds.toString().padStart(2, '0'));
    
    return parts.join(':');
});

const endTime = computed(() => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + props.remainingTime);
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
});

</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-auto">
    <div class="relative w-64 h-64">
      <!-- Background Circle -->
      <svg class="w-full h-full" viewBox="0 0 250 250">
        <circle
          cx="125"
          cy="125"
          :r="CIRCLE_RADIUS"
          fill="none"
          stroke-width="8"
          class="stroke-gray-300/50 dark:stroke-gray-700/50"
        />
      </svg>
      <!-- Progress Circle -->
      <svg class="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 250 250">
        <circle
          cx="125"
          cy="125"
          :r="CIRCLE_RADIUS"
          fill="none"
          stroke-width="8"
          stroke-linecap="round"
          class="stroke-blue-500"
          :stroke-dasharray="CIRCLE_CIRCUMFERENCE"
          :stroke-dashoffset="strokeDashoffset"
          style="transition: stroke-dashoffset 1s linear;"
        />
      </svg>
      <!-- Time Display -->
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <h2 class="text-6xl font-thin tracking-tight">{{ formattedTime }}</h2>
        <div class="flex items-center text-lg text-gray-500 dark:text-gray-400 mt-2">
          <Bell class="w-4 h-4" />
          <span class="ml-1">{{ endTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
