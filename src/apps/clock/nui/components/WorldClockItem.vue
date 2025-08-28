<script setup lang="ts">
import { computed } from 'vue';
import type { WorldClock } from '../store/app-store';

const props = defineProps<{
  clock: WorldClock;
  currentTime: Date;
}>();

const getCityTimeInfo = () => {
  const localTime = props.currentTime;
  const targetTime = new Date(localTime.toLocaleString('en-US', { timeZone: props.clock.timezone }));

  // Calculate day difference
  const localDate = new Date(localTime.getFullYear(), localTime.getMonth(), localTime.getDate());
  const targetDate = new Date(targetTime.getFullYear(), targetTime.getMonth(), targetTime.getDate());
  const dayDiff = (targetDate.getTime() - localDate.getTime()) / (1000 * 60 * 60 * 24);

  let dayString = 'Today';
  if (dayDiff > 0) dayString = 'Tomorrow';
  else if (dayDiff < 0) dayString = 'Yesterday';

  // Calculate hour difference
  const localOffset = localTime.getTimezoneOffset();
  const targetOffset = targetTime.getTimezoneOffset();
  const totalOffsetDiffMinutes = localOffset - targetOffset;
  const hourDiff = totalOffsetDiffMinutes / 60;
  
  const hourDiffString = hourDiff > 0 ? `+${hourDiff}` : `${hourDiff}`;

  return {
    time: targetTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    difference: `${dayString}, ${hourDiffString}HRS`,
  };
};

const timeInfo = computed(getCityTimeInfo);
</script>

<template>
  <div class="bg-white dark:bg-ios-dark-card rounded-xl p-4 flex justify-between items-center">
    <div>
      <p class="text-2xl font-semibold">{{ clock.city }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ timeInfo.difference }}</p>
    </div>
    <p class="text-5xl font-thin">{{ timeInfo.time }}</p>
  </div>
</template>
